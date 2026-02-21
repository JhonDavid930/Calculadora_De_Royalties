import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare } from 'lucide-react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [showIOSPrompt, setShowIOSPrompt] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
            setIsStandalone(true);
            return;
        }

        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIOSDevice);

        // Listen for Android install prompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) {
            setShowIOSPrompt(true);
            return;
        }

        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setDeferredPrompt(null);
            }
        }
    };

    // If already installed, don't show the button
    if (isStandalone) return null;

    // Only show button if we have a prompt ready (Android) or it's iOS
    if (!deferredPrompt && !isIOS) return null;

    return (
        <>
            <button
                onClick={handleInstallClick}
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold bg-white text-black hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
                <Download className="w-4 h-4" />
                <span>Instalar App</span>
            </button>

            {/* Mobile simplified button icon only for super small screens */}
            <button
                onClick={handleInstallClick}
                className="flex sm:hidden items-center justify-center w-8 h-8 rounded-full bg-white text-black hover:bg-gray-200"
            >
                <Download className="w-4 h-4" />
            </button>

            {/* iOS manual instructions modal */}
            {showIOSPrompt && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="bg-dark-elem border border-dark-border w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-slideUp">
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Instalar en iPhone</h3>
                            <p className="text-sm text-text-secondary mb-6">
                                Apple no permite instalación automática. Para instalar la app, sigue estos pasos:
                            </p>

                            <div className="space-y-4 text-left">
                                <div className="flex items-center gap-4 bg-dark-bg p-4 rounded-xl">
                                    <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                                        <Share className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm text-white">
                                        Pulsa el botón <strong>Compartir</strong> en la barra inferior de Safari.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 bg-dark-bg p-4 rounded-xl">
                                    <div className="w-10 h-10 bg-spotify-green/10 text-spotify-green rounded-full flex items-center justify-center shrink-0">
                                        <PlusSquare className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm text-white">
                                        Desliza hacia abajo y pulsa <strong>Añadir a la pantalla de inicio</strong>.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowIOSPrompt(false)}
                                className="mt-8 w-full bg-dark-hover hover:bg-dark-border text-white font-bold py-3 rounded-xl transition-colors"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
