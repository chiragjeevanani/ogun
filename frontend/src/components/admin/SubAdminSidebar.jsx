import React, { useState } from 'react';

const SubAdminSidebar = ({ activeDept, setActiveDept }) => {
  const departments = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', color: 'text-orange-400' },
    { id: 'sales', icon: '💳', label: 'Sales Dept', color: 'text-blue-400', access: 'Full' },
    { id: 'inventory', icon: '📦', label: 'Inventory', color: 'text-green-400', access: 'Limited' },
    { id: 'operations', icon: '⚙️', label: 'Operations', color: 'text-purple-400', access: 'Full' },
    { id: 'support', icon: '🎧', label: 'Support Team', color: 'text-red-400', access: 'View Only' },
    { id: 'tasks', icon: '✅', label: 'My Tasks', color: 'text-yellow-400', access: 'Full' },
  ];

  return (
    <div className="w-64 border-r border-orange-200 p-4 h-full bg-gradient-to-b from-indigo-50 to-white overflow-y-auto">
      <div className="sticky top-0 bg-gradient-to-b from-indigo-50 to-white pb-4 mb-6 flex items-center justify-center">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all">
          <span className="text-white font-bold text-lg tracking-widest">SA</span>
        </div>
      </div>
      <div className="space-y-2">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => setActiveDept(dept.id)}
            className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all text-xs md:text-sm font-medium group ${
              activeDept === dept.id
                ? 'bg-gradient-to-r from-orange-200 to-red-100 border-l-3 border-orange-500 shadow-lg shadow-orange-500/20'
                : 'hover:bg-gray-200 text-gray-700'
            }`}
          >
            <span className={`text-lg md:text-xl transition-transform group-hover:scale-110 flex-shrink-0 ${
              activeDept === dept.id ? 'scale-110' : ''
            }`}>
              {dept.icon}
            </span>
            <div className="flex-1 text-left hidden sm:block">
              <span className={`font-semibold truncate block transition-colors ${
                activeDept === dept.id ? 'text-orange-700' : 'text-gray-700 group-hover:text-gray-900'
              }`}>
                {dept.label}
              </span>
              {dept.access && (
                <span className={`text-xs transition-colors ${
                  activeDept === dept.id ? 'text-orange-600/70' : 'text-gray-600 group-hover:text-gray-700'
                }`}>
                  {dept.access}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubAdminSidebar;
