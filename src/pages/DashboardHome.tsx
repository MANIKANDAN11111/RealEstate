import './DashboardHome.css';

const DashboardHome = () => {
  // Stats Data
  const statsData = [
    {
      title: 'Total Properties',
      value: '156',
      change: '+5.4%',
      changeType: 'positive',
      icon: '🏢'
    },
    {
      title: 'Active Listings',
      value: '870',
      change: '+2.1%',
      changeType: 'positive',
      icon: '📊'
    },
    {
      title: 'New Users',
      value: '316',
      change: '+12.5%',
      changeType: 'positive',
      icon: '👥'
    },
    {
      title: 'Pending Inquiries',
      value: '42',
      change: '-3.0%',
      changeType: 'negative',
      icon: '📨'
    }
  ];

  // Quick Links
  const quickLinks = [
    { title: 'Manage Properties', icon: '🏢', color: 'blue', description: 'View properties' },
    { title: 'Approve Users', icon: '👥', color: 'green', description: 'Manage users' },
    { title: 'View Reports', icon: '📊', color: 'purple', description: 'System reports' },
    { title: 'System Health', icon: '⚡', color: 'orange', description: 'Monitor system' }
  ];

  return (
    <div className="dashboard-home">
      {/* Header Section - Full Width */}
      <div className="dashboard-header">
        <div className="header-content">
          <div className="user-section">
            <div className="user-avatar">B</div>
            <div className="user-info">
              <h1 className="user-name">Welcome, Brooklyn</h1>
              <p className="user-role">Super Admin • Dashboard Overview</p>
            </div>
          </div>
          
          <div className="stats-section">
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <div>
                <span className="stat-value">6</span>
                <span className="stat-label">Modules</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">🏢</span>
              <div>
                <span className="stat-value">156</span>
                <span className="stat-label">Properties</span>
              </div>
            </div>
            <div className="stat-item">
              <span className="stat-icon">👥</span>
              <div>
                <span className="stat-value">24</span>
                <span className="stat-label">Active Admins</span>
              </div>
            </div>
          </div>
          
          <div className="actions-section">
            <button className="btn btn-primary">
              <span className="btn-icon">📊</span>
              Generate Report
            </button>
            <button className="btn btn-secondary">
              <span className="btn-icon">🚀</span>
              Quick Actions
            </button>
          </div>
        </div>
      </div>

      {/* Performance Metrics - Full Width */}
      <div className="performance-metrics">
        <div className="metrics-header">
          <h2>Performance Metrics</h2>
          <span>Updated in real-time</span>
        </div>
        <div className="metrics-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="metric-card">
              <div className="metric-icon">
                {stat.icon}
              </div>
              <div className="metric-info">
                <span className="metric-title">{stat.title}</span>
                <div className="metric-values">
                  <span className="metric-value">{stat.value}</span>
                  <span className={`metric-change ${stat.changeType}`}>
                    {stat.change}
                  </span>
                </div>
                <span className="metric-period">this month</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Full Width Grid */}
      <div className="main-content-grid">
        {/* Row 1: Revenue + Quick Links */}
        <div className="content-row row-1">
          {/* Revenue Card */}
          <div className="content-card revenue-card">
            <div className="card-top">
              <div className="card-title-section">
                <h3>Revenue This Month</h3>
                <p>Monthly revenue trends and projections</p>
              </div>
              <div className="dropdown-container">
                <select className="time-select">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
            <div className="card-chart">
              <div className="chart-bars">
                {[65, 80, 75, 90, 85, 95, 100, 85, 75, 80, 70, 60].map((height, index) => (
                  <div key={index} className="bar-container">
                    <div className="bar" style={{ height: `${height}%` }}></div>
                    <span className="bar-label">
                      {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                    </span>
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
          </div>

          {/* Quick Links Card */}
          <div className="content-card links-card">
            <div className="card-top">
              <div className="card-title-section">
                <h3>Quick Links</h3>
                <p>Quick access to important sections</p>
              </div>
            </div>
            <div className="links-grid">
              {quickLinks.map((link, index) => (
                <a key={index} href="#" className="link-item">
                  <div className={`link-icon ${link.color}`}>
                    {link.icon}
                  </div>
                  <div className="link-text">
                    <span className="link-title">{link.title}</span>
                    <span className="link-desc">{link.description}</span>
                  </div>
                  <span className="link-arrow">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2: Recent Updates + System Overview */}
        <div className="content-row row-2">
          {/* Recent Updates Card */}
          <div className="content-card updates-card">
            <div className="card-top">
              <div className="card-title-section">
                <h3>Recent Updates</h3>
                <p>Latest system activities</p>
              </div>
              <span className="updates-badge">12 New</span>
            </div>
            <div className="updates-list">
              <div className="update-item">
                <div className="update-type success">
                  <span>✓</span>
                </div>
                <div className="update-content">
                  <p>New property "Luxury Villa" approved</p>
                  <span>2 mins ago</span>
                </div>
              </div>
              <div className="update-item">
                <div className="update-type warning">
                  <span>!</span>
                </div>
                <div className="update-content">
                  <p>System maintenance at 2:00 AM</p>
                  <span>30 mins ago</span>
                </div>
              </div>
              <div className="update-item">
                <div className="update-type info">
                  <span>i</span>
                </div>
                <div className="update-content">
                  <p>Monthly report generated</p>
                  <span>2 hours ago</span>
                </div>
              </div>
              <div className="update-item">
                <div className="update-type success">
                  <span>✓</span>
                </div>
                <div className="update-content">
                  <p>Backup completed successfully</p>
                  <span>1 day ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Overview Card */}
          <div className="content-card system-card">
            <div className="card-top">
              <div className="card-title-section">
                <h3>System Overview</h3>
                <p>System health and performance</p>
              </div>
            </div>
            <div className="system-stats">
              <div className="system-item">
                <div className="system-label">
                  <span>Server Uptime</span>
                  <span>99.8%</span>
                </div>
                <div className="system-progress">
                  <div className="progress-bar" style={{ width: '99.8%' }}></div>
                </div>
              </div>
              <div className="system-item">
                <div className="system-label">
                  <span>Storage Used</span>
                  <span>78%</span>
                </div>
                <div className="system-progress">
                  <div className="progress-bar" style={{ width: '78%' }}></div>
                </div>
              </div>
              <div className="system-item">
                <div className="system-label">
                  <span>Active Users</span>
                  <span>156</span>
                </div>
                <div className="system-progress">
                  <div className="progress-bar" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div className="system-item">
                <div className="system-label">
                  <span>Response Time</span>
                  <span>45ms</span>
                </div>
                <div className="system-progress">
                  <div className="progress-bar" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Property Status - Full Width */}
        <div className="content-row row-3">
          <div className="content-card property-card">
            <div className="card-top">
              <div className="card-title-section">
                <h3>Property Status</h3>
                <p>Current property distribution</p>
              </div>
              <button className="btn btn-outline">View All →</button>
            </div>
            <div className="property-grid">
              <div className="property-item">
                <div className="property-icon active">🏢</div>
                <div className="property-info">
                  <span className="property-title">Active Listings</span>
                  <span className="property-count">87 Properties</span>
                </div>
                <span className="property-trend up">+12%</span>
              </div>
              <div className="property-item">
                <div className="property-icon pending">⏳</div>
                <div className="property-info">
                  <span className="property-title">Pending Approval</span>
                  <span className="property-count">12 Properties</span>
                </div>
                <span className="property-trend down">-5%</span>
              </div>
              <div className="property-item">
                <div className="property-icon sold">💰</div>
                <div className="property-info">
                  <span className="property-title">Recently Sold</span>
                  <span className="property-count">5 Properties</span>
                </div>
                <span className="property-trend up">+8%</span>
              </div>
              <div className="property-item">
                <div className="property-icon rented">🏠</div>
                <div className="property-info">
                  <span className="property-title">Rented Out</span>
                  <span className="property-count">23 Properties</span>
                </div>
                <span className="property-trend up">+15%</span>
              </div>
              <div className="property-item">
                <div className="property-icon maintenance">🔧</div>
                <div className="property-info">
                  <span className="property-title">Under Maintenance</span>
                  <span className="property-count">7 Properties</span>
                </div>
                <span className="property-trend neutral">0%</span>
              </div>
              <div className="property-item">
                <div className="property-icon vacant">🚫</div>
                <div className="property-info">
                  <span className="property-title">Vacant</span>
                  <span className="property-count">19 Properties</span>
                </div>
                <span className="property-trend down">-3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;