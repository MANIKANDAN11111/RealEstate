import { useState } from 'react';
import './AnalysisReports.css';

const AnalysisReports = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [timeRange, setTimeRange] = useState('30');
  const [compareMode, setCompareMode] = useState(false);

  const reports = [
    {
      id: 'overview',
      title: 'Overview Report',
      icon: '📊',
      description: 'Overall performance and key metrics',
      updated: 'Today',
      frequency: 'Daily'
    },
    {
      id: 'financial',
      title: 'Financial Report',
      icon: '💰',
      description: 'Revenue, expenses, and profitability',
      updated: 'Yesterday',
      frequency: 'Weekly'
    },
    {
      id: 'properties',
      title: 'Properties Report',
      icon: '🏢',
      description: 'Property performance and inventory',
      updated: '2 days ago',
      frequency: 'Monthly'
    },
    {
      id: 'sales',
      title: 'Sales Report',
      icon: '📈',
      description: 'Sales pipeline and conversions',
      updated: 'Today',
      frequency: 'Daily'
    },
    {
      id: 'users',
      title: 'Users Report',
      icon: '👥',
      description: 'User acquisition and engagement',
      updated: '3 days ago',
      frequency: 'Weekly'
    },
    {
      id: 'custom',
      title: 'Custom Report',
      icon: '⚙️',
      description: 'Create your own report',
      updated: 'Custom',
      frequency: 'On Demand'
    }
  ];

  // Chart Data
  const revenueData = [
    { month: 'Jan', revenue: 4500000, target: 4200000 },
    { month: 'Feb', revenue: 5200000, target: 4500000 },
    { month: 'Mar', revenue: 4800000, target: 4800000 },
    { month: 'Apr', revenue: 6100000, target: 5000000 },
    { month: 'May', revenue: 5500000, target: 5200000 },
    { month: 'Jun', revenue: 6800000, target: 5500000 },
    { month: 'Jul', revenue: 7200000, target: 6000000 },
  ];

  const propertyData = [
    { type: 'Apartments', count: 156, growth: '+12%' },
    { type: 'Villas', count: 42, growth: '+8%' },
    { type: 'Commercial', count: 78, growth: '+15%' },
    { type: 'Plots', count: 34, growth: '+5%' },
  ];

  const metrics = [
    { label: 'Total Revenue', value: '₹4.8 Cr', change: '+18.5%', trend: 'up' },
    { label: 'Properties Sold', value: '89', change: '+12.2%', trend: 'up' },
    { label: 'New Users', value: '1,245', change: '+24.7%', trend: 'up' },
    { label: 'Avg. Days on Market', value: '32', change: '-8.3%', trend: 'down' },
    { label: 'Conversion Rate', value: '4.8%', change: '+1.2%', trend: 'up' },
    { label: 'Customer Satisfaction', value: '92%', change: '+3.5%', trend: 'up' },
  ];

  const topPerforming = [
    { location: 'Mumbai', revenue: '₹1.2 Cr', growth: '+22%' },
    { location: 'Bangalore', revenue: '₹98 L', growth: '+18%' },
    { location: 'Delhi', revenue: '₹85 L', growth: '+15%' },
    { location: 'Hyderabad', revenue: '₹72 L', growth: '+28%' },
    { location: 'Pune', revenue: '₹65 L', growth: '+12%' },
  ];

  const formatIndianCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  return (
    <div className="analysis-reports">
      <div className="page-header">
        <div className="header-content">
          <h1>Analysis & Reports</h1>
          <p className="subtitle">Comprehensive analytics and performance metrics</p>
        </div>
        <div className="header-actions">
          <button className="generate-btn">
            <span className="icon">📊</span>
            Generate Report
          </button>
          <button className="export-btn">
            <span className="icon">📥</span>
            Export Data
          </button>
          <button className="schedule-btn">
            <span className="icon">⏰</span>
            Schedule Report
          </button>
        </div>
      </div>

      <div className="reports-container">
        <div className="reports-sidebar">
          <div className="sidebar-header">
            <h3>Available Reports</h3>
            <span className="reports-count">{reports.length} reports</span>
          </div>

          <div className="reports-list">
            {reports.map((report) => (
              <div 
                key={report.id}
                className={`report-item ${selectedReport === report.id ? 'selected' : ''}`}
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="report-icon">{report.icon}</div>
                <div className="report-details">
                  <h4>{report.title}</h4>
                  <p className="report-description">{report.description}</p>
                  <div className="report-meta">
                    <span className="meta-item">Updated: {report.updated}</span>
                    <span className="meta-divider">•</span>
                    <span className="meta-item">Frequency: {report.frequency}</span>
                  </div>
                </div>
                <div className="report-arrow">→</div>
              </div>
            ))}
          </div>

          <div className="sidebar-footer">
            <h4>Quick Insights</h4>
            <div className="insights-list">
              <div className="insight-item positive">
                <span className="insight-icon">📈</span>
                <div className="insight-content">
                  <span className="insight-text">Revenue growth trend</span>
                  <span className="insight-value">+18.5%</span>
                </div>
              </div>
              <div className="insight-item warning">
                <span className="insight-icon">⚠️</span>
                <div className="insight-content">
                  <span className="insight-text">Properties pending approval</span>
                  <span className="insight-value">12</span>
                </div>
              </div>
              <div className="insight-item info">
                <span className="insight-icon">📅</span>
                <div className="insight-content">
                  <span className="insight-text">Monthly report due</span>
                  <span className="insight-value">3 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reports-content">
          <div className="content-header">
            <div className="header-left">
              <h2>Overview Report</h2>
              <p className="report-period">Last 30 Days • Updated: Today, 10:30 AM</p>
            </div>
            <div className="header-right">
              <div className="time-selector">
                <label className="time-label">Time Range:</label>
                <select 
                  className="time-select"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="7">Last 7 days</option>
                  <option value="30">Last 30 days</option>
                  <option value="90">Last 90 days</option>
                  <option value="365">Last Year</option>
                </select>
              </div>
              <label className="compare-toggle">
                <input
                  type="checkbox"
                  checked={compareMode}
                  onChange={(e) => setCompareMode(e.target.checked)}
                  className="toggle-input"
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">Compare</span>
              </label>
            </div>
          </div>

          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-header">
                  <span className="metric-label">{metric.label}</span>
                  <span className={`metric-change ${metric.trend}`}>
                    {metric.trend === 'up' ? '↑' : '↓'} {metric.change}
                  </span>
                </div>
                <div className="metric-value">{metric.value}</div>
                <div className="metric-progress">
                  <div 
                    className="progress-bar"
                    style={{ width: metric.trend === 'up' ? '75%' : '40%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="charts-section">
            <div className="chart-card large">
              <div className="chart-header">
                <h3>Revenue Analysis</h3>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot actual"></span>
                    <span>Actual Revenue</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot target"></span>
                    <span>Target Revenue</span>
                  </div>
                </div>
              </div>
              <div className="chart-container">
                <div className="chart-y-axis">
                  <div className="y-label">₹80L</div>
                  <div className="y-label">₹60L</div>
                  <div className="y-label">₹40L</div>
                  <div className="y-label">₹20L</div>
                  <div className="y-label">₹0</div>
                </div>
                <div className="chart-bars">
                  {revenueData.map((data, index) => (
                    <div key={index} className="bar-group">
                      <div 
                        className="bar actual-bar"
                        style={{ height: `${(data.revenue / 8000000) * 100}%` }}
                        title={`Actual: ${formatIndianCurrency(data.revenue)}`}
                      ></div>
                      <div 
                        className="bar target-bar"
                        style={{ height: `${(data.target / 8000000) * 100}%` }}
                        title={`Target: ${formatIndianCurrency(data.target)}`}
                      ></div>
                      <div className="bar-label">{data.month}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="chart-footer">
                <div className="chart-summary">
                  <div className="summary-item">
                    <span className="summary-label">Total Revenue</span>
                    <span className="summary-value">{formatIndianCurrency(40100000)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Target Achievement</span>
                    <span className="summary-value positive">105.2%</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Growth Rate</span>
                    <span className="summary-value positive">+18.5%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Property Distribution</h3>
              </div>
              <div className="pie-chart-container">
                <div className="pie-chart">
                  <div className="pie-segment segment-1"></div>
                  <div className="pie-segment segment-2"></div>
                  <div className="pie-segment segment-3"></div>
                  <div className="pie-segment segment-4"></div>
                  <div className="pie-center"></div>
                </div>
                <div className="pie-legend">
                  {propertyData.map((data, index) => (
                    <div key={index} className="legend-row">
                      <span className={`legend-color segment-${index + 1}`}></span>
                      <span className="legend-text">{data.type}</span>
                      <span className="legend-value">{data.count}</span>
                      <span className={`legend-growth ${data.growth.includes('+') ? 'positive' : 'negative'}`}>
                        {data.growth}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="tables-section">
            <div className="table-card">
              <div className="table-header">
                <h3>Top Performing Locations</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <table className="performance-table">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Revenue</th>
                    <th>Growth</th>
                    <th>Properties</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {topPerforming.map((location, index) => (
                    <tr key={index}>
                      <td className="location-cell">
                        <span className="location-icon">📍</span>
                        <span>{location.location}</span>
                      </td>
                      <td className="revenue-cell">{location.revenue}</td>
                      <td>
                        <span className={`growth-badge ${location.growth.includes('+') ? 'positive' : 'negative'}`}>
                          {location.growth}
                        </span>
                      </td>
                      <td>
                        <span className="property-count">{Math.floor(Math.random() * 50) + 20}</span>
                      </td>
                      <td>
                        <div className="trend-indicator">
                          <div className="trend-line">
                            {[30, 45, 60, 75, 90].map((val, i) => (
                              <div 
                                key={i} 
                                className="trend-point"
                                style={{ height: `${val}%` }}
                              ></div>
                            ))}
                          </div>
                          <span className="trend-arrow">↗</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="table-card">
              <div className="table-header">
                <h3>Key Performance Indicators</h3>
                <div className="kpi-filters">
                  <select className="kpi-select">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Quarter to Date</option>
                  </select>
                </div>
              </div>
              <div className="kpi-grid">
                <div className="kpi-item">
                  <span className="kpi-icon">🎯</span>
                  <div className="kpi-content">
                    <span className="kpi-label">Lead Conversion</span>
                    <span className="kpi-value">12.4%</span>
                    <span className="kpi-change positive">+2.1%</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <span className="kpi-icon">⏱️</span>
                  <div className="kpi-content">
                    <span className="kpi-label">Avg. Response Time</span>
                    <span className="kpi-value">2.4 hrs</span>
                    <span className="kpi-change positive">-0.8 hrs</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <span className="kpi-icon">💰</span>
                  <div className="kpi-content">
                    <span className="kpi-label">Avg. Property Value</span>
                    <span className="kpi-value">₹82 L</span>
                    <span className="kpi-change positive">+8.5%</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <span className="kpi-icon">📱</span>
                  <div className="kpi-content">
                    <span className="kpi-label">Mobile Engagement</span>
                    <span className="kpi-value">68%</span>
                    <span className="kpi-change positive">+12%</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <span className="kpi-icon">🔄</span>
                  <div className="kpi-content">
                    <span className="kpi-label">Repeat Customers</span>
                    <span className="kpi-value">24%</span>
                    <span className="kpi-change positive">+5.2%</span>
                  </div>
                </div>
                <div className="kpi-item">
                  <span className="kpi-icon">⭐</span>
                  <div className="kpi-content">
                    <span className="kpi-label">Customer Satisfaction</span>
                    <span className="kpi-value">4.7/5</span>
                    <span className="kpi-change positive">+0.3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="insights-section">
            <div className="insights-card">
              <div className="insights-header">
                <h3>Actionable Insights</h3>
                <span className="insights-badge">3 Recommendations</span>
              </div>
              <div className="insights-list">
                <div className="insight-item critical">
                  <div className="insight-icon">🚨</div>
                  <div className="insight-content">
                    <h4>Inventory Alert</h4>
                    <p>Low inventory in Bangalore region. Consider adding new properties.</p>
                    <button className="insight-action">Take Action</button>
                  </div>
                </div>
                <div className="insight-item opportunity">
                  <div className="insight-icon">🎯</div>
                  <div className="insight-content">
                    <h4>Growth Opportunity</h4>
                    <p>High demand for 3 BHK apartments in Mumbai. Focus marketing efforts.</p>
                    <button className="insight-action">View Details</button>
                  </div>
                </div>
                <div className="insight-item improvement">
                  <div className="insight-icon">📊</div>
                  <div className="insight-content">
                    <h4>Performance Improvement</h4>
                    <p>Response time increased by 15%. Review support team performance.</p>
                    <button className="insight-action">Analyze</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="export-section">
              <div className="export-card">
                <h3>Export Reports</h3>
                <p className="export-description">Download reports in your preferred format</p>
                <div className="export-options">
                  <button className="export-option">
                    <span className="option-icon">📊</span>
                    <span className="option-text">PDF Report</span>
                  </button>
                  <button className="export-option">
                    <span className="option-icon">📈</span>
                    <span className="option-text">Excel Data</span>
                  </button>
                  <button className="export-option">
                    <span className="option-icon">📋</span>
                    <span className="option-text">CSV Export</span>
                  </button>
                  <button className="export-option">
                    <span className="option-icon">📧</span>
                    <span className="option-text">Email Report</span>
                  </button>
                </div>
                <div className="schedule-section">
                  <h4>Schedule Reports</h4>
                  <div className="schedule-options">
                    <select className="schedule-select">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                    </select>
                    <input type="time" className="schedule-time" defaultValue="09:00" />
                    <button className="schedule-btn">Schedule</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReports;