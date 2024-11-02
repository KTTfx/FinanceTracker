import React from 'react';
import { useState } from 'react';
import { BarChart3, Building2, Coins, DollarSign, LineChart, PiggyBank, Wallet } from 'lucide-react';
import Header from './components/Header';
import InvestmentOptions from './components/InvestmentOptions';
import InvestmentTracker from './components/InvestmentTracker';
import CompoundCalculator from './components/CompoundCalculator';
import Footer from './components/Footer';

type Tab = 'options' | 'tracker' | 'calculator';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('options');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {activeTab === 'options' && <InvestmentOptions />}
        {activeTab === 'tracker' && <InvestmentTracker />}
        {activeTab === 'calculator' && <CompoundCalculator />}
      </main>

      <Footer />
    </div>
  );
}

export default App;