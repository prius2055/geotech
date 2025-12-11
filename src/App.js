import { Routes,Route } from 'react-router';
import { AuthProvider } from './components/authContext';

import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoutes from './components/ProtectedRoutes';

import './App.css';

function App() {
  return (
<AuthProvider>
     <div className="App">

      <Routes>
        <Route path='/' element={<Homepage/>}/>

         <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard/>
            </ProtectedRoutes>
          }
        />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
      </Routes>
    </div>
</AuthProvider>

 
  );
}

export default App;
