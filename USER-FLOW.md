# Cross-Dock Partner Onboarding — User Flow

> Last updated: 2026-06-30

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
- Facility size, dock doors, **full-time dock staff count**, storage type
- Operating hours (days + times)
- **After-hours / outside-normal-hours fees:** can they work outside normal hours (inbound after close, early re-open for outbound, etc.)? If yes, **they enter their own per-occurrence fee** — this is not standardized (see open questions).
- **Holiday fee:** can they open on observed holidays? If yes, they enter their own per-occurrence holiday fee.
- Capabilities: LTL cross-dock, **ability to run outside software** (client/third-party systems — Warp's scanning + IMS tools are provided, so we only ask whether they *can* run an outside system a customer requires), Transload
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
- **Approved** → Warp **assigns the dock's WTCH code at this point** (e.g. WTCH-SAN-3). The operator gets a welcome email with login link, their WTCH code, SOP documents, and next steps. Because the code is assigned on approval, the setup checklist (Step 5) — including test scans — runs against the real system; no sandbox is required.

---

**Step 5 — Onboarding checklist** *(approved operators only)*

The dock's WTCH code was already assigned at approval (Step 4), so the test scans below run against the real system. Operator completes each item before activation:

1. **Accept the rate card**
   - Pallet in: $8.50 / Pallet out: $8.50 / Storage: $3.00/day
   - After-hours and holiday fees: per dock, as entered during registration (not standardized)

2. **Review SOPs**
   - Crossdock App SOP (inbound scanning, outbound scanning, exceptions, Help Driver Pickup)
   - IMS Inbound SOP, BTTR Audit SOP, BTTR Work Order SOP — all docks review these (docks run Warp's software, so these are no longer gated on an "IMS capability" selection)

3. **Schedule onboarding training**
   - Live training session with the Warp cross-dock team — required before test scans
   - Covers scanning, exceptions, and (for docks running IMS) inventory counts and BTTR audits
   - Training materials/SOPs supplement the live session; they don't replace it

4. **Log into the mobile scanner app**
   - URL: https://wh.wearewarp.com
   - Used for: scanning inbound/outbound pallets, reporting damage, updating pallet counts, helping driver pickup

5. **Log into the desktop warehouse app**
   - URL: https://warehouse.wearewarp.com
   - Used for: printing Warp pallet ID labels, inventory management, work orders, BTTR audits

6. **Set up the label printer**
   - Print blank Warp labels from the desktop app
   - Labels are applied to pallets and scanned for check-in

7. **Complete a test scan-in** *(real system, using the assigned WTCH code)*
   - Identify route (QR code on BOL / Load Tender, or enter Route ID manually)
   - Scan pallet labels or assign new Warp barcode labels
   - Confirm pallets checked in

8. **Complete a test scan-out**
   - Use Bulk Scan Out on the route detail screen
   - Scan all pallets, tap Complete

9. **Request activation**
   - WTCH code is already assigned; Warp does a final review and activates the dock
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
- **Earnings** — pallets scanned × rate, plus storage and any after-hours/holiday fees. View payment status and history.
  - Must include **average daily storage count and storage rate** (pallets in storage per day × $/pallet/day) — this is a required line, not optional.

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
- **IMS docks:** weekly inventories are required (counted/reported on a weekly cadence)

---

## Open questions

- [ ] **Who reviews/approves all rates?** Need an owner for sign-off on the standard rate card and on each dock's after-hours/holiday fees.
- [x] ~~Early-open fee rate: standardized or per-dock?~~ **Resolved:** after-hours fees **cannot** be standardized — demand varies by lane/client. Example: for Aritzia at SAT we must open after 10 PM on inbound days and re-open early on outbound days. Fees are set per dock during registration. (Renamed "early-open" → "after-hours / outside-normal-hours"; also added a separate holiday fee.)
- [x] ~~Training: rely only on self-serve materials?~~ **Resolved:** live onboarding training is required before test scans (including for IMS). SOPs/materials supplement it.
- [x] ~~WTCH assignment timing / sandbox?~~ **Resolved:** WTCH code is assigned on approval (before test scans), so the checklist runs against the real system — no sandbox needed.
- [ ] Security camera: soft question or hard gate? (ops decision)
- [ ] "Become a partner" link on wearewarp.com: who adds it? (Troy)
- [ ] Admin review queue: existing admin tool or new page? (engineering)
- [ ] Magic link for new `warehouse_partner` role: confirm with Steve
