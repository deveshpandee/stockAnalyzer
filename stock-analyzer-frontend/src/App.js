// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AnalyzeStockPage from './pages/AnalyzeStockPage';
import GetEventsPage from './pages/GetEventsPage'; // create this next

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyzeStock" element={<AnalyzeStockPage />} />
        <Route path="/getEvents" element={<GetEventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
