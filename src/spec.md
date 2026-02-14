# Specification

## Summary
**Goal:** Let authenticated users view and copy their current Internet Identity Principal ID from the profile page.

**Planned changes:**
- Add a clearly visible “Show my Principal” control on the authenticated `/app/profile` page.
- When activated, display the caller Principal ID as text using the existing identity API (e.g., `identity.getPrincipal().toText()`).
- If no identity is available, show an English message indicating the user must sign in to view the Principal.
- Add a “Copy” button to copy the displayed Principal to the clipboard, with minimal confirmation (toast or inline text).

**User-visible outcome:** On the profile page, users can reveal their Internet Identity Principal ID and copy it for sharing/allowlisting; signed-out users are prompted to sign in to view it.
