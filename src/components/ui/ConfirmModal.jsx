import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-[#181818] border border-[#282828] w-full max-w-sm rounded-2xl shadow-2xl p-6 overflow-hidden animate-scaleIn">
                <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 ${confirmText ? 'bg-red-500/10' : 'bg-spotify-green/10'} rounded-full flex items-center justify-center mb-4`}>
                        <AlertCircle className={`w-6 h-6 ${confirmText ? 'text-red-500' : 'text-spotify-green'}`} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-text-secondary text-sm mb-8">
                        {message}
                    </p>

                    <div className="flex flex-col w-full gap-2">
                        {confirmText && (
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-all active:scale-95 shadow-lg shadow-red-900/20"
                            >
                                {confirmText}
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className={`w-full py-3 ${confirmText ? 'bg-transparent hover:bg-dark-hover text-text-secondary' : 'bg-spotify-green hover:bg-spotify-light text-black font-bold'} hover:text-white font-medium rounded-full transition-all`}
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>

                {/* Close Button Finger-friendly */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors p-2"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ConfirmModal;
