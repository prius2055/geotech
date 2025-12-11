import { useAuth } from '../components/authContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;