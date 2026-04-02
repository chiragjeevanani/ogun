import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  // Get role from URL parameter, default to 'customer'
  const { role: urlRole } = useParams();
  const currentRole = urlRole || 'customer';

  // Form states
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Role config
  const roleConfig = {
    customer: {
      icon: '👤',
      title: 'Welcome back',
      subtitle: 'Sign in to your account to continue',
      formType: 'nameMobile', // name + mobile
    },
    admin: {
      icon: '👨‍💼',
      title: 'Admin Login',
      subtitle: 'Sign in to your admin account',
      formType: 'emailPassword', // email + password
    },
    subadmin: {
      icon: '👤',
      title: 'Sub Admin Login',
      subtitle: 'Sign in to your sub admin account',
      formType: 'emailPassword', // email + password
    },
    distributor: {
      icon: '📦',
      title: 'Distributor Login',
      subtitle: 'Sign in to your distributor account',
      formType: 'nameMobile', // name + mobile
    },
    retailer: {
      icon: '🏪',
      title: 'Retailer Login',
      subtitle: 'Sign in to your retailer account',
      formType: 'nameMobile', // name + mobile
    },
  };

  const config = roleConfig[currentRole] || roleConfig.customer;

  // Dashboard redirect map
  const dashboardMap = {
    customer: '/customer/home',
    admin: '/admin-dashboard',
    subadmin: '/subadmin-dashboard',
    distributor: '/distributor-dashboard',
    retailer: '/retailer-dashboard',
  };

  // Handle Customer (Phone + OTP) Login
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (!phone.trim() || phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      localStorage.setItem('loginData', JSON.stringify({
        phone,
        role: currentRole,
        userName: `User_${phone.slice(-4)}`,
        isLoggedIn: false,
        loginTime: new Date().toLocaleString(),
      }));

      localStorage.setItem('role', currentRole);

      toast.success('OTP sent to +91 ' + phone);
      setTimeout(() => navigate('/verify-otp'), 400);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Handle Role-Based (Email + Password) Login
  const handleEmailPasswordLogin = async (e) => {
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

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      localStorage.setItem('loginData', JSON.stringify({
        email,
        role: currentRole,
        userName: `${currentRole}_${email.split('@')[0]}`,
        isLoggedIn: true,
        loginTime: new Date().toLocaleString(),
      }));

      localStorage.setItem('role', currentRole);

      toast.success(`${currentRole.toUpperCase()} login successful!`);
      setTimeout(() => navigate(dashboardMap[currentRole]), 400);
    } catch (err) {
      setError('Login failed. Please try again.');
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Handle Name + Mobile Login (Distributor & Retailer)
  const handleNameMobileLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!mobile.trim() || mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      localStorage.setItem('loginData', JSON.stringify({
        name,
        mobile,
        role: currentRole,
        userName: name,
        isLoggedIn: true,
        loginTime: new Date().toLocaleString(),
      }));

      localStorage.setItem('role', currentRole);

      toast.success(`${currentRole.toUpperCase()} login successful!`);
      setTimeout(() => navigate(dashboardMap[currentRole]), 400);
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
              <span className="text-2xl">{config.icon}</span>
              <span className="text-lg font-bold text-gray-900">KitchenHub</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{config.title}</h1>
            <p className="text-sm text-gray-500">{config.subtitle}</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          {config.formType === 'phoneOtp' ? (
            // Customer: Phone + OTP Form
            <form onSubmit={handleSendOtp} className="space-y-5">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium px-3 py-2 bg-gray-50 rounded-md border border-gray-300 whitespace-nowrap">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setPhone(val.slice(0, 10));
                      setError('');
                    }}
                    placeholder="98765 43210"
                    maxLength="10"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Enter 10 digits without country code</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-md text-sm transition mt-2"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : config.formType === 'nameMobile' ? (
            // Distributor & Retailer: Name + Mobile Form
            <form onSubmit={handleNameMobileLogin} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Mobile Number
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium px-3 py-2 bg-gray-50 rounded-md border border-gray-300 whitespace-nowrap">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setMobile(val.slice(0, 10));
                      setError('');
                    }}
                    placeholder="98765 43210"
                    maxLength="10"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Enter 10 digits without country code</p>
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
          ) : (
            // Admin & SubAdmin: Email + Password Form
            <form onSubmit={handleEmailPasswordLogin} className="space-y-5">
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
                  placeholder={`${currentRole}@kitchenhub.com`}
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
          )}

          {/* Divider and Links - Show for Customer only */}
          {currentRole === 'customer' && (
            <>
              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 border-t border-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 border-t border-gray-200" />
              </div>

              {/* Customer Signup Link */}
              <p className="text-center text-sm text-gray-600">
                New customer?{' '}
                <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700 transition">
                  Create an account
                </Link>
              </p>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          By continuing, you agree to KitchenHub's Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
