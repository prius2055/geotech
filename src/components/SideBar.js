import React, {useState} from 'react';
import { Home, BarChart2, Phone, Lightbulb, Wallet, DollarSign, UserPlus, Settings, Code, Menu, ChevronDown, Monitor, Zap } from 'lucide-react';
import { useWallet } from './walletContext';
import { useAuth } from './authContext';
import { NavLink} from 'react-router';
import { formatCurrency } from './utils/FormatCurrency';

import './Dashboard.css';

const SideBar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showUtilities, setShowUtilities] = useState(false);
    
    const {user} = useAuth();
    const {balance} = useWallet();
    
    const {username} = user|| 'Guest';

    
    return (
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
            <h2>Welcome</h2>
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu size={24} />
            </button>
        </div>
        
        <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-name">Hello,  {username}</div>
            <div className="user-balance">balance: {balance !== null ? formatCurrency(balance): 'Loading...'}</div>
        </div>
    
            <nav className="nav-menu">
              <NavLink className={`nav-item`} to='/dashboard'>
                <Home size={20} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink className="nav-item" to='/buy-data'>
                <BarChart2 size={20} />
                <span>Buy Data</span>
              </NavLink>
              <NavLink className="nav-item" to='/buy-bulk-sme-data'>
                <BarChart2 size={20} />
                <span>Buy BULK SME Data</span>
              </NavLink>
              <NavLink className="nav-item" to='/buy-bulk-airtel-cg-data'>
                <BarChart2 size={20} />
                <span>Buy BULK AIRTEL CG Data</span>
              </NavLink>
              <NavLink className="nav-item" to='/buy-airtime'>
                <Phone size={20} />
                <span>Buy Airtime</span>
              </NavLink>

              <div className='utilities'>
                <div className="nav-item" onClick={() => setShowUtilities(prev => !prev)}>
                  <Lightbulb size={20} />
                  <span>Utilities Payment</span>
                  <ChevronDown size={20} className={`nav-item-utils ${showUtilities ? 'open' : ''}`}/>
                </div>
                {showUtilities && (
                <div className="nav-children">
                  <NavLink className="nav-child" to='/utilities/recharge-meter'>
                    <Zap size={18} />
                    <span>Energy Meter Recharge</span>
                    </NavLink>
                    <NavLink className="nav-child" to='/utilities/recharge-cable'>
                      <Monitor size={18} />
                      <span>Cable Subscription</span>
                      </NavLink>
                      </div>
                    )}
    
    
           
              </div>
             
              <NavLink to='/funding' className="nav-item">
                <Wallet size={20} />
                <span>Fund Wallet</span>
              </NavLink>
              <div className="nav-item">
                <DollarSign size={20} />
                <span>Pricing</span>
              </div>
              <div className="nav-item">
                <UserPlus size={20} />
                <span>Account</span>
              </div>
              <div className="nav-item">
                <Settings size={20} />
                <span>Change Pin</span>
              </div>
              <div className="nav-item">
                <Settings size={20} />
                <span>Setting</span>
              </div>
              <div className="nav-item">
                <Code size={20} />
                <span>Developer's API</span>
              </div>
            </nav>
    
            <div className="sidebar-footer">
              Version 7.6
            </div>
          </div>
  );
}  

export default SideBar;