import React, {useState} from 'react';
import { Link,useNavigate } from "react-router";
import {useAuth} from "../components/authContext";
import registeredUsers from '../data/users';

import './Auth.css';

// Login Component
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

   const { login } = useAuth();

  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    // setError('');
    setIsLoading(true);

    // console.log(username, password);
    console.log(typeof username, typeof password);

    // Validation
    if (!username || !password) {
      // setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

//     console.log("Entered username:", username);
// console.log("Entered password:", password);

// console.log("Entered password:", typeof username);
// console.log("Entered password:", typeof password);

// console.log("Registered users:", registeredUsers);
// console.log("Matching user:", registeredUsers.find(u => u.username === username && u.password === password));


    // Get registered users
  //   const user = registeredUsers.map(
  // u => console.log(typeof u.username, typeof u.password)
    const user = registeredUsers.find(
  u => u.username === username.trim() && u.password === password.trim()
);

    // console.log(registeredUsers)

    console.log(user)

    if (user) {
      // Login successful
      login(user);
      setIsLoading(false);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } else {
      // Login failed
      // setError('Invalid username or password');
      setIsLoading(false);
    }
  };

  if(isLoading){
    return (
        <div className="loading">
          <p> Loading...</p>
        </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-brand">GEODNATECH</h1>
        <h2 className="auth-title">Sign In</h2>
        
        <div className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-footer">
            <p className="forgot-link">Forgot Password ?</p>
            <button onClick={handleSubmit} className="btn-submit">Sign In</button>
          </div>

          <div className="auth-switch">
            Don't have an account yet ? 
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};



// Example App component showing both
// const AuthPages = () => {
//   const [currentPage, setCurrentPage] = useState('login');

//   return (
//     <div>
//       <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
//         <button 
//           onClick={() => setCurrentPage('login')}
//           style={{ 
//             padding: '10px 20px', 
//             marginRight: '10px',
//             background: currentPage === 'login' ? '#2563eb' : '#e5e7eb',
//             color: currentPage === 'login' ? 'white' : '#333',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Login
//         </button>
//         <button 
//           onClick={() => setCurrentPage('register')}
//           style={{ 
//             padding: '10px 20px',
//             background: currentPage === 'register' ? '#2563eb' : '#e5e7eb',
//             color: currentPage === 'register' ? 'white' : '#333',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Register
//         </button>
//       </div>
      
//       {currentPage === 'login' ? <Login /> : <Register />}
//     </div>
//   );
// };

export default Login