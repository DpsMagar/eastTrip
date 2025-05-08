import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentSuccess = () => {
  const [message, setMessage] = useState('Verifying payment...');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const total_amount = params.get('total_amount');
    const transaction_uuid = params.get('transaction_uuid');
    const product_code = params.get('product_code');
    const signature = params.get('signature');

    if (total_amount && transaction_uuid && product_code && signature) {
      axios
        .post('http://localhost:8080/api/payment/verify', {
          total_amount,
          transaction_uuid,
          product_code,
          signature,
        })
        .then((res) => setMessage(res.data))
        .catch((err) => setMessage(err.response?.data || 'Verification failed'));
    } else {
      setMessage('Missing payment details');
    }
  }, []);

  return (
    <div>
      <h2>Payment Success</h2>
      <p>{message}</p>
    </div>
  );
};

export default PaymentSuccess;
