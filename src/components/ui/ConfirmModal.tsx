import { motion, AnimatePresence } from 'motion/react';
import AlertCircle from 'lucide-react/dist/esm/icons/alert-circle';
import X from 'lucide-react/dist/esm/icons/x';
import type { ConfirmModalProps } from '../../types';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar" }: ConfirmModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        className="relative bg-[#181818] border border-[#282828] w-full max-w-sm rounded-2xl shadow-2xl p-6 overflow-hidden"
                    >
                        <div className="flex flex-col items-center text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.1 }}
                                className={`w-12 h-12 ${confirmText ? 'bg-red-500/10' : 'bg-spotify-green/10'} rounded-full flex items-center justify-center mb-4`}
                            >
                                <AlertCircle className={`w-6 h-6 ${confirmText ? 'text-red-500' : 'text-spotify-green'}`} />
                            </motion.div>

                            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                            <p className="text-text-secondary text-sm mb-8">
                                {message}
                            </p>

                            <div className="flex flex-col w-full gap-2">
                                {confirmText && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            onConfirm();
                                            onClose();
                                        }}
                                        className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full transition-colors shadow-lg shadow-red-900/20"
                                    >
                                        {confirmText}
                                    </motion.button>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onClose}
                                    className={`w-full py-3 ${confirmText ? 'bg-transparent hover:bg-dark-hover text-text-secondary' : 'bg-spotify-green hover:bg-spotify-light text-black font-bold'} hover:text-white font-medium rounded-full transition-colors`}
                                >
                                    {cancelText}
                                </motion.button>
                            </div>
                        </div>

                        {/* Close Button Finger-friendly */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-text-muted hover:text-white transition-colors p-2"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;
