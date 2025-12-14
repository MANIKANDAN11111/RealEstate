import React, { useState } from 'react';
import './ContactUs.css';

// TypeScript interfaces
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
  contactNo: string;
  subject: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    contactNo: '',
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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'mobileNo' | 'contactNo') => {
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

    // Validate required fields
    if (!formData.firstName || !formData.email || !formData.mobileNo || !formData.subject || !formData.message) {
      alert('Please fill all required fields');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Validate mobile number
    if (formData.mobileNo.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setShowSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          mobileNo: '',
          contactNo: '',
          subject: '',
          message: ''
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

  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Success Message */}
        {showSuccess && (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Message Sent Successfully!</h3>
            <p>We'll get back to you within 24 hours.</p>
          </div>
        )}

        <div className="contact-header">
          <div className="company-logo">
            <div className="logo-icon">🏢</div>
            <div className="logo-text">
              <h1 className="company-name">AMAZING PROPERTIES</h1>
              <p className="company-tagline">Your Trusted Real Estate Partner</p>
            </div>
          </div>
        </div>

        <div className="contact-content">
          {/* Contact Information Section */}
          <div className="info-section">
            <div className="info-card">
              <h2 className="info-title">Contact Information</h2>
              
              <div className="contact-person">
                <div className="person-icon">👨‍💼</div>
                <div className="person-details">
                  <h3 className="person-name">Sankar</h3>
                  <p className="person-role">Property Consultant</p>
                </div>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-info">
                    <p className="contact-label">Mobile No</p>
                    <p className="contact-value">+91 9600224837</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div className="contact-info">
                    <p className="contact-label">WhatsApp</p>
                    <p className="contact-value">+91 9600224837</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-info">
                    <p className="contact-label">Email</p>
                    <a href="mailto:amazingproperties.co.in@gmail.com" className="contact-email">
                      amazingproperties.co.in@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="working-hours">
                <div className="hours-icon">🕒</div>
                <div className="hours-info">
                  <h4>Working Hours</h4>
                  <p>Monday - Saturday: 9:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="social-links">
                <h4>Connect With Us</h4>
                <div className="social-icons">
                  <a href="#" className="social-icon facebook">f</a>
                  <a href="#" className="social-icon twitter">𝕏</a>
                  <a href="#" className="social-icon instagram">📷</a>
                  <a href="#" className="social-icon whatsapp">📱</a>
                  <a href="#" className="social-icon linkedin">in</a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="form-section">
            <div className="form-header">
              <h2 className="form-title">Contact Form</h2>
              <p className="form-subtitle">Fill the form below and we'll contact you shortly</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="name-fields">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    <span className="label-bold">First Name *</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-input"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    <span className="label-normal">Last Name</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-input"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="separator"></div>

              {/* Contact Information */}
              <div className="contact-info-fields">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <span className="label-bold">Email *</span>
                    <span className="label-hint">Email Address</span>
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">✉️</div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mobileNo" className="form-label">
                    <span className="label-bold">Mobile No *</span>
                    <span className="label-hint">Contact No</span>
                  </label>
                  <div className="phone-input-wrapper">
                    <div className="country-code">
                      <span className="country-flag">🇮🇳</span>
                      <span className="country-number">+91</span>
                    </div>
                    <input
                      type="tel"
                      id="mobileNo"
                      name="mobileNo"
                      className="phone-input"
                      placeholder="98765 43210"
                      value={formData.mobileNo}
                      onChange={(e) => handlePhoneChange(e, 'mobileNo')}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contactNo" className="form-label">
                    <span className="label-normal">Alternate Contact No</span>
                  </label>
                  <div className="phone-input-wrapper">
                    <div className="country-code">
                      <span className="country-flag">📱</span>
                      <span className="country-number">+91</span>
                    </div>
                    <input
                      type="tel"
                      id="contactNo"
                      name="contactNo"
                      className="phone-input"
                      placeholder="Optional"
                      value={formData.contactNo}
                      onChange={(e) => handlePhoneChange(e, 'contactNo')}
                    />
                  </div>
                </div>
              </div>

              <div className="separator"></div>

              {/* Subject Field */}
              <div className="subject-field">
                <div className="form-group full-width">
                  <label htmlFor="subject" className="form-label">
                    <span className="label-bold">Subject</span>
                    <span className="label-hint">Subject</span>
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-input"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="separator"></div>

              {/* Message Field */}
              <div className="message-field">
                <div className="form-group full-width">
                  <label htmlFor="message" className="form-label">
                    <span className="label-bold">Your Message *</span>
                    <span className="label-hint">Your Message</span>
                  </label>
                  <div className="textarea-wrapper">
                    <textarea
                      id="message"
                      name="message"
                      className="message-textarea"
                      placeholder="Type your message here..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Email Display */}
              <div className="email-display">
                <div className="email-icon">📧</div>
                <div className="email-info">
                  <p className="email-label">Email us directly at:</p>
                  <a href="mailto:amazingproperties.co.in@gmail.com" className="email-address">
                    amazingproperties.co.in@gmail.com
                  </a>
                </div>
              </div>

              {/* Robot Check and Game Info */}
              <div className="verification-section">
                <div className="robot-check-container">
                  <div 
                    className={`robot-checkbox ${isRobotVerified ? 'checked' : ''}`}
                    onClick={handleRobotCheck}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleRobotCheck()}
                  >
                    <div className="robot-checkmark">✓</div>
                  </div>
                  <span className="robot-text">I'm not a robot</span>
                </div>

                <div className="game-info">
                  <div className="game-checkbox"></div>
                  <div className="game-text">
                    <span className="game-label">RÉDIPTON</span>
                    <span className="game-sublabel">Player of Game</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting || !isRobotVerified}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
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
  );
};

export default ContactUs;