import React from 'react';
import { Plus, Mail, Phone } from 'lucide-react';
import type { User } from '../types';

const Team = () => {
  const team: User[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'fleet_manager',
      email: 'john.doe@carvach.com'
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'finance_manager',
      email: 'jane.smith@carvach.com'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'admin',
      email: 'mike.johnson@carvach.com'
    }
  ];

  const getRoleLabel = (role: User['role']) => {
    const labels = {
      admin: 'Administrator',
      fleet_manager: 'Fleet Manager',
      finance_manager: 'Finance Manager'
    };
    return labels[role];
  };

  const getRoleBadgeColor = (role: User['role']) => {
    const colors = {
      admin: 'bg-purple-100 text-purple-800',
      fleet_manager: 'bg-blue-100 text-blue-800',
      finance_manager: 'bg-green-100 text-green-800'
    };
    return colors[role];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-600">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mt-4">{member.name}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(member.role)} mt-2`}>
                  {getRoleLabel(member.role)}
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                •••
              </button>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {member.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex space-x-3">
                <button className="flex-1 text-sm text-blue-600 hover:text-blue-800">
                  Edit
                </button>
                <button className="flex-1 text-sm text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;