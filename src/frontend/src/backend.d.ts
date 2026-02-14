import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PayoutMethod {
    methodType: PayoutMethodType;
    details: string;
}
export type Time = bigint;
export interface Task {
    id: bigint;
    status: TaskStatus;
    reward: bigint;
    title: string;
    description: string;
    submission?: ProofSubmission;
}
export interface ProofSubmission {
    url?: string;
    text: string;
}
export interface PayoutRequest {
    id: bigint;
    status: PayoutStatus;
    method: PayoutMethod;
    userId: Principal;
    createdAt: Time;
    amount: bigint;
}
export interface AdminDashboardStats {
    activeTasks: bigint;
    pendingPayouts: bigint;
    totalUsers: bigint;
    totalEarnings: bigint;
}
export interface UserProfile {
    id: string;
    referralCode: string;
    balance: bigint;
    name: string;
    tasksCompleted: Array<bigint>;
    referrals: Array<string>;
    referredBy?: string;
}
export enum PayoutMethodType {
    bank = "bank",
    crypto = "crypto",
    paypal = "paypal"
}
export enum PayoutStatus {
    pending = "pending",
    approved = "approved",
    declined = "declined"
}
export enum TaskStatus {
    pendingReview = "pendingReview",
    completed = "completed",
    available = "available"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPayoutRequest(amount: bigint, method: PayoutMethod): Promise<bigint>;
    createTask(title: string, description: string, reward: bigint): Promise<void>;
    createUser(id: string, name: string): Promise<void>;
    getAdminDashboardStats(): Promise<AdminDashboardStats>;
    getAllPayoutRequests(): Promise<Array<PayoutRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProfile(): Promise<UserProfile>;
    getReferrals(): Promise<Array<UserProfile>>;
    getTasks(): Promise<Array<Task>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setReferralCode(code: string): Promise<void>;
    updatePayoutRequestStatus(requestId: bigint, newStatus: PayoutStatus): Promise<void>;
}
