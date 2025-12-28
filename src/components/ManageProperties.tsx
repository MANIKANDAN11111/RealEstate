import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageProperties.css';

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const API_BASE_URL = 'https://realestatebackend-8adg.onrender.com/api';

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/properties`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch properties');
        return res.json();
      })
      .then(data => {
        setProperties(data || []);
      })
      .catch(err => {
        console.error('API Error:', err);
        alert('Failed to load properties. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteProperty = async (id) => {
    if (!id) {
      alert('Invalid property ID');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Instead of local filtering, refresh from server
        await fetchProperties(); // This will refresh all data
        alert('Property deleted successfully!');
      } else {
        const error = await response.json();
        alert(`Failed to delete property: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete property. Please check your connection.');
    } finally {
      setIsDeleting(false);
    }
  };

  // ADD THIS MISSING FUNCTION
  const viewPropertyDetails = async (id) => {
    if (!id) {
      alert('Invalid property ID');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const property = await response.json();
      setSelectedProperty(property);
      setShowViewModal(true);
    } catch (error) {
      console.error('View error:', error);
      alert(`Failed to fetch property details: ${error.message}`);
    }
  };

  const handleEditProperty = (id) => {
    if (!id) {
      alert('Invalid property ID');
      return;
    }
    navigate(`/dashboard/edit-properties/${id}`);
  };

  const filteredProperties = properties.filter(property => {
    const matchesFilter =
      filter === 'all' ||
      (property.status && property.status.toLowerCase() === filter);

    const matchesSearch =
      (property.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (property.location?.district || '').toLowerCase().includes(search.toLowerCase()) ||
      (property.propertyCategory || '').toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return '₹0';
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const getPropertyId = (property) => {
    return property._id || property.id;
  };

  const truncateText = (text, maxLength = 30) => {
    if (!text) return '-';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="manage-properties">
      {/* ================= HEADER ================= */}
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
              <span className="stat-number">
                {formatPrice(properties.reduce(
                  (sum, p) => sum + (p?.priceDetails?.price || 0),
                  0
                ))}
              </span>
              <span className="stat-label">Total Value</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="controls-section">
        <div className="serach1-box">
          <span className="serach1-icon">🔍</span>
          <input
            type="text"
            placeholder="Search properties by title, location, type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="serach1-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-buttons">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
              All
            </button>
            <button className={`filter-btn ${filter === 'published' ? 'active' : ''}`} onClick={() => setFilter('published')}>
              Published
            </button>
            <button className={`filter-btn ${filter === 'draft' ? 'active' : ''}`} onClick={() => setFilter('draft')}>
              Draft
            </button>
          </div>

          <div className="action-buttons">
            <button className="add-btn" onClick={() => navigate('/dashboard/add-properties')}>
              ➕ Add New Property
            </button>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="properties-table-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="empty-state">
            <p>No properties found. {search && 'Try adjusting your search.'}</p>
            <button className="add-btn" onClick={() => navigate('/dashboard/add-properties')}>
              ➕ Add Your First Property
            </button>
          </div>
        ) : (
          <table className="properties-table">
            <thead>
              <tr>
                <th>Property Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProperties.map((property) => {
                const propertyId = getPropertyId(property);
                return (
                  <tr key={propertyId}>
                    <td className="property-title-cell">
                      <div className="property-info">
                        <div className="property-details">
                          <span className="property-name" title={property.title}>
                            {truncateText(property.title || 'Untitled Property', 40)}
                          </span>
                          <span className="property-id">
                            ID: #{propertyId ? propertyId.slice(-6) : 'N/A'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className={`property-type ${(property.propertyCategory || '').toLowerCase()}`}>
                        {property.propertyCategory || property.propertyType || '-'}
                      </span>
                    </td>

                    <td>
                      <div className="location-cell">
                        <span className="location-icon">📍</span>
                        <span title={property.location?.district}>
                          {truncateText(property.location?.district || '-', 20)}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span className="property-price">
                        {formatPrice(property.priceDetails?.price)} {property.priceDetails?.priceUnit || ''}
                      </span>
                    </td>

                    <td>
                      <span className={`status-badge ${property.status?.toLowerCase() || 'draft'}`}>
                        {property.status || 'Draft'}
                      </span>
                    </td>

                    <td>
                      <span className="date-cell">
                        {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : '-'}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons-cell">
                        {/* <button 
                          className="action-btn edit-btn" 
                          onClick={() => handleEditProperty(propertyId)}
                          title="Edit Property"
                        >
                          ✏️
                        </button> */}
                        <button 
                          className="action-btn view-btn" 
                          onClick={() => viewPropertyDetails(propertyId)}
                          title="View Details"
                        >
                          👁️
                        </button>
                        <button 
                          className={`action-btn delete-btn ${isDeleting ? 'loading' : ''}`}
                          onClick={() => deleteProperty(propertyId)}
                          disabled={isDeleting}
                          title="Delete Property"
                        >
                          {isDeleting ? '⏳' : '🗑️'}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {showViewModal && selectedProperty && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedProperty.title || 'Property Details'}</h2>
                <p className="property-id-modal">ID: #{getPropertyId(selectedProperty)?.slice(-6)}</p>
              </div>
              <button className="modal-close" onClick={() => setShowViewModal(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="property-detail-grid">
                {/* Basic Information */}
                <div className="detail-section">
                  <h3>📋 Basic Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Title:</span>
                    <span className="detail-value">{selectedProperty.title || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{selectedProperty.propertyCategory || selectedProperty.propertyType || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className="status-cell">
                      <span className={`status-badge ${selectedProperty.status?.toLowerCase() || 'draft'}`}>
                        {selectedProperty.status || 'Draft'}
                      </span>
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Description:</span>
                    <span className="detail-value description-text">
                      {selectedProperty.description || 'No description provided'}
                    </span>
                  </div>
                </div>

                {/* Location Details */}
                <div className="detail-section">
                  <h3>📍 Location Details</h3>
                  <div className="detail-row">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{selectedProperty.location?.address || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">District:</span>
                    <span className="detail-value">{selectedProperty.location?.district || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">City:</span>
                    <span className="detail-value">{selectedProperty.location?.city || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">State:</span>
                    <span className="detail-value">{selectedProperty.location?.state || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Pincode:</span>
                    <span className="detail-value">{selectedProperty.location?.pincode || 'N/A'}</span>
                  </div>
                </div>

                {/* Price Information */}
                <div className="detail-section">
                  <h3>💰 Price Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value price-highlight">
                      {formatPrice(selectedProperty.priceDetails?.price)} {selectedProperty.priceDetails?.priceUnit || ''}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Security Deposit:</span>
                    <span className="detail-value">
                      {formatPrice(selectedProperty.priceDetails?.securityDeposit)} {selectedProperty.priceDetails?.securityDepositUnit || ''}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Maintenance:</span>
                    <span className="detail-value">
                      {formatPrice(selectedProperty.priceDetails?.maintenance)} {selectedProperty.priceDetails?.maintenanceUnit || ''}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Booking Amount:</span>
                    <span className="detail-value">
                      {formatPrice(selectedProperty.priceDetails?.bookingAmount)} {selectedProperty.priceDetails?.bookingAmountUnit || ''}
                    </span>
                  </div>
                </div>

                {/* Property Specifications */}
                <div className="detail-section">
                  <h3>🏠 Property Specifications</h3>
                  <div className="detail-row">
                    <span className="detail-label">Carpet Area:</span>
                    <span className="detail-value">
                      {selectedProperty.propertySpecification?.carpetArea || 0} sq.ft
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Built-up Area:</span>
                    <span className="detail-value">
                      {selectedProperty.propertySpecification?.builtUpArea || 0} sq.ft
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Bedrooms:</span>
                    <span className="detail-value">{selectedProperty.propertySpecification?.bedrooms || 0}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Bathrooms:</span>
                    <span className="detail-value">{selectedProperty.propertySpecification?.bathrooms || 0}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Balconies:</span>
                    <span className="detail-value">{selectedProperty.propertySpecification?.balconies || 0}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Furnishing:</span>
                    <span className="detail-value">{selectedProperty.propertySpecification?.furnishing || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                <div className="detail-section full-width">
                  <h3>✅ Amenities</h3>
                  <div className="amenities-grid">
                    {selectedProperty.amenities.map((amenity, index) => (
                      <span key={index} className="amenity-badge">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Images */}
              {selectedProperty.images && selectedProperty.images.length > 0 && (
                <div className="detail-section full-width">
                  <h3>📸 Images ({selectedProperty.images.length})</h3>
                  <div className="image-gallery">
                    {selectedProperty.images.map((img, index) => (
                      <div key={index} className="image-thumbnail">
                        <img 
                          src={img} 
                          alt={`Property ${index + 1}`}
                          onClick={() => window.open(img, '_blank')}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Details */}
              <div className="detail-section full-width">
                <h3>📝 Additional Details</h3>
                <div className="additional-details">
                  <div className="detail-row">
                    <span className="detail-label">Created:</span>
                    <span className="detail-value">
                      {selectedProperty.createdAt ? new Date(selectedProperty.createdAt).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Last Updated:</span>
                    <span className="detail-value">
                      {selectedProperty.updatedAt ? new Date(selectedProperty.updatedAt).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Owner Name:</span>
                    <span className="detail-value">{selectedProperty.ownerName || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Contact Email:</span>
                    <span className="detail-value">{selectedProperty.contactEmail || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={() => setShowViewModal(false)}>
                Close
              </button>
              {/* <button 
                className="modal-btn primary" 
                onClick={() => {
                  setShowViewModal(false);
                  handleEditProperty(getPropertyId(selectedProperty));
                }}
              >
                ✏️ Edit Property
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProperties;