# 🚀 Guía de Despliegue (Fácil)

¡Hola! Si quieres usar este proyecto o subirlo a internet, sigue estos pasos. Es como una receta de cocina.

## 1. Instalación en tu computadora

**Lo que necesitas antes de empezar:**
- Tener [Node.js](https://nodejs.org/) instalado.
- Un editor de código (como VS Code).

**Pasos:**
1.  Descarga este proyecto o abre la terminal en la carpeta.
2.  Escribe este comando mágico para instalar todo lo necesario:
    ```bash
    npm install
    ```
3.  Para ver la app funcionando en tu navegador, escribe:
    ```bash
    npm run dev
    ```
4.  Si quieres ejecutar las pruebas automáticas para ver que todo esté bien:
    ```bash
    npm test
    ```
5.  Antes de hacer Deploy real, corre esta batería mínima:
    ```bash
    npm audit
    npm run build
    npm run test -- --run
    npm run test:e2e
    ```

---

## 2. ¿Cómo subirlo a Internet? (Vercel)

La forma más fácil y gratis es usar [Vercel](https://vercel.com).

1.  Crea una cuenta en Vercel.
2.  Instala la herramienta de Vercel en tu terminal:
    ```bash
    npm i -g vercel
    ```
3.  Escribe el comando `vercel` dentro de la carpeta del proyecto.
4.  Dale `Enter` a todo lo que te pregunte. ¡Listo! Te dará un link `https://...` donde tu app vive ahora.

---

## 3. Glosario para Principiantes
- **npm install:** "Compra los ingredientes" (baja librerías de internet).
- **npm run dev:** "Prende el horno" (inicia el servidor local).
- **Git Commit:** "Guardar partida" (hace un punto de control en la historia).
- **Push:** "Subir a la nube" (envía tu código a GitHub).

¡Disfruta construyendo! 🛠️
