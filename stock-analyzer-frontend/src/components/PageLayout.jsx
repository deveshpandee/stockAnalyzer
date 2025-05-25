// src/components/PageLayout.jsx
import React from 'react';

function PageLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',  // Stacks components vertically
      minHeight: '100vh',       // Ensures full height of the page
    }}>
      {children}
    </div>
  );
}

export default PageLayout;
