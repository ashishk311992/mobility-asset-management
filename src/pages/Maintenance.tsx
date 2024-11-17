import React from 'react';
import { Plus, Filter, Calendar, Wrench } from 'lucide-react';
import type { MaintenanceRecord } from '../types';
import { format } from 'date-fns';

const Maintenance = () => {
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: '1',
      vehicleId: 'V001',
      date: '2024-03-10',
      type: 'routine',
      description: 'Oil Change and Filter Replacement',
      cost: 89.99,
      provider: 'QuickService Auto'
    },
    {
      id: '2',
      vehicleId: 'V002',
      date: '2024-03-08',
      type: 'repair',
      description: 'Brake Pad Replacement',
      cost: 299.99,
      provider: 'Master Mechanics'
    }
  ];

  const getMaintenanceTypeStyle = (type: MaintenanceRecord['type']) => {
    const styles = {
      routine: 'bg-blue-100 text-blue-800',
      repair: 'bg-yellow-100 text-yellow-800',
      emergency: 'bg-red-100 text-red-800'
    };
    return styles[type];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance Management</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            <span>New Service</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Upcoming Services</h3>
            <Wrench className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-medium">Vehicle #{i}</p>
                  <p className="text-sm text-gray-600">Regular Maintenance</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">In {i} days</p>
                  <p className="text-sm text-gray-600">March {20 + i}, 2024</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Maintenance History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {maintenanceRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {format(new Date(record.date), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {record.vehicleId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getMaintenanceTypeStyle(record.type)}`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {record.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      ${record.cost.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {record.provider}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;