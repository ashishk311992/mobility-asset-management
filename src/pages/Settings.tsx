import React from 'react';
import { Save, Bell, Lock, User, Globe, Palette } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {[
              { icon: User, label: 'Profile' },
              { icon: Bell, label: 'Notifications' },
              { icon: Lock, label: 'Security' },
              { icon: Globe, label: 'Language' },
              { icon: Palette, label: 'Appearance' },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg transition-colors text-left hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Profile Settings</h2>
              <p className="text-sm text-gray-600 mt-1">Update your profile information</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-medium text-gray-600">JD</span>
                </div>
                <div className="ml-6">
                  <button className="btn btn-secondary">Change Photo</button>
                  <p className="text-sm text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue="john.doe@carvach.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
              <p className="text-sm text-gray-600 mt-1">Manage your notification settings</p>
            </div>
            <div className="p-6 space-y-6">
              {[
                'Maintenance Alerts',
                'Document Expiry Reminders',
                'Budget Updates',
                'Team Changes'
              ].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{item}</p>
                    <p className="text-sm text-gray-500">Receive notifications about {item.toLowerCase()}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;