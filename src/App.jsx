import React, { useState } from 'react';
import {
  Play,
  Globe,
  Target,
  Music,
} from 'lucide-react';
import SimpleCalculator from './components/SimpleCalculator';
import AdvancedCalculator from './components/AdvancedCalculator';
import GoalCalculator from './components/GoalCalculator';

export default function App() {
  const [activeTab, setActiveTab] = useState('advanced');

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

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary font-sans selection:bg-spotify-green selection:text-black">
      <header className="border-b border-dark-border bg-black sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-spotify-green p-1.5 rounded-full">
              <Music className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">RoyaltyPro <span className="text-text-secondary font-normal text-sm ml-2">Estimador de Ingresos</span></h1>
          </div>
          <nav className="flex gap-1 bg-dark-border p-1 rounded-full overflow-x-auto">
            {[
              { id: 'simple', label: 'Rápido', icon: Play },
              { id: 'advanced', label: 'Detallado', icon: Globe },
              { id: 'goal', label: 'Metas', icon: Target },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-spotify-green text-black shadow-lg shadow-green-900/20'
                    : 'text-text-secondary hover:text-white hover:bg-dark-hover'
                  }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}