import React from 'react';
import { BarChart3, Calculator, LineChart } from 'lucide-react';

type Tab = 'options' | 'tracker' | 'calculator';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <h1 className="text-3xl font-bold text-blue-900 mb-6">
           Investment Advisor & Tracker
        </h1>
        
        <nav className="flex space-x-2">
          {[
            { id: 'options', label: 'Investment Options', icon: LineChart },
            { id: 'tracker', label: 'Investment Tracker', icon: BarChart3 },
            { id: 'calculator', label: 'Compound Calculator', icon: Calculator },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as Tab)}
              className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                activeTab === id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}