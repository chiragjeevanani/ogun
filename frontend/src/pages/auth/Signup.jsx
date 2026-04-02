import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

/**
 * Signup — Customer only
 * After successful signup → redirect to /login
 */
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Full name is required';
    if (!formData.phone || formData.phone.length !== 10) e.phone = 'Enter a valid 10-digit phone number';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email address';
    if (!formData.password) e.password = 'Password is required';
    else if (formData.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      setFormData({ ...formData, phone: value.replace(/\D/g, '').slice(0, 10) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      localStorage.setItem('customerData', JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        role: 'customer',
        createdAt: new Date().toLocaleString(),
      }));

      toast.success('Account created! Please login.');
      setTimeout(() => navigate('/login'), 800);
    } catch (err) {
      toast.error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = (field) =>
    `w-full px-3 py-2 border rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-300'
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🍳</span>
              <span className="text-lg font-bold text-gray-900">KitchenHub</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h1>
            <p className="text-sm text-gray-500">Customer registration — join KitchenHub today</p>
          </div>

          {/* Customer-only notice */}
          <div className="mb-5 p-3 bg-indigo-50 border border-indigo-200 rounded-md">
            <p className="text-xs text-indigo-700 font-medium">
              ℹ️ Signup is only available for Customers. Other roles are onboarded by Admin.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Riya Sharma"
                className={inputCls('name')}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium px-3 py-2 bg-gray-50 rounded-md border border-gray-300 whitespace-nowrap">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98765 43210"
                  maxLength="10"
                  className={`flex-1 ${inputCls('phone')}`}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
            </div>

            {/* Email (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="riya@example.com"
                className={inputCls('email')}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className={inputCls('password')}
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md text-sm transition mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition">
              Login
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          By signing up, you agree to KitchenHub's Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Signup;
