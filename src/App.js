import { Routes,Route, BrowserRouter } from 'react-router';
import { AuthProvider } from './components/authContext';
import { WalletProvider } from './components/walletContext';

import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoutes from './components/ProtectedRoutes';
import Confirmation from './pages/Confirmation';
import PaymentForm from './components/PaymentForm';
import VerifyFunding from './components/VerifyFunding';
import BuyData from './components/BuyData';
import BuyAirtime from './components/BuyAirtime';
import EnergyMeter from './components/Utilities/EnergyMeter';
import CableTv from './components/Utilities/CableTv';
import ThankYou from './components/ThankYou';

import './App.css';
import { Cable } from 'lucide-react';

function App() {
  return (
  <BrowserRouter>
  <AuthProvider>
    <WalletProvider>
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoutes>
            <Dashboard/>
            </ProtectedRoutes>
          }
        />
        <Route path="/funding" element={
          <ProtectedRoutes>
            <PaymentForm/>
            </ProtectedRoutes>
          }
        />
        <Route path="/funding/verify" element={
          <ProtectedRoutes>
            <VerifyFunding/>
            </ProtectedRoutes>
          }
        />
        <Route path='/buy-data' element={
          <ProtectedRoutes>
             <BuyData />
          </ProtectedRoutes>
          }        
        />

        <Route path='/buy-airtime' element={
          <ProtectedRoutes>
             <BuyAirtime />
          </ProtectedRoutes>
          }        
        />
        <Route path='/utilities/recharge-meter' element={
          <ProtectedRoutes>
             <EnergyMeter />
          </ProtectedRoutes>
          }        
        />
        <Route path='/utilities/recharge-cable' element={
          <ProtectedRoutes>
             <CableTv />
          </ProtectedRoutes>
          }        
        />
        <Route path='/success' element={
          <ProtectedRoutes>
             <ThankYou />
          </ProtectedRoutes>
          }        
        />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/confirmation' element={<Confirmation/>}/>
      </Routes>
    </div>
    </WalletProvider>
</AuthProvider>

 </BrowserRouter>
  );
}

export default App;
