import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth pages
import Login    from '../pages/auth/Login';
import Signup   from '../pages/auth/Signup';
import VerifyOtp from '../pages/auth/VerifyOtp';
import AdminLogin from '../pages/auth/AdminLogin';
import SubAdminLogin from '../pages/auth/SubAdminLogin';
import DistributorLogin from '../pages/auth/DistributorLogin';
import RetailerLogin from '../pages/auth/RetailerLogin';
import LoginHub from '../pages/auth/LoginHub';

// Dashboards
import AdminDashboard       from '../pages/dashboards/AdminDashboard';
import SubAdminDashboard    from '../pages/dashboards/SubAdminDashboard';
import Distributor          from '../pages/dashboards/Distributor';
import RetailerDashboard    from '../pages/dashboards/RetailerDashboard';
import CustomerDashboard    from '../pages/dashboards/CustomerDashboard';
import CategoryProducts    from '../pages/customer/CategoryProducts';

// Guard
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Landing
import Landing from '../pages/Landing';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/"           element={<Landing />} />
        <Route path="/login-hub"  element={<LoginHub />} />
        
        {/* Customer Login Routes */}
        <Route path="/login"      element={<Login />} />
        <Route path="/signup"     element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Dynamic Role-Based Login Routes (using single Login component) */}
        <Route path="/login/:role" element={<Login />} />

        {/* Legacy Role-Based Login Routes (kept for backward compatibility) */}
        <Route path="/admin-login"       element={<AdminLogin />} />
        <Route path="/subadmin-login"    element={<SubAdminLogin />} />
        <Route path="/distributor-login" element={<DistributorLogin />} />
        <Route path="/retailer-login"    element={<RetailerLogin />} />

        {/* Protected — role-specific dashboards */}
        {/* Admin Shortcut Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* SubAdmin Shortcut Routes */}
        <Route
          path="/subadmin"
          element={
            <ProtectedRoute allowedRoles={['subadmin']}>
              <SubAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subadmin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['subadmin']}>
              <SubAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Distributor Shortcut Routes */}
        <Route
          path="/distributor"
          element={
            <ProtectedRoute allowedRoles={['distributor']}>
              <Distributor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/distributor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['distributor']}>
              <Distributor />
            </ProtectedRoute>
          }
        />

        {/* Retailer Shortcut Routes */}
        <Route
          path="/retailer"
          element={
            <ProtectedRoute allowedRoles={['retailer']}>
              <RetailerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/retailer-dashboard"
          element={
            <ProtectedRoute allowedRoles={['retailer']}>
              <RetailerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Customer Shortcut Routes */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Navigate to="/customer/home" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer-dashboard"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Navigate to="/customer/home" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/home"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/shop"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/orders"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/more"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/category/:category"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CategoryProducts />
            </ProtectedRoute>
          }
        />

        {/* Fallback — redirect unknown paths to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
