# Specification

## Summary
**Goal:** Wire up real admin statistics and payout management in the Motoko backend, ensure payout accounting is consistent, and deploy the updated app with a live URL and canister IDs.

**Planned changes:**
- Implement/admin-gate `getAdminDashboardStats()` to return persisted (non-placeholder) totals for users, earnings, active tasks, and pending payouts used by the existing admin dashboard hook/page.
- Implement/admin-gate payout admin methods to list all payout requests and update a request’s status (approve/decline), including clean errors for invalid request IDs, to support the existing admin payouts hook/page and React Query refresh behavior.
- Enforce consistent payout request state transitions and balance accounting to prevent over-withdrawal and double-application of approval/decline effects.
- Deploy frontend + backend canisters and provide the live HTTPS site URL/domain and the deployed canister IDs.

**User-visible outcome:** Admins can view real dashboard stats and manage (approve/decline) payout requests with correctly updating counts/statuses, and the app is accessible at a provided live URL with corresponding canister IDs.
