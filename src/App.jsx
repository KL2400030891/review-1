import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './components/Layout/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/Dashboards/StudentDashboard';
import EmployerDashboard from './pages/Dashboards/EmployerDashboard';
import OfficerDashboard from './pages/Dashboards/OfficerDashboard';
import AdminDashboard from './pages/Dashboards/AdminDashboard';
import PostJob from './pages/PostJob';
import JobApplicants from './pages/JobApplicants';
import Profile from './pages/Profile';
import Jobs from './pages/Jobs';
import Applications from './pages/Applications';
import Stats from './pages/Stats';
import Users from './pages/Users';
import SystemLogs from './pages/SystemLogs';
import Config from './pages/Config';
import NotFound from './pages/NotFound';
import ForgotPassword from './pages/ForgotPassword';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles.length && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  const { user } = useAuth();

  const getDashboard = () => {
    switch (user?.role) {
      case 'student': return <StudentDashboard />;
      case 'employer': return <EmployerDashboard />;
      case 'officer': return <OfficerDashboard />;
      case 'admin': return <AdminDashboard />;
      default: return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={getDashboard()} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="applications" element={<Applications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="applicants" element={<JobApplicants />} />
        <Route path="stats" element={<Stats />} />
        <Route path="users" element={<Users />} />
        <Route path="logs" element={<SystemLogs />} />
        <Route path="config" element={<Config />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
