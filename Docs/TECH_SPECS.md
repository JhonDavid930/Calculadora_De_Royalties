# 🏗️ Especificaciones Técnicas (TECH_SPECS)

## 1. Stack Tecnológico
Este proyecto utiliza una arquitectura moderna y reactiva, optimizada para rendimiento y mantenibilidad.

### Core
- **Framework:** React 18 (Crea interfaces de usuario dinámicas).
- **Build Tool:** Vite (Empaquetador ultrarrápido).
- **Lenguaje:** JavaScript (ES6+).

### Estilos & UI
- **Tailwind CSS:** Framework de utilidades para diseño rápido y responsivo.
- **Lucide React:** Iconografía vectorial ligera y moderna.
- **Recharts:** Librería de gráficos para visualización de datos (Pie Charts).
- **CSS Modules:** Usados puntualmente para animaciones específicas (`index.css`).

### Gestión de Estado
- **React Hooks:** `useState`, `useEffect`, `useMemo` para lógica local y `Custom Hooks` (`useRoyaltyCalculations`) para lógica de negocio reutilizable.
- **Persistencia:** `localStorage` para guardar datos del usuario entre sesiones.

### Calidad & Testing (QA Squad)
- **Vitest:** Runner de pruebas unitarias (compatible con Vite).
- **React Testing Library:** Pruebas de integración de componentes y DOM.
- **jsdom:** Entorno de navegador simulado para tests.

---

## 2. Arquitectura de Carpetas
```
src/
├── components/       # Bloques de construcción de la UI
│   ├── ui/           # Átomos reutilizables (Botones, Modales, Tarjetas)
│   └── AdvancedCalculator.jsx  # Organismo principal de la app
├── constants/        # Datos estáticos (Base de datos de países, colores)
├── hooks/            # Lógica de negocio pura (Separada de la vista)
├── utils/            # Funciones auxiliares (Formato de moneda, fechas)
└── App.jsx           # Punto de entrada y Routing
```

## 3. Flujo de Datos
1.  **Entrada:** El usuario ingresa Streams y selecciona un País.
2.  **Procesamiento:** `useRoyaltyCalculations` detecta el cambio, busca el `Rate` del país en `constants/countries.js` y calcula `Streams * Rate`.
3.  **Salida:** Se actualiza el estado global, recalculando totales y gráficos en tiempo real.
4.  **Persistencia:** Cada cambio se guarda automáticamente en `localStorage`.

## 4. Protocolos de Seguridad y Calidad
- **Zero Trust:** No se confía en inputs del usuario (validaciones básicas en UI).
- **Testing:** Se DEBE ejecutar `npm test` antes de cada deploy.
- **Mobile First:** Todo componente se diseña primero para pantallas pequeñas.
