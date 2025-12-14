import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Building2, DollarSign, Megaphone, Phone,
  MapPin, ArrowRight, Bed, Bath, Maximize,
  Heart, Search, Facebook, Twitter, Instagram, Linkedin,
  Upload, ShoppingBag
} from 'lucide-react';
import './home_user.css';
import AGLogo from '../../assets/AG_logo.jpeg';
import HeroBackground from '../../assets/tvl_arch.jpeg';

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
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src={AGLogo} alt="PropFinder Logo" className="logo-image" />
          <span className="logo-text1">PropFinder</span>
        </Link>

        <nav className="nav">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.path}
              className={`nav-item ${currentPage === item.page ? 'active' : ''}`}
            >
              <item.icon className="nav-icon" />
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
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <Link to="/" className="logo-link">
                <img src={AGLogo} alt="PropFinder Logo" className="logo-image" />
                <span className="footer-logo-text">PropFinder</span>
              </Link>
            </div>
            <p className="footer-description">
              Your trusted partner in finding the perfect property across Tamil Nadu. We make real
              estate easy.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">
                <Facebook className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Twitter className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Instagram className="social-icon" />
              </a>
              <a href="#" className="social-link">
                <Linkedin className="social-icon" />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">Home</Link>
              </li>
              <li>
                <Link to="/buy" className="footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/sell" className="footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/advertise" className="footer-link">Advertise</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Properties</h3>
            <ul className="footer-links">
              <li>
                <Link to="/buy" className="footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/properties" className="footer-link">Rent Property</Link>
              </li>
              <li>
                <Link to="/sell" className="footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/properties" className="footer-link">Featured Listings</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="footer-link">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="footer-link">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="footer-link">Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2024 PropFinder. All rights reserved. | Built with excellence for Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
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
    <div className="property-card">
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
    // Navigate to buy page with search parameters
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
      
      <div className="home-page">
        {/* Hero Section - Now contains the header inside it */}
        <section 
          className="hero"
          style={{
            backgroundImage: `url(${HeroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="hero-content">
            <h1 className="hero-title">Find Your Dream Property</h1>
            
            <div className="hero-buttons">
              <button 
                className="hero-button publish"
                onClick={handlePublish}
              >
                <Upload className="hero-button-icon" />
                Publish Your Properties
              </button>
              
              <button 
                className="hero-button buy"
                onClick={handleBuy}
              >
                <ShoppingBag className="hero-button-icon" />
                Buy Our Property
              </button>
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <div className="search-bar-container1">
          <div className="search-bar1">
            <div className="search-tabs1">
              <button 
                className={`search-tab1 ${activeTab === 'buy' ? 'active' : ''}`}
                onClick={() => setActiveTab('buy')}
              >
                Buy
              </button>
              <button 
                className={`search-tab1 ${activeTab === 'rent' ? 'active' : ''}`}
                onClick={() => setActiveTab('rent')}
              >
                Sell
              </button>
            </div>

            <div className="search-inputs">
              <div className="search-input-group">
                <MapPin className="input-icon" />
                <input
                  className="search-input1"
                  type="text"
                  placeholder="Enter location or district"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                />
              </div>

              <div className="search-select-group">
                <select 
                  className="search-select1"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="all">Property Type</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div className="search-select-group">
                <select 
                  className="search-select1"
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

              <button className="search-button" onClick={handleSearch}>
                <Search className="search-icon" />
                Search Properties
              </button>
            </div>
          </div>
        </div>

        {/* Featured Properties */}
        <section className="featured-properties">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Properties</h2>
              <p className="section-subtitle">Featured Properties</p>
            </div>
            <button className="view-all-button" onClick={handleBuy}>
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
            <p className="quote-author">— Tamil Nadu Real Estate Group</p>
          </div>
        </section>

        {/* Districts Section */}
        <section className="districts-section">
          <div className="districts-container">
            <h2 className="section-title center">Explore by District</h2>
            <p className="section-subtitle center">Find properties across major districts of Tamil Nadu</p>
            
            <div className="districts-grid">
              {districts.map((district, index) => {
                const Icon = district.icon;
                return (
                  <div 
                    key={index} 
                    className="district-card" 
                    onClick={() => handleDistrictClick(district.name)}
                  >
                    <div className="district-icon-wrapper">
                      <Icon className="district-icon" />
                    </div>
                    <h3 className="district-name">{district.name}</h3>
                    <p className="district-properties">{district.properties} Properties</p>
                  </div>
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