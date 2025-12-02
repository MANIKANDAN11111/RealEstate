import { useState } from 'react';
import './AddProperties.css';

const AddProperties = () => {
  const [propertyType, setPropertyType] = useState('residential');
  const [propertyImages, setPropertyImages] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setPropertyImages(prev => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setPropertyImages(prev => prev.filter((_, i) => i !== index));
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
                placeholder="e.g., Luxury 3 BHK Apartment in Mumbai"
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
                >
                  🏠 Residential
                </button>
                <button 
                  className={`type-btn ${propertyType === 'commercial' ? 'active' : ''}`}
                  onClick={() => setPropertyType('commercial')}
                >
                  🏢 Commercial
                </button>
                <button 
                  className={`type-btn ${propertyType === 'land' ? 'active' : ''}`}
                  onClick={() => setPropertyType('land')}
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
                Price (₹) <span className="required">*</span>
              </label>
              <div className="price-input-group">
                <span className="currency-symbol">₹</span>
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Enter price"
                />
                <select className="price-unit">
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
              <label className="form-label">City <span className="required">*</span></label>
              <select className="form-select">
                <option value="">Select city</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="chennai">Chennai</option>
                <option value="pune">Pune</option>
                <option value="kolkata">Kolkata</option>
                <option value="ahmedabad">Ahmedabad</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Area/Locality <span className="required">*</span></label>
              <input 
                type="text" 
                className="form-input"
                placeholder="e.g., Bandra West, South Mumbai"
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
                placeholder="e.g., 400050"
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
              <label className="form-label">Area (Sq. Ft.)</label>
              <div className="area-input-group">
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Built-up area"
                />
                <span className="unit-label">Sq. Ft.</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Carpet Area</label>
              <div className="area-input-group">
                <input 
                  type="number" 
                  className="form-input"
                  placeholder="Carpet area"
                />
                <span className="unit-label">Sq. Ft.</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bedrooms</label>
              <div className="counter-group">
                <button className="counter-btn">-</button>
                <input 
                  type="number" 
                  className="counter-input"
                  defaultValue="2"
                  min="0"
                />
                <button className="counter-btn">+</button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bathrooms</label>
              <div className="counter-group">
                <button className="counter-btn">-</button>
                <input 
                  type="number" 
                  className="counter-input"
                  defaultValue="2"
                  min="0"
                />
                <button className="counter-btn">+</button>
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
              <label className="form-label">Phone Number</label>
              <div className="phone-input-group">
                <span className="country-code">+91</span>
                <input 
                  type="tel" 
                  className="form-input"
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input"
                placeholder="contact@example.com"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save as Draft</button>
          <button className="submit-btn">Publish Property</button>
        </div>
      </div>
    </div>
  );
};

export default AddProperties;