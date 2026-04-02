import React from 'react';

const OperationalReports = () => {
  const appliances = [
    { label: 'Total Appliances', value: '2,345', icon: '🍳', color: 'from-orange-500 to-orange-700' },
    { label: 'In Stock', value: '1,876', icon: '📦', color: 'from-green-500 to-green-700' },
    { label: 'Low Stock Alert', value: '234', icon: '⚠️', color: 'from-yellow-500 to-yellow-700' },
    { label: 'Out of Stock', value: '235', icon: '❌', color: 'from-red-500 to-red-700' },
  ];

  const applianceTypes = [
    { category: 'Induction Cooktops', stock: 345, orders: 89, delivery: 98, status: 'Excellent' },
    { category: 'Refrigerators', stock: 234, orders: 56, delivery: 95, status: 'Good' },
    { category: 'Washing Machines', stock: 189, orders: 45, delivery: 92, status: 'Good' },
    { category: 'Microwave Ovens', stock: 267, orders: 72, delivery: 96, status: 'Excellent' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-black">🍳 Appliance Stock Status</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {appliances.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-orange-200 p-6 hover:border-orange-500/50 transition-all"
          >
            <span className="text-3xl mb-4 block">{item.icon}</span>
            <p className="text-gray-600 text-sm mb-2">{item.label}</p>
            <p className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-orange-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">📊 Appliance Category Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-orange-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-orange-600">Appliance Type</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-orange-600">in Stock</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-orange-600">Orders</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-orange-600">On-Time Delivery</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-orange-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {applianceTypes.map((appliance, idx) => (
                <tr key={idx} className="border-b border-orange-200 hover:bg-orange-50 transition-all">
                  <td className="px-6 py-4 text-gray-900 font-semibold">{appliance.category}</td>
                  <td className="px-6 py-4 text-center text-orange-600 font-bold">{appliance.stock}</td>
                  <td className="px-6 py-4 text-center text-gray-700">{appliance.orders}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 bg-gray-300 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-700 h-full rounded-full"
                          style={{ width: `${appliance.delivery}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{appliance.delivery}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      appliance.status === 'Excellent' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appliance.status}
                    </span>
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

export default OperationalReports;
