import { createContext, useContext, useState,useRef } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [dataPlans, setDataPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

    const verifyingRef = useRef(false);


   const token = localStorage.getItem('token') || [];

////////////////////


  const fetchDataPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      // const response = await fetch('http://localhost:5000/api/v1/vtu/data-plans', {
      const response = await fetch('https://vtu-backend-wjn6.onrender.com/api/v1/vtu/data-plans', {
        method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
      const data = await response.json();
      console.log('Fetched data plans:', data);

      if(data.status === 'success') {
        setLoading(false);
        setDataPlans(data.data);
      }
    } catch (error) {
      console.error('Error fetching data plans:', error);
      setError('Failed to fetch data plans');
    }
  };

    const fundWallet = async (amount) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch('https://vtu-backend-wjn6.onrender.com/api/v1/wallet/fund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ amount })
    });

    const data = await res.json();
     console.log(data)

    if (!res.ok || data.status !== 'success') {
      throw new Error(data.message || 'Payment initialization failed');
    }

    // 🔴 Redirect user to Paystack checkout
    window.location.href = data.authorization_url;

  } catch (error) {
    console.error('Fund wallet error:', error.message);
  setError(error.message);
  }
    };


    const verifyWalletFunding = async (reference) => {

       if (verifyingRef.current) return false; // 🚫 stop duplicates
    verifyingRef.current = true;

  setLoading(true);
  setError(null)

  try {
    const res = await fetch(
      // `http://localhost:5000/api/v1/wallet/verify?reference=${reference}`,{
      `https://vtu-backend-wjn6.onrender.com/api/v1/wallet/verify?reference=${reference}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    setBalance(data.data.wallet.balance);
    setTransactions((prev) => [
      data.data.transaction,
      ...prev,
    ]);

    return true;
  } catch (error) {
    setError(error.message);
    return false;
  } finally {
    setLoading(false);
  }
};


const buyData = async (payload) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { success: false, message: 'User not authenticated' };
  }

  setLoading(true);
  setError(null);

  try {
    const res = await fetch(
      // 'http://localhost:5000/api/v1/vtu/buy-data',
      'https://vtu-backend-wjn6.onrender.com/api/v1/vtu/buy-data',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      throw new Error(data.message || 'Data purchase failed');
    }

    // ✅ Update wallet
    setBalance(data.data.wallet.balance);

    // ✅ Update transactions
    setTransactions((prev) => [
      data.data.transaction,
      ...prev,
    ]);

    return {
      success: true,
      data: data.data,
    };

  } catch (error) {
    setError(error.message);

    return {
      success: false,
      message: error.message,
    };
  } finally {
    setLoading(false);
  }
};

const buyAirtime = async (payload) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { success: false, message: 'User not authenticated' };
  }

  setLoading(true);
  setError(null);

  try {
    const res = await fetch(
      // 'http://localhost:5000/api/v1/vtu/buy-airtime',
      'https://vtu-backend-wjn6.onrender.com/api/v1/vtu/buy-airtime',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      throw new Error(data.message || 'Data purchase failed');
    }

    // ✅ Update wallet
    setBalance(data.data.wallet.balance);

    // ✅ Update transactions
    setTransactions((prev) => [
      data.data.transaction,
      ...prev,
    ]);

    return {
      status: true,
      data: data.data,
    };

  } catch (error) {
    setError(error.message);

    return {
      status: false,
      message: error.message,
    };
  } finally {
    setLoading(false);
  }
};

const meterRecharge = async (payload) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { success: false, message: 'User not authenticated' };
  }

  setLoading(true);
  setError(null);

  try {
    const res = await fetch(
      // 'http://localhost:5000/api/v1/vtu/recharge-meter',
      'https://vtu-backend-wjn6.onrender.com/api/v1/vtu/recharge-meter',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok || data.status !== 'success') {
      throw new Error(data.message || 'Data purchase failed');
    }

    // ✅ Update wallet
    setBalance(data.data.wallet.balance);

    // ✅ Update transactions
    setTransactions((prev) => [
      data.data.transaction,
      ...prev,
    ]);

    return {
      status: true,
      data: data.data,
    };

  } catch (error) {
    setError(error.message);

    return {
      status: false,
      message: error.message,
    };
  } finally {
    setLoading(false);
  }
};




  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        loading,
        error,
        dataPlans,
        fetchDataPlans,
        fundWallet,
        verifyWalletFunding,
        buyData,
        buyAirtime,
        meterRecharge
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
