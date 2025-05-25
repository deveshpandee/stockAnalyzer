import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook from react-router-dom
import NavBar from '../components/NavBar';

function HomePage() {
  const navigate = useNavigate();  // Create navigate function to navigate

  const handleButtonClick = () => {
    // Navigate to the Analyze Stock page when button is clicked
    navigate('/analyzeStock');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <NavBar />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fefce8', // Consistent background color
        padding: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', color: '#92400e', marginBottom: '1.5rem' }}>
          Welcome to the Stock App
        </h1>

        <p style={{ fontSize: '1.2rem', color: '#374151', maxWidth: '700px', marginBottom: '1rem' }}>
          This app helps you make smarter investment decisions by analyzing stocks from multiple perspectives.
        </p>
        <p style={{ fontSize: '1.2rem', color: '#374151', maxWidth: '700px', marginBottom: '1rem' }}>
          You can explore recent market events and evaluate individual stocks using news sentiment, technical indicators, fundamentals, social media trends, and insider trading data.
        </p>
        <p style={{ fontSize: '1.2rem', color: '#374151', maxWidth: '700px', marginBottom: '2rem' }}>
          Use the navigation menu on the left to get started.
        </p>

        {/* Button that navigates to Analyze Stock page */}
        <button
          style={{
            padding: '10px 20px', // Consistent padding as in AnalyzeStockPage and GetEventsPage
            fontSize: '1rem', // Consistent font size
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#f59e0b', // Matching button color
            color: '#fff',
            cursor: 'pointer',
            marginTop: '20px'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#d97706')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#f59e0b')}
          onClick={handleButtonClick}  // Add onClick handler to navigate
        >
          Get Started
        </button>

        {/* Disclaimer moved lower with additional margin */}
        <p style={{
          fontSize: '1rem',
          color: '#9ca3af',
          maxWidth: '700px',
          fontStyle: 'italic',
          marginTop: '100px'
        }}>
          Disclaimer: The dataset used in this app is limited and may not reflect real-time or comprehensive market data.
          Please do not rely solely on this tool for investment decisions.
        </p>

        {/* Social media links */}
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '1rem', color: '#374151' }}>Connect with me:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <a 
              href="https://github.com/deveshpandee" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#000', textDecoration: 'none', fontSize: '1.2rem' }}
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/pandey-devesh" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#0077b5', textDecoration: 'none', fontSize: '1.2rem' }}
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
