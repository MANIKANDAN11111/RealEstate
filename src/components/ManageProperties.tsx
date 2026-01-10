import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageProperties.css';

// Define TypeScript interfaces
interface PropertyImage {
  url?: string;
  fileUrl?: string;
  fileName?: string;
  key?: string;
  fileType?: string;
  fileSize?: { $numberLong: string };
}

interface PropertyVideo {
  url?: string;
  fileUrl?: string;
  fileName?: string;
  key?: string;
}

interface PriceDetails {
  price: number;
  priceUnit: string;
}

interface Location {
  state: string;
  district: string;
  locality: string;
  landmark: string;
  pincode: string;
  fullAddress: string;
}

interface Features {
  bedrooms: number;
  bathrooms: number;
  builtUpArea: number;
  carpetArea: number;
  amenities: string[];
}

interface ContactInfo {
  ownerName: string;
  phone: string;
  email: string;
  showPhone: boolean;
  showEmail: boolean;
}

interface Property {
  _id: string;
  id?: string;
  title: string;
  propertyType: string;
  propertyCategory: string;
  propertySubCategory: string;
  description: string;
  priceDetails: PriceDetails;
  location: Location;
  features: Features;
  contactInfo: ContactInfo;
  images: PropertyImage[];
  videos: PropertyVideo[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface EditForm {
  title: string;
  propertyType: string;
  propertyCategory: string;
  propertySubCategory: string;
  description: string;
  priceValue: string;
  priceUnit: string;
  location: {
    state: string;
    district: string;
    locality: string;
    landmark: string;
    pincode: string;
    fullAddress: string;
  };
  features: {
    bedrooms: string;
    bathrooms: string;
    builtUpArea: string;
    carpetArea: string;
    amenities: string[];
  };
  contactInfo: {
    ownerName: string;
    phone: string;
    email: string;
    showPhone: boolean;
    showEmail: boolean;
  };
  status: string;
}

const ManageProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState<EditForm>({
    title: '',
    propertyType: '',
    propertyCategory: '',
    propertySubCategory: '',
    description: '',
    priceValue: '',
    priceUnit: 'lakh',
    location: {
      state: 'Tamil Nadu',
      district: '',
      locality: '',
      landmark: '',
      pincode: '',
      fullAddress: ''
    },
    features: {
      bedrooms: '',
      bathrooms: '',
      builtUpArea: '',
      carpetArea: '',
      amenities: []
    },
    contactInfo: {
      ownerName: '',
      phone: '',
      email: '',
      showPhone: true,
      showEmail: true
    },
    status: 'PUBLISHED'
  });
  
  const [existingImages, setExistingImages] = useState<PropertyImage[]>([]);
  const [existingVideos, setExistingVideos] = useState<PropertyVideo[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newVideos, setNewVideos] = useState<File[]>([]);
  const [deleteImageKeys, setDeleteImageKeys] = useState<string[]>([]);
  const [deleteVideoKeys, setDeleteVideoKeys] = useState<string[]>([]);

  const navigate = useNavigate();
  const API_BASE_URL = 'https://realestatebackend-8adg.onrender.com/api';

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const showSuccessAlert = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
  };

  const fetchProperties = () => {
    setLoading(true);
    console.log('Fetching properties from:', `${API_BASE_URL}/properties`);
    
    fetch(`${API_BASE_URL}/properties`)
      .then(res => {
        console.log('Fetch Response Status:', res.status);
        if (!res.ok) {
          return res.text().then(text => {
            console.error('Fetch Error Response:', text);
            throw new Error(`HTTP ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then((data: Property[]) => {
        console.log('Fetched properties:', data);
        setProperties(Array.isArray(data) ? data : []);
      })
      .catch(err => {
        console.error('Fetch Error:', err);
        alert(`Failed to load properties: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteProperty = async (id: string) => {
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

      console.log('Delete Response Status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Delete successful:', result);
        showSuccessAlert('Property deleted successfully!');
        await fetchProperties();
      } else {
        const errorText = await response.text();
        console.error('Delete failed:', errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          alert(`Failed to delete property: ${errorJson.message || 'Unknown error'}`);
        } catch {
          alert(`Failed to delete property: ${errorText || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Failed to delete property: ${(error as Error).message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const viewPropertyDetails = async (id: string) => {
    if (!id) {
      alert('Invalid property ID');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      
      console.log('View Response Status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const property: Property = await response.json();
      console.log('Fetched property:', property);
      
      setSelectedProperty(property);
      setShowViewModal(true);
    } catch (error) {
      console.error('View error:', error);
      alert(`Failed to fetch property details: ${(error as Error).message}`);
    }
  };

  const handleEditProperty = async (id: string) => {
    if (!id) {
      alert('Invalid property ID');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const property: Property = await response.json();
      console.log('Property for editing:', property);
      
      // Extract key from image objects
      const imagesWithKeys: PropertyImage[] = (property.images || []).map(img => ({
        ...img,
        key: img.key || img.fileName || img.url || ''
      }));
      
      const videosWithKeys: PropertyVideo[] = (property.videos || []).map(vid => ({
        ...vid,
        key: vid.key || vid.fileName || vid.url || ''
      }));
      
      // Populate edit form
      setEditForm({
        title: property.title || '',
        propertyType: property.propertyType || '',
        propertyCategory: property.propertyCategory || '',
        propertySubCategory: property.propertySubCategory || '',
        description: property.description || '',
        priceValue: property.priceDetails?.price?.toString() || '',
        priceUnit: property.priceDetails?.priceUnit || 'lakh',
        location: {
          state: property.location?.state || 'Tamil Nadu',
          district: property.location?.district || '',
          locality: property.location?.locality || '',
          landmark: property.location?.landmark || '',
          pincode: property.location?.pincode || '',
          fullAddress: property.location?.fullAddress || ''
        },
        features: {
          bedrooms: property.features?.bedrooms?.toString() || '0',
          bathrooms: property.features?.bathrooms?.toString() || '0',
          builtUpArea: property.features?.builtUpArea?.toString() || '0',
          carpetArea: property.features?.carpetArea?.toString() || '0',
          amenities: Array.isArray(property.features?.amenities) 
            ? property.features.amenities.filter((item): item is string => 
                item != null && typeof item === 'string'
              )
            : []
        },
        contactInfo: {
          ownerName: property.contactInfo?.ownerName || '',
          phone: property.contactInfo?.phone || '',
          email: property.contactInfo?.email || '',
          showPhone: property.contactInfo?.showPhone !== false,
          showEmail: property.contactInfo?.showEmail !== false
        },
        status: property.status || 'PUBLISHED'
      });
      
      // Set existing media
      setExistingImages(imagesWithKeys);
      setExistingVideos(videosWithKeys);
      setNewImages([]);
      setNewVideos([]);
      setDeleteImageKeys([]);
      setDeleteVideoKeys([]);
      
      setSelectedProperty(property);
      setShowEditModal(true);
    } catch (error) {
      console.error('Edit error:', error);
      alert(`Failed to fetch property details: ${(error as Error).message}`);
    }
  };

  const handleEditFormChange = (field: string, value: string | string[] | boolean | number) => {
    console.log(`Changing ${field} to:`, value);
    
    // Handle amenities specially
    if (field === 'features.amenities') {
      if (Array.isArray(value)) {
        setEditForm(prev => ({
          ...prev,
          features: {
            ...prev.features,
            amenities: value
          }
        }));
      }
      return;
    }
    
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof EditForm] as any,
          [child]: value
        }
      }));
    } else {
      setEditForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setNewImages(prev => [...prev, ...Array.from(files)]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setNewVideos(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeExistingImage = (imageObj: PropertyImage) => {
    const key = imageObj.key || imageObj.fileName || imageObj.url || '';
    if (key) {
      setDeleteImageKeys(prev => [...prev, key]);
    }
    setExistingImages(prev => prev.filter(img => 
      (img.key || img.fileName || img.url || '') !== key
    ));
  };

  const removeExistingVideo = (videoObj: PropertyVideo) => {
    const key = videoObj.key || videoObj.fileName || videoObj.url || '';
    if (key) {
      setDeleteVideoKeys(prev => [...prev, key]);
    }
    setExistingVideos(prev => prev.filter(vid => 
      (vid.key || vid.fileName || vid.url || '') !== key
    ));
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewVideo = (index: number) => {
    setNewVideos(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateProperty = async () => {
    console.log('🚀 === UPDATE PROPERTY START ===');
    
    if (!selectedProperty) {
      alert('No property selected for update');
      return;
    }

    const propertyId = selectedProperty._id || selectedProperty.id;
    
    if (!propertyId) {
      alert('Invalid property ID');
      return;
    }

    if (!editForm.title || !editForm.priceValue) {
      alert('Please fill in all required fields (Title and Price)');
      return;
    }

    setIsUpdating(true);

    try {
      const formData = new FormData();
      
      // Clean amenities before sending
      const cleanAmenities = (editForm.features.amenities || [])
        .filter((item): item is string => 
          item != null && typeof item === 'string' && item.trim() !== ''
        )
        .map(item => item.trim());
      
      console.log('Cleaned amenities:', cleanAmenities);
      
      // Prepare property data
      const propertyData = {
        title: editForm.title,
        propertyType: editForm.propertyType,
        propertyCategory: editForm.propertyCategory,
        propertySubCategory: editForm.propertySubCategory,
        description: editForm.description,
        priceValue: editForm.priceValue,
        priceUnit: editForm.priceUnit || 'lakh',
        location: {
          state: editForm.location.state,
          district: editForm.location.district,
          locality: editForm.location.locality,
          landmark: editForm.location.landmark,
          pincode: editForm.location.pincode,
          fullAddress: editForm.location.fullAddress
        },
        features: {
          bedrooms: parseInt(editForm.features.bedrooms) || 0,
          bathrooms: parseInt(editForm.features.bathrooms) || 0,
          builtUpArea: parseInt(editForm.features.builtUpArea) || 0,
          carpetArea: parseInt(editForm.features.carpetArea) || 0,
          amenities: cleanAmenities
        },
        contactInfo: {
          ownerName: editForm.contactInfo.ownerName,
          phone: editForm.contactInfo.phone,
          email: editForm.contactInfo.email,
          showPhone: editForm.contactInfo.showPhone,
          showEmail: editForm.contactInfo.showEmail
        },
        status: editForm.status
      };

      console.log('📦 Property Data being sent:', JSON.stringify(propertyData, null, 2));
      
      // Append property data as JSON string
      formData.append('propertyData', JSON.stringify(propertyData));

      // Append new images
      newImages.forEach(image => {
        formData.append('images', image);
      });

      // Append new videos
      newVideos.forEach(video => {
        formData.append('videos', video);
      });

      // Build URL with query parameters
      let url = `${API_BASE_URL}/properties/${propertyId}`;
      const params = new URLSearchParams();
      
      // Add delete parameters if they exist
      if (deleteImageKeys.length > 0) {
        deleteImageKeys.forEach(key => {
          params.append('deleteImageKeys', key);
        });
      }
      
      if (deleteVideoKeys.length > 0) {
        deleteVideoKeys.forEach(key => {
          params.append('deleteVideoKeys', key);
        });
      }
      
      // Add other optional parameters with defaults
      params.append('replaceImages', 'false');
      params.append('replaceVideos', 'false');
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      console.log('🌐 PUT URL:', url);
      
      // Log FormData entries for debugging
      console.log('📝 FormData entries:');
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await fetch(url, {
        method: 'PUT',
        body: formData
      });

      console.log('📨 Response Status:', response.status);
      console.log('📨 Response OK:', response.ok);
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Update successful:', result);
        showSuccessAlert('Property updated successfully!');
        setShowEditModal(false);
        await fetchProperties();
      } else {
        // For error responses, read the text
        const errorText = await response.text();
        console.error('❌ Update failed. Full response:', errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          alert(`Failed to update property: ${errorJson.message || 'Unknown error'}`);
        } catch {
          alert(`Failed to update property: ${errorText || 'Unknown error'}`);
        }
      }
    } catch (error) {
      console.error('💥 Update error:', error);
      alert(`Failed to update property: ${(error as Error).message}`);
    } finally {
      setIsUpdating(false);
    }
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

  const formatPrice = (price: number) => {
    if (!price || isNaN(price)) return '₹0';
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const getPropertyId = (property: Property) => {
    return property._id || property.id || '';
  };

  const truncateText = (text: string, maxLength: number = 30) => {
    if (!text) return '-';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Responsive table column visibility
  const getTableColumns = () => {
    if (isMobile) {
      return ['Title', 'Price', 'Status', 'Actions'];
    } else if (isTablet) {
      return ['Title', 'Type', 'Price', 'Status', 'Actions'];
    }
    return ['Property Title', 'Type', 'Location', 'Price', 'Status', 'Date Added', 'Actions'];
  };

  return (
    <div className="manage-properties">
      {/* Success Message Popup */}
      {showSuccessMessage && (
        <div className="success-message-popup">
          <div className="success-message-content">
            <span className="success-icon">✓</span>
            <span className="success-text">{successMessage}</span>
          </div>
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="page-header">
        <div className="header-top">
          <div className="header-content">
            <h1>Manage Properties</h1>
            <h3 className="subtitle">Manage and Track all your Properties</h3>
          </div>
          <div className={`header-stats-corner ${isMobile ? 'mobile-stats' : ''}`}>
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
              <span className="add-btn-icon">➕</span>
              <span className="add-btn-text">Add New Property</span>
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
          <>
            {/* Mobile/Tablet View */}
            {(isMobile || isTablet) ? (
              <div className="properties-cards">
                {filteredProperties.map((property) => {
                  const propertyId = getPropertyId(property);
                  return (
                    <div key={propertyId} className="property-card">
                      <div className="card-header">
                        <div className="property-title-mobile">
                          <span className="property-name" title={property.title}>
                            {truncateText(property.title || 'Untitled Property', isMobile ? 40 : 60)}
                          </span>
                          <span className="property-id-mobile">
                            ID: #{propertyId ? propertyId.slice(-6) : 'N/A'}
                          </span>
                        </div>
                        <div className="card-actions">
                          <button 
                            className="action-btn edit-btn" 
                            onClick={() => handleEditProperty(propertyId)}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            className="action-btn view-btn" 
                            onClick={() => viewPropertyDetails(propertyId)}
                            title="View"
                          >
                            👁️
                          </button>
                        </div>
                      </div>
                      
                      <div className="card-body">
                        {!isMobile && (
                          <div className="card-row">
                            <span className="card-label">Type:</span>
                            <span className={`property-type ${(property.propertyCategory || '').toLowerCase()}`}>
                              {truncateText(property.propertyCategory || property.propertyType || '-', 20)}
                            </span>
                          </div>
                        )}
                        
                        <div className="card-row">
                          <span className="card-label">Price:</span>
                          <span className="property-price">
                            {formatPrice(property.priceDetails?.price)} {property.priceDetails?.priceUnit || ''}
                          </span>
                        </div>
                        
                        <div className="card-row">
                          <span className="card-label">Status:</span>
                          <span className={`status-badge ${property.status?.toLowerCase() || 'draft'}`}>
                            {property.status || 'Draft'}
                          </span>
                        </div>
                        
                        {!isMobile && (
                          <div className="card-row">
                            <span className="card-label">Added:</span>
                            <span className="date-cell">
                              {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : '-'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="card-footer">
                        <button 
                          className={`action-btn delete-btn ${isDeleting ? 'loading' : ''}`}
                          onClick={() => deleteProperty(propertyId)}
                          disabled={isDeleting}
                          title="Delete Property"
                        >
                          {isDeleting ? '⏳' : '🗑️ Delete'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Desktop View */
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
                            <button 
                              className="action-btn edit-btn" 
                              onClick={() => handleEditProperty(propertyId)}
                              title="Edit Property"
                            >
                              ✏️
                            </button>
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
          </>
        )}
      </div>

      {/* ================= VIEW MODAL ================= */}
      {showViewModal && selectedProperty && (
        <div className="modal-overlay" onClick={() => setShowViewModal(false)}>
          <div className={`modal-content ${isMobile ? 'mobile-modal' : ''}`} onClick={(e) => e.stopPropagation()}>
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
              <div className={`property-detail-grid ${isMobile ? 'mobile-detail-grid' : ''}`}>
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
                    <span className="detail-label">Sub Type:</span>
                    <span className="detail-value">{selectedProperty.propertySubCategory || 'N/A'}</span>
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
                    <span className="detail-label">State:</span>
                    <span className="detail-value">{selectedProperty.location?.state || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">District:</span>
                    <span className="detail-value">{selectedProperty.location?.district || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Locality:</span>
                    <span className="detail-value">{selectedProperty.location?.locality || 'N/A'}</span>
                  </div>
                  {!isMobile && (
                    <>
                      <div className="detail-row">
                        <span className="detail-label">Landmark:</span>
                        <span className="detail-value">{selectedProperty.location?.landmark || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Pincode:</span>
                        <span className="detail-value">{selectedProperty.location?.pincode || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Full Address:</span>
                        <span className="detail-value">{selectedProperty.location?.fullAddress || 'N/A'}</span>
                      </div>
                    </>
                  )}
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
                </div>

                {/* Property Features */}
                <div className="detail-section">
                  <h3>🏠 Property Features</h3>
                  <div className="detail-row">
                    <span className="detail-label">Bedrooms:</span>
                    <span className="detail-value">
                      {selectedProperty.features?.bedrooms || 0}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Bathrooms:</span>
                    <span className="detail-value">
                      {selectedProperty.features?.bathrooms || 0}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Built-up Area:</span>
                    <span className="detail-value">
                      {selectedProperty.features?.builtUpArea || 0} sq.ft
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Carpet Area:</span>
                    <span className="detail-value">
                      {selectedProperty.features?.carpetArea || 0} sq.ft
                    </span>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="detail-section">
                  <h3>📞 Contact Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Owner Name:</span>
                    <span className="detail-value">{selectedProperty.contactInfo?.ownerName || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">
                      {selectedProperty.contactInfo?.showPhone ? selectedProperty.contactInfo?.phone : 'Hidden'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">
                      {selectedProperty.contactInfo?.showEmail ? selectedProperty.contactInfo?.email : 'Hidden'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Images */}
              {selectedProperty.images && selectedProperty.images.length > 0 && (
                <div className="detail-section full-width">
                  <h3>📸 Images ({selectedProperty.images.length})</h3>
                  <div className={`image-gallery ${isMobile ? 'mobile-gallery' : ''}`}>
                    {selectedProperty.images.map((img, index) => (
                      <div key={index} className="image-thumbnail">
                        <img 
                          src={img.url || img.fileUrl || ''} 
                          alt={`Property ${index + 1}`}
                          onClick={() => window.open(img.url || img.fileUrl || '', '_blank')}
                          style={{ cursor: 'pointer' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Details for Mobile */}
              {isMobile && (
                <div className="detail-section">
                  <h3>📍 More Location Details</h3>
                  <div className="detail-row">
                    <span className="detail-label">Landmark:</span>
                    <span className="detail-value">{selectedProperty.location?.landmark || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Pincode:</span>
                    <span className="detail-value">{selectedProperty.location?.pincode || 'N/A'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Full Address:</span>
                    <span className="detail-value">{selectedProperty.location?.fullAddress || 'N/A'}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {showEditModal && selectedProperty && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className={`modal-content ${isMobile ? 'mobile-edit-modal' : 'edit-modal-large'}`} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>✏️ Edit Property</h2>
                <p className="property-id-modal">ID: #{getPropertyId(selectedProperty)?.slice(-6)}</p>
              </div>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className={`edit-form-grid ${isMobile ? 'mobile-form-grid' : ''}`}>
                {/* Basic Information */}
                <div className="edit-section">
                  <h3 className="edit-section-title">📋 Basic Information</h3>
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editForm.title}
                      onChange={(e) => handleEditFormChange('title', e.target.value)}
                      placeholder="Enter property title"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Property Type</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editForm.propertyType}
                      onChange={(e) => handleEditFormChange('propertyType', e.target.value)}
                      placeholder="e.g., Residential, Commercial"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editForm.propertyCategory}
                      onChange={(e) => handleEditFormChange('propertyCategory', e.target.value)}
                      placeholder="e.g., Apartment, Villa"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Sub Category</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editForm.propertySubCategory}
                      onChange={(e) => handleEditFormChange('propertySubCategory', e.target.value)}
                      placeholder="e.g., Single Floor, Multi-floor"
                    />
                  </div>
                </div>

                {/* Price Information */}
                <div className="edit-section">
                  <h3 className="edit-section-title">💰 Price Information</h3>
                  <div className="form-group">
                    <label className="form-label">Price *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={editForm.priceValue}
                      onChange={(e) => handleEditFormChange('priceValue', e.target.value)}
                      placeholder="Enter price"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price Unit</label>
                    <select
                      className="form-input"
                      value={editForm.priceUnit}
                      onChange={(e) => handleEditFormChange('priceUnit', e.target.value)}
                    >
                      <option value="lakh">Lakh</option>
                      <option value="crore">Crore</option>
                      <option value="per sqft">Per Sq.Ft</option>
                      <option value="per month">Per Month</option>
                      <option value="per year">Per Year</option>
                    </select>
                  </div>
                </div>

                {/* Location Details */}
                <div className="edit-section">
                  <h3 className="edit-section-title">📍 Location Details</h3>
                  <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editForm.location.state}
                      onChange={(e) => handleEditFormChange('location.state', e.target.value)}
                      placeholder="State"
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">District</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editForm.location.district}
                      onChange={(e) => handleEditFormChange('location.district', e.target.value)}
                      placeholder="Enter district"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Locality</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editForm.location.locality}
                      onChange={(e) => handleEditFormChange('location.locality', e.target.value)}
                      placeholder="Enter locality"
                    />
                  </div>
                  {!isMobile && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Landmark</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editForm.location.landmark}
                          onChange={(e) => handleEditFormChange('location.landmark', e.target.value)}
                          placeholder="Enter landmark"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Pincode</label>
                        <input
                          type="text"
                          className="form-input"
                          value={editForm.location.pincode}
                          onChange={(e) => handleEditFormChange('location.pincode', e.target.value)}
                          placeholder="Enter pincode"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Property Features */}
                <div className="edit-section">
                  <h3 className="edit-section-title">🏠 Property Features</h3>
                  <div className="form-group">
                    <label className="form-label">Bedrooms</label>
                    <input
                      type="number"
                      className="form-input"
                      value={editForm.features.bedrooms}
                      onChange={(e) => handleEditFormChange('features.bedrooms', e.target.value)}
                      placeholder="Number of bedrooms"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Bathrooms</label>
                    <input
                      type="number"
                      className="form-input"
                      value={editForm.features.bathrooms}
                      onChange={(e) => handleEditFormChange('features.bathrooms', e.target.value)}
                      placeholder="Number of bathrooms"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Built-up Area (sq.ft)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={editForm.features.builtUpArea}
                      onChange={(e) => handleEditFormChange('features.builtUpArea', e.target.value)}
                      placeholder="Built-up area"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Carpet Area (sq.ft)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={editForm.features.carpetArea}
                      onChange={(e) => handleEditFormChange('features.carpetArea', e.target.value)}
                      placeholder="Carpet area"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="edit-section">
                  <h3 className="edit-section-title">📞 Contact Information</h3>
                  <div className="form-group">
                    <label className="form-label">Owner Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editForm.contactInfo.ownerName}
                      onChange={(e) => handleEditFormChange('contactInfo.ownerName', e.target.value)}
                      placeholder="Owner name"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-input"
                      value={editForm.contactInfo.phone}
                      onChange={(e) => handleEditFormChange('contactInfo.phone', e.target.value)}
                      placeholder="Phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={editForm.contactInfo.email}
                      onChange={(e) => handleEditFormChange('contactInfo.email', e.target.value)}
                      placeholder="Email address"
                    />
                  </div>
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={editForm.contactInfo.showPhone}
                        onChange={(e) => handleEditFormChange('contactInfo.showPhone', e.target.checked)}
                      />
                      Show Phone
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={editForm.contactInfo.showEmail}
                        onChange={(e) => handleEditFormChange('contactInfo.showEmail', e.target.checked)}
                      />
                      Show Email
                    </label>
                  </div>
                </div>
              </div>

              {/* Description Field (Full Width) */}
              <div className="edit-section full-width">
                <h3 className="edit-section-title">📝 Description</h3>
                <div className="form-group">
                  <textarea
                    className="form-textarea"
                    value={editForm.description}
                    onChange={(e) => handleEditFormChange('description', e.target.value)}
                    placeholder="Enter property description"
                    rows={isMobile ? "3" : "4"}
                  />
                </div>
              </div>

              {/* Mobile Only Fields */}
              {isMobile && (
                <>
                  <div className="edit-section">
                    <h3 className="edit-section-title">📍 More Location Details</h3>
                    <div className="form-group">
                      <label className="form-label">Landmark</label>
                      <input
                        type="text"
                        className="form-input"
                        value={editForm.location.landmark}
                        onChange={(e) => handleEditFormChange('location.landmark', e.target.value)}
                        placeholder="Enter landmark"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Pincode</label>
                      <input
                        type="text"
                        className="form-input"
                        value={editForm.location.pincode}
                        onChange={(e) => handleEditFormChange('location.pincode', e.target.value)}
                        placeholder="Enter pincode"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Full Address</label>
                      <textarea
                        className="form-textarea"
                        value={editForm.location.fullAddress}
                        onChange={(e) => handleEditFormChange('location.fullAddress', e.target.value)}
                        placeholder="Enter full address"
                        rows="2"
                      />
                    </div>
                  </div>

                  <div className="edit-section">
                    <h3 className="edit-section-title">🎯 Amenities</h3>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-input"
                        value={editForm.features.amenities?.join(', ') || ''}
                        onChange={(e) => {
                          const val = e.target.value || '';
                          const parts = val.split(',');
                          const amenitiesArray = parts.reduce((acc: string[], part) => {
                            if (part && typeof part === 'string') {
                              const trimmed = part.trim();
                              if (trimmed !== '') {
                                acc.push(trimmed);
                              }
                            }
                            return acc;
                          }, []);
                          
                          setEditForm(prev => ({
                            ...prev,
                            features: {
                              ...prev.features,
                              amenities: amenitiesArray
                            }
                          }));
                        }}
                        placeholder="Security, Parking, Gym"
                      />
                      <small className="form-hint">Separate with commas</small>
                    </div>
                  </div>
                </>
              )}

              {/* Images Section */}
              <div className="edit-section full-width media-section">
                <h3 className="edit-section-title">📸 Property Images</h3>
                
                {/* Existing Images */}
                {existingImages.length > 0 && (
                  <div className="existing-media">
                    <h4 className="media-subtitle">Existing Images ({existingImages.length})</h4>
                    <div className={`media-grid ${isMobile ? 'mobile-media-grid' : ''}`}>
                      {existingImages.map((img, index) => (
                        <div key={index} className="media-item">
                          <img src={img.url || img.fileUrl || ''} alt={`Property ${index + 1}`} />
                          <button
                            className="delete-media-btn"
                            onClick={() => removeExistingImage(img)}
                            title="Delete Image"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Images Preview */}
                {newImages.length > 0 && (
                  <div className="new-media">
                    <h4 className="media-subtitle">New Images to Upload ({newImages.length})</h4>
                    <div className={`media-grid ${isMobile ? 'mobile-media-grid' : ''}`}>
                      {newImages.map((file, index) => (
                        <div key={index} className="media-item">
                          <img src={URL.createObjectURL(file)} alt={`New ${index + 1}`} />
                          <button
                            className="delete-media-btn"
                            onClick={() => removeNewImage(index)}
                            title="Remove Image"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add Images Button */}
                <div className="upload-section">
                  <label className="upload-btn">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    ➕ Add Images
                  </label>
                  <p className="upload-hint">Maximum 20 images, up to 10MB each</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="modal-btn secondary" 
                onClick={() => setShowEditModal(false)}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button 
                className="modal-btn primary"  
                onClick={handleUpdateProperty} 
                disabled={isUpdating} 
              >  
                {isUpdating ? '⏳ Updating...' : '✅ Update Property'}
              </button> 
            </div>  
          </div>  
        </div> 
      )} 
    </div>  
  );
};  

export default ManageProperties;