import { useAuth } from '../components/authContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;