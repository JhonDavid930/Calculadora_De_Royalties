# 🚀 Roadmap & Improvements: Royalties Calculator

This tracking document outlines the planned improvements and feature requests for the Royalties Calculator.

## ✅ Current Status Snapshot (v2.4.1)
- [x] **Responsive Hardening Complete**
    - [x] Multi-breakpoint QA across mobile portrait, mobile landscape, tablet, and desktop.
    - [x] `CountrySelectorModal` hardened for narrow widths and short-height viewports.
    - [x] Modal overlays moved to `createPortal(document.body)` to prevent clipping caused by animated layout containers.
- [x] **Performance Hardening**
    - [x] Revenue chart extracted into a lazy-loaded chunk.
    - [x] Initial bundle cleaned up and graph loading deferred behind `Suspense`.
- [x] **Quality Gate Stable**
    - [x] `npm run typecheck`
    - [x] `npm run lint`
    - [x] `npm run build`
    - [x] `npm run test -- --run`
    - [x] `npm run test:e2e`
- [x] **Security & Supply Chain**
    - [x] `npm audit` clean at release closeout.

## 📦 Deployment & Distribution
- [x] **PWA Configuration**
    - [x] Implement `manifest.json`.
    - [x] Configure Service Workers for offline support.
    - [x] Add icons for iOS/Android home screen installation.
    - [Goal: Enable "Add to Home Screen" functionality without App Store friction]

## 🎨 UX/UI Enhancements (The "Wow" Factor)
- [x] **Advanced Animations (Framer Motion)**
    - [x] Add smooth transitions between calculator views.
    - [x] Animate number counters for result displays.
    - [x] Micro-interactions on buttons and cards.
- [ ] **Theme Toggle (Light/Dark Mode)**
    - *Currently blocked by branding decision (Spotify is always Dark), but good for accessibility.*
- [x] **Interactive Onboarding**
    - [x] Add a "Tour" for first-time users explaining input fields (driver.js).
- [~] **Skeleton Loading States**
    - [x] Revenue chart now uses a skeleton-like fallback while the lazy chunk loads.
    - [ ] Review the rest of the UI for any additional loading surfaces worth standardizing.

## ⚡ Functional Improvements
- [ ] **Export Functionality**
    - Generate PDF reports of the calculation.
    - Export data to CSV/Excel for further analysis.
- [ ] **Scenario Management**
    - "Save Calculation" feature (e.g., "Scenario A: Pessimistic", "Scenario B: Viral Hit").
    - Load saved profiles.
- [ ] **Real-time Currency Conversion**
    - Integrate an API to get real-time exchange rates (USD/EUR/GBP/COP, etc.) instead of static rates.

## 🛠 Technical Debt & Code Quality
- [x] **Migration to TypeScript**
    - [x] Enforce stricter typing for financial calculations.
    - [x] Interface definitions for Royalty and Country objects.
- [x] **End-to-End Testing (E2E)**
    - [x] Implement Cypress or Playwright to simulate user flows (Select Country -> Input Streams -> Calculate).
- [~] **Accessibility Audit (a11y)**
    - [x] Header tabs now expose `aria-labels` on compact/icon-only states.
    - [x] Core modal actions remain reachable and visible across responsive breakpoints.
    - [ ] Ensure full keyboard navigation support across every major flow.
    - [ ] Verify screen reader compatibility for result tables and grouped country selections.

## 🎯 Next Practical Priorities
- [ ] **Export Functionality**
    - Highest-value product feature still missing after the stability pass.
- [ ] **Scenario Management**
    - Strong fit for artists/managers comparing audience mixes or release plans.
- [ ] **Accessibility Audit Final Pass**
    - Best next quality milestone after responsive hardening.
- [ ] **Currency Conversion**
    - Useful, but lower priority than export/scenario workflows unless business requirements change.
