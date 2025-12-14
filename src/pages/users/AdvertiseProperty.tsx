import { Home, Upload } from 'lucide-react';
import { useState } from 'react';

export default function AdvertiseProperty() {
  const [formData, setFormData] = useState({
    propertyType: '',
    listingType: '',
    title: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    sqft: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Property submitted:', formData);
    alert('Property listing submitted successfully! Our team will review and publish it soon.');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="page advertise-page">
      <div className="advertise-hero">
        <Home className="advertise-icon" />
        <h1 className="page-title">Advertise Your Property</h1>
        <p className="page-subtitle">
          List your property with us and reach thousands of potential buyers
        </p>
      </div>

      <form onSubmit={handleSubmit} className="advertise-form">
        <div className="form-section">
          <h2 className="form-section-title">Property Details</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="propertyType" className="form-label">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="listingType" className="form-label">
                Listing Type
              </label>
              <select
                id="listingType"
                name="listingType"
                value={formData.listingType}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Listing Type</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Property Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="e.g., Luxury Villa with Garden"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., ₹1.2 Cr or ₹45,000/mo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="e.g., Anna Nagar, Chennai"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="beds" className="form-label">
                Bedrooms
              </label>
              <input
                type="number"
                id="beds"
                name="beds"
                value={formData.beds}
                onChange={handleChange}
                required
                min="0"
                className="form-input"
                placeholder="e.g., 3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="baths" className="form-label">
                Bathrooms
              </label>
              <input
                type="number"
                id="baths"
                name="baths"
                value={formData.baths}
                onChange={handleChange}
                required
                min="0"
                className="form-input"
                placeholder="e.g., 2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sqft" className="form-label">
                Area (sqft)
              </label>
              <input
                type="number"
                id="sqft"
                name="sqft"
                value={formData.sqft}
                onChange={handleChange}
                required
                min="0"
                className="form-input"
                placeholder="e.g., 1800"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="form-textarea"
              placeholder="Describe your property in detail..."
            />
          </div>
        </div>

        <div className="form-section">
          <h2 className="form-section-title">Property Images</h2>
          <div className="upload-area">
            <Upload className="upload-icon" />
            <p className="upload-text">Click to upload or drag and drop</p>
            <p className="upload-subtext">PNG, JPG up to 10MB each</p>
          </div>
        </div>

        <button type="submit" className="form-submit large">
          Submit Property Listing
        </button>
      </form>
    </div>
  );
}
