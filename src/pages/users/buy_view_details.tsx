import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Home, MapPin, Bed, Bath, Maximize, Heart, Share2, Phone, Mail, Calendar, Check, Car, Layers, Shield, TrendingUp, ArrowLeft, Star, Download, Printer, Facebook, Twitter, Linkedin, Instagram, Clock, Users, Building, Mountain } from 'lucide-react';
import AGLogo from '../../assets/AG_logo.jpeg';
import './buy_view_details.css';

// Header Component
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
    <header className={`pd5-property-details-header ${scrolled ? 'pd5-scrolled' : ''}`}>
      <div className="pd5-property-details-header-content">
        <Link to="/" className="pd5-property-details-logo">
          <img src={AGLogo} alt="PropFinder" className="pd5-property-details-logo-image" />
          <span className="pd5-property-details-logo-text">PropFinder</span>
        </Link>
        <nav className="pd5-property-details-nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="pd5-property-details-nav-item"
            >
              <item.icon className="pd5-property-details-nav-icon" />
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
    <footer className="pd5-property-details-footer">
      <div className="pd5-property-details-footer-content">
        <div className="pd5-property-details-footer-logo">
          <img src={AGLogo} alt="PropFinder" className="pd5-property-details-footer-logo-image" />
          <span className="pd5-property-details-footer-logo-text">PropFinder</span>
        </div>
        <p className="pd5-property-details-footer-description">
          Your trusted partner in finding the perfect property across Tamil Nadu
        </p>
        <div className="pd5-property-details-footer-social">
          <a href="#" className="pd5-property-details-social-link">
            <Facebook />
          </a>
          <a href="#" className="pd5-property-details-social-link">
            <Twitter />
          </a>
          <a href="#" className="pd5-property-details-social-link">
            <Linkedin />
          </a>
          <a href="#" className="pd5-property-details-social-link">
            <Instagram />
          </a>
        </div>
        <div className="pd5-property-details-footer-bottom">
          © 2024 PropFinder. All rights reserved.
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
    description: `Experience luxurious living in this stunning contemporary villa located in the heart of Anna Nagar. This property boasts modern architecture with premium finishes throughout.

The villa features a spacious living area, modular kitchen with granite countertops, and a beautiful private garden perfect for family gatherings. The property includes a master bedroom with walk-in closet and ensuite bathroom, three additional well-appointed bedrooms, and a dedicated study room.

The villa is equipped with modern amenities including CCTV security, 24/7 water supply, and power backup. Located in one of Chennai's most prestigious neighborhoods, this villa offers easy access to shopping malls, hospitals, schools, and entertainment centers. The property has excellent connectivity to major roads and public transportation.`,
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
    <div className="pd5-property-details-page">
      <Header scrolled={scrolled} />

      {/* Back Button */}
      <div className="pd5-property-details-back-container">
        <button className="pd5-property-details-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft className="pd5-property-details-back-icon" />
          Back to Properties
        </button>
      </div>

      {/* Property Header */}
      <main className="pd5-property-details-main">
        <div className="pd5-property-details-header-section">
          <div className="pd5-property-details-title-section">
            <h1 className="pd5-property-details-title">{property.title}</h1>
            <div className="pd5-property-details-location">
              <MapPin className="pd5-property-details-location-icon" />
              {property.location}
            </div>
          </div>
          <div className="pd5-property-details-price-section">
            <div className="pd5-property-details-price">{property.price}</div>
            <div className="pd5-property-details-price-sub">{property.pricePerSqft}</div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="pd5-property-details-gallery">
          <div className="pd5-property-details-main-image">
            <img
              src={property.images[activeImage]}
              alt="Property"
              className="pd5-property-details-active-image"
            />
            <div className="pd5-property-details-image-actions">
              <button
                className={`pd5-property-details-favorite-btn ${isFavorite ? 'pd5-active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className="pd5-property-details-favorite-icon" />
                {isFavorite ? 'Saved' : 'Save'}
              </button>
              <button className="pd5-property-details-share-btn" onClick={handleShare}>
                <Share2 className="pd5-property-details-share-icon" />
                Share
              </button>
            </div>
          </div>
          <div className="pd5-property-details-thumbnails">
            {property.images.map((img, index) => (
              <div
                key={index}
                className={`pd5-property-details-thumbnail ${activeImage === index ? 'pd5-active' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="pd5-property-details-content">
          {/* Left Column */}
          <div className="pd5-property-details-left-column">
            {/* Quick Stats */}
            <div className="pd5-property-details-stats">
              <div className="pd5-property-details-stat">
                <Bed className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.beds}</div>
                  <div className="pd5-property-details-stat-label">Bedrooms</div>
                </div>
              </div>
              <div className="pd5-property-details-stat">
                <Bath className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.baths}</div>
                  <div className="pd5-property-details-stat-label">Bathrooms</div>
                </div>
              </div>
              <div className="pd5-property-details-stat">
                <Maximize className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.sqft}</div>
                  <div className="pd5-property-details-stat-label">Sq. Ft.</div>
                </div>
              </div>
              <div className="pd5-property-details-stat">
                <Car className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.parking}</div>
                  <div className="pd5-property-details-stat-label">Parking</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Description</h2>
              <p className="pd5-property-details-description">{property.description}</p>
            </div>

            {/* Specifications */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Specifications</h2>
              <div className="pd5-property-details-specs-grid">
                {Object.entries(property.specifications).map(([key, value]) => (
                  <div key={key} className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">
                      {key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                    </span>
                    <span className="pd5-property-details-spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Amenities & Features</h2>
              <div className="pd5-property-details-amenities">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="pd5-property-details-amenity">
                    <Check className="pd5-property-details-amenity-icon" />
                    {amenity}
                  </div>
                ))}
              </div>
             
             
            </div>

            
          </div>

          {/* Right Column - Contact & Info */}
          <div className="pd5-property-details-right-column">
            {/* Owner Contact Card */}
            <div className="pd5-property-details-contact-card">
              <h3 className="pd5-property-details-contact-title">Contact Owner</h3>
              <div className="pd5-property-details-owner-info">
                <div className="pd5-property-details-owner-header">
                  <div className="pd5-property-details-owner-avatar">
                    {property.owner.name.charAt(0)}
                  </div>
                  <div className="pd5-property-details-owner-details">
                    <div className="pd5-property-details-owner-name">
                      {property.owner.name}
                      {property.owner.verified && (
                        <Shield className="pd5-property-details-verified-icon" />
                      )}
                    </div>
                    <div className="pd5-property-details-owner-rating">
                      <Star className="pd5-property-details-rating-icon" />
                      {property.owner.rating}/5
                    </div>
                  </div>
                </div>
                <div className="pd5-property-details-contact-info">
                  <div className="pd5-property-details-contact-item">
                    <Phone className="pd5-property-details-contact-icon" />
                    {property.owner.phone}
                  </div>
                  <div className="pd5-property-details-contact-item">
                    <Mail className="pd5-property-details-contact-icon" />
                    {property.owner.email}
                  </div>
                </div>
              </div>
              <div className="pd5-property-details-contact-actions">
              
              </div>
            </div>
          {/* Location & Nearby */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Location & Nearby</h2>
              <div className="pd5-property-details-nearby">
                {property.nearbyPlaces.map((place, index) => (
                  <div key={index} className="pd5-property-details-nearby-item">
                    <div className="pd5-property-details-nearby-icon">{place.icon}</div>
                    <div className="pd5-property-details-nearby-content">
                      <div className="pd5-property-details-nearby-name">{place.name}</div>
                      <div className="pd5-property-details-nearby-distance">{place.distance}</div>
                    </div>
                  </div>
                ))} 
              </div>
             </div>
           

            

           
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}