import React, { useState } from 'react';

const DepartmentAccess = ({ deptType = 'sales' }) => {
  const departmentData = {
    sales: {
      title: '💳 Sales Department',
      icon: '💳',
      stats: [
        { label: 'Total Sales', value: '₹45.2L', change: '+12%', color: 'from-green-500 to-emerald-600' },
        { label: 'Active Orders', value: '342', change: '+8%', color: 'from-blue-500 to-cyan-600' },
        { label: 'Conversion Rate', value: '8.5%', change: '+2.3%', color: 'from-purple-500 to-pink-600' },
        { label: 'Avg Order Value', value: '₹13,200', change: '+5%', color: 'from-orange-500 to-red-600' },
      ],
      topProducts: [
        { name: 'Stainless Steel Cookware Set', sales: 156, revenue: '₹15,60,000' },
        { name: 'Premium Chef Knife Collection', sales: 98, revenue: '₹27,44,000' },
        { name: 'Smart Electric Kettle Pro', sales: 245, revenue: '₹22,05,550' },
        { name: 'Non-Stick Cookware Set', sales: 134, revenue: '₹20,09,860' },
      ]
    },
    inventory: {
      title: '📦 Inventory Department',
      icon: '📦',
      stats: [
        { label: 'Total Stock Value', value: '₹85.4L', change: '-2%', color: 'from-blue-500 to-cyan-600' },
        { label: 'SKUs in Stock', value: '245', change: '+15', color: 'from-green-500 to-emerald-600' },
        { label: 'Low Stock Items', value: '12', change: '-3', color: 'from-red-500 to-orange-600' },
        { label: 'Warehouse Utilization', value: '78%', change: '+4%', color: 'from-yellow-500 to-amber-600' },
      ],
      inventory: [
        { name: 'Stainless Steel Cookware Set', stock: 156, reorder: 50, status: '✓ OK' },
        { name: 'Premium Chef Knife Collection', stock: 32, reorder: 100, status: '⚠ Low' },
        { name: 'Smart Electric Kettle Pro', stock: 204, reorder: 75, status: '✓ OK' },
        { name: 'Non-Stick Cookware Set', stock: 89, reorder: 60, status: '✓ OK' },
      ]
    },
    operations: {
      title: '⚙️ Operations Department',
      icon: '⚙️',
      stats: [
        { label: 'On-Time Delivery', value: '94.2%', change: '+1.5%', color: 'from-green-500 to-emerald-600' },
        { label: 'Processing Time', value: '2.3 hrs', change: '-0.5h', color: 'from-blue-500 to-cyan-600' },
        { label: 'Order Accuracy', value: '99.8%', change: '+0.3%', color: 'from-purple-500 to-pink-600' },
        { label: 'Active Tasks', value: '28', change: '-5', color: 'from-orange-500 to-red-600' },
      ],
      operations: [
        { task: 'Process Bulk Orders', completed: 145, pending: 23, status: '86% Done' },
        { task: 'Quality Check', completed: 234, pending: 8, status: '97% Done' },
        { task: 'Packaging & Labeling', completed: 189, pending: 12, status: '94% Done' },
        { task: 'Shipment Coordination', completed: 112, pending: 15, status: '88% Done' },
      ]
    },
    support: {
      title: '🎧 Support Team',
      icon: '🎧',
      stats: [
        { label: 'Active Tickets', value: '42', change: '-8', color: 'from-blue-500 to-cyan-600' },
        { label: 'Avg Resolution', value: '4.2 hrs', change: '-0.8h', color: 'from-green-500 to-emerald-600' },
        { label: 'Customer Satisfaction', value: '4.7/5', change: '+0.2', color: 'from-yellow-500 to-amber-600' },
        { label: 'Response Time', value: '8 mins', change: '-2m', color: 'from-purple-500 to-pink-600' },
      ],
      tickets: [
        { issue: 'Product Quality Issue', count: 12, priority: 'High', avgTime: '2.5 hrs' },
        { issue: 'Delivery Delay', count: 18, priority: 'Medium', avgTime: '3.8 hrs' },
        { issue: 'Refund Request', count: 8, priority: 'Medium', avgTime: '5.2 hrs' },
        { issue: 'Technical Support', count: 4, priority: 'Low', avgTime: '6.1 hrs' },
      ]
    }
  };

  const data = departmentData[deptType] || departmentData.sales;

  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-black">{data.title}</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {data.stats.map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 sm:p-4 text-white shadow-lg`}>
            <p className="text-xs sm:text-sm text-white/80 font-medium mb-1">{stat.label}</p>
            <p className="text-lg sm:text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-green-200">{stat.change} this month</p>
          </div>
        ))}
      </div>

      {/* Department Specific Data */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        {deptType === 'sales' && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-black mb-4">📊 Top Selling Products</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Product</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Units Sold</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topProducts.map((prod, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-700 font-medium truncate">{prod.name}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{prod.sales}</td>
                      <td className="px-3 py-2 text-right text-green-600 font-semibold">{prod.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {deptType === 'inventory' && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-black mb-4">📦 Current Stock Levels</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Product</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Stock</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Reorder</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.inventory.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-700 font-medium truncate">{item.name}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{item.stock}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{item.reorder}</td>
                      <td className="px-3 py-2 text-center">{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {deptType === 'operations' && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-black mb-4">⚙️ Operational Tasks</h3>
            <div className="space-y-3">
              {data.operations.map((ops, idx) => (
                <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800 text-xs sm:text-sm">{ops.task}</span>
                    <span className="text-green-600 font-bold text-xs">{ops.status}</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" style={{ width: ops.status.split('%')[0] + '%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>✓ {ops.completed} Completed</span>
                    <span>⏳ {ops.pending} Pending</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {deptType === 'support' && (
          <div>
            <h3 className="text-base sm:text-lg font-bold text-black mb-4">🎧 Support Tickets Overview</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Issue Type</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Count</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-700">Priority</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Avg Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.tickets.map((ticket, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-700 font-medium truncate">{ticket.issue}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{ticket.count}</td>
                      <td className="px-3 py-2 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                          ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right text-gray-600">{ticket.avgTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentAccess;
