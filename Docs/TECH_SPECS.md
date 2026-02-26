# 🏗️ Especificaciones Técnicas (TECH_SPECS)

## 1. Stack Tecnológico
Este proyecto utiliza una arquitectura moderna y reactiva, optimizada para rendimiento y mantenibilidad.

### Core
- **Framework:** React 18 (Crea interfaces de usuario dinámicas).
- **Build Tool:** Vite (Empaquetador ultrarrápido). Configurado con **Chunk Splitting** para optimizar la carga (Vendor, Charts, Icons separados).
- **Lenguaje:** **TypeScript (Strict Mode)**. Incluye **Branded Types** (`USD`, `PayRate`, `Streams`) para garantizar integridad matemática y prevenir errores en tiempo de compilación.
- **Validación:** **Zod** para parseo seguro e inferencia de tipos de entradas de configuración.

### Estilos, UI & Animaciones
- **Tailwind CSS:** Framework de utilidades para diseño rápido, responsivo y "Dark Mode" nativo.
- **Framer Motion (v12+):** Motor de animaciones espaciales a 60fps. Implementa *Spring Physics*, transiciones de layout (`layoutId`), listados dinámicos (`AnimatePresence`) e interpolación numérica (`useSpring` + `useMotionValue`).
- **Lucide React:** Iconografía vectorial ligera y moderna.
- **Recharts:** Librería de gráficos para visualización de datos (Pie Charts).

### Gestión de Estado
- **React Hooks:** `useState`, `useEffect`, `useMemo` para lógica local y `Custom Hooks` (`useRoyaltyCalculations`) para lógica de negocio reutilizable.
- **Persistencia:** `localStorage` para guardar datos del usuario entre sesiones.

### Calidad & Testing (QA Squad)
- **Vitest & React Testing Library:** Suite de pruebas unitarias y de integración (77+ tests con cobertura total del hook de cálculos y renderización de modales). Se incluye mock síncrono de Framer Motion.
- **Playwright:** Suite de pruebas End-to-End (E2E) cross-browser comprobando el flujo crítico del calculador.
- **ESLint v9:** Configuración tipo 'Flat' estricta con reglas de tipado y linting especializado para React Hooks.

---

## 2. Arquitectura de Carpetas
```
.
├── Docs/             # Documentación viva (CHANGELOG, TODO, TECH_SPECS)
├── e2e/              # Tests End-to-End (Playwright)
├── src/
│   ├── __mocks__/    # Mocks para tests (ej. virtual-pwa.ts)
│   ├── components/   # Organismos (Calculadoras) y features
│   │   └── ui/       # Átomos y Moléculas (Botones, Modales, StatBoxes)
│   ├── constants/    # DB de países y constantes del sistema
│   ├── hooks/        # Lógica de negocio (useRoyaltyCalculations)
│   ├── types/        # TypeScript Definitions y Branded Types (Zod)
│   ├── utils/        # Funciones auxiliares de formateo numérico
│   ├── App.tsx       # Root Component y enrutador virtual animado
│   └── setupTests.ts # Configuración de jsdom y Mocks Globales
```

## 3. Flujo de Datos
1.  **Entrada Tipada:** El usuario ingresa Streams o Rates. Las entradas pasan a través del Custom Hook.
2.  **Validación y Proceso:** `useRoyaltyCalculations` asegura la integridad mediante validaciones estrictas y calcula los totales exactos usando `currency.js` (evitando derivas de coma flotante).
3.  **Transición Reactiva:** Framer Motion intercepta los cambios de estado (vía `useMotionValue`) e interpola *visualmente* el crecimiento de los números o la entrada de los componentes al DOM sin forzar re-renders masivos de React.
4.  **Persistencia:** La selección es respaldada en `localStorage` tras cada hidratación.

## 4. Protocolos de Seguridad y Calidad
- **Zero Trust:** No se confía en inputs del usuario (validaciones básicas en UI).
- **Testing:** Se DEBE ejecutar `npm test` antes de cada deploy.
- **Mobile First:** Todo componente se diseña primero para pantallas pequeñas.
