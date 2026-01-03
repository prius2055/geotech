import React, { useState, useEffect } from 'react';
import {useWallet} from './walletContext'
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import Header from './Header';

import './BuyData.css';

const applyResellerPrice = (amount) => {
  if (amount <= 500) return Math.ceil(amount * 1.2);
  if (amount < 1000) return Math.ceil(amount * 1.1);
  if (amount <= 3000) return Math.ceil(amount * 1.08);
  if (amount <= 5000) return Math.ceil(amount * 1.05);
  if (amount <= 12000) return Math.ceil(amount * 1.06);
  return Math.ceil(amount * 1.03);
};

const BuyData = () => {
  const [formData, setFormData] = useState({
    network: '',
    dataType: '',
    dataPlan: '',
    mobileNumber: '',
    amount: '',
    bypassValidator: false
  });
  const [availablePlans, setAvailablePlans] = useState([]);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {dataPlans,buyData} = useWallet()
  const navigate = useNavigate();

  // Close on escape key
  // useEffect(() => {
  //   const handleEscape = (e) => {
  //     if (e.key === 'Escape') onClose();
  //   };

  //   if (isOpen) {
  //     document.addEventListener('keydown', handleEscape);
  //     document.body.style.overflow = 'hidden';
  //   }

  //   return () => {
  //     document.removeEventListener('keydown', handleEscape);
  //     document.body.style.overflow = 'unset';
  //   };
  // }, [isOpen, onClose]);

 // Update available plans when network or dataType changes
 useEffect(() => {
  if (!formData.network || !formData.dataType) {
    setAvailablePlans([]);
    return;
  }

  const plans =
    dataPlans[formData.network]?.[formData.dataType] || [];

  const resellerPlans = plans.map((plan) => ({
    ...plan,
    plan_amount: applyResellerPrice(plan.plan_amount),
  }));

  setAvailablePlans(resellerPlans);
  setSelectedPlanDetails(null);

  setFormData((prev) => ({
    ...prev,
    dataPlan: '',
    amount: '',
  }));
}, [formData.network, formData.dataType,dataPlans]);


  // Update amount when data plan changes
  useEffect(() => {
    if (formData.dataPlan && formData.network && formData.dataType) {
      const plans = dataPlans[formData.network]?.[formData.dataType] || [];
      const selectedPlan = plans.find(plan => plan.id === Number(formData.dataPlan));

      const selectedResellerPlans = {
        ...selectedPlan,
        plan_amount: selectedPlan.plan_amount <= 500 
        ? Math.ceil(selectedPlan.plan_amount * 1.2) : selectedPlan.plan_amount < 1000 
        ? Math.ceil(selectedPlan.plan_amount * 1.1) : selectedPlan.plan_amount <= 3000 
        ? Math.ceil(selectedPlan.plan_amount * 1.08) : selectedPlan.plan_amount <= 5000
        ? Math.ceil(selectedPlan.plan_amount * 1.05) : selectedPlan.plan_amount <= 12000
        ? Math.ceil(selectedPlan.plan_amount * 1.06) : Math.ceil(selectedPlan.plan_amount * 1.03)
      };

      if (selectedResellerPlans) {
        setSelectedPlanDetails(selectedResellerPlans);
        setFormData(prev => ({
          ...prev,
          amount: selectedResellerPlans.plan_amount
        }));
      }
    }
  }, [formData.dataPlan, formData.network, formData.dataType,dataPlans]);


  // Update amount when data plan changes
useEffect(() => {
  if (!formData.dataPlan) return;

  const selected = availablePlans.find(
    (p) => p.id === Number(formData.dataPlan)
  );

  if (!selected) return;

  setSelectedPlanDetails(selected);
  setFormData((prev) => ({
    ...prev,
    amount: selected.plan_amount,
  }));
}, [formData.dataPlan, availablePlans, dataPlans]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.network) {
      setError('Please select a network');
      return;
    }
    if (!formData.dataType) {
      setError('Please select a data type');
      return;
    }
    if (!formData.dataPlan) {
      setError('Please select a data plan');
      return;
    }
    if (!formData.mobileNumber) {
      setError('Please enter mobile number');
      return;
    }

 if (!selectedPlanDetails) {
      setError('Invalid data selected');
      return;
    }

    const payload = {
    network:Number(selectedPlanDetails.network),
    mobile_number:formData.mobileNumber,
    plan:selectedPlanDetails.id,
    amount:formData.amount,
    Ported_number:true
}

    setLoading(true);

    // TODO: Call your API here
    console.log('Buying data with:', {
      ...formData,
      planDetails: selectedPlanDetails
    });

    const result = await buyData(payload);

    console.log('Buy data result:', result);

    if (result.success) {
      setLoading(false);
      setError(false);
      navigate('/success', { replace: true } );
    }
  };


  return (
    <div className="buy-data-container">
      <SideBar />
      <div className="buy-data-content"> 
        <Header/>
        <div className="popup-container">

        <h2 className="popup-title">Buy Data Plan</h2>

        <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-row">
            {/* Left Column - Form */}
            <div className="form-column">
              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              {/* Network */}
              <div className="form-group">
                <label htmlFor="network">
                  Network<span className="required">*</span>
                </label>
                <select
                  id="network"
                  name="network"
                  value={formData.network}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Network --</option>
                  <option value="MTN_PLAN">MTN_PLAN</option>
                  <option value="AIRTEL_PLAN">AIRTEL_PLAN</option>
                  <option value="GLO_PLAN">GLO_PLAN</option>
                  <option value="9MOBILE_PLAN">9MOBILE_PLAN</option>
                </select>
              </div>

              {/* Data Type */}
              <div className="form-group">
                <label htmlFor="dataType">
                  Data Type<span className="required">*</span>
                </label>
                <select
                  id="dataType"
                  name="dataType"
                  value={formData.dataType}
                  onChange={handleChange}
                  disabled={!formData.network}
                  required
                >
                  <option value="">-- Select Data Type --</option>
                  <option value="SME">SME</option>
                  <option value="GIFTING">GIFTING</option>
                  <option value="CORPORATE_GIFTING">CORPORATE GIFTING</option>
                  <option value="DATA_SHARE">DATA SHARE</option>
                </select>
                <small className="form-hint">
                  Select Plan Type: SME, GIFTING, CORPORATE GIFTING, or DATA SHARE
                </small>
              </div>

              {/* Data Plan */}
              <div className="form-group">
                <label htmlFor="dataPlan">
                  Data Plan<span className="required">*</span>
                </label>
                <select
                  id="dataPlan"
                  name="dataPlan"
                  value={formData.dataPlan}
                  onChange={handleChange}
                  disabled={!formData.dataType || availablePlans.length === 0}
                  required
                >
                  <option value="">-- Select Data Plan --</option>
                  {availablePlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.plan} - ₦{plan.plan_amount} ({plan.month_validate})
                    </option>
                  ))}
                </select>
                {availablePlans.length === 0 && formData.dataType && (
                  <small className="form-hint text-warning">
                    No plans available for selected data type
                  </small>
                )}
              </div>

              {/* Mobile Number */}
              <div className="form-group">
                <label htmlFor="mobileNumber">
                  Mobile Number<span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="08012345678"
                  maxLength="11"
                  required
                />
              </div>

              {/* Amount (Read-only) */}
              <div className="form-group">
                <label htmlFor="amount">
                  Amount (₦)<span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  readOnly
                  className="readonly-input"
                  placeholder="Select a plan to see amount"
                />
                {selectedPlanDetails && (
                  <small className="form-hint text-success">
                    ✓ {selectedPlanDetails.plan} - Valid for {selectedPlanDetails.month_validate}
                  </small>
                )}
              </div>

              {/* Bypass Validator */}
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="bypassValidator"
                    checked={formData.bypassValidator}
                    onChange={handleChange}
                  />
                  <span>Bypass number validator</span>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-buy-now"
                disabled={loading || !formData.amount}
              >
                {loading ? 'Processing...' : `Buy Now - ₦${formData.amount || '0'}`}
              </button>
            </div>

            {/* Right Column - Info */}
            <div className="info-column">
              <h3 className="info-title">Codes for Data Balance:</h3>
              <div className="info-cards">
                <div className="info-card mtn">
                  <strong>MTN [SME]</strong> *461*4#
                </div>
                <div className="info-card mtn">
                  <strong>MTN [Gifting]</strong> *323#
                </div>
                <div className="info-card mtn">
                  <strong>MTN [Corporate Gifting]</strong> *323*1#
                </div>
                <div className="info-card mtn">
                  <strong>MTN [data coupon]</strong> send 2 to 312 as a text, it's called promo data
                </div>
                <div className="info-card nine-mobile">
                  <strong>9mobile [C.G and Gifting]</strong> *323#
                </div>
                <div className="info-card airtel">
                  <strong>Airtel [Gifting]</strong> *323#
                </div>
                <div className="info-card airtel">
                  <strong>Airtel [C.G.]</strong> *323#. it's called edu data.
                </div>
                <div className="info-card glo">
                  <strong>Glo [C.G and Gifting]</strong> *323#
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default BuyData;