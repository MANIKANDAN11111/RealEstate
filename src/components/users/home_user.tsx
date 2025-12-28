import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Building2, DollarSign, Megaphone, Phone,
  MapPin, ArrowRight, Bed, Bath, Maximize,
  Heart, Facebook, Twitter, Instagram, Linkedin,
  Upload, ShoppingBag, MessageCircle, Search,
  Menu, X
} from 'lucide-react';
import './home_user.css';
import AGLogo from '../../assets/AG_logo.jpeg';

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
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'sale' | 'rent';
  featured: boolean;
}

function PropertyCard(props: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="property-card" role="article">
      <div className="property-image-container">
        <img 
          src={props.image} 
          alt={props.title} 
          className="property-image"
          loading="lazy"
        />
        {props.featured && (
          <div className="property-badge featured">Featured</div>
        )}
        <div className={`property-badge type ${props.type}`}>
          {props.type === 'sale' ? 'For Sale' : 'For Rent'}
        </div>
        <button 
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
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
      </div>
    </div>
  );
}

// HomePage Component
export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  
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
  const [activeTab, setActiveTab] = useState('buy');
  const [locationInput, setLocationInput] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const handlePublish = () => {
    navigate('/advertise');
  };

  const handleBuy = () => {
    navigate('/buy');
  };

  const handleSearch = () => {
    navigate('/buy', { 
      state: { 
        location: locationInput,
        propertyType,
        priceRange,
        activeTab 
      }
    });
  };

  const properties = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
      price: '₹1.2 Cr',
      title: 'Luxury Villa',
      location: 'Anna Nagar, Chennai',
      beds: 4,
      baths: 3,
      sqft: 2400,
      type: 'sale' as const,
      featured: true,
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      price: '₹85 L',
      title: 'Modern Apartment',
      location: 'T. Nagar, Chennai',
      beds: 3,
      baths: 2,
      sqft: 1800,
      type: 'rent' as const,
      featured: false,
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg',
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
      id: 4,
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      price: '₹45,000/mo',
      title: 'Studio Apartment',
      location: 'Nungambakkam, Chennai',
      beds: 1,
      baths: 1,
      sqft: 850,
      type: 'rent' as const,
      featured: false,
    },
  ];

  const districts = [
    { name: 'Chennai City', properties: 245, icon: Home },
    { name: 'Coimbatore', properties: 189, icon: Home },
    { name: 'Madurai', properties: 156, icon: Home },
    { name: 'Trichy', properties: 134, icon: Home },
    { name: 'Salem', properties: 98, icon: Home },
    { name: 'Tirunelveli', properties: 87, icon: Home },
  ];

  const handleDistrictClick = (districtName: string) => {
    setLocationInput(districtName);
    setActiveTab('buy');
  };

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
            </div>
            <button className="view-all-button" onClick={handleBuy} aria-label="View all properties">
              View All
              <ArrowRight className="arrow-icon" />
            </button>
          </div>

          <div className="properties-grid">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
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
                    onClick={() => handleDistrictClick(district.name)}
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