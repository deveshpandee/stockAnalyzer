// src/components/NavBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/analyzeStock', label: 'Analyze Stock' },
    { to: '/getEvents', label: 'Get Events' }
  ];

  return (
    <nav style={{
      width: '220px',
      backgroundColor: '#1f2937',
      color: '#fff',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Stock App</h2>
      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          style={{
            color: location.pathname === link.to ? '#10b981' : '#f3f4f6',
            textDecoration: 'none',
            padding: '10px 0',
            fontWeight: location.pathname === link.to ? 'bold' : 'normal'
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default NavBar;
