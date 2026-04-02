import React, { useState } from 'react';
import { adminUi, statusBadge } from './adminStyles';

const SubAdminsManagement = () => {
  const initialSubAdmins = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@kitchenappliance.com',
      role: 'Manager',
      permissions: ['Inventory', 'Orders', 'Reports'],
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@kitchenappliance.com',
      role: 'Support',
      permissions: ['Orders', 'Services'],
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@kitchenappliance.com',
      role: 'Finance',
      permissions: ['Reports', 'Inventory'],
    },
    {
      id: 4,
      name: 'Neha Singh',
      email: 'neha.singh@kitchenappliance.com',
      role: 'Manager',
      permissions: ['Inventory', 'Orders', 'Reports', 'Services'],
    },
  ];

  const [subAdmins, setSubAdmins] = useState(initialSubAdmins);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Manager',
    permissions: [],
  });

  const roles = ['Manager', 'Support', 'Finance'];
  const allPermissions = ['Inventory', 'Orders', 'Reports', 'Services'];

  const filteredSubAdmins = subAdmins.filter((admin) => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || admin.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (permission) => {
    setFormData((prev) => {
      const updatedPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter((item) => item !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions: updatedPermissions };
    });
  };

  const handleAddSubAdmin = () => {
    if (formData.name.trim() && formData.email.trim() && formData.permissions.length > 0) {
      setSubAdmins([...subAdmins, { id: Date.now(), ...formData }]);
      setFormData({ name: '', email: '', role: 'Manager', permissions: [] });
      setShowModal(false);
    } else {
      alert('Please fill all fields and select at least one permission');
    }
  };

  const handleDeleteSubAdmin = (id) => {
    if (window.confirm('Are you sure you want to delete this sub admin?')) {
      setSubAdmins(subAdmins.filter((admin) => admin.id !== id));
    }
  };

  const handleEditSubAdmin = (id) => {
    alert(`Edit functionality coming soon for sub admin ID: ${id}`);
  };

  const stats = [
    { title: 'Total Sub Admins', value: subAdmins.length },
    { title: 'Managers', value: subAdmins.filter((admin) => admin.role === 'Manager').length },
    { title: 'Support', value: subAdmins.filter((admin) => admin.role === 'Support').length },
    { title: 'Finance', value: subAdmins.filter((admin) => admin.role === 'Finance').length },
  ];

  return (
    <div className={adminUi.page}>
      <div className={adminUi.pageHeader}>
        <div>
          <h1 className={adminUi.pageTitle}>Sub Admins</h1>
          <p className={adminUi.pageDescription}>Manage sub-admin users and their permissions.</p>
        </div>
        <button onClick={() => setShowModal(true)} className={adminUi.primaryButton}>
          Add Sub Admin
        </button>
      </div>

      <div className={adminUi.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.title} className={adminUi.card}>
            <p className={adminUi.cardTitle}>{stat.title}</p>
            <p className={adminUi.cardValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={adminUi.input}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className={adminUi.select}
        >
          <option value="All">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className={adminUi.panel}>
        <div className={adminUi.panelHeader}>
          <h2 className={adminUi.panelTitle}>Sub Admins List ({filteredSubAdmins.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={adminUi.tableHeader}>
              <tr>
                <th className={adminUi.th}>Name</th>
                <th className={adminUi.th}>Email</th>
                <th className={adminUi.th}>Role</th>
                <th className={adminUi.th}>Permissions</th>
                <th className={adminUi.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubAdmins.length > 0 ? (
                filteredSubAdmins.map((admin) => (
                  <tr key={admin.id} className={adminUi.tableRow}>
                    <td className={`${adminUi.td} font-medium text-gray-900`}>{admin.name}</td>
                    <td className={adminUi.td}>{admin.email}</td>
                    <td className={adminUi.td}>
                      <span className={statusBadge(admin.role === 'Finance' ? 'Pending' : 'Active')}>{admin.role}</span>
                    </td>
                    <td className={adminUi.td}>
                      <div className="flex flex-wrap gap-2">
                        {admin.permissions.map((permission) => (
                          <span key={permission} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className={adminUi.td}>
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleEditSubAdmin(admin.id)} className={adminUi.textButton}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteSubAdmin(admin.id)} className="text-sm text-red-600 transition hover:underline">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-sm text-gray-400">
                    No sub admins found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className={adminUi.modalOverlay}>
          <div className={`${adminUi.modal} max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between border-b border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">Add Sub Admin</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setFormData({ name: '', email: '', role: 'Manager', permissions: [] });
                }}
                className="text-xl text-gray-500 transition hover:text-gray-700"
              >
                x
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={adminUi.select}
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Permissions</label>
                <div className="space-y-2">
                  {allPermissions.map((permission) => (
                    <label key={permission} className="flex items-center gap-3 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                        className="h-4 w-4 cursor-pointer accent-black"
                      />
                      {permission}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 border-t border-gray-200 p-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setFormData({ name: '', email: '', role: 'Manager', permissions: [] });
                }}
                className={`flex-1 ${adminUi.secondaryButton} py-2`}
              >
                Cancel
              </button>
              <button onClick={handleAddSubAdmin} className={`flex-1 ${adminUi.primaryButton}`}>
                Add Sub Admin
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={adminUi.card}>
        <h3 className="mb-4 text-sm font-semibold text-gray-900">Roles and Permissions Guide</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-800">Manager</p>
            <p className="mt-2 text-sm text-gray-500">Full access to inventory, orders, and reports.</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-800">Support</p>
            <p className="mt-2 text-sm text-gray-500">Manage customer orders and service requests.</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm font-medium text-gray-800">Finance</p>
            <p className="mt-2 text-sm text-gray-500">View reports and inventory financial data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminsManagement;
