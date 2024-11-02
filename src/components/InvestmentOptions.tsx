import React from 'react';
import { Building2, Coins, LineChart, PiggyBank, Wallet } from 'lucide-react';

const investmentOptions = [
  {
    title: 'Stocks',
    description: 'Invest in publicly traded companies',
    icon: LineChart,
    link: 'https://www.bing.com/ck/a?!&&p=2508b4bbc12b4a56362df5d1210821755f4093b795a55c0a7a7311fc7af34404JmltdHM9MTczMDUwNTYwMA&ptn=3&ver=2&hsh=4&fclid=39af0d2a-648c-6d8b-24c0-190665eb6cb7&psq=ic+wealth&u=a1aHR0cHM6Ly93ZWFsdGguaWMuYWZyaWNhL2xvZ2lu&ntb=1',
    color: 'from-blue-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Bonds',
    description: 'Fixed-income securities with steady returns',
    icon: Coins,
    link: 'https://app.cedimanager.com/',
    color: 'from-green-500 to-green-600',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Real Estate',
    description: 'Property investments and REITs',
    icon: Building2,
    link: 'https://app.trading212.com/',
    color: 'from-purple-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Mutual Funds',
    description: 'Professionally managed investment pools',
    icon: PiggyBank,
    link: 'https://www.investor.gov/introduction-investing/investing-basics/investment-products/mutual-funds-and-exchange-traded-funds-etfs',
    color: 'from-orange-500 to-orange-600',
    image: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?q=80&w=1468&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    title: 'Cryptocurrency',
    description: 'Digital currency investments',
    icon: Wallet,
    link: 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/digital-asset',
    color: 'from-yellow-500 to-yellow-600',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function InvestmentOptions() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Explore My Investments
        </h2>
        <p className="text-gray-600">
          Browse popular investment options. Click on each to visit broker.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investmentOptions.map((option) => {
          const Icon = option.icon;
          return (
            <a
              key={option.title}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl shadow-lg transition-all hover:shadow-xl"
            >
              <div className="absolute inset-0">
                <img
                  src={option.image}
                  alt={option.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>
              
              <div className="relative p-6">
                <div className={`inline-flex rounded-lg p-3 bg-gradient-to-r ${option.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-white">
                  {option.title}
                </h3>
                <p className="mt-2 text-sm text-gray-200">
                  {option.description}
                </p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-white">
                  Login
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}