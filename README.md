# RoyaltyPro: Calculadora de Royalties Musicales

**RoyaltyPro** es un estimador de ingresos diseñado específicamente para el ecosistema del **Music Business**. Permite a artistas, sellos discográficos, managers y cantantes proyectar sus ganancias por streaming de manera rápida, precisa y profesional.

![Vista de la Aplicación](public/screenshot.png)
![Calculadora de Metas Musicales - RoyaltyPro](public/calculadora-royalties-musicales-spotify-streams.png)


## 🎵 ¿Para qué sirve este proyecto?

En la industria musical actual, entender cuánto dinero genera tu música en plataformas como Spotify, Apple Music o Tidal puede ser confuso debido a las variaciones de pago por país (Tiers). 

**RoyaltyPro** soluciona esto permitiéndote:
- **Calcular ganancias por país**: Diferencia ingresos entre mercados de alto valor (EE.UU., UK) y mercados de volumen (LatAm).
- **Establecer Metas Financieras**: ¿Quieres ganar $1,000 USD al mes? Nuestra herramienta te dice exactamente cuántos streams necesitas según tu audiencia.
- **Análisis de RPM**: Visualiza tu "Ingreso por cada mil reproducciones" efectivo.

## 🧪 Testing

Para garantizar fiabilidad absoluta en cálculos monetarios y en la experiencia de usuario, contamos con un sólido stack de pruebas:

- **Tests Lógicos:** Vitest + React Testing Library.
- **Tests UI (E2E):** Microsoft Playwright.

```bash
# Correr tests lógicos (Vitest)
npm run test

# Correr tests E2E de UI (Playwright)
npm run test:e2e
```

## 🚀 Ficha Técnica

Este proyecto utiliza tecnologías de vanguardia para garantizar precisión financiera y una experiencia de usuario fluida.

- **Frontend**: [React.js](https://reactjs.org/) + **TypeScript** (strict mode) con Custom Hooks para gestión de estado complejo.
- **Tipado**: TypeScript estricto — 17 componentes/hooks tipados, 0 errores en compilador (`tsc --noEmit`).
- **Testing**: 57 unit tests (Vitest + React Testing Library) + E2E (Playwright). 100% green.
- **Precisión Financiera**: [currency.js](https://currency.js.org/) para evitar errores aritméticos de coma flotante en cálculos monetarios.
- **Validación de Datos**: [Zod](https://zod.dev/) para asegurar la integridad de los datos de entrada.
- **Persistencia**: `localStorage` para autoguardado de progreso entre sesiones y cambios de vista.
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (Diseño "Dark Mode" premium inspirado en Spotify).
- **Gráficos**: [Recharts](https://recharts.org/) (Distribución de ingresos interactiva).
- **Herramienta de Construcción**: [Vite](https://vitejs.dev/).

## 🌟 Features
- **Spotify Streaming Calculator**: Convierte reproducciones asimétricas en ingresos de master y publishing.
- **Top 50 Countries Database**: Soporte para los mercados principales basados en datos recientes.
- **Visualización de Datos**: Gráficos interactivos de distribución de ingresos usando Recharts.
- **Modo Oscuro Permanente**: UX premium al estilo de plataformas musicales.
- **PWA (Progressive Web App)**: Instalable como app nativa en iOS, Android y Escritorio con soporte offline.
- **Responsive Design**: Interfaces adaptadas a móvil, tablet y escritorio (grid responsivo auditado).
- **Accesibilidad (A11y)**: Navegación completa por teclado con focus rings visibles.
- **Micro-Interacciones**: Feedback táctil en hover para una experiencia premium.
- **Data Persistence**: La calculadora recuerda los países seleccionados tras cerrar el navegador.

## 📦 Instalación y Uso Local

Si eres desarrollador y quieres correr este proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JhonDavid930/Calculadora_De_Royalties.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre `http://localhost:5173` en tu navegador.

---
Desarrollado para potenciar la transparencia en los ingresos de la industria musical. 🎧✨
