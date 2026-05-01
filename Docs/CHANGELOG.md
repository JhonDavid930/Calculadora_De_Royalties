# Registro de Cambios (CHANGELOG)

Version actual: **v2.4.1** (QA Hardening & Lazy Charts)

## [v2.4.1] - 2026-05-01 - QA Hardening, E2E Repair & Lazy Charts
### Corregido
- **Playwright E2E:** Los flujos del selector masivo quedaron realineados con la UI actual del modal (`Buscar país por nombre...`, botón `Agregar` y selección por `role="option"`), eliminando los timeouts cross-browser.
- **Expectativa de USA:** El test E2E de cálculo avanzado ahora valida la tarifa vigente de `United States` (`0.0042`), corrigiendo el total esperado a `$4,200.00`.
- **Responsive Hardening:** El `CountrySelectorModal` fue rehecho para viewports estrechos y landscape corto. El footer vuelve a ser visible en `320px`, las acciones del modal ya no se fugan horizontalmente y la barra de acciones se compacta por breakpoint.
- **Fixed Positioning Real:** `CountrySelectorModal` y `ConfirmModal` ahora se renderizan con `createPortal(document.body)` para evitar clipping causado por los `transform` del contenedor animado principal.

### Cambiado
- **Lazy Loading de Gráficas:** `Distribución de Ingresos` fue extraído a un `Component` lazy (`RevenueDistributionChart`) para sacar `recharts` del bundle principal y mejorar el arranque inicial de la vista detallada.
- **Build Tooling:** Upgrade del stack de desarrollo a una combinación estable y compatible (`Vite 7.3.2`, `@vitejs/plugin-react 5.1.4`, `Vitest 4.1.5`, `Playwright 1.59.1`, `PostCSS 8.5.12`).
- **Chunking más Limpio:** Eliminado el chunk manual `vendor` vacío de Vite; se mantiene separación explícita para `charts` e `icons`.
- **Header Mobile:** La navegación superior se compactó en móvil pequeño con `aria-labels` en tabs icon-only, menos padding y mejor ajuste horizontal.

### Seguridad
- **Supply Chain:** `npm audit` quedó en `0 vulnerabilities` tras actualizar dependencias y aplicar fixes transitivos seguros.

### Validado
- **Responsive QA Matrix:** Validados breakpoints críticos `320x568`, `360x740`, `375x667`, `390x844`, `412x915`, `640x360`, `667x375`, `844x390`, `768x1024`, `1024x768` y `1440x1024`.
- **Release Gate:** Verificados `npm audit`, `build`, `79/79` tests de Vitest y `9/9` tests E2E en Chromium, Firefox y WebKit.

## [v2.4.0] - 2025-03-21 - Glassmorphism UI & CountrySelectorModal Fix
### Corregido
- **CountrySelectorModal: Header invisible (Critical Bug):** El wrapper `motion.div` de Framer Motion computaba su altura como 448px en vez de 100vh, causando que `items-center` empujara el modal fuera del viewport. Solucionado reemplazando el overlay con un `div` nativo con `height: 100dvh`.
- **Layout del Modal:** Migrado de Flexbox a CSS Grid con template `[auto_auto_auto_1fr_auto]` para anclar permanentemente Header, Search, Chips, Lista y Footer.
- **Scrollbar horizontal cortada:** Restaurada la barra de scroll nativa en los chips de continentes para navegar entre regiones.
- **Tests Card.test.tsx:** Actualizados assertions de clase CSS (`glass-panel` en lugar de `bg-dark-surface`).

### Cambiado
- **Tema Visual Premium:** Aplicado design system con glassmorphism refinado, bordes `border-white/10`, fondos solidos `#0a0a0a`/`#121212` y efectos de glow verde en codigos de pais seleccionados.
- **Country Codes en verde:** Los codigos ISO de paises ahora se muestran en `text-spotify-green` con efecto `drop-shadow` al seleccionarlos.
- **Hover Effects en AdvancedCalculator:** Eliminado el hover gris "sucio" en filas de la tabla. Select boxes ahora son transparentes con hover sutil.
- **Modal Height:** Ajustado a `min(80vh, calc(100dvh - 2rem))` para adaptarse a cualquier viewport sin desbordamientos.
- **Search Bar & Filters:** Siempre visibles con contraste alto (`bg-[#181818]`, `border-white/20`) independientemente del estado de seleccion.

## [v2.3.0] - Expansion Global de Paises
### Añadido
- **Base de Datos Extendida:** Más de 100 países agregados a la calculadora con tasas estimadas actualizadas según datos de Spotify 2024.
- **Tipado Regional:** Nuevo tipo de dato `Region` que clasifica cada país por continente (North America, Latin America, Europe, Asia, etc.).
- **CountrySelectorModal Rediseñado:** La UI del buscador de países ahora categoriza y agrupa los resultados visualmente por continente, incluyendo "Chips" de filtrado rápido.

## [v2.2.0] - Onboarding & Tour Guiado
### Añadido
- **Tour Interactivo (driver.js):** Integración de un sistema de onboarding paso-a-paso para usuarios nuevos.
- **Hook `useOnboarding`:** Lógica de estado mediante `localStorage` para garantizar que el tour automático se ejecuta una sola vez.
- **Botón de Ayuda Manual:** Nuevo botón en el Header de navegación `(?)` para relanzar el tour de forma intencional en cualquier momento.
- **CSS Overrides Premium:** Tema "Hacker-Artista" aplicado al overlay de `driver.js` (dark mode, botones flat, focus SVG no intrusivo).
- **Mock de E2E:** Inyección de `localStorage` en el Setup de Playwright para evitar bloqueos del DOM durante los tests End-to-End.

## [v2.1.0] - UX Premium & Animaciones
### Añadido
- **Framer Motion Integration:** Migración completa de CSS estático a animaciones físicas 60fps con `motion`.
- **Animated Counters:** Números interpolados suavemente con `useSpring` para ingresos estimador, streams totales y rpm efectivo.
- **Tab Layout Transitions:** El indicador verde ("pill") ahora usa `layoutId` para deslizarse suavemente entre categorías.
- **Transiciones Cinematográficas:** Fade y Blur al cambiar de herramientas (`AnimatePresence`).
- **AnimatePresence List:** Filas de países en "Calculadora Detallada" entran y salen animadas al agregarlas o eliminarlas.
- **Modales con Física:** Backdrop con fade y pop-up panels usando spring physics para modals de confirmación o selección.

### Cambiado
- Componentes Base (`Card`, `StatBox`) convertidos a `motion.div` para aplicar animaciones sincronizadas tipo "Stagger" (Entrada en cascada).
- `setupTests.ts` actualizado con un mock síncrono para renderización de tests JSDOM de la librería motion/react.

## [v1.1.0] - QA Squad & Estabilidad
### Añadido
- **Testing Suite:** Integración completa de Vitest y React Testing Library.
- **Unit Tests:** Cobertura del 100% para lógica de `useRoyaltyCalculations`.
- **Component Tests:** Verificación de renderizado y modales en `AdvancedCalculator`.
- **Build Optimization:** Configuración de `manualChunks` en Vite para separar vendor, charts e icons, reduciendo el tamaño del bundle principal.

## [v1.0.5] - UX Precision Update
### Añadido
- **Unified List:** Se eliminó la separación de "Otros Países". Ahora es una sola lista con scroll infinito.
- **Select All Button:** Nuevo botón en el modal para selección masiva inteligente.
- **Mobile First:** Mejoras en la visualización de tablas en móviles.

### Cambiado
- **Abreviaturas:** "Dominican Republic" ahora es "Dom. Rep." para cuidar la estética.
- **Estilos:** Ajustes en `CountrySelectorModal` para mejor usabilidad táctil.

## [v1.0.0] - Lanzamiento Inicial
- Calculadora de Royalties funcional.
- Gráficos de pastel (Recharts).
- Base de datos inicial de países y tiers.
