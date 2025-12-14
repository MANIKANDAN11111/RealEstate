import React, { useState } from 'react';
import './Sell.css';

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

    // Validate required fields
    if (!formData.name || !formData.email || !formData.mobileNo || !formData.propertyType || !formData.userType || !formData.propertyLocation) {
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

  return (
    <div className="sell-page">
      <div className="sell-container">
        {/* Success Message */}
        {showSuccess && (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Form Submitted Successfully!</h3>
            <p>Our team will contact you within 24 hours.</p>
          </div>
        )}

        <div className="sell-header">
          <h1 className="sell-title">Sell Your Property</h1>
          <p className="sell-subtitle">Fill the form below and get the best offers from verified buyers</p>
        </div>

        <div className="sell-content">
          <div className="sell-form-wrapper">
            <form className="sell-form" onSubmit={handleSubmit}>
              {/* Form Fields Grid */}
              <div className="form-grid">
                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name *
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">👤</div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email *
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">✉️</div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="form-group">
                  <label htmlFor="mobileNo" className="form-label">
                    Mobile No *
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
                  <p className="input-hint">10-digit mobile number</p>
                </div>

                {/* WhatsApp Number */}
                <div className="form-group">
                  <label htmlFor="whatsappNo" className="form-label">
                    WhatsApp No
                    <span className="optional-label">(For Quick Response)</span>
                  </label>
                  <div className="phone-input-wrapper">
                    <div className="country-code">
                      <span className="country-flag">📱</span>
                      <span className="country-number">+91</span>
                    </div>
                    <input
                      type="tel"
                      id="whatsappNo"
                      name="whatsappNo"
                      className="phone-input"
                      placeholder="98765 43210"
                      value={formData.whatsappNo}
                      onChange={(e) => handlePhoneChange(e, 'whatsappNo')}
                    />
                  </div>
                  <p className="input-hint optional">Optional</p>
                </div>

                {/* Property Type */}
                <div className="form-group">
                  <label htmlFor="propertyType" className="form-label">
                    Property Type *
                  </label>
                  <div className="select-wrapper">
                    <div className="select-icon">🏠</div>
                    <select
                      id="propertyType"
                      name="propertyType"
                      className="form-select"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">- Select Property Type -</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="select-arrow">▼</div>
                  </div>
                </div>

                {/* User Type */}
                <div className="form-group">
                  <label htmlFor="userType" className="form-label">
                    You are *
                  </label>
                  <div className="select-wrapper">
                    <div className="select-icon">👥</div>
                    <select
                      id="userType"
                      name="userType"
                      className="form-select"
                      value={formData.userType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">- Select Your Role -</option>
                      {userTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="select-arrow">▼</div>
                  </div>
                </div>

                {/* Property Location */}
                <div className="form-group full-width">
                  <label htmlFor="propertyLocation" className="form-label">
                    Property Location *
                  </label>
                  <div className="input-wrapper">
                    <div className="input-icon">📍</div>
                    <input
                      type="text"
                      id="propertyLocation"
                      name="propertyLocation"
                      className="form-input"
                      placeholder="Property Available Area / Location"
                      value={formData.propertyLocation}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Robot Check */}
              <div className="robot-check-section">
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

          {/* Help Section */}
          <div className="help-section">
            <div className="help-card">
              <div className="help-icon">💬</div>
              <div className="help-content">
                <h3 className="help-title">Need Help?</h3>
                <p className="help-subtitle">Chat with our property experts</p>
                <p className="help-description">
                  Our team is available 24/7 to assist you with property listing, pricing, and documentation.
                </p>
              </div>
              <button className="chat-btn">
                <span className="chat-icon">💬</span>
                Chat Now
              </button>
            </div>

            <div className="benefits-section">
              <h4 className="benefits-title">Benefits of Listing With Us</h4>
              <ul className="benefits-list">
                <li>
                  <span className="benefit-icon">✅</span>
                  <span>Free Property Valuation</span>
                </li>
                <li>
                  <span className="benefit-icon">✅</span>
                  <span>Verified Buyers Only</span>
                </li>
                <li>
                  <span className="benefit-icon">✅</span>
                  <span>Legal Assistance</span>
                </li>
                <li>
                  <span className="benefit-icon">✅</span>
                  <span>Quick Sale Guarantee</span>
                </li>
                <li>
                  <span className="benefit-icon">✅</span>
                  <span>No Hidden Charges</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;