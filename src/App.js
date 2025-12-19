import { Routes,Route, BrowserRouter } from 'react-router';
import { AuthProvider } from './components/authContext';

import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import Confirmation from './pages/Confirmation';

import './App.css';

function App() {
  return (
  <BrowserRouter>
  <AuthProvider>
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard/>
            </ProtectedRoutes>
          }
        />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/confirmation' element={<Confirmation/>}/>
      </Routes>
    </div>
</AuthProvider>

 </BrowserRouter>
  );
}

export default App;
