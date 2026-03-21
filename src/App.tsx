import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Play from 'lucide-react/dist/esm/icons/play';
import Globe from 'lucide-react/dist/esm/icons/globe';
import Target from 'lucide-react/dist/esm/icons/target';
import Music from 'lucide-react/dist/esm/icons/music';
import SimpleCalculator from './components/SimpleCalculator';
import AdvancedCalculator from './components/AdvancedCalculator';
import GoalCalculator from './components/GoalCalculator';
import ReloadPrompt from './components/ui/ReloadPrompt';
import InstallPrompt from './components/ui/InstallPrompt';
import { useOnboarding } from './hooks/useOnboarding';
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle';
import type { LucideIcon } from 'lucide-react';

interface TabConfig {
    id: string;
    label: string;
    icon: LucideIcon;
}

// Variantes de animación para las transiciones entre tabs
const pageVariants = {
    initial: { opacity: 0, x: 20, filter: 'blur(4px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: -20, filter: 'blur(4px)' },
};

const pageTransition = {
    type: 'tween' as const,
    ease: 'easeOut' as const,
    duration: 0.3,
};

export default function App() {
    const [activeTab, setActiveTab] = useState('advanced');
    const { startTour } = useOnboarding();

    const renderContent = () => {
        switch (activeTab) {
            case 'simple':
                return <SimpleCalculator />;
            case 'goal':
                return <GoalCalculator />;
            case 'advanced':
            default:
                return <AdvancedCalculator />;
        }
    };

    const tabs: TabConfig[] = [
        { id: 'simple', label: 'Rápido', icon: Play },
        { id: 'advanced', label: 'Detallado', icon: Globe },
        { id: 'goal', label: 'Metas', icon: Target },
    ];

    return (
        <div className="min-h-screen bg-dark-bg text-text-primary font-sans selection:bg-spotify-green selection:text-black relative overflow-hidden">
            {/* Iluminación de acento volumétrica (Pro Max) */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[500px] bg-spotify-green/10 rounded-[100%] blur-[120px] pointer-events-none" />
            
            <header className="glass-header sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-spotify-green p-1.5 rounded-full mt-1.5 sm:mt-0">
                            <Music className="w-5 h-5 text-black" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight hidden sm:block">RoyaltyPro <span className="text-text-secondary font-normal text-sm ml-2">Estimador de Ingresos</span></h1>
                        <h1 className="text-lg font-bold tracking-tight sm:hidden">RoyaltyPro</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <InstallPrompt />
                        <button
                            onClick={startTour}
                            className="p-1.5 rounded-full text-text-secondary hover:text-white hover:bg-dark-hover transition-colors"
                            aria-label="Repetir Tour"
                        >
                            <HelpCircle className="w-5 h-5" />
                        </button>
                        <nav id="tour-tabs" className="flex gap-1 bg-dark-border p-1 rounded-full overflow-x-auto relative">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap z-10 active:scale-[0.97] hover:-translate-y-0.5 ${activeTab === tab.id
                                        ? 'text-black'
                                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTabPill"
                                            className="absolute inset-0 bg-spotify-green rounded-full shadow-lg shadow-green-900/20"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <tab.icon className="w-4 h-4" />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </main>

            <ReloadPrompt />
        </div>
    );
}
