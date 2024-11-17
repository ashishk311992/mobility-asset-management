import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Download, Filter } from 'lucide-react';

const Finance = () => {
  const expenses = [
    {
      id: 1,
      category: 'Fuel',
      amount: 2345.67,
      change: '+12%',
      trend: 'up'
    },
    {
      id: 2,
      category: 'Maintenance',
      amount: 4567.89,
      change: '-5%',
      trend: 'down'
    },
    {
      id: 3,
      category: 'Insurance',
      amount: 1234.56,
      change: '0%',
      trend: 'neutral'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Financial Overview</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Total Expenses</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold mt-4">$45,678.90</p>
          <p className="text-sm text-gray-600 mt-1">Year to Date</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Cost per Mile</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-4">$0.48</p>
          <p className="text-sm text-green-600 mt-1">-12% vs Last Month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Budget Status</h3>
            <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center">
              <span className="text-sm font-semibold">85%</span>
            </div>
          </div>
          <p className="text-3xl font-bold mt-4">$52,000</p>
          <p className="text-sm text-gray-600 mt-1">of $60,000 Budget</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Expenses by Category</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{expense.category}</p>
                    <p className="text-sm text-gray-600">${expense.amount.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${
                      expense.trend === 'up' ? 'text-red-600' : 
                      expense.trend === 'down' ? 'text-green-600' : 
                      'text-gray-600'
                    }`}>
                      {expense.change}
                    </span>
                    {expense.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-red-600" />
                    ) : expense.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">Vehicle Maintenance</p>
                  <p className="text-sm text-gray-600">March {i + 10}, 2024</p>
                </div>
                <span className="text-sm font-medium">-$249.99</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;