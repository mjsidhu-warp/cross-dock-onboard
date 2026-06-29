# Google Form — Cross-Dock Onboarding

Apps Script that creates a **single-page** Google Form for Warp cross-dock partner onboarding (no page breaks — partners scroll through all sections).

## Quick start

1. Open [script.google.com](https://script.google.com) → **New project**
2. Delete the default `Code.gs` content and paste in [`CreateCrossDockOnboardingForm.gs`](./CreateCrossDockOnboardingForm.gs)
3. Save the project (e.g. name it `Warp Cross-Dock Form`)
4. Select **`createCrossDockOnboardingForm`** in the function dropdown → **Run**
5. Authorize the script when prompted
6. Open **Executions** or **View → Logs** — copy the **Published URL**

## Optional: create form in a Drive folder

```javascript
createCrossDockOnboardingFormInFolder('YOUR_FOLDER_ID');
```

## Optional: menu from a Google Sheet

1. Create a blank Google Sheet
2. **Extensions → Apps Script** → paste the script → save
3. Reload the sheet → **Warp Onboarding → Create cross-dock form**

## Form sections (one scrollable page)

| Section | Fields |
|---------|--------|
| Your business | Company, contact, phone, email |
| Facility location | Address, city, state, ZIP, nearest Warp market |
| Facility details | Sq ft, dock doors, storage type, hours, early-open |
| Capabilities | LTL cross-dock, IMS, transload (checkboxes) |
| Tech readiness | Devices, label printer, floor internet |
| Rate terms | Rate card summary + acceptance |
| Setup readiness | Optional checklist (apps, test scans, go-live) |
| Anything else | Notes, referral source |

## After creation

- Share the published link with dock operators
- Responses → link to a Google Sheet for review
- Warp ops can use responses to create `warehouses` / `users` records manually until API integration exists
