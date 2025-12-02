import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminLogin from './pages/AdminLogin';
import './App.css';

function App() {
  const isAuthenticated = true; // Replace with actual auth check

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
          />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;