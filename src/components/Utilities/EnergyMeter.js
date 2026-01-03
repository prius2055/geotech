import React, { useState } from "react";
import SideBar from "../SideBar";
import Header from "../Header";
import'../BuyData.css';

const EnergyMeter = () => {
     const [formData, setFormData] = useState({
        discoName: '',
        meterNumber: '',
        meterType: '',
        customerPhone: '',
        amount: '',
        bypassValidator: false
      });
      
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState('');
      
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      // Validation
      if (!formData.discoName) {
        setError('Please select a disco');
        return;
      }

      if (!formData.meterType) {
        setError('Please select a meter type');
        return;
      }

      if (!formData.customerPhone) {
        setError('Please enter customer phone number');
        return;
      }
      
      if (!formData.meterNumber) {
        setError('Please enter meter number');
        return;
      }

      if (!formData.amount || formData.amount < 100) {
        setError('Please enter a valid amount (minimum ₦100)');
        return;
      }

    const payload = {
        disco_name: formData.discoName,
        amount:Number(formData.amount),
        meter_number: formData.meterNumber,
        MeterType: formData.meterNumber,
        customer_number: formData.customerPhone,
    };
    

    console.log(payload);

    setLoading(true);


    // const result = await buyAirtime(payload);

    
    // console.log(result);

    // if (result.status) {
    //   setLoading(false);
    //   setError(false);
    // }
  };

    return (
        <div className="buy-data-container">
            <SideBar/>
             <div className="buy-data-content">
              <Header/>
              <div className="popup-container">
                <h2 className="popup-title">Electricity Bill Payment</h2>
                <form onSubmit={handleSubmit} className="popup-form">
          <div className="form-row">
            {/* Left Column - Form */}
            <div className="form-column">
              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              {/* Disco */}
              <div className="form-group">
                <label htmlFor="disco">
                  Disco<span className="required">*</span>
                </label>
                <select
                  id="disco"
                  name="disco"
                  value={formData.discoName}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select Disco --</option>
                  <option value="1">Ikeja Electric</option>
                  <option value="2">Eko Electric</option>
                  <option value="3">Abuja Electric</option>
                  <option value="4">Kano Electric</option>
                  <option value="5">Enugu Electric</option>
                  <option value="6">Port Harcourt Electric</option>
                  <option value="7">Ibadan Electric</option>
                  <option value="8">Kaduna Electric</option>
                  <option value="9">Jos Electric</option>
                  <option value="10">Benin Electric</option>
                  <option value="11">Yola Electric</option>
                </select>
              </div>

           

              {/* Meter Number */}
              <div className="form-group">
                <label htmlFor="meterNumber">
                  Meter Number<span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="meterNumber"
                  name="meterNumber"
                  value={formData.meterNumber}
                  onChange={handleChange}
                  placeholder="0123456781111111"
                  required
                />
              </div>

               {/* Meter Type */}
              <div className="form-group">
                <label htmlFor="airtimeType">
                  Meter Type<span className="required">*</span>
                </label>
                <select
                  id="meterType"
                  name="meterType"
                  value={formData.meterType}
                  onChange={handleChange}
                  disabled={!formData.meterNumber}
                  required
                >
                  <option value="">-- Select Meter Type --</option>
                  <option value="1">PREPAID</option>
                    <option value="2">POSTPAID</option>
                </select>
                <small className="form-hint">
                  Select Meter Type: PREPAID or POSTPAID
                </small>
              </div>

              {/* Amount */}
              <div className="form-group">
                <label htmlFor="amount">
                  Amount To Pay (₦) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Minimum of ₦100"
                  min={100}
                />
              </div>

               {/* Customer Phone */}
              <div className="form-group">
                <label htmlFor="customerPhone">
                  Customer Phone <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  placeholder="08012345678"
                  min={11}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-buy-now"
                // disabled={loading || !formData.amount}
              >
                {loading ? 'Processing...' : `Buy Now - ₦${formData.amount || '0'}`}
              </button>
            </div>

            {/* Right Column - Info */}
            <div className="info-column">
              <h3 className="info-title">How to recharge your Energy meter:</h3>
              <div className="info-cards">
                <div className="info-card mtn">
                  <strong>Meter Token</strong> Enter the token sent to your phone
                </div>
                <div className="info-card nine-mobile">
                  <strong>Press Enter</strong> Press Enter on your meter keypad
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
        </div>
       
    );
}

export default EnergyMeter;