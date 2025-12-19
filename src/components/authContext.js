import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    const init = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
  
      setUser(session?.user ?? null);
      setLoading(false);
    };

    init();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
    return () => subscription.unsubscribe();
  }, []);

  
  const login = async (email, password) => {
    try {
      console.log('🔵 Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });


      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, data: data.user };
      
    } catch (error) {
      return { success: false, message: error.message };
    }
  };



  const register = async (userData) => {
    try {
      console.log('🔵 Starting registration for:', userData.email);

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            username: userData.username,
            full_name: userData.fullName,
            phone: userData.phone,
            address: userData.address,
            referral: userData.referral || null,
          }
        }
      });


      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('No user returned from signup');
      }

      return { 
        success: true, 
        message: 'Registration successful! Please check your email to verify your account.' 
      };
    } catch (error) {
      if (error.message.includes('unique_username')) {
        return { success: false, message: 'Username already exists' };
      }
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const isAuthenticated = () => {
   return !!user;
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