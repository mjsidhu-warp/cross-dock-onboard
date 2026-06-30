export type OnboardingStatus =
  | "draft"
  | "submitted"
  | "setup_in_progress"
  | "pending_review"
  | "active"
  | "rejected";

export interface WarehouseProfile {
  id: string;
  name: string;
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  nearestMarket: string;
  facility: {
    sqft: number | null;
    dockDoors: number | null;
    fullTimeEmployees: number | null;
    storageType: "covered" | "outdoor" | "both" | "";
    // Willing to work outside normal operating hours (after-hours / before-open)
    afterHoursWilling: boolean;
    // Dock-set fee per after-hours occurrence (not standardized by Warp)
    afterHoursFee: number | null;
    // Willing to open on holidays
    holidayWilling: boolean;
    // Dock-set fee per holiday occurrence
    holidayFee: number | null;
  };
  operatingHours: {
    day: string;
    isOpen: boolean;
    fromTime: string;
    toTime: string;
  }[];
  capabilities: {
    ltlCrossDock: boolean;
    // Can the dock run outside (client/third-party) software, not just Warp's?
    outsideSoftware: boolean;
    transload: boolean;
  };
  techReadiness: {
    hasDevices: boolean | null;
    hasLabelPrinter: boolean | null;
    hasFloorInternet: boolean | null;
  };
  onboardingStatus: OnboardingStatus;
  onboardingStep: number;
  createdAt: string;
}

export interface SetupChecklist {
  rateTermsAccepted: boolean;
  rateTermsAcceptedAt: string | null;
  trainingScheduled: boolean;
  mobileAppInstalled: boolean;
  desktopAppInstalled: boolean;
  testScanInCompleted: boolean;
  testScanOutCompleted: boolean;
  labelPrintTestPassed: boolean;
  goLiveRequested: boolean;
  goLiveRequestedAt: string | null;
}

export interface RouteItem {
  id: string;
  shipmentCode: string;
  direction: "inbound" | "outbound";
  status: string;
  origin: string;
  destination: string;
  palletCount: number;
  eta: string;
  carrierName: string;
}

export interface ScanSummary {
  period: string;
  totalInbound: number;
  scannedInbound: number;
  totalOutbound: number;
  scannedOutbound: number;
  missedScans: MissedScan[];
}

export interface MissedScan {
  shipmentCode: string;
  direction: "inbound" | "outbound";
  palletId: string;
  arrivalTime: string;
}

export interface EarningsSummary {
  period: string;
  palletsIn: number;
  palletsOut: number;
  // Average number of pallets in storage per day across the period
  avgDailyStorageCount: number;
  // Billable pallet-days = avgDailyStorageCount × days in period
  storageDays: number;
  // After-hours / outside-normal-hours opens this period (dock-set rate)
  afterHoursOpens: number;
  ratePerPalletIn: number;
  ratePerPalletOut: number;
  ratePerStorageDay: number;
  // Dock-set per-occurrence rate (not standardized by Warp)
  ratePerAfterHours: number;
  totalEarned: number;
  paymentStatus: "pending" | "processing" | "paid";
}

export interface RateCard {
  palletIn: number;
  palletOut: number;
  storagePerDay: number;
  // After-hours and holiday fees are set per dock during onboarding, not standardized
  effectiveDate: string;
}
