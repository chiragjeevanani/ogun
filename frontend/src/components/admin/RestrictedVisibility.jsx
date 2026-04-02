import React, { useState } from 'react';

const RestrictedVisibility = () => {
  const [permissions] = useState([
    { module: 'Order Processing', visibility: 'Full Access', status: 'Allowed', icon: '📋' },
    { module: 'Customer Data', visibility: 'Partial Access', status: 'Allowed', icon: '👤' },
    { module: 'Financial Reports', visibility: 'Restricted', status: 'Denied', icon: '📊' },
    { module: 'User Management', visibility: 'Restricted', status: 'Denied', icon: '👥' },
    { module: 'Inventory Stock', visibility: 'Limited', status: 'Allowed', icon: '📦' },
    { module: 'Analytics Dashboard', visibility: 'Partial Access', status: 'Allowed', icon: '📈' },
  ]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-black">🔐 Access Control</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {permissions.map((perm, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-orange-200 p-3 sm:p-4 hover:border-orange-500/50 transition-all">
            <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div className="text-lg hidden sm:block">{perm.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 font-semibold text-xs sm:text-sm truncate">{perm.module}</h4>
                  <p className="text-gray-600 text-xs mt-0.5 sm:mt-1 truncate">Level: {perm.visibility}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${
                perm.status === 'Allowed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {perm.status}
              </span>
            </div>
            <div className="pt-2 sm:pt-3 border-t border-orange-200">
              <p className="text-xs text-gray-600">
                {perm.status === 'Allowed'
                  ? '✓ You have access'
                  : '✕ No access'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-orange-200 p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">📋 Summary</h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center justify-between p-2 sm:p-3 bg-orange-100 rounded-lg text-xs sm:text-sm">
            <span className="text-gray-700 truncate">Role:</span>
            <span className="text-orange-600 font-semibold truncate text-right ml-2">Sub-Admin</span>
          </div>
          <div className="flex items-center justify-between p-2 sm:p-3 bg-orange-100 rounded-lg text-xs sm:text-sm">
            <span className="text-gray-700 truncate">Department</span>
            <span className="text-orange-600 font-semibold truncate text-right ml-2">Sales & Ops</span>
          </div>
          <div className="flex items-center justify-between p-2 sm:p-3 bg-orange-100 rounded-lg text-xs sm:text-sm">
            <span className="text-gray-700 truncate">Modules</span>
            <span className="text-orange-600 font-semibold truncate text-right ml-2">4/6</span>
          </div>
          <div className="flex items-center justify-between p-2 sm:p-3 bg-orange-100 rounded-lg text-xs sm:text-sm">
            <span className="text-gray-700 truncate">Updated</span>
            <span className="text-orange-600 font-semibold truncate text-right ml-2">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestrictedVisibility;
