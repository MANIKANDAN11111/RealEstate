import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Building2, DollarSign, Megaphone, Phone,
  Facebook, Twitter, Instagram, Linkedin,
  MessageSquare, MapPin,
  MessageCircle, Menu, X
} from 'lucide-react';
import './ContactUs.css';
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
    <header className={`contact-header-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="contact-header-content">
        <Link to="/" className="contact-logo-link">
          <img src={AGLogo} alt="PropFinder Logo" className="contact-logo-image" />
          <span className="contact-logo-text">DreamProperties</span>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="contact-mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`contact-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.path}
              className={`contact-nav-item ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="contact-nav-icon" />
              <span className="contact-nav-text">{item.name}</span>
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
    <footer className="contact-footer">
      <div className="contact-footer-container">
        <div className="contact-footer-content">
          <div className="contact-footer-section">
            <div className="contact-footer-logo">
              <Link to="/" className="contact-logo-link">
                <img src={AGLogo} alt="PropFinder Logo" className="contact-logo-image" />
                <span className="contact-footer-logo-text">DreamProperties</span>
              </Link>
            </div>
            <p className="contact-footer-description">
              Your trusted partner in finding the perfect property across Tamil Nadu. We make real
              estate easy.
            </p>
            <div className="contact-footer-social">
              <a href="#" className="contact-social-link">
                <Facebook className="contact-social-icon" />
              </a>
              <a href="#" className="contact-social-link">
                <Twitter className="contact-social-icon" />
              </a>
              <a href="https://www.instagram.com/ag_dreamproperties" className="contact-social-link">
                <Instagram className="contact-social-icon" />
              </a>
              <a href="#" className="contact-social-link">
                <Linkedin className="contact-social-icon" />
              </a>
            </div>
          </div>

          <div className="contact-footer-section">
            <h3 className="contact-footer-title">Quick Links</h3>
            <ul className="contact-footer-links">
              <li>
                <Link to="/" className="contact-footer-link">Home</Link>
              </li>
              <li>
                <Link to="/buy" className="contact-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/sell" className="contact-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/advertise" className="contact-footer-link">Advertise</Link>
              </li>
            </ul>
          </div>

          <div className="contact-footer-section">
            <h3 className="contact-footer-title">Properties</h3>
            <ul className="contact-footer-links">
              <li>
                <Link to="/buy" className="contact-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/properties" className="contact-footer-link">Rent Property</Link>
              </li>
              <li>
                <Link to="/sell" className="contact-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/properties" className="contact-footer-link">Featured Listings</Link>
              </li>
            </ul>
          </div>

          <div className="contact-footer-section">
            <h3 className="contact-footer-title">Legal</h3>
            <ul className="contact-footer-links">
              <li>
                <a href="#" className="contact-footer-link">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="contact-footer-link">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="contact-footer-link">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="contact-footer-link">Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="contact-footer-bottom">
          <p className="contact-footer-copyright">
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
interface ContactFormData {
  name: string;
  email: string;
  mobileNo: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const location = useLocation();
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
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    mobileNo: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRobotVerified, setIsRobotVerified] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({
      ...prev,
      mobileNo: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isRobotVerified) {
      alert('Please verify that you are not a robot');
      return;
    }

    // Validate only required fields (name and mobile number)
    if (!formData.name || !formData.mobileNo) {
      alert('Please fill Name and Mobile Number');
      return;
    }

    // Email validation (only if provided)
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }
    }

    // Mobile number validation
    if (formData.mobileNo.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        'https://realestatebackend-8adg.onrender.com/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email || 'NA',
            mobileNo: formData.mobileNo,
            subject: formData.subject || 'NA',
            message: formData.message || 'NA',
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit contact form');
      }

      const data = await response.json();
      console.log('API Success:', data);

      // Show success UI
      setShowSuccess(true);

      // Reset form
      setFormData({
        name: '',
        email: '',
        mobileNo: '',
        subject: '',
        message: '',
      });

      setIsRobotVerified(false);

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('API Error:', error);
      alert('Something went wrong. Please try again later.');
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
      
      // Add a small delay then adjust for header
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

  return (
    <div className="contact-page-wrapper">
      <Header currentPage={currentPage} scrolled={scrolled} />
      
      {/* Quick Contact Floating Buttons */}
      <QuickContactButtons />
      
      {/* Hero Section */}
      <div className="contact-hero-section">
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            Get in touch with us for any queries about properties or real estate services
          </p>
          
          <button 
            className="contact-hero-button primary"
            onClick={scrollToForm}
            aria-label="Scroll to contact form"
          >
            <MessageSquare className="contact-hero-button-icon" />
            Send Message
          </button>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form-section" ref={formRef}>
        <div className="contact-container">
          {/* Success Message */}
          {showSuccess && (
            <div className="contact-success-message">
              <div className="contact-success-icon">✓</div>
              <h3>Message Sent Successfully!</h3>
              <p>We'll get back to you within 24 hours.</p>
            </div>
          )}

          <div className="contact-form-card">
            <div className="contact-form-header">
              <h2 className="contact-form-title">Get in Touch</h2>
              <p className="contact-form-subtitle">
                Fill the form below and we'll contact you shortly
              </p>
            </div>

            <div className="contact-main-content">
              {/* Contact Owner Card */}
              <div className="contact-owner-card">
                <div className="owner-card-header">
                  <h3 className="owner-card-title">
                    <Phone className="owner-card-icon" />
                    Contact the Owner
                  </h3>
                  <p className="owner-card-subtitle">Direct contact information</p>
                </div>
                
                <div className="owner-contact-details">
                  <div className="owner-contact-item">
                    <div className="owner-contact-icon">📞</div>
                    <div className="owner-contact-info">
                      <p className="owner-contact-label">Phone Numbers</p>
                      <div className="owner-contact-numbers">
                        <a href="tel:6374656460" className="owner-contact-number">+91 6374656460</a>
                        <span className="owner-contact-person">(Esakky pandian)</span>
                        <a href="tel:8682800268" className="owner-contact-number">+91 8682800268</a>
                        <span className="owner-contact-person">(Rishi)</span>
                      </div>
                    </div>
                  </div>

                  <div className="owner-contact-item">
                    <div className="owner-contact-icon">✉️</div>
                    <div className="owner-contact-info">
                      <p className="owner-contact-label">Email Address</p>
                      <a href="mailto:ananthitechnologies@gmail.com" className="owner-contact-email">
                        ananthitechnologies@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="owner-working-hours">
                  <div className="owner-hours-icon">🕒</div>
                  <div className="owner-hours-info">
                    <h4 className="owner-hours-title">Working Hours</h4>
                    <p className="owner-hours-detail">Monday - Saturday: 9:00 AM - 8:00 PM</p>
                    <p className="owner-hours-detail">Sunday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form className="contact-form-content" onSubmit={handleSubmit}>
                {/* Form Fields Grid */}
                <div className="contact-form-grid">
                  {/* Name Field */}
                  <div className="contact-form-group">
                    <label htmlFor="name" className="contact-form-label">
                      Your Name *
                    </label>
                    <div className="contact-input-wrapper">
                      <div className="contact-input-icon">👤</div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="contact-form-input"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        aria-required="true"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="contact-form-group">
                    <label htmlFor="email" className="contact-form-label">
                      Email Address
                    </label>
                    <div className="contact-input-wrapper">
                      <div className="contact-input-icon">✉️</div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="contact-form-input"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        aria-label="Email address"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="contact-form-group">
                    <label htmlFor="mobileNo" className="contact-form-label">
                      Mobile No *
                    </label>
                    <div className="contact-phone-input-wrapper">
                      <div className="contact-country-code">
                        <span className="contact-country-flag">🇮🇳</span>
                        <span className="contact-country-number">+91</span>
                      </div>
                      <input
                        type="tel"
                        id="mobileNo"
                        name="mobileNo"
                        className="contact-phone-input"
                        placeholder="98765 43210"
                        value={formData.mobileNo}
                        onChange={handlePhoneChange}
                        required
                        aria-required="true"
                      />
                    </div>
                    <p className="contact-input-hint">10-digit mobile number</p>
                  </div>

                  {/* Subject Field */}
                  <div className="contact-form-group contact-full-width">
                    <label htmlFor="subject" className="contact-form-label">
                      Subject
                    </label>
                    <div className="contact-input-wrapper">
                      <div className="contact-input-icon">📝</div>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="contact-form-input"
                        placeholder="What is the purpose of your contact?"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-label="Message subject"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="contact-form-group contact-full-width">
                    <label htmlFor="message" className="contact-form-label">
                      Your Message
                    </label>
                    <div className="contact-textarea-wrapper">
                      <textarea
                        id="message"
                        name="message"
                        className="contact-form-textarea"
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        aria-label="Your message"
                      />
                    </div>
                  </div>
                </div>

                {/* Robot Check */}
                <div className="contact-robot-check-section">
                  <div 
                    className={`contact-robot-checkbox ${isRobotVerified ? 'checked' : ''}`}
                    onClick={handleRobotCheck}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleRobotCheck()}
                    aria-label={isRobotVerified ? "Robot verification checked" : "Robot verification unchecked"}
                    aria-checked={isRobotVerified}
                  >
                    <div className="contact-robot-checkmark">✓</div>
                  </div>
                  <span className="contact-robot-text">I'm not a robot</span>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting || !isRobotVerified}
                  aria-label={isSubmitting ? "Sending message" : "Send message"}
                >
                  {isSubmitting ? (
                    <>
                      <span className="contact-spinner"></span>
                      SENDING...
                    </>
                  ) : (
                    'SEND MESSAGE'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;