# Cross-Dock Partner Onboarding — User Flow

> Last updated: 2026-06-29

---

**Step 1 — Discovery**
User visits wearewarp.com and clicks "Become a partner" button (footer or /cross-docking page).

---

**Step 2 — Sign up**
User enters their email. A magic link is sent. They click the link and are logged in — no password needed. A user account is created immediately. Email is used to resume the flow later.

---

**Step 3 — Registration form**
User fills out their facility details:
- Company name, contact name, phone, email
- Address and nearest Warp market/airport
- Facility size, dock doors, storage type
- Operating hours (days + times)
- Early opening: can they open before normal hours (e.g. 3 AM)? → yes = eligible for early-open fee
- Capabilities: LTL cross-dock, Inventory/IMS, Transload
- Tech readiness:
  - Scanning device (phone or tablet with camera)
  - Label printer (for printing Warp pallet ID labels)
  - Wi-Fi or cell signal on the dock floor
  - Security cameras in the facility (not mandatory, reviewed by ops)

User submits the form. A cross-dock record is created in the system with status **pending**. Operator gets a confirmation email: "Application received, pending review."

---

**Step 4 — Warp reviews the application**
Ops team (Giselle / Tom) sees the dock in the admin review queue. They check facility details, capabilities, and tech readiness. They approve or reject.

- **Rejected** → operator gets email: "Not approved at this time. Follow up in 3 months."
- **Approved** → operator gets a welcome email with login link, SOP documents, and next steps.

---

**Step 5 — Onboarding checklist** *(approved operators only)*

Operator completes each item before going live:

1. **Accept the rate card**
   - Pallet in: $8.50 / Pallet out: $8.50 / Storage: $3.00/day / Early-open fee (dock-specific)

2. **Log into the mobile scanner app**
   - URL: https://wh.wearewarp.com
   - Used for: scanning inbound/outbound pallets, reporting damage, updating pallet counts, helping driver pickup

3. **Log into the desktop warehouse app**
   - URL: https://warehouse.wearewarp.com
   - Used for: printing Warp pallet ID labels, inventory management, work orders, BTTR audits

4. **Set up the label printer**
   - Print blank Warp labels from the desktop app
   - Labels are applied to pallets and scanned for check-in

5. **Review SOPs**
   - Crossdock App SOP (inbound scanning, outbound scanning, exceptions, Help Driver Pickup)
   - IMS Inbound SOP (if IMS capability selected)
   - BTTR Audit SOP (if IMS capability selected)
   - BTTR Work Order SOP (if IMS capability selected)

6. **Complete a test scan-in**
   - Identify route (QR code on BOL / Load Tender, or enter Route ID manually)
   - Scan pallet labels or assign new Warp barcode labels
   - Confirm pallets checked in

7. **Complete a test scan-out**
   - Use Bulk Scan Out on the route detail screen
   - Scan all pallets, tap Complete

8. **Request go-live**
   - Warp assigns a WTCH code (e.g. WTCH-SAN-3) and activates the dock
   - Dock is now eligible to receive routed freight

Support contact: crossdocks@wearewarp.com / 213-463-5594

---

**Step 6 — Add warehouse operators**
The dock admin invites the staff who will scan pallets day-to-day. Each person gets a magic link to create their account, scoped to this dock only. Warp needs: name, job title, phone, email for each operator.

---

**Step 7 — Operations (daily use)**

Operator logs in to the partner portal to:

- **Routes** — see today's inbound and outbound routes in real time. Both lists should be empty by end of day.
- **Scans** — check scan compliance for the week. Missed scans do not populate in auto-paid invoices.
- **Earnings** — pallets scanned × rate. View payment status and history.

Exception handling (from the app):
- Short-ships, over-ships, damaged cargo → report directly from the scanner app
- Carrier ID uploads
- Missing pallets → mark missing in app, removed from scan requirement

---

## Key rules (from SOP)

- **All pallets must be scanned in and out.** Missed pallets will not appear in auto-paid invoices.
- **Pallet ID format:** S-XXXX-XXXX (new format as of June 2025 — old format S-XXXXX no longer valid on BOLs)
- **Help Driver Pickup:** if a driver cannot scan at pickup (sealed pallets, linehaul), the dock operator uses the Release button in the app to confirm each pallet
- **Pallet count updates:** can be adjusted via the app (cannot go below the number of already-labeled pallets)

---

## Open questions

- [ ] Early-open fee rate: standardized or per-dock? (Matt/ops to confirm)
- [ ] Security camera: soft question or hard gate? (ops decision)
- [ ] "Become a partner" link on wearewarp.com: who adds it? (Troy)
- [ ] Admin review queue: existing admin tool or new page? (engineering)
- [ ] Magic link for new `warehouse_partner` role: confirm with Steve
