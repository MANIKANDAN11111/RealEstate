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
    { label: 'Total Revenue', value: '₹4.8 Cr', trend: 'up' },
    { label: 'Properties Sold', value: '89', trend: 'up' },
    { label: 'New Users', value: '1,245',  trend: 'up' },
   
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
          <h3 className="subtitle">Comprehensive analytics and performance metrics</h3>
        </div>
        <div className="header-actions">
          
          <button className="export-btn">
            <span className="icon">📥</span>
            Export Data
          </button>
         
        </div>
      </div>

      <div className="reports-container">
        <div className="reports-content">
          

          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-header">
                  <span className="metric-label">{metric.label}</span>
                 
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
                  {/* <div className="summary-item">
                    <span className="summary-label">Target Achievement</span>
                    <span className="summary-value positive">105.2%</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Growth Rate</span>
                    <span className="summary-value positive">+18.5%</span>
                  </div> */}
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
                      {/* <span className={`legend-growth ${data.growth.includes('+') ? 'positive' : 'negative'}`}>
                        {data.growth}
                      </span> */}
                    </div>
                  ))}
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