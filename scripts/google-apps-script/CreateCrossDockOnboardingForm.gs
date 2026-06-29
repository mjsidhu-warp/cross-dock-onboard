/**
 * Warp Cross-Dock Partner Onboarding — Google Form generator
 *
 * Creates a single-page Google Form (no page breaks) matching the
 * crossdock-portal registration + setup flow.
 *
 * HOW TO USE
 * 1. Go to https://script.google.com → New project
 * 2. Paste this entire file into Code.gs
 * 3. Run createCrossDockOnboardingForm
 * 4. Authorize when prompted
 * 5. Check Execution log for the published form URL
 *
 * Optional: Run createCrossDockOnboardingFormInFolder('FOLDER_ID')
 * to create the form inside a specific Drive folder.
 */

var WARP_MARKETS = [
  'LAX — Los Angeles',
  'SFO — San Francisco',
  'SAN — San Diego',
  'PHX — Phoenix',
  'DFW — Dallas-Fort Worth',
  'IAH — Houston',
  'ATL — Atlanta',
  'MIA — Miami',
  'EWR — Newark / NYC',
  'ORD — Chicago',
  'SEA — Seattle',
  'DEN — Denver',
  'IND — Indianapolis',
  'CLT — Charlotte',
  'BNA — Nashville',
];

var US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA',
  'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'WA', 'WV', 'WI', 'WY',
];

var RATE_CARD_TEXT =
  'Warp standard rate card (effective 2026-07-01):\n' +
  '• Pallet in (receiving scan): $8.50\n' +
  '• Pallet out (departure scan): $8.50\n' +
  '• Storage (per pallet / day): $3.00\n' +
  '• Early-open fee: $150.00\n\n' +
  'Rates are per-pallet for scan-in and scan-out. Storage is billed per pallet per calendar day. ' +
  'Early-open fee applies when Warp requests facility access outside your normal hours.';

/**
 * Main entry point — run from the Apps Script editor.
 * @returns {string} Published form URL
 */
function createCrossDockOnboardingForm() {
  return createCrossDockOnboardingFormInFolder(null);
}

/**
 * @param {string|null} folderId Google Drive folder ID, or null for My Drive root
 * @returns {string} Published form URL
 */
function createCrossDockOnboardingFormInFolder(folderId) {
  var form = FormApp.create('Warp Cross-Dock Partner Onboarding');

  if (folderId) {
    var file = DriveApp.getFileById(form.getId());
    DriveApp.getFolderById(folderId).addFile(file);
    DriveApp.getRootFolder().removeFile(file);
  }

  configureFormSettings_(form);
  addWelcomeAndBusiness_(form);
  addLocation_(form);
  addFacility_(form);
  addCapabilities_(form);
  addTechReadiness_(form);
  addRateTerms_(form);
  addSetupAcknowledgments_(form);
  addFinalNotes_(form);

  var publishedUrl = form.getPublishedUrl();
  var editUrl = form.getEditUrl();

  Logger.log('Form created successfully.');
  Logger.log('Edit URL:      ' + editUrl);
  Logger.log('Published URL: ' + publishedUrl);

  return publishedUrl;
}

/** @param {GoogleAppsScript.Forms.Form} form */
function configureFormSettings_(form) {
  form.setTitle('Warp Cross-Dock Partner Onboarding');
  form.setDescription(
    'Sign up and start getting paid by Warp.\n\n' +
      'This form takes about 10 minutes. All questions are on one page — scroll down to complete each section. ' +
      'Approximate answers are fine. A Warp team member will follow up after you submit.'
  );
  form.setConfirmationMessage(
    'Thank you — your cross-dock onboarding application was submitted.\n\n' +
      'A Warp team member will review your facility and contact you within 1–2 business days ' +
      'with next steps (app access, test scan, and go-live).'
  );
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(false);
  form.setAllowResponseEdits(true);
  form.setPublishingSummary(true);
  form.setShowLinkToRespondAgain(false);
}

/** @param {GoogleAppsScript.Forms.Form} form */
function addWelcomeAndBusiness_(form) {
  addSectionHeader_(form, 'Your business', 'Basic contact info so Warp can reach you.');

  form
    .addTextItem()
    .setTitle('Company name')
    .setHelpText('Legal or operating name of your cross-dock / warehouse business.')
    .setRequired(true);

  form
    .addTextItem()
    .setTitle('Your name')
    .setHelpText('Primary contact for this facility.')
    .setRequired(true);

  form
    .addTextItem()
    .setTitle('Phone number')
    .setHelpText('Best number to reach you during business hours.')
    .setRequired(true);

  form
    .addTextItem()
    .setTitle('Email address')
    .setHelpText('We will send setup instructions and go-live updates here.')
    .setRequired(true);
}

/** @param {GoogleAppsScript.Forms.Form} form */
function addLocation_(form) {
  addSectionHeader_(form, 'Facility location', 'Where is your cross-dock located?');

  form
    .addTextItem()
    .setTitle('Street address')
    .setRequired(true);

  form.addTextItem().setTitle('City').setRequired(true);

  form
    .addListItem()
    .setTitle('State')
    .setChoiceValues(US_STATES)
    .setRequired(true);

  form
    .addTextItem()
    .setTitle('ZIP code')
    .setRequired(true);

  form
    .addListItem()
    .setTitle('Nearest Warp market')
    .setHelpText('Select the airport / metro market closest to your facility.')
    .setChoiceValues(WARP_MARKETS)
    .setRequired(true);
}

/** @param {GoogleAppsScript.Forms.Form} form */
function addFacility_(form) {
  addSectionHeader_(
    form,
    'Facility details',
    'Help us understand your space. Approximate numbers are fine.'
  );

  form
    .addTextItem()
    .setTitle('Square footage (approximate)')
    .setHelpText('Total usable warehouse / dock area in square feet.')
    .setRequired(false);

  form
    .addTextItem()
    .setTitle('Number of dock doors')
    .setRequired(false);

  form
    .addMultipleChoiceItem()
    .setTitle('Storage type')
    .setChoiceValues(['Covered / indoor', 'Outdoor', 'Both covered and outdoor'])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle('Operating hours')
    .setHelpText(
      'Example: Mon–Fri 6:00 AM – 6:00 PM, Sat 7:00 AM – 2:00 PM, Sun closed. ' +
        'List any days you are closed.'
    )
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Willing to open early for Warp freight?')
    .setHelpText('You earn an early-open fee when Warp requests access outside normal hours.')
    .setChoiceValues(['Yes', 'No', 'Maybe — depends on notice'])
    .setRequired(true);
}

/** @param {GoogleAppsScript.Forms.Form} form */
function addCapabilities_(form) {
  addSectionHeader_(
    form,
    'What can you handle?',
    'Select all services your facility can provide.'
  );

  form
    .addCheckboxItem()
    .setTitle('Capabilities')
    .setChoiceValues([
      'LTL Cross-dock — receive, sort, and stage pallets for outbound routes',
      'Inventory / IMS — manage inventory counts and storage for clients',
      'Transload — transfer freight between trailers or containers',
    ])
    .setRequired(true);
}

/** @param {GoogleAppsScript.Forms.Form} form */
function addTechReadiness_(form) {
  addSectionHeader_(
    form,
    'Tech readiness check',
    'To run Warp freight you need a few basics. Answer honestly — if you are missing something, ' +
      'we can still review your application and help you get set up.'
  );

  form
    .addMultipleChoiceItem()
    .setTitle('Do you have a phone or tablet that can run a web app?')
    .setHelpText('iPhone, Android phone, or tablet with a camera for scanning.')
    .setChoiceValues(['Yes', 'Not yet'])
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Do you have a label printer?')
    .setHelpText('Thermal or inkjet — used to print pallet labels.')
    .setChoiceValues(['Yes', 'Not yet'])
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Do you have Wi-Fi or cell signal on the dock floor?')
    .setHelpText('Needed for the scanning app to sync in real time.')
    .setChoiceValues(['Yes', 'Not yet'])
    .setRequired(true);
}

/** @param {GoogleAppsScript.Forms.Form} form */
function addRateTerms_(form) {
  addSectionHeader_(
    form,
    'Rate terms',
    'Warp uses a simple, standardized per-pallet rate model.\n\n' + RATE_CARD_TEXT
  );

  form
    .addMultipleChoiceItem()
    .setTitle('I accept the Warp standard rate card above')
    .setChoiceValues([
      'Yes — I accept these rates',
      'I have questions — please contact me before proceeding',
    ])
    .setRequired(true);
}

/** @param {GoogleAppsScript.Forms.Form} form */
function addSetupAcknowledgments_(form) {
  addSectionHeader_(
    form,
    'Setup readiness',
    'After approval, you will complete these steps in the Warp warehouse apps. ' +
      'Check anything you have already done or can do right away.'
  );

  form
    .addCheckboxItem()
    .setTitle('Setup checklist (optional — check all that apply)')
    .setChoiceValues([
      'I can access the mobile scanner app at wh.wearewarp.com',
      'I can access the desktop app at warehouse.wearewarp.com',
      'I have completed or can complete a test scan-in',
      'I have completed or can complete a test scan-out',
      'I have verified label printing works',
      'I am ready to request go-live once Warp approves my facility',
    ])
    .setRequired(false);
}

/** @param {GoogleAppsScript.Forms.Form} form */
function addFinalNotes_(form) {
  addSectionHeader_(form, 'Anything else?', 'Optional — tell us anything we should know.');

  form
    .addParagraphTextItem()
    .setTitle('Additional notes')
    .setHelpText(
      'Special equipment, access restrictions, peak hours, parking, security, etc.'
    )
    .setRequired(false);

  form
    .addMultipleChoiceItem()
    .setTitle('How did you hear about Warp cross-dock partnership?')
    .setChoiceValues([
      'Warp team member',
      'Another cross-dock operator',
      'Carrier / broker',
      'Online search',
      'Other',
    ])
    .setRequired(false);
}

/**
 * Section headers group the form visually without creating a new page.
 * Do NOT use addPageBreakItem() — that would split into multiple pages.
 *
 * @param {GoogleAppsScript.Forms.Form} form
 * @param {string} title
 * @param {string} description
 */
function addSectionHeader_(form, title, description) {
  form.addSectionHeaderItem().setTitle(title).setHelpText(description);
}

/**
 * Adds a custom menu when this script is bound to a Google Sheet.
 * File → Make a copy of a blank sheet, Extensions → Apps Script, paste code,
 * save, reload sheet, then use Warp Onboarding → Create form.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Warp Onboarding')
    .addItem('Create cross-dock form', 'createCrossDockOnboardingForm')
    .addToUi();
}
