# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [2.0.0] - 2025-02-22

### Added
- **TypeScript Migration**: Migrated 17 components/hooks from `.js`/`.jsx` to `.ts`/`.tsx` with strict typing (`tsconfig.json` strict mode).
- **Type Definitions**: Created `src/types/index.ts` with `Country`, `CountryData`, and component prop interfaces.
- **Unit Test Suite**: 57 tests across 9 suites (Vitest + React Testing Library) covering constants, hooks, UI components, and all 3 calculators.
- **Security Audit**: Zero Trust verification — 0 npm vulnerabilities, no secrets in code, no `eval()` or `dangerouslySetInnerHTML`.
- **Accessibility (A11y)**: Focus rings (`focus:ring-spotify-green`) on all inputs for full keyboard navigation.
- **Micro-Interactions**: Hover tactile feedback (`hover:-translate-y-0.5`, `transition-all duration-200`) on Cards, StatBoxes, buttons, and table rows.
- **Entry Animation**: `animate-fade-in-up` keyframes for smoother component mounting.
- **PWA Ecosystem**: Fully functional Progressive Web App capabilities for offline installation.
- **Custom Apple-style UI**: Added `ReloadPrompt` with a frosted glassmorphism interface and dynamic high-res transparent icon (`RoyaltyPro.png`).
- **Telemetry**: Integrated `@vercel/speed-insights` for Core Web Vitals tracking.
- **Testing Suite**: End-to-End (E2E) testing framework implemented using Microsoft Playwright (9/9 coverage).

### Changed
- **Grid Layout (AdvancedCalculator)**: Redistributed table columns (Rate 3→2, Total 2→3) to prevent currency truncation on tablet screens.
- **Performance (Barrel Imports)**: Replaced `lucide-react` barrel imports with direct ESM paths in 8 components.
- **Performance (useMemo)**: Removed unnecessary `useMemo` for primitive values in hooks and calculators.
- **PWA Manifest Setup**: Modified `vite.config.js` to strictly output application name as `RoyaltyPro`.
- **PWA Service Worker Update Architecture**: Changed `registerType` from `autoUpdate` to `prompt`. Removed generic virtual module `registerSW` hook from `main.jsx`.
- **UI Icons**: Replaced default Vite app icons with fully transparent versions generated via Node Canvas from original raw assets.

### Fixed
- **Leading Zero Bug (SimpleCalculator)**: Stream input no longer shows leading zeros (e.g., `06767` → `6767`). State changed from `number` to `string` with `String(Number(raw))` sanitization.
- **Caret Behind Icon (SimpleCalculator)**: Added `pr-14` padding to prevent the text cursor from appearing behind the Users icon.
- **Playwright Test Runner**: Fixed locators throwing rigid string comparison errors on exact `Estados Unidos` translations. Tests refactored and fully stabilized (100% green).
- **Service Worker Stale State (Mobile)**: Bound `useRegisterSW` native React lifecycle hooks globally, tied to `window.focus()` listeners, effectively fixing the bug where old mobile installations bypassed the new iOS updates.
- **React App Crashes (Tests)**: Resolved missing `useEffect` import in the `ReloadPrompt.jsx` stack that caused timeout drops during browser evaluations.
