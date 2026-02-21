# 🚀 Roadmap & Improvements: Royalties Calculator

This tracking document outlines the planned improvements and feature requests for the Royalties Calculator.

## 📦 Deployment & Distribution
- [x] **PWA Configuration**
    - [x] Implement `manifest.json`.
    - [x] Configure Service Workers for offline support.
    - [x] Add icons for iOS/Android home screen installation.
    - [Goal: Enable "Add to Home Screen" functionality without App Store friction]

## 🎨 UX/UI Enhancements (The "Wow" Factor)
- [ ] **Advanced Animations (Framer Motion)**
    - Add smooth transitions between calculator views.
    - Animate number counters for result displays.
    - Micro-interactions on buttons and cards.
- [ ] **Theme Toggle (Light/Dark Mode)**
    - *Currently blocked by branding decision (Spotify is always Dark), but good for accessibility.*
- [ ] **Interactive Onboarding**
    - Add a "Tour" for first-time users explaining input fields.
- [ ] **Skeleton Loading States**
    - Replace any loading spinners with skeleton screens for a perceived speed increase.

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
- [ ] **Migration to TypeScript**
    - Enforce stricter typing for financial calculations.
    - Interface definitions for Royalty and Country objects.
- [x] **End-to-End Testing (E2E)**
    - [x] Implement Cypress or Playwright to simulate user flows (Select Country -> Input Streams -> Calculate).
- [ ] **Accessibility Audit (a11y)**
    - Ensure full keyboard navigation support.
    - Verify screen reader compatibility for result tables.
