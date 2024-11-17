import React from 'react';
import { BarChart3, Car, Wrench, TrendingUp, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      icon: Car,
      label: 'Total Vehicles',
      value: '47',
      change: '+2.5%',
      positive: true 
    },
    { 
      icon: Wrench,
      label: 'Maintenance Due',
      value: '8',
      change: '-12%',
      positive: true 
    },
    { 
      icon: AlertTriangle,
      label: 'Alerts',
      value: '3',
      change: '+1',
      positive: false 
    },
    { 
      icon: TrendingUp,
      label: 'Utilization Rate',
      value: '84%',
      change: '+5%',
      positive: true 
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex space-x-3">
          <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm font-medium ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Maintenance</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">Toyota Camry • TYC-{i}234</p>
                  <p className="text-sm text-gray-600">Oil Change + Brake Check</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">$249.99</p>
                  <p className="text-sm text-gray-600">2 days ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Upcoming Services</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">Honda CR-V • HCR-{i}567</p>
                  <p className="text-sm text-gray-600">Annual Inspection</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">In {i * 2} days</p>
                  <p className="text-sm text-gray-600">March {i + 15}, 2024</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;