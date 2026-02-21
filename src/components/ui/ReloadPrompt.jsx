import React, { useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { X, RefreshCcw } from 'lucide-react';

export default function ReloadPrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            console.log('[PWA] SW Registered:', r);
            if (r) {
                // Check for updates every 10 minutes
                setInterval(() => {
                    r.update();
                }, 10 * 60 * 1000);
            }
        },
        onRegisterError(error) {
            console.error('[PWA] SW registration error:', error);
        },
    });

    // Also check for update when the user brings the app back to foreground
    useEffect(() => {
        const handleFocus = () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready.then(registration => {
                    registration.update();
                });
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') handleFocus();
        };

        window.addEventListener('focus', handleFocus);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('focus', handleFocus);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Debug: log when needRefresh state changes
    useEffect(() => {
        if (needRefresh) {
            console.log('[PWA] New version detected — showing update prompt');
        }
    }, [needRefresh]);

    const close = () => {
        setNeedRefresh(false);
    };

    if (!needRefresh) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-dark-elem border border-dark-border rounded-xl shadow-2xl p-4 max-w-sm w-full relative">
                <button
                    onClick={close}
                    className="absolute top-2 right-2 p-1 text-text-secondary hover:text-white rounded-full hover:bg-dark-hover transition-colors"
                    aria-label="Cerrar notificación"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex items-start gap-4 pr-6">
                    <div className="p-2 bg-spotify-green/10 rounded-full shrink-0 text-spotify-green">
                        <RefreshCcw className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-white mb-1">Nueva actualización disponible</h3>
                        <p className="text-sm text-text-secondary leading-relaxed mb-4">
                            Hay una nueva versión de RoyaltyPro lista para instalar.
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => updateServiceWorker(true)}
                                className="w-full bg-spotify-green hover:bg-[#1ed760] text-black text-sm font-semibold py-2 px-4 rounded-full transition-colors"
                            >
                                Actualizar ahora
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
