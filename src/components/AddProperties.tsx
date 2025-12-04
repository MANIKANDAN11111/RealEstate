import { useState } from 'react';
import './AddProperties.css';

// Tamil Nadu districts array
const tamilNaduDistricts = [
  "Ariyalur",
  "Chengalpattu",
  "Chennai",
  "Coimbatore",
  "Cuddalore",
  "Dharmapuri",
  "Dindigul",
  "Erode",
  "Kallakurichi",
  "Kanchipuram",
  "Kanyakumari",
  "Karur",
  "Krishnagiri",
  "Madurai",
  "Mayiladuthurai",
  "Nagapattinam",
  "Namakkal",
  "Nilgiris",
  "Perambalur",
  "Pudukkottai",
  "Ramanathapuram",
  "Ranipet",
  "Salem",
  "Sivaganga",
  "Tenkasi",
  "Thanjavur",
  "Theni",
  "Thoothukudi",
  "Tiruchirappalli",
  "Tirunelveli",
  "Tirupathur",
  "Tiruppur",
  "Tiruvallur",
  "Tiruvannamalai",
  "Tiruvarur",
  "Vellore",
  "Viluppuram",
  "Virudhunagar"
];

const AddProperties = () => {
  const [propertyType, setPropertyType] = useState('residential');
  const [propertyImages, setPropertyImages] = useState<File[]>([]);
  const [priceValue, setPriceValue] = useState<string>('');
  const [priceUnit, setPriceUnit] = useState('lakh');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  
  // New state for contact validation
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({
    phone: '',
    email: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPropertyImages(prev => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setPropertyImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCounterChange = (
    type: 'bedroom' | 'bathroom',
    operation: 'increment' | 'decrement'
  ) => {
    if (type === 'bedroom') {
      setBedrooms(prev => {
        const newValue = operation === 'increment' ? prev + 1 : prev - 1;
        return Math.max(0, newValue);
      });
    } else {
      setBathrooms(prev => {
        const newValue = operation === 'increment' ? prev + 1 : prev - 1;
        return Math.max(0, newValue);
      });
    }
  };

  const handleCounterInputChange = (
    type: 'bedroom' | 'bathroom',
    value: string
  ) => {
    const numValue = parseInt(value) || 0;
    if (type === 'bedroom') {
      setBedrooms(Math.max(0, numValue));
    } else {
      setBathrooms(Math.max(0, numValue));
    }
  };

  // Phone number validation
  const validatePhoneNumber = (phone: string): string => {
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length !== 10) {
      return 'Phone number must be 10 digits';
    }
    
    // Check if it starts with valid Indian mobile prefixes (6-9 are mobile numbers)
    const validFirstDigits = ['6', '7', '8', '9'];
    if (!validFirstDigits.includes(cleanPhone.charAt(0))) {
      return 'Please enter a valid Indian mobile number';
    }
    
    return '';
  };

  // Email validation
  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'Email is required';
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    return '';
  };

  // Handle phone number input change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow only digits and limit to 10 characters
    const cleanValue = value.replace(/\D/g, '').slice(0, 10);
    
    setContactInfo(prev => ({
      ...prev,
      phone: cleanValue
    }));
    
    // Clear error when user starts typing
    if (validationErrors.phone) {
      setValidationErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    setContactInfo(prev => ({
      ...prev,
      email: value
    }));
    
    // Clear error when user starts typing
    if (validationErrors.email) {
      setValidationErrors(prev => ({
        ...prev,
        email: ''
      }));
    }
  };

  // Handle phone number blur (validate on focus out)
  const handlePhoneBlur = () => {
    const error = validatePhoneNumber(contactInfo.phone);
    setValidationErrors(prev => ({
      ...prev,
      phone: error
    }));
  };

  // Handle email blur (validate on focus out)
  const handleEmailBlur = () => {
    const error = validateEmail(contactInfo.email);
    setValidationErrors(prev => ({
      ...prev,
      email: error
    }));
  };

  // Format phone number for display (add spacing)
  const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 10) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    return cleaned;
  };

  // Handle form submission
  const handleSubmit = () => {
    const phoneError = validatePhoneNumber(contactInfo.phone);
    const emailError = validateEmail(contactInfo.email);
    
    setValidationErrors({
      phone: phoneError,
      email: emailError
    });
    
    // If no errors, proceed with submission
    if (!phoneError && !emailError) {
      console.log('Form submitted successfully!');
      console.log('Phone:', contactInfo.phone);
      console.log('Email:', contactInfo.email);
      // Add your form submission logic here
    } else {
      console.log('Form has validation errors');
    }
  };

  return (
    <div className="add-properties">
      <div className="page-header">
        <div className="header-content">
          <h1>Add New Property</h1>
          <p className="subtitle">Add new properties to your portfolio</p>
        </div>
        <div className="header-actions">
          <button className="save-draft-btn">Save as Draft</button>
          <button className="preview-btn">Preview Property</button>
        </div>
      </div>

      <div className="property-form-container">
        <div className="form-section">
          <div className="section-header">
            <h2>Basic Information</h2>
            <span className="required-badge">Required</span>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Property Title <span className="required">*</span>
              </label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g., Luxury 3 BHK Apartment in Chennai"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Property Type <span className="required">*</span>
              </label>
              <div className="property-type-selector">
                <button 
                  className={`type-btn ${propertyType === 'residential' ? 'active' : ''}`}
                  onClick={() => setPropertyType('residential')}
                  type="button"
                >
                  🏠 Residential
                </button>
                <button 
                  className={`type-btn ${propertyType === 'commercial' ? 'active' : ''}`}
                  onClick={() => setPropertyType('commercial')}
                  type="button"
                >
                  🏢 Commercial
                </button>
                <button 
                  className={`type-btn ${propertyType === 'land' ? 'active' : ''}`}
                  onClick={() => setPropertyType('land')}
                  type="button"
                >
                  🌳 Land
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Property Category <span className="required">*</span>
              </label>
              <select className="form-select">
                <option value="">Select category</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="house">Independent House</option>
                <option value="office">Office Space</option>
                <option value="shop">Retail Shop</option>
                <option value="warehouse">Warehouse</option>
                <option value="plot">Residential Plot</option>
                <option value="farmland">Farm Land</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Price <span className="required">*</span>
              </label>
              <div className="price-input-group">
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Enter price"
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                  min="0"
                />
                <select 
                  className="price-unit"
                  value={priceUnit}
                  onChange={(e) => setPriceUnit(e.target.value)}
                >
                  <option value="lakh">Lakh</option>
                  <option value="crore">Crore</option>
                  <option value="sqft">Per Sq. Ft.</option>
                  <option value="month">Per Month</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Description <span className="required">*</span>
              </label>
              <textarea 
                className="form-textarea"
                placeholder="Detailed description of the property..."
                rows={4}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2>Location Details</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">District <span className="required">*</span></label>
              <select className="form-select">
                <option value="">Select district</option>
                {tamilNaduDistricts.map((district) => (
                  <option key={district} value={district.toLowerCase()}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Area/Locality <span className="required">*</span></label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g., T Nagar, Anna Nagar, Velachery"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Landmark</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Nearby landmark"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g., 600001"
                maxLength={6}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Full Address</label>
              <textarea 
                className="form-textarea"
                placeholder="Complete postal address..."
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2>Property Specifications</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Built-up Area (Sq. Ft.)</label>
              <input 
                type="number" 
                className="form-input"
                placeholder="Built-up area"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Carpet Area (Sq. Ft.)</label>
              <input 
                type="number" 
                className="form-input"
                placeholder="Carpet area"
                min="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Bedrooms</label>
              <div className="counter-group">
                <button 
                  className="counter-btn" 
                  type="button"
                  onClick={() => handleCounterChange('bedroom', 'decrement')}
                >
                  -
                </button>
                <input 
                  type="number" 
                  className="counter-input"
                  value={bedrooms}
                  onChange={(e) => handleCounterInputChange('bedroom', e.target.value)}
                  min="0"
                />
                <button 
                  className="counter-btn" 
                  type="button"
                  onClick={() => handleCounterChange('bedroom', 'increment')}
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bathrooms</label>
              <div className="counter-group">
                <button 
                  className="counter-btn" 
                  type="button"
                  onClick={() => handleCounterChange('bathroom', 'decrement')}
                >
                  -
                </button>
                <input 
                  type="number" 
                  className="counter-input"
                  value={bathrooms}
                  onChange={(e) => handleCounterInputChange('bathroom', e.target.value)}
                  min="0"
                />
                <button 
                  className="counter-btn" 
                  type="button"
                  onClick={() => handleCounterChange('bathroom', 'increment')}
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Furnishing</label>
              <select className="form-select">
                <option value="unfurnished">Unfurnished</option>
                <option value="semi">Semi-Furnished</option>
                <option value="full">Fully Furnished</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Parking</label>
              <select className="form-select">
                <option value="none">No Parking</option>
                <option value="1">1 Vehicle</option>
                <option value="2">2 Vehicles</option>
                <option value="3">3+ Vehicles</option>
              </select>
            </div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Swimming Pool</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Gym</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Security</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Power Backup</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Garden</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Club House</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-custom"></span>
              <span className="checkbox-text">Children's Play Area</span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2>Property Images</h2>
            <span className="info-badge">Upload up to 20 images</span>
          </div>
          
          <div className="image-upload-section">
            <div className="image-upload-box" onClick={() => document.getElementById('image-upload')?.click()}>
              <div className="upload-icon">📷</div>
              <p className="upload-text">Click to upload images</p>
              <p className="upload-subtext">or drag and drop</p>
              <input 
                type="file" 
                id="image-upload"
                className="image-upload-input"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {propertyImages.length > 0 && (
              <div className="image-preview-grid">
                {propertyImages.map((file, index) => (
                  <div key={index} className="image-preview-item">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Property ${index + 1}`}
                      className="preview-image"
                    />
                    <button 
                      className="remove-image-btn"
                      onClick={() => removeImage(index)}
                      type="button"
                    >
                      ✕
                    </button>
                    <div className="image-name">{file.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2>Contact Information</h2>
            <span className="required-badge">Required</span>
          </div>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="Name of contact person"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input 
                type="tel" 
                className={`form-input ${validationErrors.phone ? 'error' : ''}`}
                placeholder="Enter 10-digit mobile number"
                value={formatPhoneNumber(contactInfo.phone)}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                maxLength={12} // For formatted number (xxx xxx xxxx)
              />
              {validationErrors.phone && (
                <div className="error-message">{validationErrors.phone}</div>
              )}
              <div className="hint-text">Format: 98765 43210</div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Email <span className="required">*</span>
              </label>
              <input 
                type="email" 
                className={`form-input ${validationErrors.email ? 'error' : ''}`}
                placeholder="contact@example.com"
                value={contactInfo.email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
              />
              {validationErrors.email && (
                <div className="error-message">{validationErrors.email}</div>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-btn" type="button">Cancel</button>
          <button className="save-btn" type="button">Save as Draft</button>
          <button 
            className="submit-btn" 
            type="button"
            onClick={handleSubmit}
          >
            Publish Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProperties;