// src/components/ErrorMessage.jsx
import React from 'react';

function ErrorMessage({ error }) {
  return <p style={{ color: '#92400e', fontSize: '1.2rem' }}>{error}</p>;
}

export default ErrorMessage;
