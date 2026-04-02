import React from 'react';

const FinancialReports = () => {
  const financialData = [
    { label: 'Total Revenue', value: '₹1,25,50,000', growth: '+18.5%', icon: '💳', color: 'from-orange-500 to-orange-700' },
    { label: 'Appliance Sales', value: '₹95,75,000', growth: '+22.3%', icon: '🍳', color: 'from-red-500 to-red-700' },
    { label: 'Avg Sale Value', value: '₹8,950', growth: '+5.2%', icon: '📊', color: 'from-amber-500 to-amber-700' },
    { label: 'Pending Payments', value: '₹15,50,000', growth: '-3.1%', icon: '⏰', color: 'from-yellow-500 to-yellow-700' },
  ];

  const transactions = [
    { id: 1, date: '2024-04-01', description: 'Induction Cooktop Sale', amount: '+₹45,000', type: 'credit', status: 'Completed', product: '🍳' },
    { id: 2, date: '2024-03-31', description: 'Mixer Grinder Refund', amount: '-₹12,500', type: 'debit', status: 'Completed', product: '🔄' },
    { id: 3, date: '2024-03-30', description: 'Washing Machine Sales', amount: '+₹78,900', type: 'credit', status: 'Completed', product: '🧺' },
    { id: 4, date: '2024-03-29', description: 'Installation Charges', amount: '+₹3,500', type: 'credit', status: 'Pending', product: '🔧' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-black">💳 Kitchen Appliance Financial Reports</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-orange-200 p-6 hover:border-orange-500/50 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl">{item.icon}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.growth.startsWith('+') ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                {item.growth}
              </span>
            </div>
            <p className="text-orange-300 text-sm mb-1">{item.label}</p>
            <p className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-orange-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">📝 Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-orange-600/10 rounded-lg hover:bg-orange-600/20 transition-all border border-orange-700/20">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tx.product}</span>
                  <div>
                    <p className="text-gray-900 font-semibold">{tx.description}</p>
                    <p className="text-xs text-orange-300">{tx.date}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className={`font-bold text-lg ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-orange-100 rounded-xl border border-orange-300 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🏦 This Month Revenue</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">₹12,56,890</p>
          <p className="text-sm text-gray-600">+28% from last month</p>
        </div>

        <div className="bg-green-100 rounded-xl border border-green-300 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">📦 Orders Completed</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">4,521</p>
          <p className="text-sm text-gray-600">₹89,45,000 total</p>
        </div>

        <div className="bg-blue-100 rounded-xl border border-blue-300 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 Profit Margin</h3>
          <p className="text-3xl font-bold text-orange-600 mb-2">32.5%</p>
          <p className="text-sm text-gray-600">Healthy margin</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
