import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header_admin';
import DashboardHome from './DashboardHome';
import AddProperties from '../components/AddProperties';
import ManageProperties from '../components/ManageProperties';
import ManageInquiries from '../components/ManageInquiries';
import AddAdmins from '../components/AddAdmins';
import AnalysisReports from '../components/AnalysisReports';
import './Dashboard.css';

interface AdminDetails {
  id?: string;
  name?: string | null;
  email?: string;
}

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [adminName, setAdminName] = useState<string>('Admin');
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
  
  const navigate = useNavigate();

  // Fetch admin details
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('No token found');
          navigate('/login');
          return;
        }

        const response = await fetch('https://realestatebackend-8adg.onrender.com/admin/getadmindetails', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('authEmail');
            navigate('/login');
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AdminDetails = await response.json();
        console.log('Admin API Response:', data);
        
        // Extract name from API response
        let displayName = 'Admin';
        
        if (data.name && data.name.trim() !== '') {
          displayName = data.name;
        } else if (data.email) {
          // Fallback to email username if name is null
          const emailUsername = data.email.split('@')[0];
          displayName = emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
        }
        
        setAdminName(displayName);
      } catch (error) {
        console.error('Error fetching admin details:', error);
        // Fallback to email from localStorage
        const email = localStorage.getItem('authEmail');
        if (email) {
          const emailUsername = email.split('@')[0];
          setAdminName(emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1));
        }
      } finally {
        setIsLoadingAdmin(false);
      }
    };

    fetchAdminDetails();
  }, [navigate]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get the correct class based on sidebar state and mobile
  const getMainContentClass = () => {
    if (isMobile) {
      return 'main-content sidebar-collapsed';
    }
    return sidebarOpen ? 'main-content sidebar-open' : 'main-content sidebar-collapsed';
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        isOpen={sidebarOpen} 
        isMobile={isMobile} 
        toggleSidebar={toggleSidebar} 
      />
      
      <div className={getMainContentClass()}>
        <Header 
          toggleSidebar={toggleSidebar} 
          isMobile={isMobile}
          userName={isLoadingAdmin ? 'Loading...' : adminName}
        />
        
        <div className="dashboard-content-area">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/add-properties" element={<AddProperties />} />
            <Route path="/manage-properties" element={<ManageProperties />} />
            <Route path="/manage-inquiries" element={<ManageInquiries />} />
            <Route path="/add-admins" element={<AddAdmins />} />
            <Route path="/analysis-reports" element={<AnalysisReports />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;