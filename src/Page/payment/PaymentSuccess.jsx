import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentSuccess = () => {
  const [message, setMessage] = useState('Verifying payment...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const base64Data = params.get('data');

    if (!base64Data) {
      setMessage('Missing payment data');
      return;
    }

    try {
      // Decode Base64 response
      const decodedStr = atob(base64Data);
      const decodedData = JSON.parse(decodedStr);

      // Send to backend for verification
      axios.post('http://localhost:8080/api/payment/verify', decodedData)
        .then(res => setMessage(res.data))
        .catch(err => {
          console.error('Verification Error:', err.response?.data);
          setMessage('Verification failed');
        });

    } catch (error) {
      console.error('Decoding Error:', error);
      setMessage('Invalid payment data');
    }
  }, []);

  return (
    <div>
      <h2>Payment Status</h2>
      <p>{message}</p>
    </div>
  );
};

export default PaymentSuccess;