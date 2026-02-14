# Specification

## Summary
**Goal:** Make the specified Principal ID recognized as an admin by the backend canister so it can use all existing admin-only methods.

**Planned changes:**
- Add Principal `vtyfq-kcl6h-mvrxs-ixdx3-ew454-lywvd-3om5o-z3adc-gankr-lwzz2-jae` to the backend admin allowlist used by `AccessControl.isAdmin(...)`.
- Ensure the allowlist update persists across redeploy/upgrade (preserving existing admins and including this new admin in stable state/migration as needed).
- Keep non-admin behavior unchanged (admin-only methods continue to reject unauthorized callers).

**User-visible outcome:** When authenticated as `vtyfq-kcl6h-mvrxs-ixdx3-ew454-lywvd-3om5o-z3adc-gankr-lwzz2-jae`, existing admin-only backend methods succeed; other principals still receive the existing unauthorized error.
