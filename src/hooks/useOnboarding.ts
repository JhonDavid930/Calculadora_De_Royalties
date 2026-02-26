import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export function useOnboarding() {
    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            animate: true,
            allowClose: true,
            overlayOpacity: 0.7,
            doneBtnText: 'Terminar Tour',
            nextBtnText: 'Siguiente &rarr;',
            prevBtnText: '&larr; Anterior',
            onHighlightStarted: (element) => {
                if (!element) return;
                // Previene que se rompan las animaciones de layout
                (element as HTMLElement).style.position = 'relative';
            },
            steps: [
                {
                    popover: {
                        title: '👋 Bienvenido a RoyaltyPro',
                        description: 'Vamos a dar un paseo rápido para que aprendas a estimar tus ingresos musicales como un profesional.',
                        align: 'center',
                        showButtons: ['next', 'close']
                    }
                },
                {
                    element: '#tour-tabs',
                    popover: {
                        title: 'Tus Herramientas',
                        description: 'Navega entre la Calculadora Rápida, tus Metas Financieras o el desglose Detallado por países.',
                        side: 'bottom',
                        align: 'start'
                    }
                },
                {
                    element: '#tour-streams-input',
                    popover: {
                        title: 'Ingreso Predictivo',
                        description: 'Escribe aquí la cantidad de reproducciones. Tip: ¡Es dinámico y reacciona al instante!',
                        side: 'bottom',
                        align: 'center'
                    }
                },
                {
                    element: '#tour-country-selector',
                    popover: {
                        title: 'Ajuste de Mercado',
                        description: 'Ajusta el "Rate" global o, en modo detallado, selecciona exactamente los países donde más te escuchan.',
                        side: 'top',
                        align: 'center'
                    }
                },
                {
                    element: '#tour-stat-cards',
                    popover: {
                        title: 'Estimación en Tiempo Real',
                        description: 'Aquí verás el cálculo final interactivo con animaciones físicas a 60fps. ¡Explora y planifica tu estrategia!',
                        side: 'top',
                        align: 'center'
                    }
                }
            ],
            onDestroyed: () => {
                localStorage.setItem('hasSeenTour', 'true');
            }
        });

        requestAnimationFrame(() => {
            driverObj.drive();
        });
    };

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('hasSeenTour');
        if (!hasSeenTour) {
            // Un pequeño delay para que monte la interfaz antes del tour
            const timer = setTimeout(() => {
                startTour();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    return { startTour };
}
