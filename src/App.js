import React from 'react';
import Dashboard from './components/js/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateListing from './components/js/CreateListing';
import PhoneComparison from './components/js/PhoneComparison';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/PhoneDetail" />
          <Route path="/CreateListing" element={<CreateListing />} />
          <Route path="/PhoneComparison" element={<PhoneComparison />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;