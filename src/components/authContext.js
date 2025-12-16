// import { createContext, useContext, useState, useEffect } from 'react';
// import { supabase } from '../config/supabaseClient';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
// supabase.auth.getSession().then(({ data: { session } }) => {
//   if (session?.user) {
//     fetchUserProfile(session.user.id);
//   } else {
//     setUser(null);
//   }
// });





//     // Listen for changes on auth state (sign in, sign out, etc.)
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       if (session?.user) {
//         await fetchUserProfile(session.user.id);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   // Fetch user profile from profiles table
// const fetchUserProfile = async (userId) => {
//   try {
//     const { data: profile, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', userId)
//       .maybeSingle();

//     if (error) throw error;

//     const { data: { user: authUser } } = await supabase.auth.getUser();

//     if (!authUser) {
//       setUser(null);
//       return;
//     }

//     setUser({
//       id: authUser.id,
//       email: authUser.email,
//       ...profile
//     });
//   } catch (error) {
//     console.error('Error fetching profile:', error.message);
//     setUser(null);
//   }
// };


//   const login = async (email, password) => {
//     // try {
//       console.log('🔵 Attempting login for:', email);
      
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });

//       console.log('...login result...')
//       console.log(data)
//       if (error) {
//         console.error('❌ Login error:', error.message);
//         return { success: false, message: error.message };
//       }
//       console.log('✅ Login success:', data.user);
//       return { success: true };
//   };

//   const register = async (userData) => {
//     try {
//       console.log('🔵 Starting registration for:', userData.email);

//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email: userData.email,
//         password: userData.password,
//         options: {
//           data: {
//             username: userData.username,
//             full_name: userData.fullName,
//             phone: userData.phone,
//             address: userData.address,
//             referral: userData.referral || null,
//           }
//         }
//       });

//       console.log('Auth signup result:', { authData, authError });

//       if (authError) throw authError;

//       if (!authData.user) {
//         throw new Error('No user returned from signup');
//       }
//       console.log('✅ Registration completed successfully!');
//       return { 
//         success: true, 
//         message: 'Registration successful! Please check your email to verify your account.' 
//       };
//     } catch (error) {
//     if (error.message.includes('unique_username')) {
//       return { success: false, message: 'Username already exists' };
//     }

//     console.error('Registration error:', error);
//     return { success: false, message: error.message };
//   } finally {
   
//   }
//   };

//   const logout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//       // Redirect using window.location instead of navigate
//       window.location.href = '/';
//     } catch (error) {
//       console.error('Logout error:', error.message);
//     }
//   };

//   const isAuthenticated = () => {
//     return !!user;
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       register, 
//       logout, 
//       isAuthenticated, 
//       // loading 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


// import { createContext, useContext, useState, useEffect } from 'react';
// import { supabase } from '../config/supabaseClient';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     console.log('🔵 AuthProvider mounted, checking session...');
    
//     // Check active sessions and sets the user
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       console.log('Session check result:', session);
      
//       if (session?.user) {
//         fetchUserProfile(session.user.id);
//       } else {
//         setUser(null);
//       }
//     });

//     // Listen for changes on auth state (sign in, sign out, etc.)
//     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
//       console.log('🔵 Auth state changed:', _event); // ← LOG #3
      
//       if (session?.user) {
//         await fetchUserProfile(session.user.id);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   // Fetch user profile from profiles table
//   const fetchUserProfile = async (userId) => {
//     try {
//       console.log('🔵 Fetching profile for user:', userId); // ← LOG #4
      
//       const { data: profile, error } = await supabase
//         .from('profiles')
//         .select('*')
//         .eq('id', userId)
//         .maybeSingle();

//       console.log('Profile fetch result:', { profile, error }); // ← LOG #5

//       if (error) {
//         console.error('Profile fetch error:', error);
//         throw error;
//       }

//       const { data: { user: authUser } } = await supabase.auth.getUser();

//       if (!authUser) {
//         console.log('No auth user found');
//         setUser(null);
//         return;
//       }

//       const userData = {
//         id: authUser.id,
//         email: authUser.email,
//         ...profile
//       };

//       console.log('✅ Setting user data:', userData); // ← LOG #6
//       setUser(userData);
//     } catch (error) {
//       console.error('❌ Error fetching profile:', error.message);
//       // Still set basic user data even if profile fetch fails
//       const { data: { user: authUser } } = await supabase.auth.getUser();
//       if (authUser) {
//         console.log('⚠️ Profile fetch failed, using basic auth data');
//         setUser({
//           id: authUser.id,
//           email: authUser.email
//         });
//       } else {
//         setUser(null);
//       }
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       console.log('🔵 Attempting login for:', email); // ← LOG #1
      
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });

//       console.log('...login result...'); // ← LOG #2
//       console.log(data);

//       if (error) throw error;

//       return { success: true, data: data.user };
//     } catch (error) {
//       console.error('Login error:', error.message);
//       return { success: false, message: error.message };
//     }
//   };

//   const register = async (userData) => {
//     try {
//       console.log('🔵 Starting registration for:', userData.email);

//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email: userData.email,
//         password: userData.password,
//         options: {
//           data: {
//             username: userData.username,
//             full_name: userData.fullName,
//             phone: userData.phone,
//             address: userData.address,
//             referral: userData.referral || null,
//           }
//         }
//       });

//       console.log('Auth signup result:', { authData, authError });

//       if (authError) throw authError;

//       if (!authData.user) {
//         throw new Error('No user returned from signup');
//       }

//       console.log('✅ Registration completed successfully!');
//       return { 
//         success: true, 
//         message: 'Registration successful! Please check your email to verify your account.' 
//       };
//     } catch (error) {
//       if (error.message.includes('unique_username')) {
//         return { success: false, message: 'Username already exists' };
//       }

//       console.error('Registration error:', error);
//       return { success: false, message: error.message };
//     }
//   };

//   const logout = async () => {
//     try {
//       const { error } = await supabase.auth.signOut();
//       if (error) throw error;
//       setUser(null);
//       window.location.href = '/';
//     } catch (error) {
//       console.error('Logout error:', error.message);
//     }
//   };

//   const isAuthenticated = () => {
//     return !!user;
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       register, 
//       logout, 
//       isAuthenticated, 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('🔵 AuthProvider mounted, checking session...');
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', !!session);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('🔵 Auth state changed:', _event);
      
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        console.log('No session, setting user to null');
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch user profile from profiles table
  const fetchUserProfile = async (userId) => {
    console.log('🔵 Fetching profile for user ID:', userId);
    
    try {
      // Try to get auth user first (this should be fast)
      console.log('Step 1: Getting auth user...');
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      console.log('Auth user result:', { authUser: !!authUser, authError });
      
      if (authError) throw authError;
      
      if (!authUser) {
        console.log('⚠️ No auth user found');
        setUser(null);
        return;
      }

      console.log('Step 2: Auth user found, setting basic user data first...');
      // Set basic user data immediately so login doesn't hang
      setUser({
        id: authUser.id,
        email: authUser.email
      });
      
      console.log('✅ Basic user data set, now fetching profile...');

      // Now try to fetch profile (this can fail without breaking login)
      console.log('Step 3: Fetching profile from database...');
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('📊 Profile fetch result:', { profile: !!profile, profileError });

      if (profile) {
        console.log('✅ Profile found, updating user data with profile info...');
        setUser({
          id: authUser.id,
          email: authUser.email,
          ...profile
        });
      } else {
        console.log('⚠️ No profile found, keeping basic user data');
      }
      
    } catch (error) {
      console.error('❌ Error in fetchUserProfile:', error.message);
      console.error('Error details:', error);
      
      // Try one more time to at least set auth user
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          console.log('⚠️ Setting fallback user data');
          setUser({
            id: authUser.id,
            email: authUser.email
          });
        }
      } catch (e) {
        console.error('❌ Complete failure:', e);
      }
    }
  };

  const login = async (email, password) => {
    try {
      console.log('🔵 Attempting login for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      console.log('Login API response:', { data, error });

      if (error) {
        console.error('❌ Login error:', error.message);
        return { success: false, message: error.message };
      }

      console.log('✅ Login successful, session created');
      return { success: true, data: data.user };
      
    } catch (error) {
      console.error('❌ Login exception:', error);
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

      console.log('Auth signup result:', { authData, authError });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('No user returned from signup');
      }

      console.log('✅ Registration completed successfully!');
      return { 
        success: true, 
        message: 'Registration successful! Please check your email to verify your account.' 
      };
    } catch (error) {
      if (error.message.includes('unique_username')) {
        return { success: false, message: 'Username already exists' };
      }

      console.error('❌ Registration error:', error);
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      console.log('🔵 Logging out...');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('❌ Logout error:', error.message);
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
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);