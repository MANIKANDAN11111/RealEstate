import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

interface HeaderProps {
  toggleSidebar: () => void;
  isMobile: boolean;
  userName?: string; // Made optional since we'll fetch it if not provided
}

interface AdminDetails {
  name?: string;
  fullName?: string;
  firstName?: string;
  adminName?: string;
  username?: string;
  email?: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isMobile, userName: userNameProp }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationBtnRef = useRef<HTMLButtonElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);

  const notifications = [
    { id: 1, text: 'New property listing approved', time: '5 min ago' },
    { id: 2, text: 'Payment received from Alex Johnson', time: '1 hour ago' },
    { id: 3, text: 'System maintenance scheduled', time: '2 hours ago' },
  ];

  // Fetch admin details on component mount
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('No token found in localStorage');
          setIsLoadingAdmin(false);
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
            // Token expired or invalid - redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('authEmail');
            window.location.href = '/login';
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AdminDetails = await response.json();
        console.log('Admin API Response:', data); // Debug log to see actual response
        setAdminDetails(data);
      } catch (error) {
        console.error('Error fetching admin details:', error);
        // Fallback to email from localStorage
        const email = localStorage.getItem('authEmail');
        if (email) {
          setAdminDetails({ email });
        }
      } finally {
        setIsLoadingAdmin(false);
      }
    };

    fetchAdminDetails();
  }, []);

  // Get display name from admin details or props
  const getDisplayName = (): string => {
    if (userNameProp) return userNameProp;
    if (!adminDetails) return 'Admin';
    
    // If name exists and is not null, use it
    if (adminDetails.name && adminDetails.name.trim() !== '') {
      return adminDetails.name;
    }
    
    // Otherwise, create a display name from email
    if (adminDetails.email) {
      const emailUsername = adminDetails.email.split('@')[0];
      // Capitalize first letter: admin -> Admin
      return emailUsername.charAt(0).toUpperCase() + emailUsername.slice(1);
    }
    
    return 'Admin';
  };

  // Get admin email
  const getAdminEmail = (): string => {
    if (adminDetails?.email) return adminDetails.email;
    return localStorage.getItem('authEmail') || 'admin@example.com';
  };

  // Get avatar initial
  const getAvatarInitial = (): string => {
    const displayName = getDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showNotifications && 
        notificationRef.current && 
        notificationBtnRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        !notificationBtnRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      
      if (
        showProfileMenu && 
        profileRef.current && 
        profileBtnRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        !profileBtnRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications, showProfileMenu]);

  // Close dropdowns when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem('token');
    localStorage.removeItem('authEmail');
    
    // Close dropdown
    setShowProfileMenu(false);
    
    // Redirect to login
    window.location.href = '/login';
  };

  const displayName = getDisplayName();
  const adminEmail = getAdminEmail();
  const avatarInitial = getAvatarInitial();

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
          ☰
        </button>
        <div className="breadcrumb">
          <span>Dashboard</span>
          <span className="separator">/</span>
          <span className="current">Overview</span>
        </div>
      </div>

      <div className="header-right">
        <div className="search-container">
          <button className="search-btn" aria-label="Search">🔍</button>
          <input 
            type="text" 
            placeholder="Search properties, users..." 
            className="search-input"
          />
        </div>

        <div className="notification-container" ref={notificationRef}>
          <button 
            ref={notificationBtnRef}
            className="notification-btn"
            onClick={handleNotificationClick}
            aria-expanded={showNotifications}
            aria-label="Notifications"
          >
            <span className="notification-icon">🔔</span>
            <span className="notification-badge">3</span>
          </button>
          
          {showNotifications && (
            <>
              {isMobile && (
                <div 
                  className="dropdown-backdrop" 
                  onClick={() => setShowNotifications(false)}
                />
              )}
              
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h4>Notifications</h4>
                  <button className="mark-read" onClick={() => setShowNotifications(false)}>
                    Mark all read
                  </button>
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
                <button className="view-all-notifications" onClick={() => setShowNotifications(false)}>
                  View all notifications
                </button>
              </div>
            </>
          )}
        </div>

        <div className="profile-container" ref={profileRef}>
          <button 
            ref={profileBtnRef}
            className="profile-btn"
            onClick={handleProfileClick}
            aria-expanded={showProfileMenu}
            aria-label="Profile menu"
          >
            <div className="profile-avatar">
              {isLoadingAdmin ? '...' : avatarInitial}
            </div>
            <div className="profile-info">
              <span className="profile-name">
                {isLoadingAdmin ? 'Loading...' : displayName}
              </span>
              <span className="profile-role">Admin</span>
            </div>
            <span className={`dropdown-arrow ${showProfileMenu ? 'rotated' : ''}`}>▼</span>
          </button>

          {showProfileMenu && (
            <>
              {isMobile && (
                <div 
                  className="dropdown-backdrop" 
                  onClick={() => setShowProfileMenu(false)}
                />
              )}
              
              <div className="profile-dropdown">
                <div className="dropdown-section">
                  <div className="dropdown-profile-info">
                    <div className="dropdown-avatar">
                      {avatarInitial}
                    </div>
                    <div>
                      <p className="dropdown-name">{displayName}</p>
                      <p className="dropdown-email">{adminEmail}</p>
                    </div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <a href="/profile" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                  <span className="dropdown-icon">👤</span>
                  <span>My Profile</span>
                </a>
                <a href="/settings" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                  <span className="dropdown-icon">⚙️</span>
                  <span>Account Settings</span>
                </a>
                
                <div className="dropdown-divider"></div>
                
                <a href="/help" className="dropdown-item" onClick={() => setShowProfileMenu(false)}>
                  <span className="dropdown-icon">❓</span>
                  <span>Help & Support</span>
                </a>
                
                <div className="dropdown-divider"></div>
                
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <span className="dropdown-icon">🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;