// src/components/StockInput.jsx
import React from 'react';

function StockInput({ stock, setStock }) {
  return (
    <input
      type="text"
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      placeholder="Enter stock symbol (e.g., AAPL)"
      style={{
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid #d97706',
        width: '300px',
        marginBottom: '1rem',
        textAlign: 'center'
      }}
    />
  );
}

export default StockInput;
