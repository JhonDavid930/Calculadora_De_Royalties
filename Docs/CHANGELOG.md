# 📜 Registro de Cambios (CHANGELOG)

Versión actual: **v2.1.0** (Framer Motion & Wow Factor)

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
