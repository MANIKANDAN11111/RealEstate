import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Home, MapPin, Bed, Bath, Maximize, Heart, Share2, Phone, Mail, 
  Calendar, Check, Car, Layers, Shield, TrendingUp, ArrowLeft, 
  Star, Download, Printer, Facebook, Twitter, Linkedin, Instagram, 
  Clock, Users, Building, Mountain, DollarSign, Megaphone 
} from 'lucide-react';
import AGLogo from '../../assets/AG_logo.jpeg';
import './buy_view_details.css';

// Define Property Interface matching backend
interface Property {
  id: string;
  propertyType: string;
  propertyCategory: string;
  propertySubCategory: string;
  title: string;
  description: string;
  priceDetails?: {
    price: number;
    priceUnit: string;
  };
  location?: {
    district: string;
    locality: string;
    landmark?: string;
    fullAddress: string;
    state?: string;
    city?: string;
    pincode?: string;
  };
  features?: {
    bedrooms?: number;
    bathrooms?: number;
    balconies?: number;
    builtUpArea?: number;
    carpetArea?: number;
    areaUnit?: string;
    floor?: number;
    totalFloors?: number;
    facing?: string;
    propertyAge?: number;
    furnished?: boolean;
    parking?: boolean;
    parkingCount?: number;
    amenities?: string[];
  };
  propertyDetails?: Record<string, any>;
  contactInfo?: {
    ownerName?: string;
    phone: string;
    email: string;
    showPhone?: boolean;
    showEmail?: boolean;
  };
  images?: Array<{
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }>;
  videos?: Array<{
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }>;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

// Header Component
interface HeaderProps {
  scrolled: boolean;
}

function Header({ scrolled }: HeaderProps) {
  
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Buy', icon: Building, path: '/buy' },
    { name: 'Sell', icon: DollarSign, path: '/sell' },
    { name: 'Advertise', icon: Megaphone, path: '/advertise' },
    { name: 'Contact', icon: Phone, path: '/contact' },
  ];

  return (
    <header className={`pd5-property-details-header ${scrolled ? 'pd5-scrolled' : ''}`}>
      <div className="pd5-property-details-header-content">
        <Link to="/" className="pd5-property-details-logo">
          <img src={AGLogo} alt="PropFinder" className="pd5-property-details-logo-image" />
          <span className="pd5-property-details-logo-text">DreamProperties</span>
        </Link>
        <nav className="pd5-property-details-nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="pd5-property-details-nav-item"
            >
              <item.icon className="pd5-property-details-nav-icon" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

// Updated Footer Component (from ContactUs)
function Footer() {
  return (
    <footer className="pd5-contact-footer">
      <div className="pd5-contact-footer-container">
        <div className="pd5-contact-footer-content">
          <div className="pd5-contact-footer-section">
            <div className="pd5-contact-footer-logo">
              <Link to="/" className="pd5-contact-logo-link">
                <img src={AGLogo} alt="PropFinder Logo" className="pd5-contact-logo-image" />
                <span className="pd5-contact-footer-logo-text">DreamProperties</span>
              </Link>
            </div>
            <p className="pd5-contact-footer-description">
              Your trusted partner in finding the perfect property across Tamil Nadu. We make real
              estate easy.
            </p>
            <div className="pd5-contact-footer-social">
              <a href="#" className="pd5-contact-social-link">
                <Facebook className="pd5-contact-social-icon" />
              </a>
              <a href="#" className="pd5-contact-social-link">
                <Twitter className="pd5-contact-social-icon" />
              </a>
              <a href="#" className="pd5-contact-social-link">
                <Instagram className="pd5-contact-social-icon" />
              </a>
              <a href="#" className="pd5-contact-social-link">
                <Linkedin className="pd5-contact-social-icon" />
              </a>
            </div>
          </div>

          <div className="pd5-contact-footer-section">
            <h3 className="pd5-contact-footer-title">Quick Links</h3>
            <ul className="pd5-contact-footer-links">
              <li>
                <Link to="/" className="pd5-contact-footer-link">Home</Link>
              </li>
              <li>
                <Link to="/buy" className="pd5-contact-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/sell" className="pd5-contact-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/advertise" className="pd5-contact-footer-link">Advertise</Link>
              </li>
            </ul>
          </div>

          <div className="pd5-contact-footer-section">
            <h3 className="pd5-contact-footer-title">Properties</h3>
            <ul className="pd5-contact-footer-links">
              <li>
                <Link to="/buy" className="pd5-contact-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/properties" className="pd5-contact-footer-link">Rent Property</Link>
              </li>
              <li>
                <Link to="/sell" className="pd5-contact-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/properties" className="pd5-contact-footer-link">Featured Listings</Link>
              </li>
            </ul>
          </div>

          <div className="pd5-contact-footer-section">
            <h3 className="pd5-contact-footer-title">Legal</h3>
            <ul className="pd5-contact-footer-links">
              <li>
                <a href="#" className="pd5-contact-footer-link">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="pd5-contact-footer-link">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="pd5-contact-footer-link">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="pd5-contact-footer-link">Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pd5-contact-footer-bottom">
          <p className="pd5-contact-footer-copyright">
            &copy; 2024 DreamProperties. All rights reserved. | Built with excellence for Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch property details from API
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) {
        setError('No property ID provided');
        setLoading(false);
        return;
      }
      
      console.log(`Fetching property details for ID: ${id}`);
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://realestatebackend-8adg.onrender.com/api/properties/${id}`);
        
        console.log(`API Response Status: ${response.status}`);
        
        if (response.status === 404) {
          throw new Error('Property not found. Please check the property ID.');
        }
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('API Response Data:', data);
        
        // Check if we got a success response with property data
        if (data && typeof data === 'object') {
          // If the response has a success property (like in error responses)
          if (data.success === false) {
            throw new Error(data.message || 'Failed to fetch property');
          }
          
          // If the response has a property field
          if (data.property) {
            setProperty(data.property);
          } else {
            // If the response IS the property
            setProperty(data);
          }
        } else {
          throw new Error('Invalid data received from server');
        }
        
      } catch (err) {
        console.error('Error fetching property details:', err);
        
        let errorMessage = 'Failed to load property details. ';
        if (err instanceof Error) {
          errorMessage += err.message;
        }
        
        setError(errorMessage);
        setProperty(null);
        
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format price for display
  const formatPrice = () => {
    if (!property?.priceDetails) return 'Price not available';
    
    const price = property.priceDetails.price;
    const unit = property.priceDetails.priceUnit;
    
    if (unit === 'lakh') {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    } else if (unit === 'crore') {
      return `₹${(price / 10000000).toFixed(2)} Crore`;
    } else if (unit === 'sqft') {
      return `₹${price.toLocaleString()} per sq.ft`;
    } else if (unit === 'month') {
      return `₹${price.toLocaleString()} per month`;
    }
    return `₹${price.toLocaleString()}`;
  };

  // Get price per sqft
  const getPricePerSqft = () => {
    if (!property?.priceDetails || !property?.features?.builtUpArea) return '';
    
    const price = property.priceDetails.price;
    const area = property.features.builtUpArea;
    
    if (area > 0) {
      const pricePerSqft = Math.round(price / area);
      return `₹${pricePerSqft.toLocaleString()}/sqft`;
    }
    return '';
  };

  // Get property location
  const getLocation = () => {
    if (!property?.location) return 'Location not specified';
    
    const loc = property.location;
    if (loc.locality && loc.district) {
      return `${loc.locality}, ${loc.district}, ${loc.state || 'Tamil Nadu'} ${loc.pincode || ''}`;
    }
    return loc.fullAddress || 'Location not specified';
  };

  const handleContactOwner = () => {
    if (!property?.contactInfo) {
      alert("Contact information not available");
      return;
    }
    alert(`Contacting owner: ${property.contactInfo.ownerName}\nPhone: ${property.contactInfo.phone}\nEmail: ${property.contactInfo.email}`);
  };

  const handleScheduleVisit = () => {
    alert("Schedule visit feature coming soon!");
  };

  const handleShare = () => {
    navigator.share?.({
      title: property?.title || 'Property',
      text: `Check out this property: ${property?.title}`,
      url: window.location.href
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="pd5-property-details-page">
        <Header scrolled={scrolled} />
        <div className="pd5-loading-container">
          <div className="pd5-spinner"></div>
          <p>Loading property details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error && !property) {
    return (
      <div className="pd5-property-details-page">
        <Header scrolled={scrolled} />
        <div className="pd5-error-container">
          <p>⚠️ {error}</p>
          <p className="pd5-debug-info">Property ID: {id}</p>
          <button className="pd5-back-btn" onClick={() => navigate('/buy')}>
            <ArrowLeft className="pd5-back-btn-icon" />
            Back to Properties
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pd5-property-details-page">
        <Header scrolled={scrolled} />
        <div className="pd5-error-container">
          <p>Property not found</p>
          <p>Please check if the property ID is correct.</p>
          <button className="pd5-back-btn" onClick={() => navigate('/buy')}>
            <ArrowLeft className="pd5-back-btn-icon" />
            Back to Properties
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pd5-property-details-page">
      <Header scrolled={scrolled} />

      {/* Back Button */}
      <div className="pd5-property-details-back-container">
        <button className="pd5-property-details-back-btn" onClick={() => navigate('/buy')}>
          <ArrowLeft className="pd5-property-details-back-icon" />
          Back to Properties
        </button>
      </div>

      {/* Property Header */}
      <main className="pd5-property-details-main">
        <div className="pd5-property-details-header-section">
          <div className="pd5-property-details-title-section">
            <h1 className="pd5-property-details-title">{property.title}</h1>
            <div className="pd5-property-details-location">
              <MapPin className="pd5-property-details-location-icon" />
              {getLocation()}
            </div>
          </div>
          <div className="pd5-property-details-price-section">
            <div className="pd5-property-details-price">{formatPrice()}</div>
            {getPricePerSqft() && (
              <div className="pd5-property-details-price-sub">{getPricePerSqft()}</div>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="pd5-property-details-gallery">
          <div className="pd5-property-details-main-image">
            <img
              src={property.images && property.images.length > 0 ? property.images[activeImage].fileUrl : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
              alt="Property"
              className="pd5-property-details-active-image"
            />
            <div className="pd5-property-details-image-actions">
              <button
                className={`pd5-property-details-favorite-btn ${isFavorite ? 'pd5-active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className="pd5-property-details-favorite-icon" />
                {isFavorite ? 'Saved' : 'Save'}
              </button>
              <button className="pd5-property-details-share-btn" onClick={handleShare}>
                <Share2 className="pd5-property-details-share-icon" />
                Share
              </button>
            </div>
          </div>
          <div className="pd5-property-details-thumbnails">
            {property.images && property.images.length > 0 ? (
              property.images.map((img, index) => (
                <div
                  key={index}
                  className={`pd5-property-details-thumbnail ${activeImage === index ? 'pd5-active' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img.fileUrl} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))
            ) : (
              <div className="pd5-no-images">
                <p>No images available</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="pd5-property-details-content">
          {/* Left Column */}
          <div className="pd5-property-details-left-column">
            {/* Quick Stats */}
            <div className="pd5-property-details-stats">
              <div className="pd5-property-details-stat">
                <Bed className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.features?.bedrooms || 'N/A'}</div>
                  <div className="pd5-property-details-stat-label">Bedrooms</div>
                </div>
              </div>
              <div className="pd5-property-details-stat">
                <Bath className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.features?.bathrooms || 'N/A'}</div>
                  <div className="pd5-property-details-stat-label">Bathrooms</div>
                </div>
              </div>
              <div className="pd5-property-details-stat">
                <Maximize className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.features?.builtUpArea || property.features?.carpetArea || 'N/A'}</div>
                  <div className="pd5-property-details-stat-label">Sq. Ft.</div>
                </div>
              </div>
              <div className="pd5-property-details-stat">
                <Car className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.features?.parkingCount || (property.features?.parking ? 'Yes' : 'No')}</div>
                  <div className="pd5-property-details-stat-label">Parking</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Description</h2>
              <p className="pd5-property-details-description">{property.description || 'No description available'}</p>
            </div>

            {/* Specifications */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Property Specifications</h2>
              <div className="pd5-property-details-specs-grid">
                {/* Property Type */}
                <div className="pd5-property-details-spec-item">
                  <span className="pd5-property-details-spec-label">PROPERTY TYPE</span>
                  <span className="pd5-property-details-spec-value">
                    {property.propertyType ? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1) : 'N/A'} - {property.propertyCategory || 'N/A'}
                  </span>
                </div>
                
                {/* Sub Category */}
                {property.propertySubCategory && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">SUB CATEGORY</span>
                    <span className="pd5-property-details-spec-value">
                      {property.propertySubCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                )}
                
                {/* Built-up Area */}
                {property.features?.builtUpArea && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">BUILT-UP AREA</span>
                    <span className="pd5-property-details-spec-value">{property.features.builtUpArea.toLocaleString()} sqft</span>
                  </div>
                )}
                
                {/* Carpet Area */}
                {property.features?.carpetArea && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">CARPET AREA</span>
                    <span className="pd5-property-details-spec-value">{property.features.carpetArea.toLocaleString()} sqft</span>
                  </div>
                )}
                
                {/* Facing */}
                {property.features?.facing && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">FACING</span>
                    <span className="pd5-property-details-spec-value">{property.features.facing}</span>
                  </div>
                )}
                
                {/* Property Age */}
                {property.features?.propertyAge && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">PROPERTY AGE</span>
                    <span className="pd5-property-details-spec-value">{property.features.propertyAge} years</span>
                  </div>
                )}
                
                {/* Furnishing */}
                {property.features?.furnished !== undefined && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">FURNISHING</span>
                    <span className="pd5-property-details-spec-value">
                      {property.features.furnished ? 'Fully Furnished' : 'Unfurnished'}
                    </span>
                  </div>
                )}
                
                {/* Floor Number */}
                {property.features?.floor && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">FLOOR NUMBER</span>
                    <span className="pd5-property-details-spec-value">{property.features.floor}</span>
                  </div>
                )}
                
                {/* Total Floors */}
                {property.features?.totalFloors && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">TOTAL FLOORS</span>
                    <span className="pd5-property-details-spec-value">{property.features.totalFloors}</span>
                  </div>
                )}
                
                {/* Display additional property details */}
                {property.propertyDetails && Object.entries(property.propertyDetails).map(([key, value]) => (
                  <div key={key} className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">
                      {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <span className="pd5-property-details-spec-value">
                      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value || 'N/A')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Amenities & Features</h2>
              <div className="pd5-property-details-amenities">
                {property.features?.amenities && property.features.amenities.length > 0 ? (
                  property.features.amenities.map((amenity, index) => (
                    <div key={index} className="pd5-property-details-amenity">
                      <Check className="pd5-property-details-amenity-icon" />
                      {amenity}
                    </div>
                  ))
                ) : (
                  <p className="pd5-no-amenities">No amenities listed</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Info */}
          <div className="pd5-property-details-right-column">
            {/* Owner Contact Card */}
            <div className="pd5-property-details-contact-card">
              <h3 className="pd5-property-details-contact-title">Contact Owner</h3>
              <div className="pd5-property-details-owner-info">
                <div className="pd5-property-details-owner-header">
                  <div className="pd5-property-details-owner-avatar">
                    {property.contactInfo?.ownerName?.charAt(0) || 'P'}
                  </div>
                  <div className="pd5-property-details-owner-details">
                    <div className="pd5-property-details-owner-name">
                      {property.contactInfo?.ownerName || 'Property Owner'}
                      {property.contactInfo?.phone && (
                        <Shield className="pd5-property-details-verified-icon" title="Verified" />
                      )}
                    </div>
                    <div className="pd5-property-details-owner-rating">
                      <Star className="pd5-property-details-rating-icon" />
                      4.8/5
                    </div>
                  </div>
                </div>
                <div className="pd5-property-details-contact-info">
                  {property.contactInfo?.phone && (
                    <div className="pd5-property-details-contact-item">
                      <Phone className="pd5-property-details-contact-icon" />
                      {property.contactInfo.phone}
                    </div>
                  )}
                  {property.contactInfo?.email && (
                    <div className="pd5-property-details-contact-item">
                      <Mail className="pd5-property-details-contact-icon" />
                      {property.contactInfo.email}
                    </div>
                  )}
                </div>
              </div>
              <div className="pd5-property-details-contact-actions">
                {property.contactInfo?.phone && (
                  <button className="pd5-property-details-call-btn" onClick={handleContactOwner}>
                    <Phone className="pd5-property-details-call-icon" />
                    Call Owner
                  </button>
                )}
                <button className="pd5-property-details-visit-btn" onClick={handleScheduleVisit}>
                  <Calendar className="pd5-property-details-visit-icon" />
                  Schedule Visit
                </button>
              </div>
            </div>

            {/* Location & Nearby */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Location Details</h2>
              <div className="pd5-property-details-nearby">
                {property.location?.district && (
                  <div className="pd5-property-details-nearby-item">
                    <div className="pd5-property-details-nearby-icon"><Building /></div>
                    <div className="pd5-property-details-nearby-content">
                      <div className="pd5-property-details-nearby-name">District</div>
                      <div className="pd5-property-details-nearby-distance">{property.location.district}</div>
                    </div>
                  </div>
                )}
                {property.location?.locality && (
                  <div className="pd5-property-details-nearby-item">
                    <div className="pd5-property-details-nearby-icon"><MapPin /></div>
                    <div className="pd5-property-details-nearby-content">
                      <div className="pd5-property-details-nearby-name">Locality</div>
                      <div className="pd5-property-details-nearby-distance">{property.location.locality}</div>
                    </div>
                  </div>
                )}
                {property.location?.landmark && (
                  <div className="pd5-property-details-nearby-item">
                    <div className="pd5-property-details-nearby-icon"><Layers /></div>
                    <div className="pd5-property-details-nearby-content">
                      <div className="pd5-property-details-nearby-name">Landmark</div>
                      <div className="pd5-property-details-nearby-distance">{property.location.landmark}</div>
                    </div>
                  </div>
                )}
                {property.location?.pincode && (
                  <div className="pd5-property-details-nearby-item">
                    <div className="pd5-property-details-nearby-icon"><Shield /></div>
                    <div className="pd5-property-details-nearby-content">
                      <div className="pd5-property-details-nearby-name">Pincode</div>
                      <div className="pd5-property-details-nearby-distance">{property.location.pincode}</div>
                    </div>
                  </div>
                )}
                {!property.location?.district && !property.location?.locality && (
                  <div className="pd5-no-location">
                    <p>Location details not specified</p>
                  </div>
                )}
              </div>
            </div>

            {/* Property Status */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Property Status</h2>
              <div className="pd5-property-status">
                <div className="pd5-status-item">
                  <span className="pd5-status-label">Status:</span>
                  <span className={`pd5-status-value ${property.status?.toLowerCase()}`}>
                    {property.status || 'N/A'}
                  </span>
                </div>
                <div className="pd5-status-item">
                  <span className="pd5-status-label">Listed On:</span>
                  <span className="pd5-status-value">
                    {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}