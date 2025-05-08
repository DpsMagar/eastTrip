import React from 'react';

const EsewaForm = ({ amount = 100 }) => {
  const txnId = `TXN_${Date.now()}`;

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main"
      method="POST"
      style={{ marginTop: '20px' }}
    >
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="total_amount" value={amount} />
      <input type="hidden" name="transaction_uuid" value={txnId} />
      <input type="hidden" name="product_code" value="EPAYTEST" />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input
        type="hidden"
        name="success_url"
        value={`https://easttrip.onrender.com/api/payment/success?txnId=${txnId}&amount=${amount}`}
      />
      <input
        type="hidden"
        name="failure_url"
        value="http://localhost:8080/api/payment/fail"
      />
      <button type="submit" style={{ padding: '10px 20px' }}>
        Pay with eSewa
      </button>
    </form>
  );
};

export default EsewaForm;
