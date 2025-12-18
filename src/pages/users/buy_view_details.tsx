import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Home, MapPin, Bed, Bath, Maximize, Heart,
  Share2, Phone, Mail, Calendar, Check,
  Car, Layers, Shield, TrendingUp,
  ArrowLeft, Star, Download, Printer,
  Facebook, Twitter, Linkedin, Instagram,
  Clock, Users, Building, Mountain
} from 'lucide-react';
import AGLogo from '../../assets/AG_logo.jpeg';

// Header Component (Similar to Buy page)
interface HeaderProps {
  scrolled: boolean;
}

function Header({ scrolled }: HeaderProps) {
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Buy', icon: Building, path: '/buy' },
    { name: 'Sell', icon: TrendingUp, path: '/sell' },
    { name: 'Advertise', icon: Users, path: '/advertise' },
    { name: 'Contact', icon: Phone, path: '/contact' },
  ];

  return (
    <header className={`property-details-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="property-details-header-content">
        <Link to="/" className="property-details-logo">
          <img src={AGLogo} alt="PropFinder Logo" className="property-details-logo-image" />
          <span className="property-details-logo-text">PropFinder</span>
        </Link>

        <nav className="property-details-nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="property-details-nav-item"
            >
              <item.icon className="property-details-nav-icon" />
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
    <footer className="property-details-footer">
      <div className="property-details-footer-content">
        <div className="property-details-footer-logo">
          <img src={AGLogo} alt="PropFinder Logo" className="property-details-footer-logo-image" />
          <span className="property-details-footer-logo-text">PropFinder</span>
        </div>
        <p className="property-details-footer-description">
          Your trusted partner in finding the perfect property across Tamil Nadu
        </p>
        <div className="property-details-footer-social">
          <a href="#" className="property-details-social-link"><Facebook /></a>
          <a href="#" className="property-details-social-link"><Twitter /></a>
          <a href="#" className="property-details-social-link"><Instagram /></a>
          <a href="#" className="property-details-social-link"><Linkedin /></a>
        </div>
        <div className="property-details-footer-bottom">
          <p>&copy; 2024 PropFinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dummy property data
  const property = {
    id: 1,
    title: "Luxury Villa with Private Garden in Anna Nagar",
    price: "₹1.2 Crore",
    pricePerSqft: "₹5,000/sqft",
    location: "Anna Nagar, Chennai, Tamil Nadu 600040",
    address: "12/34, 5th Street, Anna Nagar East",
    type: "Villa",
    status: "For Sale",
    yearBuilt: 2020,
    beds: 4,
    baths: 3,
    sqft: 2400,
    lotSize: "3000 sqft",
    parking: 2,
    floors: 2,
    description: `Experience luxurious living in this stunning contemporary villa located in the heart of Anna Nagar. This property boasts modern architecture with premium finishes throughout. The villa features a spacious living area, modular kitchen with granite countertops, and a beautiful private garden perfect for family gatherings.

The property includes a master bedroom with walk-in closet and ensuite bathroom, three additional well-appointed bedrooms, and a dedicated study room. The villa is equipped with modern amenities including CCTV security, 24/7 water supply, and power backup.

Located in one of Chennai's most prestigious neighborhoods, this villa offers easy access to shopping malls, hospitals, schools, and entertainment centers. The property has excellent connectivity to major roads and public transportation.`,
    
    amenities: [
      "Swimming Pool", "Gymnasium", "Club House", "Children's Play Area",
      "24/7 Security", "Power Backup", "Rain Water Harvesting", "Parking",
      "Landscaped Garden", "Solar Heating", "CCTV", "Intercom"
    ],
    
    features: [
      "Modular Kitchen", "Wooden Flooring", "Walk-in Closet", "Balcony",
      "Private Terrace", "Home Theater", "Central Air Conditioning", "Smart Home"
    ],
    
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg",
      "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
      "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg"
    ],
    
    owner: {
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@example.com",
      verified: true,
      rating: 4.8
    },
    
    nearbyPlaces: [
      { name: "Schools", distance: "0.5 km", icon: <Building /> },
      { name: "Hospital", distance: "1.2 km", icon: <Shield /> },
      { name: "Shopping Mall", distance: "0.8 km", icon: <Layers /> },
      { name: "Metro Station", distance: "1.5 km", icon: <Car /> },
      { name: "Park", distance: "0.3 km", icon: <Mountain /> }
    ],
    
    specifications: {
      facing: "East",
      flooring: "Marble & Wooden",
      waterSupply: "24/7 Corporation & Borewell",
      electricity: "3 Phase",
      age: "4 years",
      registrationStatus: "Clear",
      possession: "Immediate"
    },
    
    financials: {
      maintenance: "₹5,000/month",
      propertyTax: "₹12,000/year",
      registrationCharges: "₹1,20,000 (approx)",
      stampDuty: "7%",
      legalStatus: "Clear"
    }
  };

  const handleContactOwner = () => {
    alert(`Contacting owner: ${property.owner.name}\nPhone: ${property.owner.phone}`);
  };

  const handleScheduleVisit = () => {
    alert("Schedule visit feature coming soon!");
  };

  const handleShare = () => {
    navigator.share?.({
      title: property.title,
      text: `Check out this property: ${property.title}`,
      url: window.location.href
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    });
  };

  return (
    <div className="property-details-page">
      <Header scrolled={scrolled} />
      
      {/* Back Button */}
      <div className="property-details-back-container">
        <button className="property-details-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft className="property-details-back-icon" />
          Back to Properties
        </button>
      </div>

      <main className="property-details-main">
        {/* Property Header */}
        <div className="property-details-header-section">
          <div className="property-details-title-section">
            <h1 className="property-details-title">{property.title}</h1>
            <div className="property-details-location">
              <MapPin className="property-details-location-icon" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="property-details-price-section">
            <div className="property-details-price">{property.price}</div>
            <div className="property-details-price-sub">{property.pricePerSqft}</div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="property-details-gallery">
          <div className="property-details-main-image">
            <img 
              src={property.images[activeImage]} 
              alt={property.title}
              className="property-details-active-image"
            />
            <div className="property-details-image-actions">
              <button 
                className={`property-details-favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className="property-details-favorite-icon" />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
              <button className="property-details-share-btn" onClick={handleShare}>
                <Share2 className="property-details-share-icon" />
                <span>Share</span>
              </button>
            </div>
          </div>
          
          <div className="property-details-thumbnails">
            {property.images.map((img, index) => (
              <div 
                key={index}
                className={`property-details-thumbnail ${activeImage === index ? 'active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt={`View ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="property-details-content">
          {/* Left Column */}
          <div className="property-details-left-column">
            {/* Quick Stats */}
            <div className="property-details-stats">
              <div className="property-details-stat">
                <Bed className="property-details-stat-icon" />
                <div className="property-details-stat-content">
                  <div className="property-details-stat-value">{property.beds}</div>
                  <div className="property-details-stat-label">Bedrooms</div>
                </div>
              </div>
              <div className="property-details-stat">
                <Bath className="property-details-stat-icon" />
                <div className="property-details-stat-content">
                  <div className="property-details-stat-value">{property.baths}</div>
                  <div className="property-details-stat-label">Bathrooms</div>
                </div>
              </div>
              <div className="property-details-stat">
                <Maximize className="property-details-stat-icon" />
                <div className="property-details-stat-content">
                  <div className="property-details-stat-value">{property.sqft}</div>
                  <div className="property-details-stat-label">Sq. Ft.</div>
                </div>
              </div>
              <div className="property-details-stat">
                <Car className="property-details-stat-icon" />
                <div className="property-details-stat-content">
                  <div className="property-details-stat-value">{property.parking}</div>
                  <div className="property-details-stat-label">Parking</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <section className="property-details-section">
              <h2 className="property-details-section-title">Description</h2>
              <p className="property-details-description">{property.description}</p>
            </section>

            {/* Specifications */}
            <section className="property-details-section">
              <h2 className="property-details-section-title">Specifications</h2>
              <div className="property-details-specs-grid">
                {Object.entries(property.specifications).map(([key, value]) => (
                  <div key={key} className="property-details-spec-item">
                    <span className="property-details-spec-label">
                      {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </span>
                    <span className="property-details-spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section className="property-details-section">
              <h2 className="property-details-section-title">Amenities & Features</h2>
              <div className="property-details-amenities">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="property-details-amenity">
                    <Check className="property-details-amenity-icon" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              <h3 className="property-details-subtitle">Special Features</h3>
              <div className="property-details-features">
                {property.features.map((feature, index) => (
                  <div key={index} className="property-details-feature">
                    <Star className="property-details-feature-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location & Nearby */}
            <section className="property-details-section">
              <h2 className="property-details-section-title">Location & Nearby</h2>
              <div className="property-details-nearby">
                {property.nearbyPlaces.map((place, index) => (
                  <div key={index} className="property-details-nearby-item">
                    <div className="property-details-nearby-icon">{place.icon}</div>
                    <div className="property-details-nearby-content">
                      <div className="property-details-nearby-name">{place.name}</div>
                      <div className="property-details-nearby-distance">{place.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Contact & Info */}
          <div className="property-details-right-column">
            {/* Owner Contact Card */}
            <div className="property-details-contact-card">
              <h3 className="property-details-contact-title">Contact Owner</h3>
              <div className="property-details-owner-info">
                <div className="property-details-owner-header">
                  <div className="property-details-owner-avatar">
                    {property.owner.name.charAt(0)}
                  </div>
                  <div className="property-details-owner-details">
                    <div className="property-details-owner-name">
                      {property.owner.name}
                      {property.owner.verified && (
                        <Shield className="property-details-verified-icon" />
                      )}
                    </div>
                    <div className="property-details-owner-rating">
                      <Star className="property-details-rating-icon" />
                      <span>{property.owner.rating}/5</span>
                    </div>
                  </div>
                </div>
                <div className="property-details-contact-info">
                  <div className="property-details-contact-item">
                    <Phone className="property-details-contact-icon" />
                    <span>{property.owner.phone}</span>
                  </div>
                  <div className="property-details-contact-item">
                    <Mail className="property-details-contact-icon" />
                    <span>{property.owner.email}</span>
                  </div>
                </div>
              </div>
              <div className="property-details-contact-actions">
                <button 
                  className="property-details-call-btn"
                  onClick={handleContactOwner}
                >
                  <Phone className="property-details-call-icon" />
                  Call Now
                </button>
                <button 
                  className="property-details-visit-btn"
                  onClick={handleScheduleVisit}
                >
                  <Calendar className="property-details-visit-icon" />
                  Schedule Visit
                </button>
              </div>
            </div>

            {/* Financial Info */}
            <div className="property-details-financial-card">
              <h3 className="property-details-financial-title">Financial Details</h3>
              <div className="property-details-financial-info">
                {Object.entries(property.financials).map(([key, value]) => (
                  <div key={key} className="property-details-financial-item">
                    <span className="property-details-financial-label">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="property-details-financial-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="property-details-action-buttons">
              <button className="property-details-download-btn">
                <Download className="property-details-download-icon" />
                Download Brochure
              </button>
              <button className="property-details-print-btn">
                <Printer className="property-details-print-icon" />
                Print Details
              </button>
            </div>

            {/* Property ID & Status */}
            <div className="property-details-meta-info">
              <div className="property-details-meta-item">
                <span className="property-details-meta-label">Property ID:</span>
                <span className="property-details-meta-value">PROP-{String(property.id).padStart(5, '0')}</span>
              </div>
              <div className="property-details-meta-item">
                <span className="property-details-meta-label">Listed:</span>
                <span className="property-details-meta-value">3 days ago</span>
              </div>
              <div className="property-details-meta-item">
                <span className="property-details-meta-label">Status:</span>
                <span className="property-details-meta-value status-available">Available</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}