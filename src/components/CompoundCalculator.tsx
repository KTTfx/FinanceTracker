import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

interface CalculationResult {
  year: number;
  balance: number;
  interest: number;
  contribution: number;
}

export default function CompoundCalculator() {
  const [principal, setPrincipal] = useState<string>('10000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('500');
  const [interestRate, setInterestRate] = useState<string>('7');
  const [years, setYears] = useState<string>('30');
  const [results, setResults] = useState<CalculationResult[]>([]);

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, monthlyContribution, interestRate, years]);

  const calculateCompoundInterest = () => {
    const p = Number(principal);
    const r = Number(interestRate) / 100;
    const t = Number(years);
    const monthlyRate = r / 12;
    const monthlyContrib = Number(monthlyContribution);

    let newResults: CalculationResult[] = [];
    let currentBalance = p;
    let totalContributions = p;

    for (let year = 1; year <= t; year++) {
      let yearlyContribution = monthlyContrib * 12;
      totalContributions += yearlyContribution;

      // Calculate new balance with monthly compounding
      currentBalance = Array(12).fill(0).reduce((balance) => {
        return (balance + monthlyContrib) * (1 + monthlyRate);
      }, currentBalance);

      newResults.push({
        year,
        balance: currentBalance,
        interest: currentBalance - totalContributions,
        contribution: totalContributions
      });
    }

    setResults(newResults);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Compound Interest Calculator
        </h2>
        <p className="text-gray-600">
          Calculate the potential growth of your investments over time with compound interest.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Investment Parameters
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Initial Investment (GH₵)
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Contribution (GH₵)
              </label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                max="100"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Investment Period (Years)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                max="50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Results Summary
          </h3>
          
          {results.length > 0 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-700">Final Balance</p>
                  <p className="text-2xl font-bold text-blue-900">
                    GH₵{Math.round(results[results.length - 1].balance).toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-700">Total Interest Earned</p>
                  <p className="text-2xl font-bold text-green-900">
                    GH₵{Math.round(results[results.length - 1].interest).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Year-by-Year Breakdown
                </h4>
                <div className="max-h-[300px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Year
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Balance
                        </th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Interest
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.map((result) => (
                        <tr key={result.year}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            {result.year}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                            GH₵{Math.round(result.balance).toLocaleString()}
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-green-600">
                            GH₵{Math.round(result.interest).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}