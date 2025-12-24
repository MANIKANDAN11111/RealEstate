import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import { useState } from 'react';
import HomePage from './components/users/home_user'; 
import Buy from './pages/users/Buy';
import Sell from './pages/users/Sell';
import Advertise from './pages/users/AdvertiseProperty';
import Contact from './pages/users/ContactUs';
import PropertyDetails from './pages/users/buy_view_details';

import './App.css';  
import Property from './pages/users/buy_view_details';

function App() {
  // Add state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Start as false

  // Login function to be passed to AdminLogin
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/advertise" element={<Advertise />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Property" element={<Property />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          
          {/* Admin Login Route */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" /> : 
                <AdminLogin onLogin={handleLogin} />
            } 
          />
          
          {/* Admin Dashboard Route */}
          <Route 
            path="/dashboard/*" 
            element={
              isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/login" /> 
            } 
          />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;