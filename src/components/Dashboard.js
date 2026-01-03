import React from 'react';
import { Link } from 'react-router-dom';
import {MessageCircle} from 'lucide-react';
import { useAuth } from './authContext';
import { useWallet } from './walletContext';


import SideBar from './SideBar';
import Header from './Header';
import './Dashboard.css';

const Dashboard = () => {

  const {user} = useAuth();
  const {balance} = useWallet();

  const {username} = user|| 'Guest';

 const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const serviceCards = [
    { icon: '📱', title: 'Data card Printing', color: '#f59e42' },
    { icon: '💳', title: 'Airtime TopUp', color: '#3b9fd8' },
    { icon: '📶', title: 'Buy Data', color: '#6ca843' },
    { icon: '💰', title: 'Airtime to cash', color: '#2d6f3f' },
    { icon: '💡', title: 'Electricity Bills', color: '#f59e42' },
    { icon: '📺', title: 'Cable Subscription', color: '#5c7cfa' },
    { icon: '💳', title: 'Bonus to wallet', color: '#3b9fd8' },
    { icon: '📚', title: 'Result Checker', color: '#2d5f8f' },
    { icon: '🎫', title: 'Recharge card Printing', color: '#888' },
    { icon: '👥', title: 'My Referrals', color: '#6c5ce7' }
  ];

  const balanceCards = [
    { icon: '💳', title: 'Wallet Balance', amount: `${balance !== null ? formatCurrency(balance): 'Loading...'}`, color: '#3b9fd8' },
    { icon: '📊', title: 'MTN SME DATA BALANCE', amount: '0.0 GB', color: '#3b9fd8' },
    { icon: '📊', title: 'AIRTEL CG DATA BALANCE', amount: '0.0 GB', color: '#3b9fd8' },
    { icon: '💰', title: 'Referral Bonus', amount: '₦ 0.0', color: '#3b9fd8' },
    { icon: '👥', title: 'My Total Referral', amount: '', color: '#6c5ce7' }
  ];

  const quickActions = [
    { icon: '🔄', title: 'get VFB Account', color: '#6c5ce7' },
    { icon: '📋', title: 'Transactions', color: '#6c5ce7' },
    { icon: '📱', title: 'Data Transactions', color: '#6c5ce7' },
    { icon: '📶', title: 'Airtime Transactions', color: '#6c5ce7' },
    { icon: '💳', title: 'Wallet summary', color: '#f59e42' },
    { icon: '⬆️', title: 'Upgrade to Reseller ₦1000', color: '#e74c3c' }
  ];


  return (
    <div className="dashboard-container">
    <SideBar />

      {/* <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
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
          <div className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')}>
            <Home size={20} />
            <span>Dashboard</span>
          </div>
          <div className="nav-item" onClick={openPopup}>
            <BarChart2 size={20} />
            <span>Buy Data</span>
          </div>
          <div className="nav-item">
            <BarChart2 size={20} />
            <span>Buy BULK SME Data</span>
          </div>
          <div className="nav-item">
            <BarChart2 size={20} />
            <span>Buy BULK AIRTEL CG Data</span>
          </div>
          <div className="nav-item" onClick={openBuyAirtimePopup}>
            <Phone size={20} />
            <span>Buy Airtime</span>
          </div>

          <div className='utilities'>
             <div className="nav-item" onClick={() => setShowUtilities(prev => !prev)}>
            <Lightbulb size={20} />
            <span>Utilities Payment</span>
            <ChevronDown size={20} className={`nav-item-utils ${showUtilities ? 'open' : ''}`}/>
               </div>
            {showUtilities && (
            <div className="nav-children">
              <div className="nav-child" onClick={openEnergyRechargePopup}>
                <Zap size={18} />
                <span>Energy Meter Recharge</span>
                </div>
                <div className="nav-child">
                  <Monitor size={18} />
                  <span>Cable Subscription</span>
                  </div>
                  </div>
                )}


       
          </div>
         
          <div className="nav-item">
            <Wallet size={20} />
            <span onClick={handleFundWallet}>Fund Wallet</span>
          </div>
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
      </div> */}

      <div className="main-content">
        {/* <div className="top-header">
          <button className="logout-btn"  onClick={handleSubmit}>
            Logout
          </button>
        </div> */}
<Header/>
        <Link to='/funding' className="fund-wallet-btn" >Fund Wallet</Link>

        <div className="content">
          <div className="announcement-banner">
            <div className="announcement-title">
              THERE IS AN UPWARD REVIEW OF GLO CG DATA BY 12am. MTN DATA COUPON IS GOING SMOOTHLY NOW
            </div>
          </div>

          <div className="greeting-section">
            <h2>Good morning, <strong>{username}</strong></h2>
            <div className="package-title">Package : Smart Earner</div>
            <div className="google-play-btn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
            </div>
            <button className="generate-vfb-btn">
              Generate Virtual Account<br/>to fund your wallet
            </button>
          </div>

          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <div key={index} className="quick-action-card">
                <div className="quick-action-icon" style={{ background: action.color }}>
                  {action.icon}
                </div>
                <div className="quick-action-title">{action.title}</div>
              </div>
            ))}
          </div>

          <div className="balance-cards-grid">
            {balanceCards.map((card, index) => (
              <div key={index} className="balance-card">
                <div className="balance-icon" style={{ background: card.color }}>
                  {card.icon}
                </div>
                <div className="balance-info">
                  <div className="balance-title">{card.title}</div>
                  <div className="balance-amount">{card.amount}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="info-cards-row">
            <div className="info-card" style={{ background: 'linear-gradient(135deg, #3b9fd8 0%, #2980b9 100%)' }}>
              <h3>Notifications</h3>
            </div>
            <div className="info-card" style={{ background: 'linear-gradient(135deg, #3b9fd8 0%, #2980b9 100%)' }}>
              <h3>FAQs:</h3>
              <p>Please go through them to have a better knowledge of this platform</p>
              <button className="info-card-btn">❓ FAQs</button>
            </div>
            <div className="info-card" style={{ background: 'linear-gradient(135deg, #3b9fd8 0%, #2980b9 100%)' }}>
              <h3>Support Team:</h3>
              <p>Have anything to say to us? Please contact our Support Team on Whatsapp</p>
              <button className="whatsapp-btn">💬 whatsapp us</button>
              <button className="whatsapp-btn">💬 Join Our Whatsapp group</button>
            </div>
          </div>

          <div className="services-grid">
            {serviceCards.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon" style={{ background: service.color }}>
                  {service.icon}
                </div>
                <div className="service-title">{service.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="whatsapp-float">
        <MessageCircle size={28} />
      </div>
    </div>
  );
};

export default Dashboard;