import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute — checks localStorage for a valid, logged-in session.
 *
 * Props:
 *  allowedRoles  – array of roles allowed to access the route, e.g. ['admin']
 *                  If omitted, any authenticated user is allowed.
 *  redirectTo    – where to redirect unauthenticated users (default: /login)
 */
const ProtectedRoute = ({ children, allowedRoles, redirectTo = '/login' }) => {
  const loginData = JSON.parse(localStorage.getItem('loginData') || '{}');
  const isLoggedIn = loginData?.isLoggedIn === true;
  const role = loginData?.role;

  // Not logged in → send to login
  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  // Role restriction check
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to their own dashboard
    const dashboardMap = {
      admin: '/admin-dashboard',
      subadmin: '/subadmin-dashboard',
      distributor: '/distributor-dashboard',
      retailer: '/retailer-dashboard',
      customer: '/customer/home',
    };
    return <Navigate to={dashboardMap[role] || '/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
