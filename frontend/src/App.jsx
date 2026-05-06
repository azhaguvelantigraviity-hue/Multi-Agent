import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import RegisterAgent from './pages/auth/RegisterAgent';
import AdminDashboard from './pages/admin/AdminDashboard';
import SubAdminDashboard from './pages/subadmin/SubAdminDashboard';
import AgentDashboard from './pages/agent/AgentDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterAgent />} />
      
      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/subadmin/*" element={
        <ProtectedRoute allowedRoles={['subadmin']}>
          <SubAdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/agent/*" element={
        <ProtectedRoute allowedRoles={['agent']}>
          <AgentDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
