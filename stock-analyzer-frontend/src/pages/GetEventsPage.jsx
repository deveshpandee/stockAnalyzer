import React, { useState } from 'react';
import NavBar from '../components/NavBar';

function GetEventsPage() {
  const [stock, setStock] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!stock.trim()) {
      alert('Please enter a stock symbol.');
      return;
    }

    setLoading(true);
    setError('');
    setEvents([]);

    try {
      const response = await fetch(`http://localhost:8000/api/events/${stock}`);
      const data = await response.json();

      if (data.events && data.events.length > 0) {
        setEvents(data.events);
      } else {
        setError(`No events found for ${stock.toUpperCase()}.`);
      }
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <NavBar />

      <div style={{
        flex: 1,
        backgroundColor: '#fefce8',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#92400e', marginBottom: '1rem' }}>
          Get Recent Events
        </h2>

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

        {loading && <p style={{ color: '#92400e' }}>Loading...</p>}

        {error && (
          <p style={{ color: '#92400e', fontSize: '1.2rem' }}>
            {error}
          </p>
        )}

        {events.length > 0 && (
          <div style={{ marginTop: '1rem', width: '100%', maxWidth: '800px' }}>
            {events.map((event, index) => (
              <div
                key={index}
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GetEventsPage;
