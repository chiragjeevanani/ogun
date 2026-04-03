import React, { useState } from 'react';

const PermissionsControl = () => {
  const [permissions, setPermissions] = useState([
    { id: 1, name: 'View Dashboard', category: 'Dashboard', roles: ['Admin', 'Manager'], status: 'Enabled' },
    { id: 2, name: 'Create Orders', category: 'Orders', roles: ['Admin', 'Manager', 'Staff'], status: 'Enabled' },
    { id: 3, name: 'View Reports', category: 'Reports', roles: ['Admin', 'Manager', 'Analyst'], status: 'Enabled' },
    { id: 4, name: 'Edit Business Rules', category: 'Configuration', roles: ['Admin'], status: 'Enabled' },
    { id: 5, name: 'Manage Users', category: 'Users', roles: ['Admin'], status: 'Enabled' },
    { id: 6, name: 'Delete Orders', category: 'Orders', roles: ['Admin'], status: 'Disabled' },
  ]);

  const categories = ['Dashboard', 'Orders', 'Reports', 'Configuration', 'Users'];
  const roles = ['Admin', 'Manager', 'Staff', 'Analyst'];

  const togglePermissionStatus = (id) => {
    setPermissions(permissions.map(perm =>
      perm.id === id
        ? { ...perm, status: perm.status === 'Enabled' ? 'Disabled' : 'Enabled' }
        : perm
    ));
  };

  const toggleRolePermission = (id, role) => {
    setPermissions(permissions.map(perm => {
      if (perm.id === id) {
        const newRoles = perm.roles.includes(role)
          ? perm.roles.filter(r => r !== role)
          : [...perm.roles, role];
        return { ...perm, roles: newRoles };
      }
      return perm;
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-black">Permissions Control</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Permission Categories</h3>
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <span className="text-gray-900 font-semibold">{cat}</span>
                <span className="text-sm text-gray-600">{permissions.filter(p => p.category === cat).length} permissions</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Roles</h3>
          <div className="space-y-2">
            {roles.map((role, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <span className="text-gray-900 font-semibold">{role}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  ['Admin', 'Manager'].includes(role)
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Permission Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Permission</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Category</th>
                {roles.map(role => (
                  <th key={role} className="px-6 py-4 text-center text-sm font-bold text-gray-900">{role}</th>
                ))}
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm) => (
                <tr key={perm.id} className="border-b border-gray-200 hover:bg-gray-100 transition-all">
                  <td className="px-6 py-4 text-gray-900 font-semibold">{perm.name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {perm.category}
                    </span>
                  </td>
                  {roles.map(role => (
                    <td key={role} className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleRolePermission(perm.id, role)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          perm.roles.includes(role)
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {perm.roles.includes(role) ? '✓' : '✕'}
                      </button>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => togglePermissionStatus(perm.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        perm.status === 'Enabled'
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                      }`}
                    >
                      {perm.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PermissionsControl;
