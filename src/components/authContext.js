import { createContext, useContext, useState, useEffect } from 'react';
import registeredUsers from '../data/users';
import { useNavigate } from 'react-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('geodnatech_user');
    const token = localStorage.getItem('geodnatech_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const token = btoa(userData.username + ':' + Date.now());
    localStorage.setItem('geodnatech_user', JSON.stringify(userData));
    localStorage.setItem('geodnatech_token', token);
    setUser(userData);
    return true;
  };

  const register = (userData) => {
    const existingUsers = registeredUsers || [];
    const userExists = existingUsers.find(u => u.username === userData.username);
    
    if (userExists) {
      return { success: false, message: 'Username already exists' };
    }
    
    existingUsers.push(userData);
    localStorage.setItem('geodnatech_users', JSON.stringify(existingUsers));
    login(userData);
    return { success: true, message: 'Registration successful' };
  };

  const logout = () => {
    localStorage.removeItem('geodnatech_user');
    localStorage.removeItem('geodnatech_token');
    // setUser(null);
    return navigate('/');
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('geodnatech_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);