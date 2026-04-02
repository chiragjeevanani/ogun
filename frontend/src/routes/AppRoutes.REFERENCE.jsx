// Current AppRoutes.jsx Setup (WORKING)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import VerifyOtp from '../pages/auth/VerifyOtp';
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import SubAdminDashboard from '../pages/dashboards/SubAdminDashboard';
import DistributorDashboard from '../pages/dashboards/DistributorDashboard';
import RetailerDashboard from '../pages/dashboards/RetailerDashboard';
import CustomerDashboard from '../pages/dashboards/CustomerDashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        
        {/* Protected Routes - Based on Login Role */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/subadmin-dashboard" element={<SubAdminDashboard />} />
        <Route path="/distributor-dashboard" element={<DistributorDashboard />} />
        <Route path="/retailer-dashboard" element={<RetailerDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

/*
===============================================
OPTIONAL: Advanced Protected Routes Setup
===============================================

If you want to add route protection, use this:

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import VerifyOtp from '../pages/auth/VerifyOtp';
import AdminDashboard from '../pages/dashboards/AdminDashboard';
import SubAdminDashboard from '../pages/dashboards/SubAdminDashboard';
import DistributorDashboard from '../pages/dashboards/DistributorDashboard';
import RetailerDashboard from '../pages/dashboards/RetailerDashboard';
import CustomerDashboard from '../pages/dashboards/CustomerDashboard';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <!-- Public Routes -->
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        
        <!-- Protected Routes with Role Checking -->
        <Route 
          path="/admin-dashboard" 
          element={<ProtectedRoute component={<AdminDashboard />} requiredRole="Admin" />} 
        />
        <Route 
          path="/subadmin-dashboard" 
          element={<ProtectedRoute component={<SubAdminDashboard />} requiredRole="Sub Admin" />} 
        />
        <Route 
          path="/distributor-dashboard" 
          element={<ProtectedRoute component={<DistributorDashboard />} requiredRole="Distributor" />} 
        />
        <Route 
          path="/retailer-dashboard" 
          element={<ProtectedRoute component={<RetailerDashboard />} requiredRole="Retailer" />} 
        />
        <Route 
          path="/customer-dashboard" 
          element={<ProtectedRoute component={<CustomerDashboard />} />} 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
*/
