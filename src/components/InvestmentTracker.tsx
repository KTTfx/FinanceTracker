import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Investment {
  id: string;
  category: string;
  platform: string;
  amount: number;
}

const categories = [
  'Stocks',
  'Bonds',
  'Real Estate',
  'Cryptocurrency',
  'Mutual Funds/ETFs',
];

const STORAGE_KEY = 'investment-tracker-data';

export default function InvestmentTracker() {
  const [investments, setInvestments] = useState<Investment[]>(() => {
    const savedInvestments = localStorage.getItem(STORAGE_KEY);
    return savedInvestments ? JSON.parse(savedInvestments) : [];
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: categories[0],
    platform: '',
    amount: '',
  });

  // Save to localStorage whenever investments change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(investments));
  }, [investments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setInvestments(
        investments.map((inv) =>
          inv.id === editingId
            ? {
                ...inv,
                category: formData.category,
                platform: formData.platform,
                amount: Number(formData.amount),
              }
            : inv
        )
      );
      setEditingId(null);
    } else {
      setInvestments([
        ...investments,
        {
          id: crypto.randomUUID(),
          category: formData.category,
          platform: formData.platform,
          amount: Number(formData.amount),
        },
      ]);
    }
    setFormData({ category: categories[0], platform: '', amount: '' });
  };

  const startEdit = (investment: Investment) => {
    setEditingId(investment.id);
    setFormData({
      category: investment.category,
      platform: investment.platform,
      amount: investment.amount.toString(),
    });
  };

  const deleteInvestment = (id: string) => {
    setInvestments(investments.filter((inv) => inv.id !== id));
  };

  const totalInvestment = investments.reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Track Your Investments
        </h2>
        <p className="text-gray-600">
          Record and view your investments in each category below. This tracker doesn't hold funds but helps you manage your records.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Platform
            </label>
            <input
              type="text"
              value={formData.platform}
              onChange={(e) =>
                setFormData({ ...formData, platform: e.target.value })
              }
              placeholder="e.g., Ghana Stock Exchange, Ecobank"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (GH₵)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="0.00"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          {editingId ? 'Update Investment' : 'Add Investment'}
        </button>
      </form>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {investments.map((investment) => (
                <tr key={investment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {investment.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {investment.platform}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    GH₵{investment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => startEdit(investment)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteInvestment(investment.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4">
          <div className="text-sm">
            <span className="font-medium text-gray-900">Total Investment:</span>
            <span className="ml-2 text-green-600 font-semibold">
              GH₵{totalInvestment.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}