import React, { useState, useEffect } from 'react';
import Download from 'lucide-react/dist/esm/icons/download';
import Share from 'lucide-react/dist/esm/icons/share';
import PlusSquare from 'lucide-react/dist/esm/icons/plus-square';

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
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-0">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
                        onClick={() => setShowIOSPrompt(false)}
                    />

                    {/* Modal Content */}
                    <div className="bg-dark-elem/90 backdrop-blur-xl border border-white/10 w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">

                        {/* Decorative top gradient */}
                        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-spotify-green/20 to-transparent pointer-events-none" />

                        <div className="p-8 text-center relative z-10">
                            {/* App Icon (Transparent) */}
                            <div className="mx-auto w-24 h-24 overflow-hidden mb-6 flex items-center justify-center drop-shadow-[0_0_15px_rgba(29,185,84,0.4)]">
                                <img src="/pwa-192x192.png" alt="RoyaltyPro Icon" className="w-full h-full object-contain" />
                            </div>

                            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">Instalar RoyaltyPro</h3>
                            <p className="text-sm text-text-secondary mb-8">
                                Disfruta de la app en pantalla completa y acceso sin conexión en tu iPhone.
                            </p>

                            <div className="space-y-3 text-left mb-8">
                                <div className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-2xl">
                                    <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center shrink-0">
                                        <Share className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm text-text-primary">
                                        Toca <strong>Compartir</strong> en la barra inferior de Safari.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-2xl">
                                    <div className="w-10 h-10 bg-spotify-green/20 text-spotify-green rounded-full flex items-center justify-center shrink-0">
                                        <PlusSquare className="w-5 h-5" />
                                    </div>
                                    <p className="text-sm text-text-primary">
                                        Selecciona <strong>Añadir a la pantalla de inicio</strong>.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowIOSPrompt(false)}
                                className="w-full bg-white hover:bg-gray-200 text-black font-bold py-3.5 rounded-2xl transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
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
