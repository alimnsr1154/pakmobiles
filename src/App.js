import React from 'react';
import Dashboard from './components/js/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateListing from './components/CreateListing';
import PhoneComparison from './components/PhoneComparison';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/phoneDetail"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;