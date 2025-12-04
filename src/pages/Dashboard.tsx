import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardHome from './DashboardHome';
import AddProperties from '../components/AddProperties';
import ManageProperties from '../components/ManageProperties';
import ManageInquiries from '../components/ManageInquiries';
import AddAdmins from '../components/AddAdmins';
import AnalysisReports from '../components/AnalysisReports';
import './Dashboard.css';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Auto-close sidebar on mobile
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
          userName="Brooklyn Simmons"
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