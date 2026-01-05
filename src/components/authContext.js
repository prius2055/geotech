import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      console.log('🔵 Checking authentication...');
      
      const response = await fetch(`https://vtu-backend-wjn6.onrender.com/api/v1/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        console.log('⚠️ Token invalid, clearing...');
        localStorage.removeItem('token');
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      console.log('🔵 Registering user...');
      
      // const response = await fetch(`http://localhost:5000/api/v1/register`, {
      const response = await fetch(`https://vtu-backend-wjn6.onrender.com/api/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        console.log('✅ Registration successful');
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return { success: true, message: 'Registration successful!' };
      } else {
        console.error('❌ Registration failed:', data.message);
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('❌ Registration error:', error);
      return { success: false, message: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔵 Logging in...');
      
      const response = await fetch(`http://localhost:5000/api/v1/login`, {
      // const response = await fetch(`https://vtu-backend-wjn6.onrender.com/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        console.log('✅ Login successful');
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        console.error('❌ Login failed:', data.message);
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return { success: false, message: error.message };
    }
  };

 const logout = () => {
  console.log('🔵 Logging out...');

  try {
    // Clear auth storage
    localStorage.removeItem('token');

    // Reset auth state
    setUser(null);

    console.log('✅ Logout successful');
  } catch (error) {
    console.error('❌ Logout error:', error);
  } finally {
    // Always redirect
    navigate('/', { replace: true });
  }
};

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAuthenticated, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);