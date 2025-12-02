import './DashboardHome.css';

const DashboardHome = () => {
  // Stats Data
  const statsData = [
    {
      title: 'Total Properties',
      value: '156',
      change: '+5.4%',
      changeType: 'positive',
      icon: '🏢',
      period: 'this month'
    },
    {
      title: 'Active Listings',
      value: '870',
      change: '+2.1%',
      changeType: 'positive',
      icon: '📊',
      period: 'this month'
    },
    {
      title: 'New Users',
      value: '316',
      change: '+12.5%',
      changeType: 'positive',
      icon: '👥',
      period: 'this month'
    },
    {
      title: 'Pending Inquiries',
      value: '42',
      change: '-3.0%',
      changeType: 'negative',
      icon: '📨',
      period: 'this month'
    }
  ];

  // Inquiry Data
  const inquiryData = [
    {
      property: 'Modern Downtown Loft',
      user: 'Alex Johnson',
      date: '2023-10-26',
      status: 'Pending',
      statusColor: 'warning'
    },
    {
      property: 'Suburban Family Home',
      user: 'Maria Garcia',
      date: '2023-10-25',
      status: 'Responded',
      statusColor: 'success'
    },
    {
      property: 'Cozy Beachside Cottage',
      user: 'Chen Wei',
      date: '2023-10-24',
      status: 'Responded',
      statusColor: 'success'
    },
    {
      property: 'Luxury Skyscraper Apt.',
      user: 'Fatima Ahmed',
      date: '2023-10-23',
      status: 'Closed',
      statusColor: 'info'
    }
  ];

  // Quick Links
  const quickLinks = [
    { title: 'Manage Properties', icon: '🏢', color: 'blue' },
    { title: 'Approve Users', icon: '👥', color: 'green' },
    { title: 'View Reports', icon: '📊', color: 'purple' },
    { title: 'System Health', icon: '⚡', color: 'orange' }
  ];

  // Recent Activities
  const activities = [
    {
      type: 'success',
      icon: '✓',
      text: 'New property "Luxury Villa" added',
      time: '2 hours ago'
    },
    {
      type: 'warning',
      icon: '!',
      text: 'Inquiry from Alex Johnson needs follow-up',
      time: '4 hours ago'
    },
    {
      type: 'info',
      icon: 'i',
      text: 'Monthly report generated',
      time: '1 day ago'
    },
    {
      type: 'success',
      icon: '✓',
      text: 'System backup completed',
      time: '2 days ago'
    }
  ];

  // System Stats
  const systemStats = [
    { label: 'Server Uptime', value: '99.8%', progress: 99.8 },
    { label: 'Storage Used', value: '78%', progress: 78 },
    { label: 'Active Users', value: '156', progress: 70 }
  ];

  return (
    <div className="dashboard-home">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome, Brooklyn</h1>
          <p className="welcome-subtitle">Dashboard Overview</p>
          <div className="welcome-tags">
            <span className="tag">📊 6 Modules</span>
            <span className="tag">🏢 156 Properties</span>
            <span className="tag">👥 24 Active Admins</span>
          </div>
        </div>
        <div className="welcome-actions">
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

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="section-header">
          <h2 className="section-title">Performance Metrics</h2>
          <span className="section-subtitle">Updated in real-time</span>
        </div>
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className={`stat-icon ${stat.changeType}`}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3 className="stat-title">{stat.title}</h3>
                <div className="stat-values">
                  <span className="stat-value">{stat.value}</span>
                  <span className={`stat-change ${stat.changeType}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="stat-period">{stat.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Left Column */}
        <div className="left-column">
          {/* Revenue Chart */}
          <div className="content-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Revenue This Month</h3>
                <p className="card-subtitle">Monthly revenue trends and projections</p>
              </div>
              <select className="time-select">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="revenue-chart">
              <div className="chart-visual">
                {[65, 80, 75, 90, 85, 95, 100, 85, 75, 80, 70, 60].map((height, index) => (
                  <div key={index} className="chart-bar-container">
                    <div 
                      className="chart-bar" 
                      style={{ height: `${height}%` }}
                      title={`${height}%`}
                    ></div>
                    <span className="chart-label">
                      {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                    </span>
                  </div>
                ))}
              </div>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color current"></span>
                  <span>Current Month</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color previous"></span>
                  <span>Previous Month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="content-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Recent Inquiries</h3>
                <p className="card-subtitle">Latest client inquiries requiring attention</p>
              </div>
              <div className="card-actions">
                <button className="btn-icon">
                  <span>🔍</span>
                  Filter
                </button>
                <button className="btn-icon">
                  <span>📥</span>
                  Export
                </button>
                <button className="btn btn-outline">View All →</button>
              </div>
            </div>
            <div className="inquiry-table">
              <table>
                <thead>
                  <tr>
                    <th>PROPERTY</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiryData.map((inquiry, index) => (
                    <tr key={index}>
                      <td>
                        <div className="table-cell property">
                          <span className="cell-icon">🏠</span>
                          <span className="cell-text">{inquiry.property}</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-cell user">
                          <div className="avatar">
                            {inquiry.user.charAt(0)}
                          </div>
                          <span className="cell-text">{inquiry.user}</span>
                        </div>
                      </td>
                      <td>
                        <div className="table-cell date">
                          {inquiry.date}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${inquiry.statusColor}`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td>
                        <button className="action-link">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          {/* Quick Links */}
          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">Quick Links</h3>
            </div>
            <div className="quick-links">
              {quickLinks.map((link, index) => (
                <a key={index} href="#" className="quick-link">
                  <div className={`link-icon ${link.color}`}>
                    {link.icon}
                  </div>
                  <span className="link-text">{link.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="content-card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Recent Activities</h3>
                <span className="activity-count">24 Activities</span>
              </div>
            </div>
            <div className="activities-list">
              {activities.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {activity.icon}
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Stats */}
          <div className="content-card">
            <div className="card-header">
              <h3 className="card-title">System Overview</h3>
            </div>
            <div className="system-stats">
              {systemStats.map((stat, index) => (
                <div key={index} className="system-stat">
                  <div className="stat-info">
                    <span className="stat-label">{stat.label}</span>
                    <span className="stat-value">{stat.value}</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;