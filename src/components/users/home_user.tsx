import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Building2, DollarSign, Megaphone, Phone,
  MapPin, ArrowRight, Bed, Bath, Maximize,
  Heart, Facebook, Twitter, Instagram, Linkedin,
  Upload, ShoppingBag, MessageCircle, 
  Menu, X, Map, Home as HomeIcon
} from 'lucide-react';
import './home_user.css';
import AGLogo from '../../assets/AG_logo.jpeg';

// Types for API response
interface PropertyPriceDetails {
  price: number;
  priceUnit: string;
  negotiable: boolean | null;
  maintenanceCharge: number | null;
  bookingAmount: number | null;
}

interface PropertyLocation {
  state: string;
  district: string;
  city: string | null;
  locality: string;
  landmark: string;
  pincode: string;
  fullAddress: string;
  latitude: number | null;
  longitude: number | null;
}

interface PropertyFeatures {
  bedrooms: number;
  bathrooms: number;
  balconies: number | null;
  builtUpArea: number;
  carpetArea: number;
  areaUnit: string | null;
  floor: number | null;
  totalFloors: number | null;
  facing: string | null;
  propertyAge: string | null;
  furnished: string | null;
  parking: string | null;
  parkingCount: number | null;
  amenities: string[];
}

interface PropertyDetails {
  floorNumber: string;
  totalFloors: string;
  facing: string;
  carpetArea: number;
  superBuiltUpArea: number;
  cornerApartment: boolean;
  propertyAge: string;
  liftAvailable: boolean;
  builtUpArea: number;
}

interface ContactInfo {
  ownerName: string;
  phone: string;
  email: string;
  showPhone: boolean;
  showEmail: boolean;
}

interface PropertyImage {
  fileName: string;
  fileType: string;
  fileUrl: string;
  fileSize: number;
  key: string;
}

interface Property {
  id: string;
  propertyType: string;
  propertyCategory: string;
  propertySubCategory: string;
  title: string;
  description: string;
  priceDetails: PropertyPriceDetails;
  location: PropertyLocation;
  features: PropertyFeatures;
  propertyDetails: PropertyDetails;
  contactInfo: ContactInfo;
  images: PropertyImage[];
  videos: any[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Header Component
interface HeaderProps {
  currentPage: string;
  scrolled: boolean;
}

function Header({ currentPage, scrolled }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', icon: Home, page: 'home', path: '/' },
    { name: 'Buy', icon: Building2, page: 'buy', path: '/buy' },
    { name: 'Sell', icon: DollarSign, page: 'sell', path: '/sell' },
    { name: 'Advertise Property', icon: Megaphone, page: 'advertise', path: '/advertise' },
    { name: 'Contact Us', icon: Phone, page: 'contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sell-header-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="sell-header-content">
        <Link to="/" className="sell-logo-link">
          <img src={AGLogo} alt="DreamProperties Logo" className="sell-logo-image" />
          <span className="sell-logo-text">DreamProperties</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="sell-mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`sell-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.path}
              className={`sell-nav-item ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={item.name}
            >
              <item.icon className="sell-nav-icon" />
              <span className="sell-nav-text">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="sell-footer">
      <div className="sell-footer-container">
        <div className="sell-footer-content">
          <div className="sell-footer-section">
            <div className="sell-footer-logo">
              <Link to="/" className="sell-logo-link">
                <img src={AGLogo} alt="PropFinder Logo" className="sell-logo-image" />
                <span className="sell-footer-logo-text">DreamProperties</span>
              </Link>
            </div>
            <p className="sell-footer-description">
              Your trusted partner in finding the perfect property across Tamil Nadu. We make real
              estate easy.
            </p>
            <div className="sell-footer-social">
              <a href="#" className="sell-social-link" aria-label="Facebook">
                <Facebook className="sell-social-icon" />
              </a>
              <a href="#" className="sell-social-link" aria-label="Twitter">
                <Twitter className="sell-social-icon" />
              </a>
              <a href="https://www.instagram.com/ag_dreamproperties" className="sell-social-link" aria-label="Instagram">
                <Instagram className="sell-social-icon" />
              </a>
              <a href="#" className="sell-social-link" aria-label="LinkedIn">
                <Linkedin className="sell-social-icon" />
              </a>
            </div>
          </div>

          <div className="sell-footer-section">
            <h3 className="sell-footer-title">Quick Links</h3>
            <ul className="sell-footer-links">
              <li>
                <Link to="/" className="sell-footer-link">Home</Link>
              </li>
              <li>
                <Link to="/buy" className="sell-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/sell" className="sell-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/advertise" className="sell-footer-link">Advertise</Link>
              </li>
            </ul>
          </div>

          <div className="sell-footer-section">
            <h3 className="sell-footer-title">Properties</h3>
            <ul className="sell-footer-links">
              <li>
                <Link to="/buy" className="sell-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/properties" className="sell-footer-link">Rent Property</Link>
              </li>
              <li>
                <Link to="/sell" className="sell-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/properties" className="sell-footer-link">Featured Listings</Link>
              </li>
            </ul>
          </div>

          <div className="sell-footer-section">
            <h3 className="sell-footer-title">Legal</h3>
            <ul className="sell-footer-links">
              <li>
                <a href="#" className="sell-footer-link">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="sell-footer-link">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="sell-footer-link">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="sell-footer-link">Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="sell-footer-bottom">
          <p className="sell-footer-copyright">
            &copy; 2024 DreamProperties. All rights reserved. | <a href="https://ananthitech.vercel.app/" target="_blank" rel="noopener noreferrer">Designed and Developed by Ananthi Software Solutions</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// Quick Contact Floating Buttons Component
function QuickContactButtons() {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/916374656460', '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+916374656460';
  };

  const handleLocationClick = () => {
    window.open('https://maps.google.com/?q=Tamil+Nadu,India', '_blank');
  };

  return (
    <div className="quick-contact-buttons">
      <button 
        className="quick-contact-btn whatsapp-btn"
        onClick={handleWhatsAppClick}
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="quick-contact-icon" />
        <span className="quick-contact-tooltip">Chat on WhatsApp</span>
      </button>
      
      <button 
        className="quick-contact-btn call-btn"
        onClick={handleCallClick}
        title="Call Now"
        aria-label="Call Now"
      >
        <Phone className="quick-contact-icon" />
        <span className="quick-contact-tooltip">Call Now</span>
      </button>
      
      <button 
        className="quick-contact-btn location-btn"
        onClick={handleLocationClick}
        title="Our Location"
        aria-label="Our Location"
      >
        <MapPin className="quick-contact-icon" />
        <span className="quick-contact-tooltip">Our Location</span>
      </button>
    </div>
  );
}

// PropertyCard Component
interface PropertyCardProps {
  property: Property;
}

function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // Format price based on priceUnit
  const formatPrice = () => {
    const { price, priceUnit } = property.priceDetails;
    if (priceUnit === 'lakh') {
      return `₹${price} L`;
    } else if (priceUnit === 'cr') {
      return `₹${price} Cr`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  // Get location string
  const getLocationString = () => {
    const { locality, district, state } = property.location;
    return `${locality}, ${district}, ${state}`;
  };

  // Get first image or fallback
  const getImageUrl = () => {
    if (property.images && property.images.length > 0) {
      return property.images[0].fileUrl;
    }
    // Fallback image
    return 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg';
  };

  // Determine if property is for sale or rent based on type
  const getPropertyType = () => {
    return property.propertyType === 'rental' ? 'rent' : 'sale';
  };

  // Handle card click
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation when clicking on the favorite button
    if ((e.target as HTMLElement).closest('.favorite-button')) {
      return;
    }
    navigate(`/property/${property.id}`);
  };

  // Handle favorite click
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation when clicking favorite
    setIsFavorite(!isFavorite);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/property/${property.id}`);
    }
  };

  return (
    <div 
      className="property-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${property.title} - ${getLocationString()}`}
    >
      <div className="property-image-container">
        <img 
          src={getImageUrl()} 
          alt={property.title} 
          className="property-image"
          loading="lazy"
        />
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className="favorite-icon" />
        </button>
      </div>
      <div className="property-content">
        <div className="property-price">{formatPrice()}</div>
        <h3 className="property-title">{property.title}</h3>
        <div className="property-location">
          <MapPin className="location-icon" />
          <span>{getLocationString()}</span>
        </div>
        <div className="property-features">
          <div className="feature">
            <Bed className="feature-icon" />
            <span>{property.features.bedrooms || 0} Beds</span>
          </div>
          <div className="feature">
            <Bath className="feature-icon" />
            <span>{property.features.bathrooms || 0} Baths</span>
          </div>
          <div className="feature">
            <Maximize className="feature-icon" />
            <span>{property.features.builtUpArea || 0} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton Component
function PropertyCardSkeleton() {
  return (
    <div className="property-card skeleton" role="article">
      <div className="property-image-container">
        <div className="skeleton-image"></div>
      </div>
      <div className="property-content">
        <div className="skeleton-text skeleton-price"></div>
        <div className="skeleton-text skeleton-title"></div>
        <div className="property-location">
          <MapPin className="location-icon" />
          <div className="skeleton-text skeleton-location"></div>
        </div>
        <div className="property-features">
          <div className="feature">
            <Bed className="feature-icon" />
            <div className="skeleton-text"></div>
          </div>
          <div className="feature">
            <Bath className="feature-icon" />
            <div className="skeleton-text"></div>
          </div>
          <div className="feature">
            <Maximize className="feature-icon" />
            <div className="skeleton-text"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// HomePage Component
export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);
  
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://realestatebackend-8adg.onrender.com/api/properties');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Filter only PUBLISHED properties and take first 6
      const publishedProperties = data
        .filter((prop: Property) => prop.status === 'PUBLISHED')
        .slice(0, 6);
      
      setProperties(publishedProperties);
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Determine current page from URL
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/buy') return 'buy';
    if (path === '/sell') return 'sell';
    if (path === '/advertise') return 'advertise';
    if (path === '/contact') return 'contact';
    return 'home';
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const currentPage = getCurrentPage();

  const handlePublish = () => {
    navigate('/advertise');
  };

  const handleBuy = () => {
    navigate('/buy');
  };

  const districts = [
    { name: 'Chennai City', properties: 245, icon: HomeIcon },
    { name: 'Coimbatore', properties: 189, icon: HomeIcon },
    { name: 'Madurai', properties: 156, icon: HomeIcon },
    { name: 'Trichy', properties: 134, icon: HomeIcon },
    { name: 'Salem', properties: 98, icon: HomeIcon },
    { name: 'Tirunelveli', properties: 87, icon: HomeIcon },
  ];

  return (
    <div className="home-page-wrapper">
      <Header currentPage={currentPage} scrolled={scrolled} />
      
      {/* Quick Contact Floating Buttons */}
      <QuickContactButtons />
      
      <div className="home-page">
        {/* Hero Section */}
        <section className="sell-hero-section home-hero">
          <div className="sell-hero-content">
            <h1 className="sell-hero-title">Find Your Dream Property</h1>
            <p className="sell-hero-subtitle">Discover the perfect home across Tamil Nadu's prime locations</p>
            
            <div className="sell-hero-buttons">
              <button 
                className="sell-hero-button primary"
                onClick={handlePublish}
                aria-label="Publish your properties"
              >
                <Upload className="sell-hero-button-icon" />
                Publish Your Properties
              </button>
              
              <button 
                className="sell-hero-button secondary"
                onClick={handleBuy}
                aria-label="Buy our property"
              >
                <ShoppingBag className="sell-hero-button-icon" />
                Buy Our Property
              </button>
            </div>
          </div>
        </section>

        {/* Featured Properties */}
        <section className="featured-properties" aria-labelledby="featured-properties-title">
          <div className="section-header">
            <div>
              <h2 id="featured-properties-title" className="section-title">Featured Properties</h2>
              <p className="section-subtitle">Discover our latest properties</p>
            </div>
            {properties.length > 0 && (
              <button className="view-all-button" onClick={handleBuy} aria-label="View all properties">
                View All
                <ArrowRight className="arrow-icon" />
              </button>
            )}
          </div>

          {loading ? (
            // Loading skeletons
            <div className="properties-grid">
              {[...Array(4)].map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="properties-error">
              <p className="error-message">{error}</p>
              <button 
                className="retry-button"
                onClick={fetchProperties}
                aria-label="Retry loading properties"
              >
                Retry
              </button>
            </div>
          ) : properties.length === 0 ? (
            // No properties state
            <div className="properties-empty">
              <Map className="empty-icon" size={48} />
              <h3>No Properties Available</h3>
              <p>Check back soon for new listings!</p>
            </div>
          ) : (
            // Properties grid
            <div className="properties-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </section>

        {/* Quote Section */}
        <section className="quote-section">
          <div className="quote-container">
            <p className="quote-text">
              "Finding your perfect home shouldn't be a dream. We make it a reality with trust, transparency, and expertise."
            </p>
            <p className="quote-author">—AG DREAM PROPERTIES</p>
          </div>
        </section>

        {/* Districts Section */}
        <section className="districts-section" aria-labelledby="districts-title">
          <div className="districts-container">
            <h2 id="districts-title" className="section-title center">Explore by District</h2>
            <p className="section-subtitle center">Find properties across major districts of Tamil Nadu</p>
            
            <div className="districts-grid">
              {districts.map((district, index) => {
                const Icon = district.icon;
                return (
                  <button 
                    key={index} 
                    className="district-card" 
                    onClick={() => navigate('/buy')}
                    aria-label={`Explore properties in ${district.name}`}
                  >
                    <div className="district-icon-wrapper">
                      <Icon className="district-icon" />
                    </div>
                    <h3 className="district-name">{district.name}</h3>
                    <p className="district-properties">{district.properties} Properties</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}