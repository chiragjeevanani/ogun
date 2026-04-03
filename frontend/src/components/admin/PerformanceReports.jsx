import React from 'react';

const PerformanceReports = () => {
  const performanceMetrics = [
    { label: 'System Uptime', value: '99.8%', target: '99.9%', icon: '⏱️', status: 'Excellent' },
    { label: 'Avg Response Time', value: '245ms', target: '<250ms', icon: '⚡', status: 'Good' },
    { label: 'Page Load Speed', value: '1.2s', target: '<1.5s', icon: '🚀', status: 'Excellent' },
    { label: 'API Performance', value: '98.5%', target: '99%', icon: '🔌', status: 'Good' },
  ];

  const teamPerformance = [
    { department: 'Customer Service', score: 92, target: 90 },
    { department: 'Delivery Team', score: 87, target: 85 },
    { department: 'Operations', score: 94, target: 90 },
    { department: 'Technical Support', score: 89, target: 85 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-black">Performance Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">{item.icon}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                item.status === 'Excellent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.status}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{item.label}</p>
            <p className="text-2xl font-bold text-cyan-600 mb-2">{item.value}</p>
            <p className="text-xs text-gray-600">Target: {item.target}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Team Performance</h3>
        <div className="space-y-6">
          {teamPerformance.map((team, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-gray-900 font-semibold">{team.department}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-cyan-600 font-bold">{team.score}</span>
                  <span className="text-gray-600">vs Target {team.target}</span>
                </div>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-3">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${
                    team.score >= team.target
                      ? 'from-green-500 to-green-700'
                      : 'from-yellow-500 to-yellow-700'
                  }`}
                  style={{ width: `${Math.min(team.score, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Monthly Growth</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Revenue</span>
              <span className="text-green-600 font-bold">+15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Orders</span>
              <span className="text-green-600 font-bold">+12%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Users</span>
              <span className="text-green-600 font-bold">+8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Key Metrics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Error Rate</span>
              <span className="text-green-600 font-bold">0.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Success Rate</span>
              <span className="text-green-600 font-bold">99.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Availability</span>
              <span className="text-green-400 font-bold">99.99%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;
