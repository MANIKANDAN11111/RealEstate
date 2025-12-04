import { useState, useEffect } from 'react';
import './DashboardHome.css';

const DashboardHome = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Stats Data
  const statsData = [
    {
      title: 'Total Properties',
      value: '156',
      change: '+5.4%',
      changeType: 'positive' as const,
      icon: '🏢',
      description: 'Total properties listed'
    },
    {
      title: 'Active Listings',
      value: '870',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: '📊',
      description: 'Currently active listings'
    },
    {
      title: 'New Users',
      value: '316',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: '👥',
      description: 'New users this month'
    },
    {
      title: 'Pending Inquiries',
      value: '42',
      change: '-3.0%',
      changeType: 'negative' as const,
      icon: '📨',
      description: 'Inquiries pending response'
    }
  ];

  // Quick Links
  const quickLinks = [
    { 
      title: 'Manage Properties', 
      icon: '🏢', 
      color: 'blue' as const, 
      description: 'View and manage all properties',
      link: '/properties'
    },
    { 
      title: 'Approve Users', 
      icon: '👥', 
      color: 'green' as const, 
      description: 'Approve new user registrations',
      link: '/users/approve'
    },
    { 
      title: 'View Reports', 
      icon: '📊', 
      color: 'purple' as const, 
      description: 'Generate and view reports',
      link: '/reports'
    },
    { 
      title: 'System Health', 
      icon: '⚡', 
      color: 'orange' as const, 
      description: 'Monitor system performance',
      link: '/system'
    }
  ];

  // Recent Inquiries Data
  const recentInquiries = [
    { 
      property: 'Modern Downtown Loft', 
      user: 'Alex Johnson', 
      date: '2023-10-26', 
      status: 'Pending',
      statusType: 'pending' as const
    },
    { 
      property: 'Suburban Family Home', 
      user: 'Maria Garcia', 
      date: '2023-10-25', 
      status: 'Responded',
      statusType: 'responded' as const
    },
    { 
      property: 'Cozy Beachside Cottage', 
      user: 'Chen Wei', 
      date: '2023-10-24', 
      status: 'Responded',
      statusType: 'responded' as const
    },
    { 
      property: 'Luxury Skyscraper Apt.', 
      user: 'Fatima Ahmed', 
      date: '2023-10-23', 
      status: 'Closed',
      statusType: 'closed' as const
    },
    { 
      property: 'Mountain Retreat Cabin', 
      user: 'David Smith', 
      date: '2023-10-22', 
      status: 'Pending',
      statusType: 'pending' as const
    }
  ];

  // Recent Updates Data
  const recentUpdates = [
    { 
      id: 1,
      type: 'success' as const, 
      message: 'New property "Luxury Villa" approved', 
      time: '2 mins ago',
      icon: '✓'
    },
    { 
      id: 2,
      type: 'warning' as const, 
      message: 'System maintenance at 2:00 AM', 
      time: '30 mins ago',
      icon: '!'
    },
    { 
      id: 3,
      type: 'info' as const, 
      message: 'Monthly report generated successfully', 
      time: '2 hours ago',
      icon: 'i'
    },
    { 
      id: 4,
      type: 'success' as const, 
      message: 'Backup completed successfully', 
      time: '1 day ago',
      icon: '✓'
    },
    { 
      id: 5,
      type: 'info' as const, 
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
      trendType: 'up' as const,
      icon: '🏢',
      color: 'green' as const
    },
    {
      title: 'Pending Approval',
      count: '12',
      trend: '-5%',
      trendType: 'down' as const,
      icon: '⏳',
      color: 'yellow' as const
    },
    {
      title: 'Recently Sold',
      count: '5',
      trend: '+8%',
      trendType: 'up' as const,
      icon: '💰',
      color: 'blue' as const
    },
    {
      title: 'Rented Out',
      count: '23',
      trend: '+15%',
      trendType: 'up' as const,
      icon: '🏠',
      color: 'purple' as const
    },
    {
      title: 'Under Maintenance',
      count: '7',
      trend: '0%',
      trendType: 'neutral' as const,
      icon: '🔧',
      color: 'orange' as const
    },
    {
      title: 'Vacant',
      count: '19',
      trend: '-3%',
      trendType: 'down' as const,
      icon: '🚫',
      color: 'gray' as const
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
            <span>B</span>
          </div>
          <div className="welcome-text">
            <h1>Welcome back, Brooklyn!</h1>
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
                <span className={`stat-change ${stat.changeType}`}>
                  {stat.change}
                </span>
              </div>
              <span className="stat-title">{stat.title}</span>
              <span className="stat-desc">{stat.description}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area - NO SCROLL WRAPPER */}
      <div className="main-content-area">
        <div className="main-grid">
          {/* Left Column */}
          <div className="left-column">
            {/* Revenue Chart Card */}
            <div className="card revenue-card">
              <div className="card-header">
                <div className="card-title-section">
                  <h3>Revenue Overview</h3>
                  <p>Monthly revenue trends</p>
                </div>
                <div className="card-actions">
                  <select className="time-select">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>This Year</option>
                  </select>
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
                      <span>Current Month</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-dot previous"></span>
                      <span>Previous Month</span>
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

            {/* Recent Inquiries Card */}
            <div className="card inquiries-card">
              <div className="card-header">
                <div className="card-title-section">
                  <h3>Recent Inquiries</h3>
                  <p>Latest property inquiries</p>
                </div>
                <button className="btn btn-text">
                  View All →
                </button>
              </div>
              <div className="card-content">
                <div className="inquiries-table">
                  <div className="table-header">
                    <div className="table-col property">Property</div>
                    <div className="table-col user">User</div>
                    <div className="table-col date">Date</div>
                    <div className="table-col status">Status</div>
                    <div className="table-col actions">Actions</div>
                  </div>
                  <div className="table-body">
                    {recentInquiries.map((inquiry, index) => (
                      <div key={index} className="table-row">
                        <div className="table-col property">
                          <div className="property-info">
                            <span className="property-name">{inquiry.property}</span>
                          </div>
                        </div>
                        <div className="table-col user">
                          <span className="user-name">{inquiry.user}</span>
                        </div>
                        <div className="table-col date">
                          <span className="inquiry-date">{inquiry.date}</span>
                        </div>
                        <div className="table-col status">
                          <span className={`status-badge ${inquiry.statusType}`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <div className="table-col actions">
                          <button className="action-btn view-btn">View</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Quick Links Card */}
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
        </div>

        {/* Bottom Row - Full Width */}
        <div className="bottom-row">
          {/* Property Status Card */}
          <div className="card property-status-card">
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