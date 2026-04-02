import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RetailerDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const userName =
    JSON.parse(localStorage.getItem('loginData') || '{}')?.userName ||
    'Retailer User';

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'inventory', icon: '📦', label: 'Inventory' },
    { id: 'sales', icon: '💳', label: 'Sales' },
    { id: 'customers', icon: '👥', label: 'Customers' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  const stats = [
    { label: 'Total Sales', value: '₹2.3L', icon: '💳', gradient: 'from-green-500 to-green-700' },
    { label: 'Store Orders', value: '456', icon: '📦', gradient: 'from-blue-500 to-blue-700' },
    { label: 'Customers', value: '487', icon: '👥', gradient: 'from-purple-500 to-purple-700' },
    { label: 'Avg Order', value: '₹870', icon: '📊', gradient: 'from-orange-500 to-orange-700' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">📊 Dashboard</h2>
              <p className="text-gray-600 text-sm mt-1">Manage your retail store</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${stat.gradient} rounded-lg p-6 text-white shadow-md hover:shadow-lg transition`}
                >
                  <p className="text-3xl mb-2">{stat.icon}</p>
                  <p className="text-sm text-white/80 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🏪 Store Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="pb-4 border-b md:border-b-0 md:border-r md:pr-4 border-gray-200">
                  <p className="text-sm text-gray-600">Store Name</p>
                  <p className="text-lg font-semibold text-gray-900">Premium Kitchen Store</p>
                </div>
                <div className="pb-4 md:pb-0">
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-lg font-semibold text-gray-900">Sector 7, Mumbai</p>
                </div>
                <div className="pb-4 border-b md:border-b-0 md:border-r md:pr-4 border-gray-200">
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="text-lg font-semibold text-gray-900">+91-9876-543-210</p>
                </div>
                <div className="pb-4 md:pb-0">
                  <p className="text-sm text-gray-600">Join Date</p>
                  <p className="text-lg font-semibold text-gray-900">15 Jan 2024</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">📦 Inventory Management</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-gray-600">Inventory management features coming soon...</p>
            </div>
          </div>
        );

      case 'sales':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">💳 Sales Report</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-gray-600">Sales analytics and reports coming soon...</p>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">👥 Customers</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-gray-600">Customer management features coming soon...</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">⚙️ Settings</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`flex flex-col w-64 fixed left-0 top-0 h-screen bg-black text-white z-40 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-gray-800 font-bold text-lg sm:text-xl flex items-center justify-center relative flex-shrink-0">
          <span>Retailer</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white text-xl absolute right-4"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap ${
                activeSection === item.id
                  ? 'bg-white text-black font-medium'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 bg-gray-100 overflow-y-auto md:ml-64">
        {/* NAVBAR */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 sm:px-6 h-16">
            {/* LEFT SIDE - Hamburger & Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 hidden md:block">
                Retailer Dashboard
              </h2>
            </div>

            {/* RIGHT SIDE - Profile Section */}
            <div className="flex items-center gap-4">
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-sm">
                    R
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="font-semibold text-gray-900 text-sm">Retailer</p>
                      <p className="text-xs text-gray-500">retailer@kitchenhub.com</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition">
                        👤 Profile Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition">
                        🔔 Notifications
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition">
                        ⚙️ Preferences
                      </button>
                    </div>
                    <div className="p-2 border-t border-gray-200">
                      <button
                        onClick={() => {
                          handleLogout();
                          setProfileDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition font-semibold"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          <div className="bg-gray-100 min-h-full text-gray-800 text-xs sm:text-sm md:text-base">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RetailerDashboard;
