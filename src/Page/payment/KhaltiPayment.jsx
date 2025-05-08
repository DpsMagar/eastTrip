import React, { useEffect } from 'react';

const KhaltiPayment = () => {
  useEffect(() => {
    // Dynamically load the Khalti Checkout script
    const script = document.createElement('script');
    script.src = 'https://khalti.com/static/khalti-checkout.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Configure Khalti Checkout
      const config = {
        publicKey: '31ab093ec1c543bfa350cda3ee9f2453', // Your Khalti public key
        productIdentity: '1234567890', // Unique product or order ID
        productName: 'Sample Product', // Product name
        productUrl: 'http://localhost:3000', // URL of your product page (or homepage)
        amount: 1000, // Amount in paisa (1 NPR = 100 paisa)
        
        eventHandler: {
          onSuccess(payload) {
            console.log('Payment Success', payload);

            // Send payment details to backend for verification
            fetch('http://localhost:8080/api/khalti/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                token: payload.token,
                amount: payload.amount,
              }),
            })
              .then((res) => res.text())
              .then((data) => {
                alert('Verification Response: ' + data); // Show response from backend
              })
              .catch((err) => {
                alert('Verification failed');
                console.error(err);
              });
          },
          onError(error) {
            console.error('Payment Error', error);
          },
          onClose() {
            console.log('Widget Closed');
          },
        },
      };

      // Initialize Khalti Checkout
      const checkout = new window.KhaltiCheckout(config);

      // Trigger Khalti Checkout on button click
      document.getElementById('pay-button').onclick = () => {
        checkout.show({ amount: 1000 });
      };
    };

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Pay with Khalti</h2>
      <button
        id="pay-button"
        style={{
          padding: '10px 20px',
          backgroundColor: '#5c2d91',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Pay NPR 10
      </button>
    </div>
  );
};

export default KhaltiPayment;
