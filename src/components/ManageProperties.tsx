import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageProperties.css';

const ManageProperties = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,       
      title: 'Luxury 3 BHK Apartment in Bandra',
      type: 'Apartment',
      location: 'Mumbai',
      price: '₹2.5 Cr',
      status: 'Active',
      date: '2024-01-15',
      views: 1250,
      inquiries: 42
    },
    {
      id: 2,
      title: 'Commercial Office Space in BKC',
      type: 'Commercial',
      location: 'Mumbai',
      price: '₹85 Lakh',
      status: 'Active',
      date: '2024-01-10',
      views: 890,
      inquiries: 28
    },
    {
      id: 3,
      title: 'Modern Villa in Whitefield',
      type: 'Villa',
      location: 'Bangalore',
      price: '₹3.8 Cr',
      status: 'Pending',
      date: '2024-01-05',
      views: 1560,
      inquiries: 56
    },
    {
      id: 4,
      title: 'Retail Shop in Connaught Place',
      type: 'Commercial',
      location: 'Delhi',
      price: '₹1.2 Cr',
      status: 'Sold',
      date: '2024-01-02',
      views: 2100,
      inquiries: 89
    },
    {
      id: 5,
      title: '2 BHK in Hi-Tech City',
      type: 'Apartment',
      location: 'Hyderabad',
      price: '₹95 Lakh',
      status: 'Active',
      date: '2023-12-28',
      views: 980,
      inquiries: 34
    },
    {
      id: 6,
      title: 'Farm House in Lonavala',
      type: 'Villa',
      location: 'Pune',
      price: '₹4.5 Cr',
      status: 'Inactive',
      date: '2023-12-20',
      views: 670,
      inquiries: 18
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const navigate = useNavigate(); 

  // Property distribution data for pie chart
  const propertyData = [
    { type: "Apartments", count: 2, growth: "+12%" },
    { type: "Villas", count: 2, growth: "+5%" },
    { type: "Commercial", count: 2, growth: "-2%" },
    { type: "Plots", count: 0, growth: "+8%" }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesFilter = filter === 'all' || property.status.toLowerCase() === filter;
    const matchesSearch = property.title.toLowerCase().includes(search.toLowerCase()) ||
                         property.location.toLowerCase().includes(search.toLowerCase()) ||
                         property.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const deleteProperty = (id: number) => {
    setProperties(properties.filter(p => p.id !== id));
  };

  const toggleStatus = (id: number) => {
    setProperties(properties.map(property => {
      if (property.id === id) {
        const newStatus = property.status === 'Active' ? 'Inactive' : 'Active';
        return { ...property, status: newStatus };
      }
      return property;
    }));
  };
  console.log(toggleStatus)

  return (
    <div className="manage-properties">
      <div className="page-header">
        <div className="header-top">
          <div className="header-content">
            <h1>Manage Properties</h1>
            <h3 className="subtitle">Manage and Track all your Properties</h3>
          </div>
          <div className="header-stats-corner">
            <div className="stat-card-corner">
              <span className="stat-number">{properties.length}</span>
              <span className="stat-label">Total Properties</span>
            </div>
            <div className="stat-card-corner">
              <span className="stat-number">₹12.5 Cr</span>
              <span className="stat-label">Total Value</span>
            </div>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search properties by title, location, type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button 
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`filter-btn ${filter === 'sold' ? 'active' : ''}`}
                onClick={() => setFilter('sold')}
              >
                Sold
              </button>
              <button 
                className={`filter-btn ${filter === 'inactive' ? 'active' : ''}`}
                onClick={() => setFilter('inactive')}
              >
                Inactive
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="export-btn">
              <span className="icon">📊</span>
              Export Data
            </button>
            <button className="add-btn"
            onClick={() => navigate('/dashboard/add-properties')}>
               <span className="icon">➕</span>
              Add New Property
            </button>
          </div>
        </div>
      </div>

      <div className="properties-table-container">
        <table className="properties-table">
          <thead>
            <tr>
              {/* <th>
                <input type="checkbox" className="select-all" />
              </th> */}
              <th>Property Title</th>
              <th>Type</th>
              <th>Location</th>
              <th>Price</th>
              <th>Status</th>
              <th>Views</th>
              <th>Inquiries</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.id}>
                {/* <td>
                  <input type="checkbox" className="property-select" />
                </td> */}
                <td className="property-title-cell">
                  <div className="property-info">
                    <div className="property-image">
                      <span className="image-placeholder">🏢</span>
                    </div>
                    <div className="property-details">
                      <span className="property-name">{property.title}</span>
                      <span className="property-id">ID: #{property.id.toString().padStart(4, '0')}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`property-type ${property.type.toLowerCase()}`}>
                    {property.type}
                  </span>
                </td>
                <td>
                  <div className="location-cell">
                    <span className="location-icon">📍</span>
                    <span>{property.location}</span>
                  </div>
                </td>
                <td>
                  <span className="property-price">{property.price}</span>
                </td>
                <td>
                  <span className={`status-badge ${property.status.toLowerCase()}`}>
                    {property.status}
                  </span>
                </td>
                <td>
                  <div className="stat-cell">
                    <span className="stat-icon">👁️</span>
                    <span>{property.views.toLocaleString()}</span>
                  </div>
                </td>
                <td>
                  <div className="stat-cell">
                    <span className="stat-icon">📨</span>
                    <span>{property.inquiries}</span>
                  </div>
                </td>
                <td>
                  <span className="date-cell">{property.date}</span>
                </td>
                <td>
                  <div className="action-buttons-cell">
                    <button 
                      className="action-btn edit-btn"
                      title="Edit Property"
                    >
                      ✏️
                    </button>
                   
                    <button 
                      className="action-btn view-btn"
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => deleteProperty(property.id)}
                      title="Delete Property"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions Section (Commented) */}
      {/*
      <div className="bulk-actions">
        <div className="selected-count">
          <input type="checkbox" id="select-all" />
          <label htmlFor="select-all">Select All</label>
          <span className="count-badge">0 selected</span>
        </div>
        <div className="bulk-buttons">
          <button className="bulk-btn export-bulk-btn">
            <span className="icon">📥</span>
            Export Selected
          </button>
          <button className="bulk-btn activate-bulk-btn">
            <span className="icon">▶️</span>
            Activate
          </button>
          <button className="bulk-btn deactivate-bulk-btn">
            <span className="icon">⏸️</span>
            Deactivate
          </button>
          <button className="bulk-btn delete-bulk-btn">
            <span className="icon">🗑️</span>
            Delete Selected
          </button>
        </div>
      </div>
      */}

      <div className="summary-section-two-col">
        <div className="summary-card-full">
          <h3>Property Distribution</h3>
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

        <div className="summary-card-full">
          <h3>Quick Actions</h3>
          <div className="quick-actions-grid">
            <button className="quick-action-btn"
            onClick={() => navigate('/dashboard/analysis-reports')}>
              <span className="icon">📊</span>
              Generate Report
            </button>
            <button className="quick-action-btn">
              <span className="icon">📧</span>
              Email Property List
            </button>
            <button className="quick-action-btn">
              <span className="icon">⚙️</span>
              Settings
            </button>
            <button className="quick-action-btn"
            onClick={() => navigate('/dashboard/analysis-reports')}>
              <span className="icon">📈</span>
              View Analytics
             
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProperties;