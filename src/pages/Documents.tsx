import React from 'react';
import { FileText, Upload, Search, Filter } from 'lucide-react';

const Documents = () => {
  const documents = [
    {
      id: 1,
      name: 'Vehicle Registration - Toyota Camry',
      type: 'PDF',
      size: '2.4 MB',
      updated: '2024-03-15',
      category: 'Registration'
    },
    {
      id: 2,
      name: 'Insurance Policy',
      type: 'PDF',
      size: '1.8 MB',
      updated: '2024-03-10',
      category: 'Insurance'
    },
    {
      id: 3,
      name: 'Maintenance Records Q1 2024',
      type: 'XLSX',
      size: '856 KB',
      updated: '2024-03-01',
      category: 'Maintenance'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between text-blue-600 font-medium">
                <span>All Documents</span>
                <span>24</span>
              </li>
              <li className="flex items-center justify-between text-gray-600 hover:text-blue-600">
                <span>Registration</span>
                <span>8</span>
              </li>
              <li className="flex items-center justify-between text-gray-600 hover:text-blue-600">
                <span>Insurance</span>
                <span>6</span>
              </li>
              <li className="flex items-center justify-between text-gray-600 hover:text-blue-600">
                <span>Maintenance</span>
                <span>10</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Updated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{doc.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{doc.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(doc.updated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 hover:text-blue-800">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;