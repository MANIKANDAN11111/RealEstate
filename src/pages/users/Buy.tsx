import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Building2, DollarSign, Megaphone, Phone,
  Facebook, Twitter, Instagram, Linkedin,
  MapPin, Bed, Bath, Maximize, Heart, Search,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import './Buy.css';

import AGLogo from '../../assets/AG_logo.jpeg';

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
          <span className="sell-logo-text">PropFinder</span>
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
                <span className="sell-footer-logo-text">PropFinder</span>
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
            &copy; 2024 PropFinder. All rights reserved. | Built with excellence for Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}

// PropertyCard Component
interface PropertyCardProps {
  id: number;
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
        
<Link to={`/Property/`} className="view-details-btn">View Details </Link>
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

// Main Buy Component
export default function Buy() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Dummy properties data
  const allProperties = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹1.2 Cr',
      title: 'Luxury Villa with Garden',
      location: 'Anna Nagar, Chennai',
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: 'sale' as const,
      featured: true,
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹45 Lakhs',
      title: 'Modern 2 BHK Apartment',
      location: 'T. Nagar, Chennai',
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: 'sale' as const,
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹85 Lakhs',
      title: 'Spacious Family Home',
      location: 'Saravanampatti, Coimbatore',
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: 'sale' as const,
      featured: true,
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹1.8 Cr',
      title: 'Beachfront Villa',
      location: 'ECR, Chennai',
      beds: 5,
      baths: 4,
      sqft: 3200,
      type: 'sale' as const,
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹65 Lakhs',
      title: 'Premium Apartment',
      location: 'Nungambakkam, Chennai',
      beds: 2,
      baths: 2,
      sqft: 1350,
      type: 'sale' as const,
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹95 Lakhs',
      title: 'Contemporary Townhouse',
      location: 'Gandhipuram, Coimbatore',
      beds: 3,
      baths: 2,
      sqft: 1650,
      type: 'sale' as const,
      featured: true,
    },
    {
      id: 7,
      image: 'https://images.pexels.com/photos/1545749/pexels-photo-1545749.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹1.5 Cr',
      title: 'Elegant Bungalow',
      location: 'Adyar, Chennai',
      beds: 4,
      baths: 3,
      sqft: 2800,
      type: 'sale' as const,
    },
    {
      id: 8,
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹38 Lakhs',
      title: 'Compact Studio',
      location: 'Velachery, Chennai',
      beds: 1,
      baths: 1,
      sqft: 650,
      type: 'sale' as const,
    },
    {
      id: 9,
      image: 'https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹72 Lakhs',
      title: 'Garden View Apartment',
      location: 'RS Puram, Coimbatore',
      beds: 2,
      baths: 2,
      sqft: 1350,
      type: 'sale' as const,
    },
    {
      id: 10,
      image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹2.1 Cr',
      title: 'Sea View Penthouse',
      location: 'Besant Nagar, Chennai',
      beds: 5,
      baths: 4,
      sqft: 3200,
      type: 'sale' as const,
      featured: true,
    },
    {
      id: 11,
      image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹1.1 Cr',
      title: 'Modern Villa',
      location: 'Peelamedu, Coimbatore',
      beds: 4,
      baths: 3,
      sqft: 2600,
      type: 'sale' as const,
    },
    {
      id: 12,
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹58 Lakhs',
      title: 'Affordable Apartment',
      location: 'Ambattur, Chennai',
      beds: 2,
      baths: 1,
      sqft: 1100,
      type: 'sale' as const,
    },
    {
      id: 13,
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹1.3 Cr',
      title: 'Luxury Penthouse',
      location: 'Alwarpet, Chennai',
      beds: 3,
      baths: 3,
      sqft: 2200,
      type: 'sale' as const,
      featured: true,
    },
    {
      id: 14,
      image: 'https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹42 Lakhs',
      title: 'Studio Apartment',
      location: 'Kovilpatti, Tirunelveli',
      beds: 1,
      baths: 1,
      sqft: 750,
      type: 'sale' as const,
    },
    {
      id: 15,
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹68 Lakhs',
      title: 'Family Apartment',
      location: 'Trichy Main Road',
      beds: 2,
      baths: 2,
      sqft: 1400,
      type: 'sale' as const,
    },
    {
      id: 16,
      image: 'https://images.pexels.com/photos/1171370/pexels-photo-1171370.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹82 Lakhs',
      title: 'Modern Duplex',
      location: 'Madurai City Center',
      beds: 3,
      baths: 2,
      sqft: 1750,
      type: 'sale' as const,
      featured: true,
    },
    {
      id: 17,
      image: 'https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹1.6 Cr',
      title: 'Farm House',
      location: 'Kodaikanal Road',
      beds: 4,
      baths: 3,
      sqft: 3000,
      type: 'sale' as const,
    },
    {
      id: 18,
      image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: '₹95 Lakhs',
      title: 'Luxury Apartment',
      location: 'Salem Main Road',
      beds: 3,
      baths: 3,
      sqft: 1900,
      type: 'sale' as const,
    },
  ];

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
        </div>
      </div>

      <Footer />
    </div>
  );
}