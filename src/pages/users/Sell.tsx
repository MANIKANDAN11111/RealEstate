import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Building2, DollarSign, Megaphone, Phone,
  Facebook, Twitter, Instagram, Linkedin, Upload,
  ShoppingBag, MessageCircle, MapPin,
  Menu, X
} from 'lucide-react';
import './Sell.css';

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
          <img src={AGLogo} alt="PropFinder Logo" className="sell-logo-image" />
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
              <a href="#" className="sell-social-link">
                <Facebook className="sell-social-icon" />
              </a>
              <a href="#" className="sell-social-link">
                <Twitter className="sell-social-icon" />
              </a>
              <a href="https://www.instagram.com/ag_dreamproperties" className="sell-social-link">
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

// TypeScript interfaces
interface SellFormData {
  name: string;
  email: string;
  mobileNo: string;
  whatsappNo: string;
  propertyType: string;
  userType: string;
  propertyLocation: string;
}

type PropertyType = 'Apartment' | 'Villa' | 'Plot' | 'Commercial' | 'Industrial' | 'Farm House' | 'Penthouse';
type UserType = 'Owner' | 'Agent' | 'Builder' | 'Investor' | 'NRI';

const propertyTypes: PropertyType[] = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Industrial', 'Farm House', 'Penthouse'];
const userTypes: UserType[] = ['Owner', 'Agent', 'Builder', 'Investor', 'NRI'];

const Sell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  
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

  const currentPage = getCurrentPage();
  
  const [formData, setFormData] = useState<SellFormData>({
    name: '',
    email: '',
    mobileNo: '',
    whatsappNo: '',
    propertyType: '',
    userType: '',
    propertyLocation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRobotVerified, setIsRobotVerified] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'mobileNo' | 'whatsappNo') => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRobotVerified) {
      alert('Please verify that you are not a robot');
      return;
    }

    if (
      !formData.name ||
      !formData.mobileNo ||
      !formData.propertyType ||
      !formData.userType ||
      !formData.propertyLocation
    ) {
      alert('Please fill all required fields');
      return;
    }

    if (formData.mobileNo.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      email: formData.email || "NA",
      mobileNo: formData.mobileNo,
      whatsappNo: formData.whatsappNo || "NA",
      propertyType: formData.propertyType,
      userType: formData.userType,
      propertyLocation: formData.propertyLocation
    };

    try {
      const response = await fetch(
        "https://realestatebackend-8adg.onrender.com/api/sell",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit sell request");
      }

      setShowSuccess(true);

      setTimeout(() => {
        setFormData({  
          name: '',  
          email: '',   
          mobileNo: '',  
          whatsappNo: '',  
          propertyType: '',  
          userType: '',             
          propertyLocation: ''
        });
        setIsRobotVerified(false);
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRobotCheck = () => {
    setIsRobotVerified(!isRobotVerified);
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
      
      setTimeout(() => {
        const headerHeight = 80;
        const currentScrollPos = window.pageYOffset;
        window.scrollTo({
          top: currentScrollPos - headerHeight - 20,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleViewProperties = () => {
    navigate('/buy');
  };

  return (
    <div className="sell-page-wrapper">
      <Header currentPage={currentPage} scrolled={scrolled} />
      
      {/* Quick Contact Floating Buttons */}
      <QuickContactButtons />
      
      {/* Hero Section with Home Page Theme */}
      <div className="sell-hero-section">
        <div className="sell-hero-content">
          <h1 className="sell-hero-title">Sell Your Property with Confidence</h1>
          <p className="sell-hero-subtitle">Get the best offers from verified buyers across Tamil Nadu</p>
          
          <div className="sell-hero-buttons">
            <button 
              className="sell-hero-button primary"
              onClick={scrollToForm}
              aria-label="Scroll to sell form"
            >
              <Upload className="sell-hero-button-icon" />
              Quick Sell Form
            </button>
            
            <button 
              className="sell-hero-button secondary"
              onClick={handleViewProperties}
              aria-label="View properties for sale"
            >
              <ShoppingBag className="sell-hero-button-icon" />
              View Our Properties
            </button>
          </div>
        </div>
      </div>

      {/* Sell Form Section */}
      <div className="sell-form-section" ref={formRef}>
        <div className="sell-container">
          {/* Success Message */}
          {showSuccess && (
            <div className="sell-success-message">
              <div className="sell-success-icon">✓</div>
              <h3>Form Submitted Successfully!</h3>
              <p>Our team will contact you within 24 hours.</p>
            </div>
          )}

          <div className="sell-form-card">
            <div className="sell-form-header">
              <h2 className="sell-form-title">Sell Your Property</h2>
              <p className="sell-form-subtitle">Fill the form below and get the best offers from verified buyers</p>
            </div>

            <form className="sell-form-content" onSubmit={handleSubmit}>
              {/* Form Fields Grid */}
              <div className="sell-form-grid">
                {/* Name Field */}
                <div className="sell-form-group">
                  <label htmlFor="name" className="sell-form-label">
                    Your Name *
                  </label>
                  <div className="sell-input-wrapper">
                    <div className="sell-input-icon">👤</div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="sell-form-input"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="sell-form-group">
                  <label htmlFor="email" className="sell-form-label">
                    Email
                    <span className="sell-optional-label">(Optional)</span>
                  </label>
                  <div className="sell-input-wrapper">
                    <div className="sell-input-icon">✉️</div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="sell-form-input"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      aria-label="Email address"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="sell-form-group">
                  <label htmlFor="mobileNo" className="sell-form-label">
                    Mobile No *
                  </label>
                  <div className="sell-phone-input-wrapper">
                    <div className="sell-country-code">
                      <span className="sell-country-flag">🇮🇳</span>
                      <span className="sell-country-number">+91</span>
                    </div>
                    <input
                      type="tel"
                      id="mobileNo"
                      name="mobileNo"
                      className="sell-phone-input"
                      placeholder="98765 43210"
                      value={formData.mobileNo}
                      onChange={(e) => handlePhoneChange(e, 'mobileNo')}
                      required
                      aria-required="true"
                    />
                  </div>
                  <p className="sell-input-hint">10-digit mobile number</p>
                </div>

                {/* WhatsApp Number */}
                <div className="sell-form-group">
                  <label htmlFor="whatsappNo" className="sell-form-label">
                    WhatsApp No
                    <span className="sell-optional-label">(For Quick Response)</span>
                  </label>
                  <div className="sell-phone-input-wrapper">
                    <div className="sell-country-code">
                      <span className="sell-country-flag">📱</span>
                      <span className="sell-country-number">+91</span>
                    </div>
                    <input
                      type="tel"
                      id="whatsappNo"
                      name="whatsappNo"
                      className="sell-phone-input"
                      placeholder="98765 43210"
                      value={formData.whatsappNo}
                      onChange={(e) => handlePhoneChange(e, 'whatsappNo')}
                      aria-label="WhatsApp number (optional)"
                    />
                  </div>
                  <p className="sell-input-hint sell-optional">Optional</p>
                </div>

                {/* Property Type */}
                <div className="sell-form-group">
                  <label htmlFor="propertyType" className="sell-form-label">
                    Property Type *
                  </label>
                  <div className="sell-select-wrapper">
                    <div className="sell-select-icon">🏠</div>
                    <select
                      id="propertyType"
                      name="propertyType"
                      className="sell-form-select"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    >
                      <option value="">- Select Property Type -</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="sell-select-arrow">▼</div>
                  </div>
                </div>

                {/* User Type */}
                <div className="sell-form-group">
                  <label htmlFor="userType" className="sell-form-label">
                    You are *
                  </label>
                  <div className="sell-select-wrapper">
                    <div className="sell-select-icon">👥</div>
                    <select
                      id="userType"
                      name="userType"
                      className="sell-form-select"
                      value={formData.userType}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    >
                      <option value="">- Select Your Role -</option>
                      {userTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="sell-select-arrow">▼</div>
                  </div>
                </div>

                {/* Property Location */}
                <div className="sell-form-group sell-full-width">
                  <label htmlFor="propertyLocation" className="sell-form-label">
                    Property Location *
                  </label>
                  <div className="sell-input-wrapper">
                    <div className="sell-input-icon">📍</div>
                    <input
                      type="text"
                      id="propertyLocation"
                      name="propertyLocation"
                      className="sell-form-input"
                      placeholder="Property Available Area / Location"
                      value={formData.propertyLocation}
                      onChange={handleChange}
                      required
                      aria-required="true"
                    />
                  </div>
                </div>
              </div>

              {/* Robot Check */}
              <div className="sell-robot-check-section">
                <div 
                  className={`sell-robot-checkbox ${isRobotVerified ? 'checked' : ''}`}
                  onClick={handleRobotCheck}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleRobotCheck()}
                  aria-label={isRobotVerified ? "Robot verification checked" : "Robot verification unchecked"}
                  aria-checked={isRobotVerified}
                >
                  <div className="sell-robot-checkmark">✓</div>
                </div>
                <span className="sell-robot-text">I'm not a robot</span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`sell-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting || !isRobotVerified}
                aria-label={isSubmitting ? "Sending sell request" : "Submit sell request"}
              >
                {isSubmitting ? (
                  <>
                    <span className="sell-spinner"></span>
                    SENDING...
                  </>
                ) : (
                  'SUBMIT SELL REQUEST'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sell;