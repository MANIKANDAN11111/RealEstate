import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Building2, DollarSign, Megaphone, Phone,
  Facebook, Twitter, Instagram, Linkedin,
  MapPin, Bed, Bath, Maximize, Heart, Search,
  ChevronLeft, ChevronRight, MessageCircle
} from 'lucide-react';
import './Buy.css';

import AGLogo from '../../assets/AG_logo.jpeg';

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
  };
  features?: {
    bedrooms?: number;
    bathrooms?: number;
    builtUpArea?: number;
    carpetArea?: number;
    amenities?: string[];
  };
  images?: Array<{
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }>;
  status: string;
  createdAt: string;
}

// Header Component
interface HeaderProps {
  currentPage: string;
  scrolled: boolean;
}

function Header({ currentPage, scrolled }: HeaderProps) {
  const navItems = [
    { name: 'Home', icon: Home, page: 'home', path: '/' },
    { name: 'Buy', icon: Building2, page: 'buy', path: '/buy' },
    { name: 'Sell', icon: DollarSign, page: 'sell', path: '/sell' },
    { name: 'Advertise Property', icon: Megaphone, page: 'advertise', path: '/advertise' },
    { name: 'Contact Us', icon: Phone, page: 'contact', path: '/contact' },
  ];

  return (
    <header className={`sell-header-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="sell-header-content">
        <Link to="/" className="sell-logo-link">
          <img src={AGLogo} alt="PropFinder Logo" className="sell-logo-image" />
          <span className="sell-logo-text">DreamProperties</span>
        </Link> 
        
        <nav className="sell-nav">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.path}
              className={`sell-nav-item ${currentPage === item.page ? 'active' : ''}`}
            >
              <item.icon className="sell-nav-icon" />
              <span>{item.name}</span>
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
              <a href="#" className="sell-social-link">
                <Facebook className="sell-social-icon" />
              </a>
              <a href="#" className="sell-social-link">
                <Twitter className="sell-social-icon" />
              </a>
              <a href="#" className="sell-social-link">
                <Instagram className="sell-social-icon" />
              </a>
              <a href="#" className="sell-social-link">
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
            &copy; 2024 DreamProperties. All rights reserved. | Built with excellence for Tamil Nadu
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
      >
        <MessageCircle className="quick-contact-icon" />
        <span className="quick-contact-tooltip">Chat on WhatsApp</span>
      </button>
      
      <button 
        className="quick-contact-btn call-btn"
        onClick={handleCallClick}
        title="Call Now"
      >
        <Phone className="quick-contact-icon" />
        <span className="quick-contact-tooltip">Call Now</span>
      </button>
      
      <button 
        className="quick-contact-btn location-btn"
        onClick={handleLocationClick}
        title="Our Location"
      >
        <MapPin className="quick-contact-icon" />
        <span className="quick-contact-tooltip">Our Location</span>
      </button>
    </div>
  );
}

// PropertyCard Component
interface PropertyCardProps {
  id: string;
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'sale' | 'rent';
  featured?: boolean;
}

function PropertyCard(props: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="property-card buy-property-card">
      <div className="property-image-container">
        <img src={props.image} alt={props.title} className="property-image" />
        {props.featured && (
          <div className="property-badge featured">Featured</div>
        )}
        <div className={`property-badge type ${props.type}`}>
          {props.type === 'sale' ? 'For Sale' : 'For Rent'}
        </div>
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className="favorite-icon" />
        </button>
      </div>
      <div className="property-content">
        <div className="property-price">{props.price}</div>
        <h3 className="property-title">{props.title}</h3>
        <div className="property-location">
          <MapPin className="location-icon" />
          <span>{props.location}</span>
        </div>
        <div className="property-features">
          <div className="feature">
            <Bed className="feature-icon" />
            <span>{props.beds} Beds</span>
          </div>
          <div className="feature">
            <Bath className="feature-icon" />
            <span>{props.baths} Baths</span>
          </div>
          <div className="feature">
            <Maximize className="feature-icon" />
            <span>{props.sqft} sqft</span>
          </div>
        </div>
        
      <Link to={`/property/${props.id}`} className="view-details-btn">View Details</Link>
      </div>
    </div>
  );
}

// SearchBar Component
function SearchBar() {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('any');

  const handleSearch = () => {
    console.log('Searching:', { location, propertyType, priceRange, bedrooms });
  };

  return (
    <div className="buy-search-bar">
      <div className="search-inputs-grid">
        <div className="search-input-group">
          <MapPin className="input-icon" />
          <input
            className="search-input"
            type="text"
            placeholder="Search by city, area or landmark"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="search-select-group">
          <select 
            className="search-select"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="all">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
            <option value="commercial">Commercial</option>
            <option value="plot">Plot</option>
          </select>
        </div>

        <div className="search-select-group">
          <select 
            className="search-select"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="all">Price Range</option>
            <option value="0-50">Under ₹50 L</option>
            <option value="50-100">₹50L - ₹1 Cr</option>
            <option value="100-200">₹1 Cr - ₹2 Cr</option>
            <option value="200+">Above ₹2 Cr</option>
          </select>
        </div>
        
        <div className="search-select-group">
          <select 
            className="search-select"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          >
            <option value="any">Bedrooms</option>
            <option value="1">1 BHK</option>
            <option value="2">2 BHK</option>
            <option value="3">3 BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </div>

        <button className="search-button" onClick={handleSearch}>
          <Search className="search-icon" />
          Search
        </button>
      </div>
    </div>
  );
}

// Filter Section
function FilterSection() {
  const cities = [
    'Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Erode', 'Tirunelveli', 'Thoothukudi'
  ];
  
  const propertyTypes = [
    'Apartment', 'Villa', 'Independent House', 'Plot', 'Commercial', 'Farm House'
  ];

  return (
    <div className="filter-section">
      <div className="filter-cities">
        <h4>Popular Cities</h4>
        <div className="city-tags">
          {cities.map(city => (
            <button key={city} className="city-tag">{city}</button>
          ))}
        </div>
      </div>
      
      <div className="filter-types">
        <h4>Property Types</h4>
        <div className="type-tags">
          {propertyTypes.map(type => (
            <button key={type} className="type-tag">{type}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading properties...</p>
    </div>
  );
}

// Main Buy Component
export default function Buy() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/buy') return 'buy';
    if (path === '/sell') return 'sell';
    if (path === '/advertise') return 'advertise';
    if (path === '/contact') return 'contact';
    return 'home';
  };

  // Fetch properties from backend API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://realestatebackend-8adg.onrender.com/api/properties');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Property[] = await response.json();
        setProperties(data);
      } catch (err) {
        console.error('Error fetching properties:', err);
        // If API fails, use fallback dummy properties
        setProperties(getDummyProperties());
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Helper function to convert backend property to frontend format
  const convertToPropertyCardProps = (property: Property): PropertyCardProps => {
    // Get image - use first image from backend or fallback
    let image = 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800';
    if (property.images && property.images.length > 0) {
      image = property.images[0].fileUrl;
    }
    
    // Format price
    let price = 'Price not available';
    if (property.priceDetails) {
      const priceNum = property.priceDetails.price;
      const unit = property.priceDetails.priceUnit;
      
      if (unit === 'lakh') {
        price = `₹${(priceNum / 100000).toFixed(2)} Lakh`;
      } else if (unit === 'crore') {
        price = `₹${(priceNum / 10000000).toFixed(2)} Cr`;
      } else if (unit === 'sqft') {
        price = `₹${priceNum.toLocaleString()} per sq.ft`;
      } else if (unit === 'month') {
        price = `₹${priceNum.toLocaleString()} per month`;
      } else {
        price = `₹${priceNum.toLocaleString()}`;
      }
    }
    
    // Get title
    const title = property.title || `${property.propertyType?.charAt(0).toUpperCase() + property.propertyType?.slice(1)} ${property.propertyCategory?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`;
    
    // Get location
    let propLocation = 'Location not specified';
    if (property.location) {
      if (property.location.locality && property.location.district) {
        propLocation = `${property.location.locality}, ${property.location.district}`;
      } else if (property.location.fullAddress) {
        propLocation = property.location.fullAddress;
      }
    }
    
    // Get bed/bath/sqft details
    const beds = property.features?.bedrooms || 2;
    const baths = property.features?.bathrooms || 2;
    const sqft = property.features?.builtUpArea || property.features?.carpetArea || 1200;
    
    // Determine if featured (random for now, you can use status or other logic)
    const featured = Math.random() > 0.7;
    
    return {
      id: property.id,
      image,
      price,
      title,
      location: propLocation,
      beds,
      baths,
      sqft,
      type: 'sale' as const, // Default to sale, you can adjust based on your data
      featured
    };
  };

  // Dummy properties for fallback (same as original)
  const getDummyProperties = (): Property[] => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: (i + 1).toString(),
      propertyType: i % 3 === 0 ? 'residential' : i % 3 === 1 ? 'commercial' : 'land',
      propertyCategory: i % 5 === 0 ? 'apartment' : i % 5 === 1 ? 'villa' : i % 5 === 2 ? 'independent-house' : i % 5 === 3 ? 'warehouse' : 'plot',
      propertySubCategory: 'standard',
      title: ['Luxury Villa with Garden', 'Modern 2 BHK Apartment', 'Spacious Family Home'][i % 3],
      description: 'Beautiful property description',
      priceDetails: {
        price: [12000000, 4500000, 8500000][i % 3],
        priceUnit: 'lakh'
      },
      location: {
        district: ['Chennai', 'Coimbatore', 'Madurai'][i % 3],
        locality: ['Anna Nagar', 'T. Nagar', 'Saravanampatti'][i % 3],
        fullAddress: 'Sample address'
      },
      features: {
        bedrooms: [4, 2, 3][i % 3],
        bathrooms: [3, 2, 2][i % 3],
        builtUpArea: [2400, 1200, 1800][i % 3]
      },
      images: [{
        fileName: 'property.jpg',
        fileUrl: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', 
                 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
                 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'][i % 3],
        fileType: 'image/jpeg',
        fileSize: 1024000
      }],
      status: 'PUBLISHED',
      createdAt: new Date().toISOString()
    }));
  };

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

  // Convert all properties to card props
  const allProperties = properties.map(convertToPropertyCardProps);
  
  // Calculate total pages
  const totalPages = Math.ceil(allProperties.length / itemsPerPage);
  
  // Get current page properties
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = allProperties.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="buy-page-wrapper">
      <Header currentPage={getCurrentPage()} scrolled={scrolled} />
      
      {/* Quick Contact Floating Buttons */}
      <QuickContactButtons />
      
      {/* Hero Section */}
      <section className="buy-hero-section">
        <div className="buy-hero-content">
          <h1 className="buy-hero-title">Find Your Dream Property</h1>
          <p className="buy-hero-subtitle">Discover premium properties for sale across Tamil Nadu</p>
        </div>
      </section>

      {/* Search and Filters */}
      <div className="buy-main-container">
        <div className="buy-search-container">
          <SearchBar />
          <FilterSection />
        </div>

        {/* Properties Grid with Pagination */}
        <div className="buy-properties-section">
          <div className="properties-header">
            <h2 className="properties-title">
              Properties for Sale
              <span className="properties-count"> ({allProperties.length} properties)</span>
            </h2>
            <div className="properties-sort">
              <select className="sort-select">
                <option value="newest">Sort by: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="featured">Featured First</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {/* Properties Grid */}
              <div className="properties-grid-container">
                <div className="properties-grid">
                  {currentProperties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button 
                  className="pagination-button prev"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="pagination-icon" />
                  Previous
                </button>
                
                <div className="page-numbers">
                  {pageNumbers.map(number => (
                    <button
                      key={number}
                      className={`page-number ${currentPage === number ? 'active' : ''}`}
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="pagination-button next"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="pagination-icon" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}