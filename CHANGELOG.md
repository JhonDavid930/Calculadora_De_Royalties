# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **PWA Ecosystem**: Fully functional Progressive Web App capabilities for offline installation.
- **Custom Apple-style UI**: Added `ReloadPrompt` with a frosted glassmorphism interface and dynamic high-res transparent icon (`RoyaltyPro.png`).
- **Telemetry**: Integrated `@vercel/speed-insights` for Core Web Vitals tracking.
- **Testing Suite**: End-to-End (E2E) testing framework implemented using Microsoft Playwright (9/9 coverage).

### Changed
- **PWA Manifest Setup**: Modified `vite.config.js` to strictly output application name as `RoyaltyPro`.
- **PWA Service Worker Update Architecture**: Changed `registerType` from `autoUpdate` to `prompt`. Removed generic virtual module `registerSW` hook from `main.jsx`.
- **UI Icons**: Replaced default Vite app icons with fully transparent versions generated via Node Canvas from original raw assets.

### Fixed
- **Playwright Test Runner**: Fixed locators throwing rigid string comparison errors on exact `Estados Unidos` translations. Tests refactored and fully stabilized (100% green).
- **Service Worker Stale State (Mobile)**: Bound `useRegisterSW` native React lifecycle hooks globally, tied to `window.focus()` listeners, effectively fixing the bug where old mobile installations bypassed the new iOS updates.
- **React App Crashes (Tests)**: Resolved missing `useEffect` import in the `ReloadPrompt.jsx` stack that caused timeout drops during browser evaluations.
