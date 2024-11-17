import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Car, 
  BarChart3, 
  Wrench, 
  DollarSign, 
  FileText, 
  Settings,
  Users,
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: Car, label: 'Fleet', path: '/fleet' },
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
    { icon: DollarSign, label: 'Finance', path: '/finance' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">CarVach</h1>
        <p className="text-gray-400 text-sm">Asset Management</p>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center space-x-3 text-gray-400 hover:text-white w-full px-4 py-3 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;