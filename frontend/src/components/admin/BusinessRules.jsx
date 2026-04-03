import React, { useState } from 'react';
import { adminUi, statusBadge } from './adminStyles';

const BusinessRules = () => {
  const [rules, setRules] = useState([
    { id: 1, name: 'GST Tax Rate', value: '18%', type: 'percentage', status: 'Active', category: 'Pricing' },
    { id: 2, name: 'Min Order Value', value: 'Rs 2,999', type: 'currency', status: 'Active', category: 'Orders' },
    { id: 3, name: 'Free Delivery Threshold', value: 'Rs 10,000', type: 'currency', status: 'Active', category: 'Delivery' },
    { id: 4, name: 'Standard Warranty Period', value: '2 Years', type: 'period', status: 'Active', category: 'Warranty' },
    { id: 5, name: 'Installation Charge', value: 'Rs 500', type: 'currency', status: 'Active', category: 'Service' },
    { id: 6, name: 'Return/Exchange Period', value: '7 Days', type: 'period', status: 'Active', category: 'Returns' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', value: '', type: '', category: '' });

  const handleAddRule = () => {
    if (formData.name && formData.value && formData.type && formData.category) {
      const newRule = {
        id: rules.length + 1,
        ...formData,
        status: 'Active',
      };
      setRules([...rules, newRule]);
      setFormData({ name: '', value: '', type: '', category: '' });
      setShowForm(false);
    }
  };

  const toggleRuleStatus = (id) => {
    setRules(
      rules.map((rule) =>
        rule.id === id
          ? { ...rule, status: rule.status === 'Active' ? 'Inactive' : 'Active' }
          : rule
      )
    );
  };

  const categories = ['Pricing', 'Orders', 'Delivery', 'Warranty', 'Service', 'Returns'];

  return (
    <div className={adminUi.page}>
      <div className={adminUi.pageHeader}>
        <div>
          <h1 className={adminUi.pageTitle}>Business Rules</h1>
          <p className={adminUi.pageDescription}>Configure pricing, delivery, warranty, and service rules.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={showForm ? adminUi.secondaryButton : adminUi.primaryButton}>
          {showForm ? 'Cancel' : 'Add Rule'}
        </button>
      </div>

      {showForm && (
        <div className={adminUi.card}>
          <div className="grid gap-4 md:grid-cols-4">
            <input
              type="text"
              placeholder="Rule Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={adminUi.input}
            />
            <input
              type="text"
              placeholder="Value"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className={adminUi.input}
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className={adminUi.select}
            >
              <option value="">Select Type</option>
              <option value="percentage">Percentage</option>
              <option value="currency">Currency</option>
              <option value="period">Period</option>
              <option value="number">Number</option>
            </select>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={adminUi.select}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <button onClick={handleAddRule} className={adminUi.primaryButton}>
              Save Rule
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {rules.map((rule) => (
          <div key={rule.id} className={adminUi.card}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">{rule.category}</p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">{rule.name}</h3>
              </div>
              <button onClick={() => toggleRuleStatus(rule.id)} className={statusBadge(rule.status)}>
                {rule.status}
              </button>
            </div>
            <p className="mt-6 text-2xl font-semibold text-gray-800">{rule.value}</p>
            <p className="mt-3 text-sm text-gray-500">
              Type: <span className="font-medium text-gray-700">{rule.type}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessRules;
