import React, { useState } from 'react';
import NavBar from '../components/NavBar';

function AnalyzeStockPage() {
  const [stock, setStock] = useState('');
  const [loading, setLoading] = useState(null);
  const [results, setResults] = useState({});
  const [stockName, setStockName] = useState('');

  const endpoints = {
    'News Analysis': 'news',
    'Technical Analysis': 'technical',
    'Fundamental Analysis': 'fundamental',
    'Social Sentiment': 'social',
    'Insider Activity': 'insider'
  };

  const handleClick = async (type) => {
    if (!stock) {
      alert('Please enter a stock symbol.');
      return;
    }

    const endpoint = endpoints[type];
    const url = `http://localhost:8000/api/analyze/${endpoint}/${stock}`;

    try {
      setLoading(endpoint);
      const response = await fetch(url);
      const data = await response.json();

      // Set the stock name from the API response
      setStockName(data.stock);

      setResults(prev => ({
        ...prev,
        [endpoint]: data // Save the raw data for later display
      }));
    } catch (error) {
      setResults(prev => ({
        ...prev,
        [endpoint]: `Error: ${error.message}`
      }));
    } finally {
      setLoading(null);
    }
  };

  const buttonTypes = Object.keys(endpoints);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <NavBar />

      <div style={{
        flex: 1,
        backgroundColor: '#fefce8', // Matching background color
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#92400e', marginBottom: '1rem' }}>
          Analyze Stock
        </h2>

        <label style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          Enter the stock to be analyzed:
        </label>

        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="e.g., AAPL"
          style={{
            padding: '10px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #d97706',
            width: '300px',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}
        />

        {buttonTypes.map((type) => {
          const endpoint = endpoints[type];
          return (
            <div key={type} style={{ marginBottom: '30px', width: '100%', maxWidth: '700px' }}>
              <button
                onClick={() => handleClick(type)}
                style={{
                  padding: '10px 20px', // Matching button padding size
                  fontSize: '1rem',      // Standardized font size
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#f59e0b', // Matching button color
                  color: '#fff',
                  cursor: 'pointer',
                  width: '100%'         // Full width for consistency
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#d97706')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#f59e0b')}
              >
                {type}
              </button>

              {loading === endpoint ? (
                <p style={{ textAlign: 'center', marginTop: '10px' }}>Loading...</p>
              ) : results[endpoint] ? (
                <div style={{
                  backgroundColor: '#fff',
                  padding: '20px',
                  marginTop: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}>
                  <div style={{ marginBottom: '10px' }}>
                    <h3 style={{ color: '#92400e' }}>Stock Analysis for: {stockName.toUpperCase()}</h3>
                  </div>

                  {/* Decision */}
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Decision:</strong>
                    <span
                      style={{
                        color: results[endpoint].decision === 'Buy' ? 'green' :
                               results[endpoint].decision === 'Hold' ? 'orange' :
                               results[endpoint].decision === 'Sell' ? 'red' :
                               results[endpoint].decision === 'No' ? 'red' :
                               results[endpoint].decision === 'Yes' ? 'green' : 'gray',
                        fontWeight: 'bold',
                        marginLeft: '10px'
                      }}
                    >
                      {results[endpoint].decision === 'No' ? 'Risky Investment' :
                       results[endpoint].decision === 'Yes' ? 'Safe to Invest' :
                       results[endpoint].decision}
                    </span>
                  </div>

                  {/* Confidence Level */}
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Confidence Level:</strong> <span>{results[endpoint].confidence_level}</span>
                  </div>

                  {/* Reason */}
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Reason:</strong> <p>{results[endpoint].reason}</p>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AnalyzeStockPage;
