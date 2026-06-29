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
    storageType: "covered" | "outdoor" | "both" | "";
    earlyOpenWilling: boolean;
  };
  operatingHours: {
    day: string;
    isOpen: boolean;
    fromTime: string;
    toTime: string;
  }[];
  capabilities: {
    ltlCrossDock: boolean;
    inventoryIMS: boolean;
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
  storageDays: number;
  earlyOpenFees: number;
  ratePerPalletIn: number;
  ratePerPalletOut: number;
  ratePerStorageDay: number;
  ratePerEarlyOpen: number;
  totalEarned: number;
  paymentStatus: "pending" | "processing" | "paid";
}

export interface RateCard {
  palletIn: number;
  palletOut: number;
  storagePerDay: number;
  earlyOpenFee: number;
  effectiveDate: string;
}
