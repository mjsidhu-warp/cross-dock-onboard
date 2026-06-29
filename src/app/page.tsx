"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowDownToLine,
  ArrowUpFromLine,
  CheckCircle2,
  Circle,
  ScanBarcode,
  DollarSign,
  Truck,
  AlertTriangle,
  AlertCircle,
  FileText,
  Smartphone,
  Monitor,
  Printer,
  Rocket,
  ExternalLink,
  Clock,
  CreditCard,
  ChevronDown,
  Building2,
  MapPin,
  Warehouse,
  Cpu,
  Wrench,
} from "lucide-react";
import {
  WARP_MARKETS,
  EMPTY_WAREHOUSE,
  DEFAULT_RATE_CARD,
  MOCK_ROUTES,
  MOCK_SCANS,
  MOCK_EARNINGS,
  MOCK_EARNINGS_HISTORY,
} from "@/lib/mock-data";
import type { WarehouseProfile } from "@/lib/types";

/* ─── Sticky nav sections ─── */
const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "register", label: "Register" },
  { id: "setup", label: "Setup" },
  { id: "operations", label: "Operations" },
  { id: "earnings", label: "Earnings" },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

/* ─── Registration sub-sections for progressive disclosure ─── */
const REG_SECTIONS = [
  { key: "business", label: "Business Info", icon: Building2 },
  { key: "location", label: "Location", icon: MapPin },
  { key: "facility", label: "Facility", icon: Warehouse },
  { key: "capabilities", label: "Capabilities", icon: Wrench },
  { key: "tech", label: "Tech Check", icon: Cpu },
];

export default function PortalPage() {
  /* ── Registration state ── */
  const [data, setData] = useState<WarehouseProfile>({ ...EMPTY_WAREHOUSE });
  const [openReg, setOpenReg] = useState<string | null>("business");
  const [submitted, setSubmitted] = useState(false);

  /* ── Setup checklist state ── */
  const [rateAccepted, setRateAccepted] = useState(false);
  const [showRateModal, setShowRateModal] = useState(false);
  const [mobileOk, setMobileOk] = useState(false);
  const [desktopOk, setDesktopOk] = useState(false);
  const [scanInOk, setScanInOk] = useState(false);
  const [scanOutOk, setScanOutOk] = useState(false);
  const [labelOk, setLabelOk] = useState(false);
  const [goLiveRequested, setGoLiveRequested] = useState(false);

  /* ── Routes filter ── */
  const [routeFilter, setRouteFilter] = useState<"all" | "inbound" | "outbound">("all");

  function update(partial: Partial<WarehouseProfile>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  const techAllNo =
    data.techReadiness.hasDevices === false &&
    data.techReadiness.hasLabelPrinter === false &&
    data.techReadiness.hasFloorInternet === false;

  const setupSteps = [
    { done: rateAccepted, label: "Rate card accepted" },
    { done: false, label: "SOPs reviewed" },
    { done: mobileOk, label: "Mobile app logged in" },
    { done: desktopOk, label: "Desktop app logged in" },
    { done: labelOk, label: "Label printer set up" },
    { done: scanInOk, label: "Test scan-in completed" },
    { done: scanOutOk, label: "Test scan-out completed" },
    { done: goLiveRequested, label: "Go-live requested" },
  ];
  const setupDone = setupSteps.filter((s) => s.done).length;
  // All steps are required; go-live is the last one, so unlock it when all others are done
  const canGoLive = setupSteps.slice(0, -1).every((s) => s.done);

  const filteredRoutes =
    routeFilter === "all"
      ? MOCK_ROUTES
      : MOCK_ROUTES.filter((r) => r.direction === routeFilter);

  const inbound = MOCK_ROUTES.filter((r) => r.direction === "inbound");
  const outbound = MOCK_ROUTES.filter((r) => r.direction === "outbound");

  const overallScanRate = Math.round(
    ((MOCK_SCANS.scannedInbound + MOCK_SCANS.scannedOutbound) /
      (MOCK_SCANS.totalInbound + MOCK_SCANS.totalOutbound)) *
      100
  );

  return (
    <div className="min-h-screen bg-warp-bg">
      {/* ═══ STICKY NAV ═══ */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-warp-border bg-warp-bg/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded border border-warp-border-light px-2 py-1">
              <span className="text-xs font-bold tracking-[0.25em] text-warp-text">
                WARP
              </span>
            </div>
            <span className="text-sm font-medium text-warp-muted">
              Dock Partner Portal
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-transparent px-3.5 py-1.5 text-xs font-medium text-warp-secondary transition-colors hover:border-warp-border-light hover:text-warp-text"
              >
                {s.label}
              </a>
            ))}
          </div>
          <a
            href="#register"
            className="rounded-full border border-warp-green bg-transparent px-4 py-1.5 text-xs font-semibold text-warp-green transition-colors hover:bg-warp-green hover:text-warp-bg"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center pt-14"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-warp-green-glow via-transparent to-transparent" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-warp-border-light bg-warp-elevated px-4 py-1.5 text-xs text-warp-secondary">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-warp-green" />
            THE WARP CROSS-DOCK NETWORK
          </div>

          <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Sign up and start
            <br />
            <span className="text-warp-green">getting paid.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-warp-secondary">
            Join 50+ cross-dock facilities in the Warp Freight Network. Register
            your dock, complete a quick setup, and earn on every pallet you
            handle.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#register"
              className="inline-flex items-center gap-2 rounded-full bg-warp-green px-6 py-3 text-sm font-semibold text-warp-bg transition-colors hover:bg-warp-green-dim"
            >
              Register your dock
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#operations"
              className="inline-flex items-center gap-2 rounded-full border border-warp-border-light px-6 py-3 text-sm font-medium text-warp-secondary transition-colors hover:border-warp-muted hover:text-warp-text"
            >
              See how it works
            </a>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "50+", label: "Cross-docks" },
              { value: "$8.50", label: "Per pallet" },
              { value: "1,400+", label: "Active lanes" },
              { value: "Weekly", label: "Payouts" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-warp-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <a
            href="#register"
            className="mt-12 inline-flex animate-bounce text-warp-muted"
          >
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </section>

      {/* ═══ REGISTRATION ═══ */}
      <section id="register" className="border-t border-warp-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Register your facility
            </h2>
            <p className="mt-3 text-warp-secondary">
              Takes about 10 minutes. Your progress is saved as you go.
            </p>
          </div>

          {submitted ? (
            <div className="mt-12 rounded-2xl border border-green-500/30 bg-warp-green-glow p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-warp-green" />
              <h3 className="mt-4 text-xl font-bold text-white">
                Registration submitted
              </h3>
              <p className="mt-2 text-warp-secondary">
                Continue below to complete your setup checklist and go live.
              </p>
              <a
                href="#setup"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-warp-green px-5 py-2.5 text-sm font-semibold text-warp-bg"
              >
                Continue to setup
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ) : (
            <div className="mt-10 space-y-3">
              {REG_SECTIONS.map((sec) => {
                const isOpen = openReg === sec.key;
                return (
                  <div
                    key={sec.key}
                    className="rounded-xl border border-warp-border bg-warp-elevated overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenReg(isOpen ? null : sec.key)}
                      className="flex w-full items-center justify-between px-6 py-4 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <sec.icon className="h-4.5 w-4.5 text-warp-green" />
                        <span className="text-sm font-semibold text-warp-text">
                          {sec.label}
                        </span>
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-warp-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-warp-border px-6 pb-6 pt-4">
                        {/* Business */}
                        {sec.key === "business" && (
                          <div className="space-y-4">
                            <DarkInput label="Company name" placeholder="Acme Cross-Dock LLC" value={data.companyName} onChange={(v) => update({ companyName: v })} />
                            <DarkInput label="Your name" placeholder="Jane Smith" value={data.contactName} onChange={(v) => update({ contactName: v })} />
                            <div className="grid gap-4 sm:grid-cols-2">
                              <DarkInput label="Phone" placeholder="(555) 123-4567" value={data.phone} onChange={(v) => update({ phone: v })} />
                              <DarkInput label="Email" type="email" placeholder="jane@acmedock.com" value={data.email} onChange={(v) => update({ email: v })} />
                            </div>
                            <button onClick={() => setOpenReg("location")} className="mt-2 text-xs font-medium text-warp-green hover:underline">
                              Next: Location →
                            </button>
                          </div>
                        )}

                        {/* Location */}
                        {sec.key === "location" && (
                          <div className="space-y-4">
                            <DarkInput label="Street address" placeholder="1234 Logistics Way" value={data.address.street} onChange={(v) => update({ address: { ...data.address, street: v } })} />
                            <div className="grid gap-4 sm:grid-cols-3">
                              <DarkInput label="City" placeholder="Commerce" value={data.address.city} onChange={(v) => update({ address: { ...data.address, city: v } })} />
                              <DarkSelect label="State" value={data.address.state} onChange={(v) => update({ address: { ...data.address, state: v } })} options={US_STATES.map((s) => ({ value: s, label: s }))} placeholder="State" />
                              <DarkInput label="ZIP" placeholder="90040" value={data.address.zip} onChange={(v) => update({ address: { ...data.address, zip: v } })} />
                            </div>
                            <DarkSelect
                              label="Nearest Warp market"
                              value={data.nearestMarket}
                              onChange={(v) => update({ nearestMarket: v })}
                              options={WARP_MARKETS.map((m) => ({ value: m, label: m }))}
                              placeholder="Select market"
                            />
                            <button onClick={() => setOpenReg("facility")} className="mt-2 text-xs font-medium text-warp-green hover:underline">
                              Next: Facility →
                            </button>
                          </div>
                        )}

                        {/* Facility */}
                        {sec.key === "facility" && (
                          <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                              <DarkInput label="Square footage (approx)" type="number" placeholder="10000" value={data.facility.sqft?.toString() ?? ""} onChange={(v) => update({ facility: { ...data.facility, sqft: v ? Number(v) : null } })} />
                              <DarkInput label="Dock doors" type="number" placeholder="4" value={data.facility.dockDoors?.toString() ?? ""} onChange={(v) => update({ facility: { ...data.facility, dockDoors: v ? Number(v) : null } })} />
                            </div>
                            <DarkSelect label="Storage type" value={data.facility.storageType} onChange={(v) => update({ facility: { ...data.facility, storageType: v as "covered" | "outdoor" | "both" | "" } })} options={[{ value: "covered", label: "Covered / indoor" }, { value: "outdoor", label: "Outdoor" }, { value: "both", label: "Both" }]} placeholder="Select type" />

                            <div>
                              <p className="mb-2 text-xs font-medium text-warp-secondary">
                                Operating hours
                              </p>
                              <div className="space-y-1.5">
                                {data.operatingHours.map((oh, i) => (
                                  <div key={oh.day} className="flex items-center gap-3 rounded-lg border border-warp-border bg-warp-bg px-3 py-2">
                                    <label className="flex w-20 items-center gap-2 text-xs">
                                      <input type="checkbox" checked={oh.isOpen} onChange={(e) => { const h = [...data.operatingHours]; h[i] = { ...h[i], isOpen: e.target.checked }; update({ operatingHours: h }); }} className="accent-warp-green" />
                                      <span className="text-warp-secondary">{oh.day.slice(0, 3)}</span>
                                    </label>
                                    {oh.isOpen ? (
                                      <div className="flex items-center gap-2 text-xs">
                                        <input type="time" value={oh.fromTime} onChange={(e) => { const h = [...data.operatingHours]; h[i] = { ...h[i], fromTime: e.target.value }; update({ operatingHours: h }); }} className="rounded border border-warp-border bg-warp-input px-2 py-1 text-xs text-warp-text" />
                                        <span className="text-warp-muted">to</span>
                                        <input type="time" value={oh.toTime} onChange={(e) => { const h = [...data.operatingHours]; h[i] = { ...h[i], toTime: e.target.value }; update({ operatingHours: h }); }} className="rounded border border-warp-border bg-warp-input px-2 py-1 text-xs text-warp-text" />
                                      </div>
                                    ) : (
                                      <span className="text-xs text-warp-muted">Closed</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-warp-border bg-warp-bg p-4 hover:border-warp-border-light">
                              <input type="checkbox" checked={data.facility.earlyOpenWilling} onChange={(e) => update({ facility: { ...data.facility, earlyOpenWilling: e.target.checked } })} className="accent-warp-green" />
                              <div>
                                <p className="text-sm font-medium text-warp-text">Willing to open early?</p>
                                <p className="text-xs text-warp-muted">Earn an early-open fee when Warp requests it.</p>
                              </div>
                            </label>
                            <button onClick={() => setOpenReg("capabilities")} className="mt-2 text-xs font-medium text-warp-green hover:underline">
                              Next: Capabilities →
                            </button>
                          </div>
                        )}

                        {/* Capabilities */}
                        {sec.key === "capabilities" && (
                          <div className="space-y-3">
                            {[
                              { key: "ltlCrossDock" as const, label: "LTL Cross-dock", desc: "Receive, sort, and stage pallets for outbound routes" },
                              { key: "inventoryIMS" as const, label: "Inventory / IMS", desc: "Manage inventory counts and storage for clients" },
                              { key: "transload" as const, label: "Transload", desc: "Transfer freight between trailers or containers" },
                            ].map((cap) => (
                              <label key={cap.key} className="flex cursor-pointer items-start gap-4 rounded-xl border border-warp-border bg-warp-bg p-4 transition-colors hover:border-warp-border-light">
                                <input type="checkbox" checked={data.capabilities[cap.key]} onChange={(e) => update({ capabilities: { ...data.capabilities, [cap.key]: e.target.checked } })} className="mt-0.5 accent-warp-green" />
                                <div>
                                  <p className="text-sm font-medium text-warp-text">{cap.label}</p>
                                  <p className="text-xs text-warp-muted">{cap.desc}</p>
                                </div>
                              </label>
                            ))}
                            <button onClick={() => setOpenReg("tech")} className="mt-2 text-xs font-medium text-warp-green hover:underline">
                              Next: Tech Check →
                            </button>
                          </div>
                        )}

                        {/* Tech readiness */}
                        {sec.key === "tech" && (
                          <div className="space-y-4">
                            {[
                              { key: "hasDevices" as const, q: "Do you have a phone or tablet for scanning?", hint: "iPhone or Android with a camera — used with wh.wearewarp.com scanner app" },
                              { key: "hasLabelPrinter" as const, q: "Do you have a label printer?", hint: "For printing blank Warp pallet ID labels (thermal or inkjet)" },
                              { key: "hasFloorInternet" as const, q: "Do you have Wi-Fi or cell signal on the dock floor?", hint: "Required for real-time scan sync and route visibility" },
                            ].map((item) => (
                              <div key={item.key} className="rounded-xl border border-warp-border bg-warp-bg p-4">
                                <p className="text-sm font-medium text-warp-text">{item.q}</p>
                                <p className="mt-0.5 text-xs text-warp-muted">{item.hint}</p>
                                <div className="mt-3 flex gap-2">
                                  <button onClick={() => update({ techReadiness: { ...data.techReadiness, [item.key]: true } })} className={`rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors ${data.techReadiness[item.key] === true ? "border-warp-green bg-warp-green text-warp-bg" : "border-warp-border text-warp-secondary hover:border-warp-border-light"}`}>
                                    Yes
                                  </button>
                                  <button onClick={() => update({ techReadiness: { ...data.techReadiness, [item.key]: false } })} className={`rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors ${data.techReadiness[item.key] === false ? "border-warp-red bg-warp-red-dim text-warp-red" : "border-warp-border text-warp-secondary hover:border-warp-border-light"}`}>
                                    Not yet
                                  </button>
                                </div>
                              </div>
                            ))}
                            {/* Security cameras — not a hard gate */}
                            <div className="rounded-xl border border-warp-border bg-warp-bg p-4">
                              <p className="text-sm font-medium text-warp-text">Do you have security cameras in your facility?</p>
                              <p className="mt-0.5 text-xs text-warp-muted">Not required, but reviewed by our ops team as part of facility safety</p>
                              <div className="mt-3 flex gap-2">
                                {["Yes", "No"].map((v) => (
                                  <button key={v} onClick={() => update({ techReadiness: { ...data.techReadiness } })} className="rounded-lg border border-warp-border px-4 py-1.5 text-xs font-medium text-warp-secondary hover:border-warp-border-light">{v}</button>
                                ))}
                              </div>
                            </div>

                            {techAllNo && (
                              <div className="rounded-xl border border-amber-500/30 bg-warp-amber-dim p-4">
                                <div className="flex items-start gap-3">
                                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warp-amber" />
                                  <div>
                                    <p className="text-sm font-semibold text-warp-amber">You&apos;ll need these to run Warp freight</p>
                                    <p className="mt-1 text-xs text-warp-secondary">You can still submit — a Warp team member will reach out with what you need.</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => setSubmitted(true)}
                              className="mt-4 w-full rounded-full bg-warp-green px-6 py-3 text-sm font-semibold text-warp-bg transition-colors hover:bg-warp-green-dim"
                            >
                              Submit registration
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══ SETUP CHECKLIST ═══ */}
      <section id="setup" className="border-t border-warp-border py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-white">Setup checklist</h2>
          <p className="mt-2 text-warp-secondary">
            Complete these steps to go live and start receiving freight.
          </p>

          {/* Progress */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="text-warp-secondary">
              {setupDone} of {setupSteps.length} completed
            </span>
            <span className="font-mono text-xs text-warp-muted">
              {Math.round((setupDone / setupSteps.length) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-warp-border">
            <div
              className="h-full rounded-full bg-warp-green transition-all duration-500"
              style={{ width: `${(setupDone / setupSteps.length) * 100}%` }}
            />
          </div>

          {goLiveRequested && (
            <div className="mt-6 rounded-xl border border-green-500/30 bg-warp-green-glow p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-warp-green" />
                <div>
                  <p className="text-sm font-semibold text-warp-green">Go-live request submitted</p>
                  <p className="mt-1 text-sm text-warp-secondary">Warp will review and activate your dock within 1–2 business days.</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-2">
            {/* Rate terms */}
            <ChecklistRow done={rateAccepted} label="Accept rate card" desc="Pallet in / out, storage per day, early-open fee. All pallets must be scanned — missed scans are excluded from invoicing." icon={FileText} optional={false}>
              {!rateAccepted && <GreenBtn onClick={() => setShowRateModal(true)}>View &amp; accept rate card</GreenBtn>}
            </ChecklistRow>

            {/* SOPs */}
            <ChecklistRow done={false} label="Review SOPs" desc="Read the Crossdock App SOP before your first scan. Covers inbound, outbound, exceptions, and driver pickup assist." icon={FileText} optional={false}>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-warp-border px-3 py-1.5 text-xs text-warp-muted">Crossdock App SOP v3.0</span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-warp-border px-3 py-1.5 text-xs text-warp-muted">IMS Inbound SOP v1.5</span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-warp-border px-3 py-1.5 text-xs text-warp-muted">BTTR Audit SOP v1.4</span>
                <GreenBtn onClick={() => {}}>Mark reviewed</GreenBtn>
              </div>
            </ChecklistRow>

            {/* Mobile scanner app */}
            <ChecklistRow done={mobileOk} label="Log into the mobile scanner app" desc="wh.wearewarp.com — used for scanning pallets in/out, reporting damage, updating counts, and helping driver pickup." icon={Smartphone} optional={false}>
              {!mobileOk && (
                <div className="flex gap-2">
                  <a href="https://wh.wearewarp.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-warp-border px-3 py-1.5 text-xs text-warp-secondary hover:border-warp-border-light">Open wh.wearewarp.com <ExternalLink className="h-3 w-3" /></a>
                  <GreenBtn onClick={() => setMobileOk(true)}>Mark done</GreenBtn>
                </div>
              )}
            </ChecklistRow>

            {/* Desktop warehouse app */}
            <ChecklistRow done={desktopOk} label="Log into the desktop warehouse app" desc="warehouse.wearewarp.com — used for printing Warp pallet ID labels, inventory management, and work orders." icon={Monitor} optional={false}>
              {!desktopOk && (
                <div className="flex gap-2">
                  <a href="https://warehouse.wearewarp.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-warp-border px-3 py-1.5 text-xs text-warp-secondary hover:border-warp-border-light">Open warehouse.wearewarp.com <ExternalLink className="h-3 w-3" /></a>
                  <GreenBtn onClick={() => setDesktopOk(true)}>Mark done</GreenBtn>
                </div>
              )}
            </ChecklistRow>

            {/* Label printer */}
            <ChecklistRow done={labelOk} label="Set up label printer &amp; print a test label" desc="Print a blank Warp pallet ID label from the desktop app. Labels are scanned during check-in to auto-mark pallets as received." icon={Printer} optional={false}>
              {!labelOk && <GreenBtn onClick={() => setLabelOk(true)}>Mark done</GreenBtn>}
            </ChecklistRow>

            {/* Test scan-in */}
            <ChecklistRow done={scanInOk} label="Complete a test scan-in" desc="Identify a route by QR code (BOL/Load Tender) or Route ID. Scan pallet labels — pallets auto-mark as checked in." icon={ScanBarcode} optional={false}>
              {!scanInOk && <GreenBtn onClick={() => setScanInOk(true)}>Mark done</GreenBtn>}
            </ChecklistRow>

            {/* Test scan-out */}
            <ChecklistRow done={scanOutOk} label="Complete a test scan-out" desc="Use Bulk Scan Out on the route screen. Scan all pallets, then tap Complete. Both inbound and outbound lists should be empty by end of day." icon={ScanBarcode} optional={false}>
              {!scanOutOk && <GreenBtn onClick={() => setScanOutOk(true)}>Mark done</GreenBtn>}
            </ChecklistRow>

            {/* Go live */}
            <ChecklistRow done={goLiveRequested} label="Request go-live" desc="Warp assigns your WTCH code and activates your dock. You'll start receiving routed freight." icon={Rocket} optional={false}>
              {!goLiveRequested && (
                <button
                  onClick={() => canGoLive && setGoLiveRequested(true)}
                  disabled={!canGoLive}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${canGoLive ? "bg-warp-green text-warp-bg hover:bg-warp-green-dim" : "bg-warp-border text-warp-muted cursor-not-allowed"}`}
                >
                  {canGoLive ? "Request go-live" : "Complete all steps first"}
                </button>
              )}
            </ChecklistRow>
          </div>

          {/* Support contact */}
          <div className="mt-8 rounded-xl border border-warp-border bg-warp-elevated p-5">
            <p className="text-sm font-semibold text-warp-text">Need help?</p>
            <p className="mt-1 text-xs text-warp-secondary">
              Contact the Warp cross-dock support team at{" "}
              <a href="mailto:crossdocks@wearewarp.com" className="text-warp-green hover:underline">crossdocks@wearewarp.com</a>
              {" "}or call <a href="tel:+12134635594" className="text-warp-green hover:underline">213-463-5594</a>.
              {" "}For additional training, <a href="https://www.wearewarp.com/book-a-meeting" target="_blank" rel="noopener noreferrer" className="text-warp-green hover:underline">schedule a call</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ OPERATIONS ═══ */}
      <section id="operations" className="border-t border-warp-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-white">Operations</h2>
          <p className="mt-2 text-warp-secondary">
            Daily route visibility, scan compliance, and earnings. Both inbound and outbound lists should be empty by end of day.
          </p>

          {/* Summary cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={ArrowDownToLine} iconColor="text-warp-blue" label="Pallets arriving" value={inbound.reduce((s, r) => s + r.palletCount, 0).toString()} sub={`${inbound.length} shipments`} />
            <StatCard icon={ArrowUpFromLine} iconColor="text-warp-amber" label="Pallets leaving" value={outbound.reduce((s, r) => s + r.palletCount, 0).toString()} sub={`${outbound.length} shipments`} />
            <StatCard icon={ScanBarcode} iconColor="text-warp-green" label="Scan compliance" value={`${overallScanRate}%`} sub={`${MOCK_SCANS.missedScans.length} missed this week`} />
            <StatCard icon={DollarSign} iconColor="text-warp-green" label="This week" value={`$${MOCK_EARNINGS.totalEarned.toLocaleString("en-US", { minimumFractionDigits: 2 })}`} sub={MOCK_EARNINGS.paymentStatus} />
          </div>

          {/* Compliance notice */}
          <div className="mt-4 rounded-xl border border-warp-border bg-warp-elevated p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warp-blue" />
              <p className="text-xs text-warp-secondary">
                <span className="font-semibold text-warp-text">Scan compliance required.</span>{" "}
                All pallets must be scanned in <em>and</em> out. Missed pallets will not populate in auto-paid invoices — you won&apos;t get paid for what isn&apos;t scanned.
              </p>
            </div>
          </div>

          {/* Missed scans alert */}
          {MOCK_SCANS.missedScans.length > 0 && (
            <div className="mt-4 rounded-xl border border-amber-500/30 bg-warp-amber-dim p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-warp-amber" />
                <div>
                  <p className="text-sm font-semibold text-warp-amber">{MOCK_SCANS.missedScans.length} pallets missed scan this week</p>
                  <p className="mt-0.5 text-xs text-warp-secondary">These pallets were excluded from your auto-paid invoice. Contact <a href="mailto:crossdocks@wearewarp.com" className="text-warp-green hover:underline">crossdocks@wearewarp.com</a> if this was a scan app issue.</p>
                </div>
              </div>
            </div>
          )}

          {/* Routes table */}
          <div className="mt-8 rounded-xl border border-warp-border bg-warp-elevated overflow-hidden">
            <div className="flex items-center justify-between border-b border-warp-border px-6 py-4">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-warp-green" />
                <h3 className="text-sm font-semibold text-warp-text">Today&apos;s routes</h3>
              </div>
              <div className="flex gap-1 rounded-lg bg-warp-bg p-0.5">
                {(["all", "inbound", "outbound"] as const).map((f) => (
                  <button key={f} onClick={() => setRouteFilter(f)} className={`rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors ${routeFilter === f ? "bg-warp-card text-warp-text" : "text-warp-muted hover:text-warp-secondary"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-warp-border bg-warp-bg/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-warp-muted">Shipment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-warp-muted">Dir</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-warp-muted">From / To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-warp-muted">Carrier</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-warp-muted">Pallets</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-warp-muted">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-warp-muted">ETA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warp-border">
                  {filteredRoutes.map((r) => (
                    <tr key={r.id} className="hover:bg-warp-card/50">
                      <td className="px-6 py-3 font-medium text-warp-text">{r.shipmentCode}</td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1.5">
                          {r.direction === "inbound" ? <ArrowDownToLine className="h-3 w-3 text-warp-blue" /> : <ArrowUpFromLine className="h-3 w-3 text-warp-amber" />}
                          <span className="text-xs capitalize text-warp-secondary">{r.direction}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3 text-warp-secondary">{r.direction === "inbound" ? r.origin : r.destination}</td>
                      <td className="px-6 py-3 text-warp-secondary">{r.carrierName}</td>
                      <td className="px-6 py-3 text-center font-semibold text-warp-text">{r.palletCount}</td>
                      <td className="px-6 py-3">
                        <DarkBadge variant={r.status.includes("Arrived") ? "green" : r.status.includes("Departed") ? "neutral" : r.status.includes("Ready") ? "amber" : "blue"}>
                          {r.status}
                        </DarkBadge>
                      </td>
                      <td className="px-6 py-3 text-xs text-warp-muted">{r.eta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scan compliance detail */}
          <div className="mt-8 rounded-xl border border-warp-border bg-warp-elevated overflow-hidden">
            <div className="border-b border-warp-border px-6 py-4">
              <div className="flex items-center gap-2">
                <ScanBarcode className="h-4 w-4 text-warp-green" />
                <h3 className="text-sm font-semibold text-warp-text">Scan compliance — {MOCK_SCANS.period}</h3>
              </div>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-2">
              <ScanBar label="Inbound" scanned={MOCK_SCANS.scannedInbound} total={MOCK_SCANS.totalInbound} />
              <ScanBar label="Outbound" scanned={MOCK_SCANS.scannedOutbound} total={MOCK_SCANS.totalOutbound} />
            </div>
            {MOCK_SCANS.missedScans.length > 0 && (
              <div className="border-t border-warp-border">
                <div className="px-6 py-3 text-xs font-medium text-warp-muted">Missed scans</div>
                <div className="divide-y divide-warp-border">
                  {MOCK_SCANS.missedScans.map((m, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-warp-card/50">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-3.5 w-3.5 text-warp-amber" />
                        <div>
                          <span className="text-sm font-medium text-warp-text">{m.shipmentCode}</span>
                          <span className="ml-2 font-mono text-xs text-warp-muted">{m.palletId}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-warp-muted">{m.arrivalTime}</span>
                        <span className="rounded-full bg-warp-amber-dim px-2.5 py-0.5 text-xs font-medium text-warp-amber">Scan now</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══ APP FEATURES QUICK-REF ═══ */}
      <section className="border-t border-warp-border py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold text-white">What the scanner app does</h2>
          <p className="mt-2 text-sm text-warp-secondary">
            Open <a href="https://wh.wearewarp.com" target="_blank" rel="noopener noreferrer" className="text-warp-green hover:underline">wh.wearewarp.com</a> on your phone to access all of these.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: ScanBarcode,
                title: "Enhanced check-in",
                desc: "Faster QR scanning and validation. Scan the QR code on the BOL or Load Tender, or enter the Route ID manually.",
              },
              {
                icon: AlertCircle,
                title: "Real-time exception flagging",
                desc: "Report short-ships, over-ships, damaged cargo, or missing pallets directly from the app. Upload carrier IDs on the spot.",
              },
              {
                icon: Printer,
                title: "WMS / pallet ID labeling",
                desc: "Generate and print Warp pallet ID labels from the desktop app at warehouse.wearewarp.com. Labels are applied before check-in.",
              },
              {
                icon: ArrowDownToLine,
                title: "Detailed pallet management",
                desc: "Capture pallet weights, take photos, and adjust pallet counts (add/remove). Cannot go below the number of already-labeled pallets.",
              },
              {
                icon: ArrowUpFromLine,
                title: "Outbound scanning",
                desc: "Use Bulk Scan Out on the route screen. Scan all pallets, then tap Complete to finalize checkout. Both lists should be empty by end of day.",
              },
              {
                icon: Truck,
                title: "Daily route visibility",
                desc: "See all today's inbound and outbound routes in real time as routes are created, checked in, or checked out.",
              },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-warp-border bg-warp-elevated p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warp-green-glow">
                  <f.icon className="h-4.5 w-4.5 text-warp-green" />
                </div>
                <p className="mt-3 text-sm font-semibold text-warp-text">{f.title}</p>
                <p className="mt-1 text-xs text-warp-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Help Driver Pickup call-out */}
          <div className="mt-6 rounded-xl border border-warp-border-light bg-warp-elevated p-5">
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-warp-blue" />
              <div>
                <p className="text-sm font-semibold text-warp-text">Help Driver Pickup</p>
                <p className="mt-1 text-xs text-warp-secondary">
                  If a driver can&apos;t scan at pickup (sealed pallets, linehaul, device issue), the driver app will prompt them to request assistance. Open your Crossdock App, search by Route ID, and use the <span className="font-semibold text-warp-text">Release</span> button to confirm each pallet. This ensures the correct pallets are recorded.
                </p>
              </div>
            </div>
          </div>

          {/* New WARPID format callout */}
          <div className="mt-4 rounded-xl border border-warp-border-light bg-warp-elevated p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-warp-amber" />
              <div>
                <p className="text-sm font-semibold text-warp-text">New WARP Pallet ID format</p>
                <p className="mt-1 text-xs text-warp-secondary">
                  The new format is <span className="font-mono font-semibold text-warp-text">S-XXXX-XXXX</span>. The old format (<span className="font-mono text-warp-muted">S-XXXXX</span>) is no longer valid on BOLs as of June 2025. Use the new format on all documentation and labels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EARNINGS ═══ */}
      <section id="earnings" className="border-t border-warp-border py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold text-white">Earnings</h2>
          <p className="mt-2 text-warp-secondary">
            You scanned {MOCK_EARNINGS.palletsIn + MOCK_EARNINGS.palletsOut} pallets
            this week &mdash;{" "}
            <span className="font-semibold text-warp-green">
              ${MOCK_EARNINGS.totalEarned.toLocaleString("en-US", { minimumFractionDigits: 2 })} coming
            </span>
          </p>

          {/* Breakdown */}
          <div className="mt-8 rounded-xl border border-warp-border bg-warp-elevated overflow-hidden">
            <div className="border-b border-warp-border px-6 py-4">
              <h3 className="text-sm font-semibold text-warp-text">
                Breakdown &mdash; {MOCK_EARNINGS.period}
              </h3>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-warp-border bg-warp-bg/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-warp-muted">Service</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-warp-muted">Qty</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-warp-muted">Rate</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-warp-muted">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warp-border">
                {[
                  { svc: "Pallet in (receiving scan)", qty: MOCK_EARNINGS.palletsIn, rate: MOCK_EARNINGS.ratePerPalletIn },
                  { svc: "Pallet out (departure scan)", qty: MOCK_EARNINGS.palletsOut, rate: MOCK_EARNINGS.ratePerPalletOut },
                  { svc: "Storage (per pallet / day)", qty: MOCK_EARNINGS.storageDays, rate: MOCK_EARNINGS.ratePerStorageDay },
                  { svc: "Early-open fee", qty: MOCK_EARNINGS.earlyOpenFees, rate: MOCK_EARNINGS.ratePerEarlyOpen },
                ].map((row) => (
                  <tr key={row.svc} className="hover:bg-warp-card/50">
                    <td className="px-6 py-3 text-warp-text">{row.svc}</td>
                    <td className="px-6 py-3 text-center text-warp-secondary">{row.qty}</td>
                    <td className="px-6 py-3 text-right text-warp-muted">${row.rate.toFixed(2)}</td>
                    <td className="px-6 py-3 text-right font-semibold text-warp-text">${(row.qty * row.rate).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-warp-border-light bg-warp-bg/50">
                  <td colSpan={3} className="px-6 py-4 text-right font-semibold text-warp-secondary">Total</td>
                  <td className="px-6 py-4 text-right text-lg font-bold text-warp-green">
                    ${MOCK_EARNINGS.totalEarned.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* History */}
          <div className="mt-8 rounded-xl border border-warp-border bg-warp-elevated overflow-hidden">
            <div className="border-b border-warp-border px-6 py-4">
              <h3 className="text-sm font-semibold text-warp-text">Payment history</h3>
            </div>
            <div className="divide-y divide-warp-border">
              {MOCK_EARNINGS_HISTORY.map((e, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-warp-card/50">
                  <div className="flex items-center gap-3">
                    {e.paymentStatus === "paid" ? (
                      <CheckCircle2 className="h-4 w-4 text-warp-green" />
                    ) : e.paymentStatus === "processing" ? (
                      <Clock className="h-4 w-4 text-warp-blue" />
                    ) : (
                      <CreditCard className="h-4 w-4 text-warp-amber" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-warp-text">{e.period}</p>
                      <p className="text-xs text-warp-muted">{e.palletsIn + e.palletsOut} pallets</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-warp-text">
                      ${e.totalEarned.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                    <DarkBadge variant={e.paymentStatus === "paid" ? "green" : e.paymentStatus === "processing" ? "blue" : "amber"}>
                      {e.paymentStatus}
                    </DarkBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-warp-muted">
            Earnings estimated from completed scans × your accepted rate card. Final amounts confirmed on invoice.
          </p>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-warp-border py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center rounded border border-warp-border-light px-1.5 py-0.5">
                <span className="text-[10px] font-bold tracking-[0.2em] text-warp-muted">WARP</span>
              </div>
              <span className="text-xs text-warp-muted">Dock Partner Portal</span>
            </div>
            <div className="flex flex-col gap-1 text-xs text-warp-muted sm:text-right">
              <span>Questions? <a href="mailto:crossdocks@wearewarp.com" className="text-warp-green hover:underline">crossdocks@wearewarp.com</a> · <a href="tel:+12134635594" className="text-warp-green hover:underline">213-463-5594</a></span>
              <span><a href="https://www.wearewarp.com" target="_blank" rel="noopener noreferrer" className="hover:text-warp-secondary">wearewarp.com</a></span>
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ RATE CARD MODAL ═══ */}
      {showRateModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-warp-border bg-warp-elevated shadow-2xl">
            <div className="border-b border-warp-border px-6 py-5">
              <h2 className="text-lg font-bold text-white">
                Warp standard rate card
              </h2>
              <p className="text-sm text-warp-muted">
                Effective {DEFAULT_RATE_CARD.effectiveDate}
              </p>
            </div>
            <div className="px-6 py-5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-warp-border">
                    <th className="py-2 text-left text-xs font-medium text-warp-muted">Service</th>
                    <th className="py-2 text-right text-xs font-medium text-warp-muted">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warp-border">
                  {[
                    { svc: "Pallet in (receiving scan)", rate: DEFAULT_RATE_CARD.palletIn },
                    { svc: "Pallet out (departure scan)", rate: DEFAULT_RATE_CARD.palletOut },
                    { svc: "Storage (per pallet / day)", rate: DEFAULT_RATE_CARD.storagePerDay },
                    { svc: "Early-open fee", rate: DEFAULT_RATE_CARD.earlyOpenFee },
                  ].map((r) => (
                    <tr key={r.svc}>
                      <td className="py-3 text-warp-text">{r.svc}</td>
                      <td className="py-3 text-right font-semibold text-warp-green">${r.rate.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-xs text-warp-muted">
                Rates are per-pallet for scan-in and scan-out. Storage billed per pallet per calendar day. Early-open fee applies for access outside normal hours.
              </p>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setShowRateModal(false)} className="rounded-full border border-warp-border px-4 py-2 text-sm text-warp-secondary hover:border-warp-border-light">
                  Cancel
                </button>
                <button
                  onClick={() => { setRateAccepted(true); setShowRateModal(false); }}
                  className="rounded-full bg-warp-green px-5 py-2 text-sm font-semibold text-warp-bg hover:bg-warp-green-dim"
                >
                  I accept these rates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Sub-components ─── */

function DarkInput({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-warp-secondary">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full rounded-lg border border-warp-border bg-warp-input px-3.5 py-2.5 text-sm text-warp-text placeholder:text-warp-muted transition-colors focus:border-warp-border-light focus:outline-none focus:ring-1 focus:ring-warp-green/30"
      />
    </div>
  );
}

function DarkSelect({ label, value, onChange, options, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-warp-secondary">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-lg border border-warp-border bg-warp-input px-3.5 py-2.5 text-sm text-warp-text transition-colors focus:border-warp-border-light focus:outline-none focus:ring-1 focus:ring-warp-green/30"
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function DarkBadge({ variant, children }: { variant: "green" | "amber" | "blue" | "neutral"; children: React.ReactNode }) {
  const colors = {
    green: "bg-warp-green-glow text-warp-green",
    amber: "bg-warp-amber-dim text-warp-amber",
    blue: "bg-warp-blue-dim text-warp-blue",
    neutral: "bg-warp-card text-warp-secondary",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[variant]}`}>
      {children}
    </span>
  );
}

function StatCard({ icon: Icon, iconColor, label, value, sub }: {
  icon: React.ElementType; iconColor: string; label: string; value: string; sub: string;
}) {
  return (
    <div className="rounded-xl border border-warp-border bg-warp-elevated p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-warp-muted">{label}</span>
        <Icon className={`h-4 w-4 ${iconColor}`} />
      </div>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-warp-muted">{sub}</p>
    </div>
  );
}

function ScanBar({ label, scanned, total }: { label: string; scanned: number; total: number }) {
  const pct = Math.round((scanned / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-warp-secondary">{label}</span>
        <DarkBadge variant={pct === 100 ? "green" : "amber"}>{pct}%</DarkBadge>
      </div>
      <div className="mt-2 flex justify-between text-xs text-warp-muted">
        <span>{scanned} scanned</span>
        <span>of {total}</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-warp-border">
        <div className="h-full rounded-full bg-warp-green transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ChecklistRow({ done, label, desc, icon: Icon, optional, children }: {
  done: boolean; label: string; desc: string; icon: React.ElementType; optional: boolean; children?: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-4 transition-colors ${done ? "border-green-500/30 bg-warp-green-glow/30" : "border-warp-border bg-warp-elevated"}`}>
      <div className="flex items-start gap-3">
        {done ? (
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-warp-green" />
        ) : (
          <Circle className="mt-0.5 h-5 w-5 shrink-0 text-warp-muted" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${done ? "text-warp-green line-through" : "text-warp-text"}`}>{label}</span>
            {optional && <span className="rounded-full bg-warp-card px-2 py-0.5 text-[10px] text-warp-muted">Optional</span>}
          </div>
          <p className="mt-0.5 text-xs text-warp-muted">{desc}</p>
          {!done && children && <div className="mt-3">{children}</div>}
        </div>
        <Icon className="h-4 w-4 shrink-0 text-warp-muted" />
      </div>
    </div>
  );
}

function GreenBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-warp-green/30 bg-warp-green-glow px-3.5 py-1.5 text-xs font-medium text-warp-green transition-colors hover:bg-warp-green hover:text-warp-bg"
    >
      {children}
    </button>
  );
}
