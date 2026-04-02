import React, { useState } from 'react';

const SubAdminManagement = () => {
  const [subAdmins, setSubAdmins] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Manager', status: 'Active', permissions: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Moderator', status: 'Active', permissions: 3 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', permissions: [] });

  const handleAddSubAdmin = () => {
    if (formData.name && formData.email && formData.role) {
      const newSubAdmin = {
        id: subAdmins.length + 1,
        ...formData,
        status: 'Active',
      };
      setSubAdmins([...subAdmins, newSubAdmin]);
      setFormData({ name: '', email: '', role: '', permissions: [] });
      setShowForm(false);
    }
  };

  const handleDeleteSubAdmin = (id) => {
    setSubAdmins(subAdmins.filter(admin => admin.id !== id));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-4">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">Sub-Admin Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
        >
          {showForm ? 'Cancel' : '+ Add'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500"
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 bg-white cursor-pointer"
            >
              <option value="">Role</option>
              <option value="Manager">Manager</option>
              <option value="Moderator">Moderator</option>
              <option value="Analyst">Analyst</option>
            </select>
            <button
              onClick={handleAddSubAdmin}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Name</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide hidden sm:table-cell">Email</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Role</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody>
            {subAdmins.map((admin, index) => (
              <tr key={admin.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-3 sm:px-4 py-3 text-gray-900 font-medium">{admin.name}</td>
                <td className="px-3 sm:px-4 py-3 text-gray-600 hidden sm:table-cell">{admin.email}</td>
                <td className="px-3 sm:px-4 py-3">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">{admin.role}</span>
                </td>
                <td className="px-3 sm:px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-600 rounded text-xs font-medium">Active</span>
                </td>
                <td className="px-3 sm:px-4 py-3">
                  <button
                    onClick={() => handleDeleteSubAdmin(admin.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubAdminManagement;
