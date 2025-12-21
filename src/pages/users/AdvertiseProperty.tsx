import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Building2, DollarSign, Megaphone, Phone,
  Facebook, Twitter, Instagram, Linkedin, Upload,
  MessageCircle, MapPin
} from 'lucide-react';
import './AdvertiseProperty.css';
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
    <header className={`advertise-header-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="advertise-header-content">
        <Link to="/" className="advertise-logo-link">
          <img src={AGLogo} alt="PropFinder Logo" className="advertise-logo-image" />
          <span className="advertise-logo-text">PropFinder</span>
        </Link>

        <nav className="advertise-nav">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.path}
              className={`advertise-nav-item ${currentPage === item.page ? 'active' : ''}`}
            >
              <item.icon className="advertise-nav-icon" />
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
    <footer className="advertise-footer">
      <div className="advertise-footer-container">
        <div className="advertise-footer-content">
          <div className="advertise-footer-section">
            <div className="advertise-footer-logo">
              <Link to="/" className="advertise-logo-link">
                <img src={AGLogo} alt="PropFinder Logo" className="advertise-logo-image" />
                <span className="advertise-footer-logo-text">PropFinder</span>
              </Link>
            </div>
            <p className="advertise-footer-description">
              Your trusted partner in finding the perfect property across Tamil Nadu. We make real
              estate easy.
            </p>
            <div className="advertise-footer-social">
              <a href="#" className="advertise-social-link">
                <Facebook className="advertise-social-icon" />
              </a>
              <a href="#" className="advertise-social-link">
                <Twitter className="advertise-social-icon" />
              </a>
              <a href="#" className="advertise-social-link">
                <Instagram className="advertise-social-icon" />
              </a>
              <a href="#" className="advertise-social-link">
                <Linkedin className="advertise-social-icon" />
              </a>
            </div>
          </div>

          <div className="advertise-footer-section">
            <h3 className="advertise-footer-title">Quick Links</h3>
            <ul className="advertise-footer-links">
              <li>
                <Link to="/" className="advertise-footer-link">Home</Link>
              </li>
              <li>
                <Link to="/buy" className="advertise-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/sell" className="advertise-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/advertise" className="advertise-footer-link">Advertise</Link>
              </li>
            </ul>
          </div>

          <div className="advertise-footer-section">
            <h3 className="advertise-footer-title">Properties</h3>
            <ul className="advertise-footer-links">
              <li>
                <Link to="/buy" className="advertise-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/properties" className="advertise-footer-link">Rent Property</Link>
              </li>
              <li>
                <Link to="/sell" className="advertise-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/properties" className="advertise-footer-link">Featured Listings</Link>
              </li>
            </ul>
          </div>

          <div className="advertise-footer-section">
            <h3 className="advertise-footer-title">Legal</h3>
            <ul className="advertise-footer-links">
              <li>
                <a href="#" className="advertise-footer-link">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="advertise-footer-link">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="advertise-footer-link">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="advertise-footer-link">Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="advertise-footer-bottom">
          <p className="advertise-footer-copyright">
            &copy; 2024 PropFinder. All rights reserved. | Built with excellence for Tamil Nadu
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

// TypeScript interfaces
interface AdvertiseFormData {
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

const Advertise: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRobotVerified, setIsRobotVerified] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
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
  
  const [formData, setFormData] = useState<AdvertiseFormData>({
    name: '',
    email: '',
    mobileNo: '',
    whatsappNo: '',
    propertyType: '',
    userType: '',
    propertyLocation: ''
  });

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
      const headerHeight = document.querySelector('.advertise-header-container')?.clientHeight || 80;
      const offsetTop = formRef.current.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="advertise-page-wrapper">
      <Header currentPage={currentPage} scrolled={scrolled} />
      
      {/* Quick Contact Floating Buttons */}
      <QuickContactButtons />
      
      {/* Hero Section */}
      <div className="advertise-hero-section">
        <div className="advertise-hero-content">
          <h1 className="advertise-hero-title">Advertise Your Property</h1>
          <p className="advertise-hero-subtitle">
            List your property with us and reach thousands of potential buyers
          </p>
          
          <button 
            className="advertise-hero-button primary"
            onClick={scrollToForm}
          >
            <Upload className="advertise-hero-button-icon" />
            Start Listing Now
          </button>
        </div>
      </div>

      {/* Advertise Form Section */}
      <div className="advertise-form-section" ref={formRef}>
        <div className="advertise-container">
          {/* Success Message */}
          {showSuccess && (
            <div className="advertise-success-message">
              <div className="advertise-success-icon">✓</div>
              <h3>Form Submitted Successfully!</h3>
              <p>Our team will contact you within 24 hours.</p>
            </div>
          )}

          <div className="advertise-form-card">
            <div className="advertise-form-header">
              <h2 className="advertise-form-title">Advertise Your Property</h2>
              <p className="advertise-form-subtitle">Fill the form below and get the best offers from verified buyers</p>
            </div>

            <form className="advertise-form-content" onSubmit={handleSubmit}>
              {/* Form Fields Grid */}
              <div className="advertise-form-grid">
                {/* Name Field */}
                <div className="advertise-form-group">
                  <label htmlFor="name" className="advertise-form-label">
                    Your Name *
                  </label>
                  <div className="advertise-input-wrapper">
                    <div className="advertise-input-icon">👤</div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="advertise-form-input"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="advertise-form-group">
                  <label htmlFor="email" className="advertise-form-label">
                    Email
                    <span className="advertise-optional-label">(Optional)</span>
                  </label>
                  <div className="advertise-input-wrapper">
                    <div className="advertise-input-icon">✉️</div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="advertise-form-input"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="advertise-form-group">
                  <label htmlFor="mobileNo" className="advertise-form-label">
                    Mobile No *
                  </label>
                  <div className="advertise-phone-input-wrapper">
                    <div className="advertise-country-code">
                      <span className="advertise-country-flag">🇮🇳</span>
                      <span className="advertise-country-number">+91</span>
                    </div>
                    <input
                      type="tel"
                      id="mobileNo"
                      name="mobileNo"
                      className="advertise-phone-input"
                      placeholder="98765 43210"
                      value={formData.mobileNo}
                      onChange={(e) => handlePhoneChange(e, 'mobileNo')}
                      required
                    />
                  </div>
                  <p className="advertise-input-hint">10-digit mobile number</p>
                </div>

                {/* WhatsApp Number */}
                <div className="advertise-form-group">
                  <label htmlFor="whatsappNo" className="advertise-form-label">
                    WhatsApp No
                    <span className="advertise-optional-label">(For Quick Response)</span>
                  </label>
                  <div className="advertise-phone-input-wrapper">
                    <div className="advertise-country-code">
                      <span className="advertise-country-flag">📱</span>
                      <span className="advertise-country-number">+91</span>
                    </div>
                    <input
                      type="tel"
                      id="whatsappNo"
                      name="whatsappNo"
                      className="advertise-phone-input"
                      placeholder="98765 43210"
                      value={formData.whatsappNo}
                      onChange={(e) => handlePhoneChange(e, 'whatsappNo')}
                    />
                  </div>
                  <p className="advertise-input-hint advertise-optional">Optional</p>
                </div>

                {/* Property Type */}
                <div className="advertise-form-group">
                  <label htmlFor="propertyType" className="advertise-form-label">
                    Property Type *
                  </label>
                  <div className="advertise-select-wrapper">
                    <div className="advertise-select-icon">🏠</div>
                    <select
                      id="propertyType"
                      name="propertyType"
                      className="advertise-form-select"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">- Select Property Type -</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="advertise-select-arrow">▼</div>
                  </div>
                </div>

                {/* User Type */}
                <div className="advertise-form-group">
                  <label htmlFor="userType" className="advertise-form-label">
                    You are *
                  </label>
                  <div className="advertise-select-wrapper">
                    <div className="advertise-select-icon">👥</div>
                    <select
                      id="userType"
                      name="userType"
                      className="advertise-form-select"
                      value={formData.userType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">- Select Your Role -</option>
                      {userTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="advertise-select-arrow">▼</div>
                  </div>
                </div>

                {/* Property Location */}
                <div className="advertise-form-group advertise-full-width">
                  <label htmlFor="propertyLocation" className="advertise-form-label">
                    Property Location *
                  </label>
                  <div className="advertise-input-wrapper">
                    <div className="advertise-input-icon">📍</div>
                    <input
                      type="text"
                      id="propertyLocation"
                      name="propertyLocation"
                      className="advertise-form-input"
                      placeholder="Property Available Area / Location"
                      value={formData.propertyLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Robot Check */}
              <div className="advertise-robot-check-section">
                <div 
                  className={`advertise-robot-checkbox ${isRobotVerified ? 'checked' : ''}`}
                  onClick={handleRobotCheck}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleRobotCheck()}
                >
                  <div className="advertise-robot-checkmark">✓</div>
                </div>
                <span className="advertise-robot-text">I'm not a robot</span>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`advertise-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting || !isRobotVerified}
              >
                {isSubmitting ? (
                  <>
                    <span className="advertise-spinner"></span>
                    SENDING...
                  </>
                ) : (
                  'SUBMIT ADVERTISE REQUEST'
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

export default Advertise;