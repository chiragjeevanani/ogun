import React, { useState } from 'react';

const RewardSystem = () => {
  const [rewards, setRewards] = useState([
    { id: 1, name: '5% Cashback', points: 500, tier: '🥉 Bronze', status: 'Active', icon: '💰' },
    { id: 2, name: 'Free Installation', points: 1000, tier: '🥈 Silver', status: 'Active', icon: '🔧' },
    { id: 3, name: '₹2000 Voucher', points: 2000, tier: '🥇 Gold', status: 'Active', icon: '🎟️' },
    { id: 4, name: 'Extended Warranty', points: 5000, tier: '💎 Platinum', status: 'Active', icon: '🛡️' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', points: '', tier: '' });

  const handleAddReward = () => {
    if (formData.name && formData.points && formData.tier) {
      const newReward = {
        id: rewards.length + 1,
        ...formData,
        points: parseInt(formData.points),
        status: 'Active',
        icon: '⭐',
      };
      setRewards([...rewards, newReward]);
      setFormData({ name: '', points: '', tier: '' });
      setShowForm(false);
    }
  };

  const toggleRewardStatus = (id) => {
    setRewards(rewards.map(reward =>
      reward.id === id
        ? { ...reward, status: reward.status === 'Active' ? 'Inactive' : 'Active' }
        : reward
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-black">🎁 Kitchen Loyalty Program</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white rounded-lg font-semibold transition-all text-xs sm:text-sm md:text-base"
        >
          {showForm ? 'Cancel' : '+ Add Reward'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-pink-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Reward Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="px-4 py-2 bg-white border border-pink-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-pink-500"
            />
            <input
              type="number"
              placeholder="Points Required"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: e.target.value })}
              className="px-4 py-2 bg-white border border-pink-300 rounded-lg text-gray-900 placeholder-gray-600 focus:outline-none focus:border-pink-500"
            />
            <select
              value={formData.tier}
              onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
              className="px-4 py-2 bg-white border border-pink-300 rounded-lg text-gray-900 focus:outline-none focus:border-pink-500"
            >
              <option value="">Select Tier</option>
              <option value="🥉 Bronze">🥉 Bronze</option>
              <option value="🥈 Silver">🥈 Silver</option>
              <option value="🥇 Gold">🥇 Gold</option>
              <option value="💎 Platinum">💎 Platinum</option>
            </select>
            <button
              onClick={handleAddReward}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
            >
              Add Reward
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-xl border border-pink-200 p-6 hover:border-pink-500/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{reward.name}</h3>
                <p className="text-xs text-pink-600 mt-1">{reward.tier}</p>
              </div>
              <button
                onClick={() => toggleRewardStatus(reward.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  reward.status === 'Active'
                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                {reward.status}
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{reward.icon}</span>
              <p className="text-2xl font-bold text-pink-600">{reward.points} ⭐</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-100 rounded-xl border border-blue-300 p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">💰 Points Earned</h3>
          <p className="text-3xl font-bold text-blue-600 mb-2">2,45,890</p>
          <p className="text-sm text-blue-700">Total customer points</p>
        </div>

        <div className="bg-orange-100 rounded-xl border border-orange-300 p-6">
          <h3 className="text-lg font-bold text-orange-800 mb-4">🎯 Points Redeemed</h3>
          <p className="text-3xl font-bold text-orange-600 mb-2">89,234</p>
          <p className="text-sm text-orange-700">This month</p>
        </div>

        <div className="bg-green-100 rounded-xl border border-green-300 p-6">
          <h3 className="text-lg font-bold text-green-800 mb-4">👥 Active Members</h3>
          <p className="text-3xl font-bold text-green-600 mb-2">12,456</p>
          <p className="text-sm text-green-700">Loyalty program</p>
        </div>
      </div>
    </div>
  );
};

export default RewardSystem;
