import React, { useState } from 'react';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile: boolean;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isMobile, userName }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, text: 'New property listing approved', time: '5 min ago' },
    { id: 2, text: 'Payment received from Alex Johnson', time: '1 hour ago' },
    { id: 3, text: 'System maintenance scheduled', time: '2 hours ago' },
  ];

  return (
    <header className="dashboard-header">
      {/* Left Section */}
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          {isMobile ? '☰' : '☰'}
        </button>
        <div className="breadcrumb">
          <span>Dashboard</span>
          <span className="separator">/</span>
          <span className="current">Overview</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Search */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search properties, users..." 
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        {/* Notifications */}
        <div className="notification-container">
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
            <span className="notification-badge">3</span>
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>Notifications</h4>
                <button className="mark-read">Mark all read</button>
              </div>
              <div className="notification-list">
                {notifications.map(notif => (
                  <div key={notif.id} className="notification-item">
                    <div className="notification-content">
                      <p>{notif.text}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                    <div className="notification-dot"></div>
                  </div>
                ))}
              </div>
              <button className="view-all-notifications">
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="profile-container">
          <button 
            className="profile-btn"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-avatar">
              {userName.charAt(0)}
            </div>
            <div className="profile-info">
              <span className="profile-name">{userName}</span>
              <span className="profile-role">Admin</span>
            </div>
            <span className="dropdown-arrow">▼</span>
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-section">
                <div className="dropdown-profile-info">
                  <div className="dropdown-avatar">
                    {userName.charAt(0)}
                  </div>
                  <div>
                    <p className="dropdown-name">{userName}</p>
                    <p className="dropdown-email">brooklyn@ananthigroup.com</p>
                  </div>
                </div>
              </div>
              
              <div className="dropdown-divider"></div>
              
              <a href="/profile" className="dropdown-item">
                👤 My Profile
              </a>
              <a href="/settings" className="dropdown-item">
                ⚙️ Account Settings
              </a>
              
              <div className="dropdown-divider"></div>
              
              <a href="/help" className="dropdown-item">
                ❓ Help & Support
              </a>
              
              <div className="dropdown-divider"></div>
              
              <button className="dropdown-item logout">
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;