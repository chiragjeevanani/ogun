import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { adminUi, statusBadge } from '../../components/admin/adminStyles';

const Distributor = () => {
  const [distributors, setDistributors] = useState([
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@kitchen.com', phone: '98765-43210', location: 'Mumbai', status: 'Active', totalOrders: 45 },
    { id: 2, name: 'Priya Singh', email: 'priya@kitchen.com', phone: '98765-43211', location: 'Delhi', status: 'Active', totalOrders: 38 },
    { id: 3, name: 'Amit Patel', email: 'amit@kitchen.com', phone: '98765-43212', location: 'Bangalore', status: 'Inactive', totalOrders: 25 },
    { id: 4, name: 'Sharma Ji', email: 'sharma@kitchen.com', phone: '98765-43213', location: 'Kolkata', status: 'Active', totalOrders: 52 },
    { id: 5, name: 'Anjali Desai', email: 'anjali@kitchen.com', phone: '98765-43214', location: 'Pune', status: 'Active', totalOrders: 31 },
    { id: 6, name: 'Vikram Singh', email: 'vikram@kitchen.com', phone: '98765-43215', location: 'Chennai', status: 'Inactive', totalOrders: 18 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'Active',
  });

  const stats = [
    { title: 'Total Distributors', value: distributors.length },
    { title: 'Active Distributors', value: distributors.filter((item) => item.status === 'Active').length },
    { title: 'Pending Requests', value: 3 },
    { title: 'Total Orders', value: distributors.reduce((sum, item) => sum + item.totalOrders, 0) },
  ];

  const filteredDistributors = distributors.filter((distributor) =>
    distributor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDistributors.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDistributors = filteredDistributors.slice(startIndex, startIndex + itemsPerPage);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      toast.error('Please fill in all fields');
      return;
    }

    if (editingId) {
      setDistributors(
        distributors.map((distributor) =>
          distributor.id === editingId ? { ...distributor, ...formData } : distributor
        )
      );
      toast.success('Distributor updated successfully!');
    } else {
      const newDistributor = {
        id: Math.max(...distributors.map((distributor) => distributor.id), 0) + 1,
        ...formData,
        totalOrders: 0,
      };
      setDistributors([...distributors, newDistributor]);
      toast.success('Distributor added successfully!');
      setCurrentPage(1);
    }

    resetForm();
  };

  const handleDelete = (id) => {
    const distributor = distributors.find((item) => item.id === id);
    setDistributors(distributors.filter((item) => item.id !== id));
    toast.success(`${distributor.name} deleted successfully!`);

    if (paginatedDistributors.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleEdit = (distributor) => {
    setFormData({
      name: distributor.name,
      email: distributor.email,
      phone: distributor.phone,
      location: distributor.location,
      status: distributor.status,
    });
    setEditingId(distributor.id);
    setShowModal(true);
  };

  const handleView = (distributor) => {
    toast.success(
      `${distributor.name} | ${distributor.email} | ${distributor.phone} | Orders: ${distributor.totalOrders}`,
      { duration: 5000 }
    );
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      status: 'Active',
    });
    setEditingId(null);
    setShowModal(false);
  };

  return (
    <div className={adminUi.page}>
      <div className={adminUi.pageHeader}>
        <div>
          <h1 className={adminUi.pageTitle}>Distributors</h1>
          <p className={adminUi.pageDescription}>Manage and monitor all distributors.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className={adminUi.primaryButton}
        >
          Add Distributor
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

      <input
        type="text"
        placeholder="Search distributors"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        className={adminUi.input}
      />

      <div className={adminUi.panel}>
        <div className={adminUi.panelHeader}>
          <h2 className={adminUi.panelTitle}>Distributors List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={adminUi.tableHeader}>
              <tr>
                <th className={adminUi.th}>Name</th>
                <th className={adminUi.th}>Email</th>
                <th className={adminUi.th}>Phone</th>
                <th className={adminUi.th}>Location</th>
                <th className={adminUi.th}>Status</th>
                <th className={adminUi.th}>Orders</th>
                <th className={adminUi.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDistributors.length > 0 ? (
                paginatedDistributors.map((distributor) => (
                  <tr key={distributor.id} className={adminUi.tableRow}>
                    <td className={`${adminUi.td} font-medium text-gray-900`}>{distributor.name}</td>
                    <td className={adminUi.td}>{distributor.email}</td>
                    <td className={adminUi.td}>{distributor.phone}</td>
                    <td className={adminUi.td}>{distributor.location}</td>
                    <td className={adminUi.td}>
                      <span className={statusBadge(distributor.status)}>{distributor.status}</span>
                    </td>
                    <td className={adminUi.td}>{distributor.totalOrders}</td>
                    <td className={adminUi.td}>
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleView(distributor)} className={adminUi.textButton}>
                          View
                        </button>
                        <button onClick={() => handleEdit(distributor)} className={adminUi.textButton}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(distributor.id)} className="text-sm text-red-600 transition hover:underline">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-400">
                    No distributors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex flex-col gap-4 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredDistributors.length)} of {filteredDistributors.length}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`${adminUi.secondaryButton} ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`${adminUi.secondaryButton} ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className={adminUi.modalOverlay}>
          <div className={`${adminUi.modal} max-h-[90vh] overflow-y-auto`}>
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId ? 'Edit Distributor' : 'Add Distributor'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Enter location"
                  className={adminUi.input}
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={adminUi.select}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={resetForm} className={`flex-1 ${adminUi.secondaryButton} py-2`}>
                  Cancel
                </button>
                <button type="submit" className={`flex-1 ${adminUi.primaryButton}`}>
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Distributor;
