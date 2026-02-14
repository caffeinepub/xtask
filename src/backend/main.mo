import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import List "mo:core/List";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  //1. Types and Data Structures

  type Task = {
    id : Nat;
    title : Text;
    description : Text;
    reward : Nat;
    status : TaskStatus;
    submission : ?ProofSubmission;
  };

  type ProofSubmission = {
    text : Text;
    url : ?Text;
  };

  type ReviewStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type TaskStatus = {
    #available;
    #completed;
    #pendingReview;
  };

  module Task {
    public func compare(task1 : Task, task2 : Task) : Order.Order {
      Nat.compare(task1.id, task2.id);
    };
  };

  type UserProfile = {
    id : Text;
    name : Text;
    balance : Nat;
    tasksCompleted : [Nat];
    referralCode : Text;
    referredBy : ?Text;
    referrals : [Text];
  };

  module UserProfile {
    public func compare(profile1 : UserProfile, profile2 : UserProfile) : Order.Order {
      Text.compare(profile1.id, profile2.id);
    };
  };

  type Notification = {
    title : Text;
    body : Text;
    timestamp : Time.Time;
  };

  type PayoutMethodType = {
    #crypto;
    #paypal;
    #bank;
  };

  type PayoutMethod = {
    methodType : PayoutMethodType;
    details : Text;
  };

  type PayoutStatus = {
    #pending;
    #approved;
    #declined;
  };

  type PayoutRequest = {
    id : Nat;
    userId : Principal;
    amount : Nat;
    method : PayoutMethod;
    status : PayoutStatus;
    createdAt : Time.Time;
  };

  type AdminDashboardStats = {
    totalUsers : Nat;
    totalEarnings : Nat;
    activeTasks : Nat;
    pendingPayouts : Nat;
  };

  //2. Actor State

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let users = Map.empty<Principal, UserProfile>();
  let tasks = Map.empty<Nat, Task>();
  var nextTaskId = 0;

  let notifications = Map.empty<Principal, List.List<Notification>>();
  let payoutRequests = Map.empty<Nat, PayoutRequest>();
  var nextPayoutId = 0;
  let payoutMethods = Map.empty<Principal, List.List<PayoutMethod>>();

  //3. Admin-Only Functionality

  // (1) Admin Dashboard Stats
  public query ({ caller }) func getAdminDashboardStats() : async AdminDashboardStats {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let totalUsers = users.size();

    let totalEarnings = users.values().foldLeft(
      0,
      func(acc : Nat, user : UserProfile) : Nat {
        acc + user.balance;
      },
    );

    let activeTasks = tasks.values().filter(
      func(task : Task) : Bool {
        switch (task.status) {
          case (#available) { true };
          case (_) { false };
        };
      }
    ).size();

    let pendingPayouts = payoutRequests.values().filter(
      func(request : PayoutRequest) : Bool {
        switch (request.status) {
          case (#pending) { true };
          case (_) { false };
        };
      }
    ).size();

    {
      totalUsers;
      totalEarnings;
      activeTasks;
      pendingPayouts;
    };
  };

  // List all payout requests - Admin only
  public query ({ caller }) func getAllPayoutRequests() : async [PayoutRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    payoutRequests.values().toArray();
  };

  // Update payout request status - Admin only
  public shared ({ caller }) func updatePayoutRequestStatus(requestId : Nat, newStatus : PayoutStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    switch (payoutRequests.get(requestId)) {
      case (null) {
        Runtime.trap("Payout request not found");
      };
      case (?request) {
        // Validate state transition - can only update pending requests
        switch (request.status) {
          case (#pending) {
            // Valid - can transition from pending
          };
          case (#approved) {
            Runtime.trap("Cannot modify already approved payout request");
          };
          case (#declined) {
            Runtime.trap("Cannot modify already declined payout request");
          };
        };

        // Handle balance updates based on status change
        switch (newStatus) {
          case (#approved) {
            // Balance was already deducted when request was created
            // No additional action needed
          };
          case (#declined) {
            // Refund the reserved balance back to user
            switch (users.get(request.userId)) {
              case (null) {
                Runtime.trap("User not found for payout request");
              };
              case (?user) {
                let updatedUser : UserProfile = {
                  id = user.id;
                  name = user.name;
                  balance = user.balance + request.amount;
                  tasksCompleted = user.tasksCompleted;
                  referralCode = user.referralCode;
                  referredBy = user.referredBy;
                  referrals = user.referrals;
                };
                users.add(request.userId, updatedUser);
              };
            };
          };
          case (#pending) {
            // Should not happen, but no action needed
          };
        };

        let updatedRequest : PayoutRequest = {
          id = request.id;
          userId = request.userId;
          amount = request.amount;
          method = request.method;
          status = newStatus;
          createdAt = request.createdAt;
        };
        payoutRequests.add(requestId, updatedRequest);
      };
    };
  };

  //4. User Functions

  //Create user profile (authenticated, non-admin)
  public shared ({ caller }) func createUser(id : Text, name : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    if (users.containsKey(caller)) {
      Runtime.trap("User already exists");
    };

    let referralCode = caller.toText();

    let user : UserProfile = {
      id;
      name;
      balance = 0;
      tasksCompleted = [];
      referralCode;
      referredBy = null;
      referrals = [];
    };

    users.add(caller, user);
  };

  public shared ({ caller }) func setReferralCode(code : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    let user = getUserByPrincipal(caller);
    users.add(
      caller,
      {
        id = user.id;
        name = user.name;
        balance = user.balance;
        tasksCompleted = user.tasksCompleted;
        referralCode = code;
        referredBy = user.referredBy;
        referrals = user.referrals;
      },
    );
  };

  //User tasks
  public shared ({ caller }) func createTask(title : Text, description : Text, reward : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let task : Task = {
      id = nextTaskId;
      title;
      description;
      reward;
      status = #available;
      submission = null;
    };
    tasks.add(nextTaskId, task);
    nextTaskId += 1;
  };

  //Fetch tasks (requires user authentication)
  public query ({ caller }) func getTasks() : async [Task] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view tasks");
    };
    tasks.values().toArray().sort();
  };

  //User profile queries (required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    users.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    users.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    users.get(user);
  };

  public query ({ caller }) func getProfile() : async UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
    getUserByPrincipal(caller);
  };

  public query ({ caller }) func getReferrals() : async [UserProfile] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    let user = getUserByPrincipal(caller);

    let referredProfiles = user.referrals.map(func(referralCode) { getUserByReferralCode(referralCode) });

    referredProfiles.filterMap(
      func(option) {
        switch (option) {
          case (?profile) { ?profile };
          case (null) { null };
        };
      }
    );
  };

  //User payout request management
  public shared ({ caller }) func createPayoutRequest(amount : Nat, method : PayoutMethod) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };

    let user = getUserByPrincipal(caller);

    // Validate sufficient balance
    if (user.balance < amount) {
      Runtime.trap("Insufficient balance");
    };

    // Validate minimum payout amount
    if (amount == 0) {
      Runtime.trap("Payout amount must be greater than zero");
    };

    // Deduct balance immediately to prevent double-spending
    let updatedUser : UserProfile = {
      id = user.id;
      name = user.name;
      balance = user.balance - amount;
      tasksCompleted = user.tasksCompleted;
      referralCode = user.referralCode;
      referredBy = user.referredBy;
      referrals = user.referrals;
    };
    users.add(caller, updatedUser);

    // Create payout request
    let request : PayoutRequest = {
      id = nextPayoutId;
      userId = caller;
      amount;
      method;
      status = #pending;
      createdAt = Time.now();
    };

    payoutRequests.add(nextPayoutId, request);

    nextPayoutId += 1;
    nextPayoutId - 1;
  };

  //Helper for data lookup
  private func getUserByPrincipal(principal : Principal) : UserProfile {
    switch (users.get(principal)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?user) { user };
    };
  };

  private func getUserByReferralCode(referralCode : Text) : ?UserProfile {
    users.values().find(func(profile) { profile.referralCode == referralCode });
  };
};
