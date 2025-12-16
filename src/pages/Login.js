// import React, {useState} from 'react';
// import { Link,useNavigate } from "react-router";
// import {useAuth} from "../components/authContext";
// import registeredUsers from '../data/users';

// import './Auth.css';

// // Login Component
// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   // const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//    const { login } = useAuth();

//   const navigate = useNavigate();



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     // Validation
//     if (!username || !password) {
//       setError('Please fill in all fields');
//       setIsLoading(false);
//       return;
//     }


//     // Get registered users

//     const user = registeredUsers.find(
//   u => u.username === username.trim() && u.password === password.trim()
// );


//     if (user) {
//       // Login successful
//       login(user);
//       setIsLoading(false);
      
//       // Redirect to dashboard
//       navigate('/dashboard');
//     } else {
//       // Login failed
//       setError('Invalid username or password');
//       setIsLoading(false);
//     }
//   };

//   if(isLoading){
//     return (
//         <div className="loading">
//           <p> Loading...</p>
//         </div>
//     )
//   }

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h1 className="auth-brand">GEODNATECH</h1>
//         <h2 className="auth-title">Sign In</h2>
        
//         <div className="auth-form">
//           <div className="form-group">
//             <label htmlFor="username">Username*</label>
//             <input
//               type="text"
//               id="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password*</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="form-footer">
//             <p className="forgot-link">Forgot Password ?</p>
//             <button onClick={handleSubmit} className="btn-submit">Sign In</button>
//           </div>

//           <div className="auth-switch">
//             Don't have an account yet ? 
//             <Link to="/signup">Sign Up</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };



// // Example App component showing both
// // const AuthPages = () => {
// //   const [currentPage, setCurrentPage] = useState('login');

// //   return (
// //     <div>
// //       <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
// //         <button 
// //           onClick={() => setCurrentPage('login')}
// //           style={{ 
// //             padding: '10px 20px', 
// //             marginRight: '10px',
// //             background: currentPage === 'login' ? '#2563eb' : '#e5e7eb',
// //             color: currentPage === 'login' ? 'white' : '#333',
// //             border: 'none',
// //             borderRadius: '5px',
// //             cursor: 'pointer'
// //           }}
// //         >
// //           Login
// //         </button>
// //         <button 
// //           onClick={() => setCurrentPage('register')}
// //           style={{ 
// //             padding: '10px 20px',
// //             background: currentPage === 'register' ? '#2563eb' : '#e5e7eb',
// //             color: currentPage === 'register' ? 'white' : '#333',
// //             border: 'none',
// //             borderRadius: '5px',
// //             cursor: 'pointer'
// //           }}
// //         >
// //           Register
// //         </button>
// //       </div>
      
// //       {currentPage === 'login' ? <Login /> : <Register />}
// //     </div>
// //   );
// // };

// export default Login

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router";
import { useAuth } from "../components/authContext";

import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log('✅ User state updated, navigating to dashboard...');
      setIsLoading(false);
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    console.log('🔵 Attempting login with credentials...');

    try {
      // Set a timeout to prevent infinite loading
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Login timeout - please try again')), 10000)
      );

      // Race between login and timeout
      const result = await Promise.race([
        login(email.trim(), password.trim()),
        timeoutPromise
      ]);

      console.log('🔵 Login result received:', result);

      if (result.success) {
        console.log('✅ Login successful, waiting for user state to update...');
        // Don't set isLoading to false yet - let useEffect handle it when user updates
        // Set a backup timeout in case user state never updates
        setTimeout(() => {
          if (!user) {
            console.warn('⚠️ User state did not update after 5 seconds, forcing navigation...');
            setIsLoading(false);
            navigate('/dashboard');
          }
        }, 5000);
      } else {
        setError(result.message || 'Invalid email or password');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
        <p style={{ fontSize: '12px', marginTop: '10px', color: '#666' }}>
          This is taking longer than usual...
        </p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-brand">GEODNATECH</h1>
        <h2 className="auth-title">Sign In</h2>
        
        <div className="auth-form">
          {error && (
            <div style={{ 
              padding: '12px', 
              marginBottom: '20px', 
              backgroundColor: '#fee2e2', 
              color: '#dc2626',
              borderRadius: '8px',
              fontSize: '14px',
              border: '1px solid #fecaca'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <div className="form-footer">
            <p className="forgot-link">Forgot Password?</p>
            <button 
              onClick={handleSubmit} 
              className="btn-submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <div className="auth-switch">
            Don't have an account yet? 
            <Link to="/signup"> Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router";
// import { useAuth } from "../components/authContext";

// import './Auth.css';

// // Login Component
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const { login, user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       navigate('/dashboard');
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     // Validation
//     if (!email || !password) {
//       setError('Please fill in all fields');
//       setIsLoading(false);
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setError('Please enter a valid email address');
//       setIsLoading(false);
//       return;
//     }

//     console.log('...attempting login with credentials...');

//     // Call the backend login
//     const result = await login(email.trim(), password.trim());

//     console.log('...login result received...', result);

//     if (result.success) {
//       // Login successful - the useEffect will handle navigation when user state updates
//       console.log('✅ Login successful, waiting for user profile...');
//       // Don't set isLoading to false yet - let the user state update trigger navigation
//     } else {
//       // Login failed - show error
//       setError(result.message || 'Invalid email or password');
//       setIsLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="loading">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h1 className="auth-brand">GEODNATECH</h1>
//         <h2 className="auth-title">Sign In</h2>
        
//         <div className="auth-form">
//           {error && (
//             <div style={{ 
//               padding: '12px', 
//               marginBottom: '20px', 
//               backgroundColor: '#fee2e2', 
//               color: '#dc2626',
//               borderRadius: '8px',
//               fontSize: '14px',
//               border: '1px solid #fecaca'
//             }}>
//               {error}
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="email">Email*</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               autoComplete="email"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password*</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               autoComplete="current-password"
//             />
//           </div>

//           <div className="form-footer">
//             <p className="forgot-link">Forgot Password?</p>
//             <button 
//               onClick={handleSubmit} 
//               className="btn-submit"
//               disabled={isLoading}
//             >
//               {isLoading ? 'Signing In...' : 'Sign In'}
//             </button>
//           </div>

//           <div className="auth-switch">
//             Don't have an account yet? 
//             <Link to="/signup"> Sign Up</Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;