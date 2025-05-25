// src/components/GetEventsButton.jsx
import React from 'react';

function GetEventsButton({ handleSubmit }) {
  return (
    <button
      onClick={handleSubmit}
      style={{
        padding: '10px 20px',
        fontSize: '1rem',
        borderRadius: '8px',
        backgroundColor: '#f59e0b',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '1rem'
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#d97706')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#f59e0b')}
    >
      Get Events
    </button>
  );
}

export default GetEventsButton;
