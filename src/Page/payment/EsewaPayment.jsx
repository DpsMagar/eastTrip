import React, { useState } from 'react';
import axios from 'axios';

const EsewaPayment = () => {
  const [amount, setAmount] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/payment/prepare', {
        amount,
        taxAmount,
      });

      const paymentData = response.data;

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

      Object.entries(paymentData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(err.response?.data?.error || 'Payment initialization failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>eSewa Payment Gateway</h2>
      <form onSubmit={handlePayment} className="payment-form">
        <div className="form-group">
          <label>Amount (NPR):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Tax Amount (NPR):</label>
          <input
            type="number"
            value={taxAmount}
            onChange={(e) => setTaxAmount(e.target.value)}
            placeholder="Enter tax amount"
            required
            min="0"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="esewa-button" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Pay with eSewa'}
        </button>
      </form>
    </div>
  );
};

export default EsewaPayment;
