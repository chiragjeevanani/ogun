import React, { useState } from 'react';

const SystemControl = () => {
  const [systemStatus, setSystemStatus] = useState({
    database: 'Running',
    api: 'Running',
    cache: 'Running',
    storage: 'Running',
  });

  const [settings, setSettings] = useState({
    maintenanceMode: false,
    backupEnabled: true,
    autoScaling: true,
    debugMode: false,
  });

  const systemServices = [
    { name: 'Database Server', status: 'Running', uptime: '45 days', cpu: 35, memory: 62 },
    { name: 'API Server', status: 'Running', uptime: '8 days', cpu: 25, memory: 48 },
    { name: 'Cache Server', status: 'Running', uptime: '30 days', cpu: 15, memory: 34 },
    { name: 'Email Service', status: 'Running', uptime: '60 days', cpu: 8, memory: 12 },
  ];

  const handleToggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-black">Complete System Control</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">System Settings</h3>
          <div className="space-y-4">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <label className="text-gray-900 font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                <button
                  onClick={() => handleToggleSetting(key)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                    value
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {value ? 'ON' : 'OFF'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">System Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Uptime</span>
              <span className="text-gray-900 font-bold">99.8%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Total Requests</span>
              <span className="text-gray-900 font-bold">2.5M</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Active Users</span>
              <span className="text-gray-900 font-bold">1,245</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">System Load</span>
              <span className="text-gray-900 font-bold">42%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">System Services Status</h3>
        <div className="space-y-4">
          {systemServices.map((service, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-gray-900 font-semibold">{service.name}</p>
                    <p className="text-xs text-gray-600">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-xs font-semibold">
                  {service.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">CPU Usage</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-500 h-full rounded-full"
                      style={{ width: `${service.cpu}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{service.cpu}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Memory Usage</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-400 h-full rounded-full"
                      style={{ width: `${service.memory}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{service.memory}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition">
          🔄 Restart Services
        </button>
        <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-100">
          💾 Backup Now
        </button>
        <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-md text-sm hover:bg-gray-100">
          📊 System Logs
        </button>
      </div>
    </div>
  );
};

export default SystemControl;
