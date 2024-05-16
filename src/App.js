// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateListing from "./components/js/CreateListing";
import PhoneComparison from "./components/js/PhoneComparison";
import "./App.css";
import Login from "./components/js/login";
import SignUp from "./components/js/Signup";
import Dashboard from "./components/js/Dashboard";
import PhoneDetail from "./components/js/PhoneDetail";
import MessagePage from "./components/js/Messagepage"
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/PhoneDetail" element={<PhoneDetail />} />
            <Route path="/CreateListing" element={<CreateListing />} />
            <Route path="/PhoneComparison" element={<PhoneComparison />} />
            <Route path="/Chats" element={<MessagePage />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
