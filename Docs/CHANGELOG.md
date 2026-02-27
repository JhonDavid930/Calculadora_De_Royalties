# 📜 Registro de Cambios (CHANGELOG)

Versión actual: **v2.3.0** (Globalización & UI Agrupada)

## [v2.3.0] - Expansión Global de Países
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
