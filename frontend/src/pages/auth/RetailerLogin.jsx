import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const RetailerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRetailerLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Save login data
      localStorage.setItem('loginData', JSON.stringify({
        email,
        role: 'retailer',
        userName: `Retailer_${email.split('@')[0]}`,
        isLoggedIn: true,
        loginTime: new Date().toLocaleString(),
      }));

      localStorage.setItem('role', 'retailer');

      toast.success('Retailer login successful!');
      setTimeout(() => navigate('/retailer-dashboard'), 400);
    } catch (err) {
      setError('Login failed. Please try again.');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🏪</span>
              <span className="text-lg font-bold text-gray-900">KitchenHub Retailer</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Retailer Login</h1>
            <p className="text-sm text-gray-500">Sign in to your retailer account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRetailerLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="retailer@kitchenhub.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md text-sm transition mt-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Back to customer login */}
          <p className="text-center text-sm text-gray-600">
            Customer login?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-semibold text-indigo-600 hover:text-indigo-700 transition"
            >
              Click here
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          By continuing, you agree to KitchenHub's Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default RetailerLogin;
