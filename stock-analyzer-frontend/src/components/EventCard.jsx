// src/components/EventCard.jsx
import React from 'react';

function EventCard({ event }) {
  return (
    <div
      style={{
        backgroundColor: '#fff',
        padding: '20px',
        marginBottom: '15px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ fontSize: '1.5rem', color: '#1f2937' }}>
        {event.type}
      </h3>
      <p style={{ fontSize: '1rem', color: '#6b7280' }}>
        <strong>Time: </strong>{event.time}
      </p>
      <p style={{ fontSize: '1rem', color: '#374151' }}>
        <strong>Description: </strong>{event.description}
      </p>
    </div>
  );
}

export default EventCard;
