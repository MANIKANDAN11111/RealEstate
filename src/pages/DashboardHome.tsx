import { useState, useEffect } from 'react';
import './DashboardHome.css';

const DashboardHome = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [adminName, setAdminName] = useState('Admin'); // Default fallback
  const [isLoadingAdmin, setIsLoadingAdmin] = useState(true);

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
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const adminData = await response.json();
        
        // Adjust these property names based on your actual API response
        // Common variations: name, fullName, firstName, adminName, username
        const name = adminData.name || adminData.fullName || adminData.firstName || adminData.adminName || adminData.username || 'Admin';
        
        setAdminName(name);
      } catch (error) {
        console.error('Error fetching admin details:', error);
        // Fallback to email from localStorage if API fails
        const email = localStorage.getItem('authEmail');
        if (email) {
          const nameFromEmail = email.split('@')[0];
          setAdminName(nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1));
        }
      } finally {
        setIsLoadingAdmin(false);
      }
    };

    fetchAdminDetails();
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Apply dark theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  // Get first letter of admin name for avatar
  const getAvatarInitial = () => {
    return adminName.charAt(0).toUpperCase();
  };

  // Stats Data
  const statsData = [
    {
      title: 'Total Properties',
      value: '156',
      changeType: 'positive',
      icon: '🏢',
      description: 'Total properties listed'
    },
    {
      title: 'Active Listings',
      value: '870',
      changeType: 'positive',
      icon: '📊',
      description: 'Currently active listings'
    },
    {
      title: 'New Users',
      value: '316',
      changeType: 'positive',
      icon: '👥',
      description: 'New users this month'
    },
    {
      title: 'Pending Inquiries',
      value: '42',
      changeType: 'negative',
      icon: '📨',
      description: 'Inquiries pending response'
    }
  ];

  // Quick Links
  const quickLinks = [
    { 
      title: 'Manage Properties', 
      icon: '🏢', 
      color: 'blue', 
      description: 'View and manage all properties',
      link: '/properties'
    },
    { 
      title: 'Approve Users', 
      icon: '👥', 
      color: 'green', 
      description: 'Approve new user registrations',
      link: '/users/approve'
    },
    { 
      title: 'View Reports', 
      icon: '📊', 
      color: 'purple', 
      description: 'Generate and view reports',
      link: '/reports'
    },
    { 
      title: 'System Health', 
      icon: '⚡', 
      color: 'orange', 
      description: 'Monitor system performance',
      link: '/system'
    }
  ];

  // Recent Updates Data
  const recentUpdates = [
    { 
      id: 1,
      type: 'success', 
      message: 'New property "Luxury Villa" approved', 
      time: '2 mins ago',
      icon: '✓'
    },
    { 
      id: 2,
      type: 'warning', 
      message: 'System maintenance at 2:00 AM', 
      time: '30 mins ago',
      icon: '!'
    },
    { 
      id: 3,
      type: 'info', 
      message: 'Monthly report generated successfully', 
      time: '2 hours ago',
      icon: 'i'
    },
    { 
      id: 4,
      type: 'success', 
      message: 'Backup completed successfully', 
      time: '1 day ago',
      icon: '✓'
    },
    { 
      id: 5,
      type: 'info', 
      message: 'New user registration from John Doe', 
      time: '1 day ago',
      icon: '👤'
    }
  ];

  // Property Status Data
  const propertyStatus = [
    {
      title: 'Active Listings',
      count: '87',
      trend: '+12%',
      trendType: 'up',
      icon: '🏢',
      color: 'green'
    },
    {
      title: 'Pending Approval',
      count: '12',
      trend: '-5%',
      trendType: 'down',
      icon: '⏳',
      color: 'yellow'
    },
    {
      title: 'Recently Sold',
      count: '5',
      trend: '+8%',
      trendType: 'up',
      icon: '💰',
      color: 'blue'
    },
    {
      title: 'Rented Out',
      count: '23',
      trend: '+15%',
      trendType: 'up',
      icon: '🏠',
      color: 'purple'
    },
    {
      title: 'Under Maintenance',
      count: '7',
      trend: '0%',
      trendType: 'neutral',
      icon: '🔧',
      color: 'orange'
    },
    {
      title: 'Vacant',
      count: '19',
      trend: '-3%',
      trendType: 'down',
      icon: '🚫',
      color: 'gray'
    }
  ];

  // Revenue Data for Chart
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    current: [45, 60, 55, 70, 65, 75, 80, 85, 75, 90, 85, 95],
    previous: [40, 55, 50, 65, 60, 70, 75, 80, 70, 85, 80, 90]
  };

  // System Stats Data
  const systemStats = [
    { label: 'Server Uptime', value: '99.8%', percentage: 99.8 },
    { label: 'Storage Used', value: '78%', percentage: 78 },
    { label: 'Active Users', value: '156', percentage: 70 },
    { label: 'Response Time', value: '45ms', percentage: 95 }
  ];

  // Top Performers Data
  const topPerformers = [
    { name: 'Modern Downtown Loft', type: 'Apartment', price: '$3,200', growth: '+24%' },
    { name: 'Luxury Villa', type: 'Villa', price: '$12,500', growth: '+18%' },
    { name: 'Beachside Cottage', type: 'Cottage', price: '$2,800', growth: '+15%' },
    { name: 'Suburban Family Home', type: 'House', price: '$4,500', growth: '+12%' }
  ];

  return (
    <div className="dashboard-home">
      {/* Header Section */}
      <div className="dashboard-header-section">
        <div className="welcome-section">
          <div className="user-avatar-large">
            <span>{isLoadingAdmin ? '...' : getAvatarInitial()}</span>
          </div>
          <div className="welcome-text">
            <h1>
              {isLoadingAdmin ? (
                'Loading...'
              ) : (
                `Welcome back, ${adminName}!`
              )}
            </h1>
            <p>Here's what's happening with your properties today.</p>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="date-info">
            <span className="current-date">{currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span className="current-time">{currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
          <div className="action-buttons">
            <button className="btn btn-primary">
              <span className="btn-icon">📊</span>
              <span className="btn-text">Generate Report</span>
            </button>
            <button className="btn btn-secondary">
              <span className="btn-icon">📥</span>
              <span className="btn-text">Export Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon-wrapper">
              <span className="stat-icon">{stat.icon}</span>
            </div>
            <div className="stat-content">
              <div className="stat-main">
                <span className="stat-value">{stat.value}</span>
              </div>
              <span className="stat-title">{stat.title}</span>
              <span className="stat-desc">{stat.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="main-content-area">
        {/* Revenue Chart Card */}
        <div className="card revenue-card full-width">
          <div className="card-header">
            <div className="card-title-section">
              <h3>Revenue Overview</h3>
              <p>Monthly revenue trends</p>
            </div>
            <div className="card-actions">
              <div className="time-select-wrapper">
                <select className="time-select">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This Year</option>
                  <option>Last Year</option>
                  <option>Custom Range</option>
                </select>
                <span className="select-arrow">▼</span>
              </div>
            </div>
          </div>
          <div className="card-content">
            <div className="revenue-chart">
              <div className="chart-bars">
                {revenueData.current.map((value, index) => (
                  <div key={index} className="chart-bar-group">
                    <div className="bar-container">
                      <div 
                        className="bar previous" 
                        style={{ height: `${revenueData.previous[index]}%` }}
                        title={`Previous: $${revenueData.previous[index]}k`}
                      ></div>
                      <div 
                        className="bar current" 
                        style={{ height: `${value}%` }}
                        title={`Current: $${value}k`}
                      ></div>
                    </div>
                    <span className="bar-label">{revenueData.labels[index]}</span>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-dot current"></span>
                  <span className="legend-text">Current Month</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot previous"></span>
                  <span className="legend-text">Previous Month</span>
                </div>
              </div>
            </div>
            <div className="revenue-summary">
              <div className="summary-item">
                <span className="summary-label">Total Revenue</span>
                <span className="summary-value">$845,250</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Growth Rate</span>
                <span className="summary-value positive">+12.8%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Avg. Monthly</span>
                <span className="summary-value">$70,438</span>
              </div>
            </div>
          </div>
        </div>

        {/* First Row: Quick Links and System Overview */}
        <div className="combined-cards-row">
          {/* Quick Actions Card */}
          <div className="card quick-links-card">
            <div className="card-header">
              <div className="card-title-section">
                <h3>Quick Actions</h3>
                <p>Access important sections quickly</p>
              </div>
            </div>
            <div className="card-content">
              <div className="quick-links-grid">
                {quickLinks.map((link, index) => (
                  <a key={index} href={link.link} className="quick-link-item">
                    <div className={`link-icon ${link.color}`}>
                      <span>{link.icon}</span>
                    </div>
                    <div className="link-content">
                      <span className="link-title">{link.title}</span>
                      <span className="link-desc">{link.description}</span>
                    </div>
                    <span className="link-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* System Overview Card */}
          <div className="card system-card">
            <div className="card-header">
              <div className="card-title-section">
                <h3>System Overview</h3>
                <p>Performance and health metrics</p>
              </div>
            </div>
            <div className="card-content">
              <div className="system-stats">
                {systemStats.map((stat, index) => (
                  <div key={index} className="system-stat-item">
                    <div className="stat-label-row">
                      <span className="stat-label">{stat.label}</span>
                      <span className="stat-value">{stat.value}</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${stat.percentage}%` }}
                        role="progressbar"
                        aria-valuenow={stat.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Property Status Card - Full Width */}
        <div className="card property-status-card full-width">
          <div className="card-header">
            <div className="card-title-section">
              <h3>Property Status Distribution</h3>
              <p>Current status of all properties</p>
            </div>
            <button className="btn btn-text">
              View Details →
            </button>
          </div>
          <div className="card-content">
            <div className="property-status-container">
              <div className="property-status-grid">
                {propertyStatus.map((property, index) => (
                  <div key={index} className="property-status-item">
                    <div className="property-icon-wrapper">
                      <div className={`property-icon ${property.color}`}>
                        <span>{property.icon}</span>
                      </div>
                    </div>
                    <div className="property-info">
                      <span className="property-title">{property.title}</span>
                      <span className="property-count">{property.count} Properties</span>
                    </div>
                    <span className={`property-trend ${property.trendType}`}>
                      {property.trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Second Row: Recent Updates and Top Performers */}
        <div className="updates-performers-row">
          {/* Recent Updates Card */}
          <div className="card updates-card">
            <div className="card-header">
              <div className="card-title-section">
                <h3>Recent Updates</h3>
                <p>System activities and notifications</p>
              </div>
              <span className="updates-badge">5 New</span>
            </div>
            <div className="card-content">
              <div className="updates-list">
                {recentUpdates.map((update) => (
                  <div key={update.id} className="update-item">
                    <div className={`update-icon ${update.type}`}>
                      <span>{update.icon}</span>
                    </div>
                    <div className="update-content">
                      <p className="update-message">{update.message}</p>
                      <span className="update-time">{update.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Performers Card */}
          <div className="card performers-card">
            <div className="card-header">
              <div className="card-title-section">
                <h3>Top Performers</h3>
                <p>Best performing properties</p>
              </div>
              <button className="btn btn-text">
                See All →
              </button>
            </div>
            <div className="card-content">
              <div className="performers-list">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="performer-item">
                    <div className="performer-rank">
                      <span>#{index + 1}</span>
                    </div>
                    <div className="performer-info">
                      <span className="performer-name">{performer.name}</span>
                      <span className="performer-type">{performer.type}</span>
                    </div>
                    <div className="performer-stats">
                      <span className="performer-price">{performer.price}</span>
                      <span className="performer-growth positive">{performer.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;