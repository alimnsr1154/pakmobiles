import React from 'react';
import Dashboard from './components/js/Dashboard';
import PhoneDetail from './components/js/PhoneDetail'; // Import PhoneDetail
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateListing from './components/js/CreateListing';
import PhoneComparison from './components/js/PhoneComparison';
import './App.css';
import Login from './components/login';
import 'node-libs-browser/mock/process'; //furqan
import SignUp from './components/Signup'; // Create SignUp component if not already done
import MessagePage from './components/Messagepage';
import { Sign } from 'crypto'; //furqan


function App() {
  return (
    <div className="App">
      {/* <MessagePage/> */}
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/PhoneDetail" element={<PhoneDetail />}/>
          <Route path="/CreateListing" element={<CreateListing />} />
          <Route path="/PhoneComparison" element={<PhoneComparison />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;