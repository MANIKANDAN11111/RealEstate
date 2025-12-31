import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Home, MapPin, Bed, Bath, Maximize, Heart, Share2, Phone, Mail, 
  Check, Car, Layers, Shield, ArrowLeft, 
  Star, Facebook, Twitter, Linkedin, Instagram, 
  Building, DollarSign, Megaphone,
  X, User, MessageSquare, AlertCircle,
  ZoomIn, ZoomOut, Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, X as XIcon, ChevronLeft, ChevronRight
} from 'lucide-react';
import AGLogo from '../../assets/AG_logo.jpeg';
import './buy_view_details.css';

// Define Property Interface matching backend
interface Property {
  id: string;
  propertyType: string;
  propertyCategory: string;
  propertySubCategory: string;
  title: string;
  description: string;
  priceDetails?: {
    price: number;
    priceUnit: string;
  };
  location?: {
    district: string;
    locality: string;
    landmark?: string;
    fullAddress: string;
    state?: string;
    city?: string;
    pincode?: string;
  };
  features?: {
    bedrooms?: number;
    bathrooms?: number;
    balconies?: number;
    builtUpArea?: number;
    carpetArea?: number;
    areaUnit?: string;
    floor?: number;
    totalFloors?: number;
    facing?: string;
    propertyAge?: number;
    furnished?: boolean;
    parking?: boolean;
    parkingCount?: number;
    amenities?: string[];
  };
  propertyDetails?: Record<string, any>;
  contactInfo?: {
    ownerName?: string;
    phone: string;
    email: string;
    showPhone?: boolean;
    showEmail?: boolean;
  };
  images?: Array<{
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }>;
  videos?: Array<{
    fileName: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
  }>;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

// Interest Form Interface
interface InterestFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Validation Errors Interface
interface ValidationErrors {
  email?: string;
  phone?: string;
}

// Header Component
interface HeaderProps {
  scrolled: boolean;
}

function Header({ scrolled }: HeaderProps) {
  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Buy', icon: Building, path: '/buy' },
    { name: 'Sell', icon: DollarSign, path: '/sell' },
    { name: 'Advertise', icon: Megaphone, path: '/advertise' },
    { name: 'Contact', icon: Phone, path: '/contact' },
  ];

  return (
    <header className={`pd5-property-details-header ${scrolled ? 'pd5-scrolled' : ''}`}>
      <div className="pd5-property-details-header-content">
        <Link to="/" className="pd5-property-details-logo">
          <img src={AGLogo} alt="PropFinder" className="pd5-property-details-logo-image" />
          <span className="pd5-property-details-logo-text">DreamProperties</span>
        </Link>
        <nav className="pd5-property-details-nav">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="pd5-property-details-nav-item"
              aria-label={item.name}
            >
              <item.icon className="pd5-property-details-nav-icon" />
              <span className="pd5-nav-item-text">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

// Updated Footer Component (from ContactUs)
function Footer() {
  return (
    <footer className="pd5-contact-footer">
      <div className="pd5-contact-footer-container">
        <div className="pd5-contact-footer-content">
          <div className="pd5-contact-footer-section">
            <div className="pd5-contact-footer-logo">
              <Link to="/" className="pd5-contact-logo-link">
                <img src={AGLogo} alt="PropFinder Logo" className="pd5-contact-logo-image" />
                <span className="pd5-contact-footer-logo-text">DreamProperties</span>
              </Link>
            </div>
            <p className="pd5-contact-footer-description">
              Your trusted partner in finding the perfect property across Tamil Nadu. We make real
              estate easy.
            </p>
            <div className="pd5-contact-footer-social">
              <a href="#" className="pd5-contact-social-link" aria-label="Facebook">
                <Facebook className="pd5-contact-social-icon" />
              </a>
              <a href="#" className="pd5-contact-social-link" aria-label="Twitter">
                <Twitter className="pd5-contact-social-icon" />
              </a>
              <a href="https://www.instagram.com/ag_dreamproperties" className="pd5-contact-social-link" aria-label="Instagram">
                <Instagram className="pd5-contact-social-icon" />
              </a>
              <a href="#" className="pd5-contact-social-link" aria-label="LinkedIn">
                <Linkedin className="pd5-contact-social-icon" />
              </a>
            </div>
          </div>

          <div className="pd5-contact-footer-section">
            <h3 className="pd5-contact-footer-title">Quick Links</h3>
            <ul className="pd5-contact-footer-links">
              <li>
                <Link to="/" className="pd5-contact-footer-link">Home</Link>
              </li>
              <li>
                <Link to="/buy" className="pd5-contact-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/sell" className="pd5-contact-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/advertise" className="pd5-contact-footer-link">Advertise</Link>
              </li>
            </ul>
          </div>

          <div className="pd5-contact-footer-section">
            <h3 className="pd5-contact-footer-title">Properties</h3>
            <ul className="pd5-contact-footer-links">
              <li>
                <Link to="/buy" className="pd5-contact-footer-link">Buy Property</Link>
              </li>
              <li>
                <Link to="/properties" className="pd5-contact-footer-link">Rent Property</Link>
              </li>
              <li>
                <Link to="/sell" className="pd5-contact-footer-link">Sell Property</Link>
              </li>
              <li>
                <Link to="/properties" className="pd5-contact-footer-link">Featured Listings</Link>
              </li>
            </ul>
          </div>

          <div className="pd5-contact-footer-section">
            <h3 className="pd5-contact-footer-title">Legal</h3>
            <ul className="pd5-contact-footer-links">
              <li>
                <a href="#" className="pd5-contact-footer-link">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="pd5-contact-footer-link">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="pd5-contact-footer-link">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="pd5-contact-footer-link">Disclaimer</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pd5-contact-footer-bottom">
          <p className="pd5-contact-footer-copyright">
            &copy; 2024 DreamProperties. All rights reserved. | Built with excellence for Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  );
}

// Interest Form Modal Component
interface InterestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: InterestFormData) => void;
}

function InterestFormModal({ isOpen, onClose, onSubmit }: InterestFormModalProps) {
  const [formData, setFormData] = useState<InterestFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Validation functions
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    // Phone validation - required
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
      }
    }
    
    // Email validation - optional but must be valid if provided
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit interest. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="pd5-modal-overlay">
      <div className="pd5-modal-content">
        <div className="pd5-modal-header">
          <h2 className="pd5-modal-title">Send Your Interest</h2>
          <button 
            className="pd5-modal-close" 
            onClick={onClose} 
            disabled={isSubmitting}
            aria-label="Close modal"
          >
            <X className="pd5-modal-close-icon" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="pd5-interest-form" noValidate>
          {/* Name Field */}
          <div className="pd5-form-group">
            <label htmlFor="name" className="pd5-form-label">
              <User className="pd5-form-icon" />
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="pd5-form-input"
              placeholder="Enter your full name"
              disabled={isSubmitting}
              required
              aria-required="true"
            />
          </div>

          {/* Email Field */}
          <div className="pd5-form-group">
            <label htmlFor="email" className="pd5-form-label">
              <Mail className="pd5-form-icon" />
              Email Address (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`pd5-form-input ${errors.email ? 'pd5-input-error' : ''}`}
              placeholder="Enter your email address"
              disabled={isSubmitting}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <div id="email-error" className="pd5-error-message" role="alert">
                <AlertCircle className="pd5-error-icon" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Phone Field */}
          <div className="pd5-form-group">
            <label htmlFor="phone" className="pd5-form-label">
              <Phone className="pd5-form-icon" />
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`pd5-form-input ${errors.phone ? 'pd5-input-error' : ''}`}
              placeholder="Enter your 10-digit mobile number"
              disabled={isSubmitting}
              required
              maxLength={10}
              inputMode="numeric"
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <div id="phone-error" className="pd5-error-message" role="alert">
                <AlertCircle className="pd5-error-icon" />
                {errors.phone}
              </div>
            )}
          </div>

          {/* Message Field */}
          <div className="pd5-form-group">
            <label htmlFor="message" className="pd5-form-label">
              <MessageSquare className="pd5-form-icon" />
              Your Message (2 lines max)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="pd5-form-textarea"
              placeholder="Briefly describe your interest in this property..."
              rows={2}
              maxLength={200}
              disabled={isSubmitting}
              aria-describedby="char-count"
            />
            <div id="char-count" className="pd5-char-count">{formData.message.length}/200</div>
          </div>

          {/* Form Actions */}
          <div className="pd5-form-actions">
            <button 
              type="button" 
              className="pd5-form-cancel" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="pd5-form-submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="pd5-spinner-small" aria-hidden="true"></div>
                  <span className="pd5-submit-text">Submitting...</span>
                </>
              ) : (
                'Submit Interest'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Success Modal Component
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="pd5-modal-overlay">
      <div className="pd5-modal-content pd5-success-modal">
        <div className="pd5-success-icon" aria-hidden="true">✓</div>
        <h2 className="pd5-success-title">Interest Submitted Successfully!</h2>
        <p className="pd5-success-message">
          Thank you for showing interest in this property. Our team will contact you shortly.
        </p>
        <button className="pd5-success-button" onClick={onClose} autoFocus>
          OK
        </button>
      </div>
    </div>
  );
}

// Image Zoom Modal Component
interface ImageZoomModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalImages: number;
}

function ImageZoomModal({ isOpen, imageUrl, onClose, onNext, onPrev, currentIndex, totalImages }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 1));
  };

  const handleResetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Limit the drag based on image size and scale
      const container = containerRef.current;
      if (container) {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const maxX = (scale - 1) * containerWidth / 2;
        const maxY = (scale - 1) * containerHeight / 2;
        
        setPosition({
          x: Math.max(-maxX, Math.min(maxX, newX)),
          y: Math.max(-maxY, Math.min(maxY, newY))
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="pd5-image-zoom-modal-overlay" onClick={onClose}>
      <div 
        className="pd5-image-zoom-modal-content" 
        onClick={(e) => e.stopPropagation()}
        ref={containerRef}
      >
        <div className="pd5-image-zoom-header">
          <div className="pd5-image-zoom-counter">
            {currentIndex + 1} / {totalImages}
          </div>
          <button className="pd5-image-zoom-close" onClick={onClose}>
            <XIcon className="pd5-image-zoom-close-icon" />
          </button>
        </div>
        
        <div className="pd5-image-zoom-navigation">
          <button className="pd5-image-zoom-nav-btn pd5-image-zoom-prev" onClick={onPrev}>
            <ChevronLeft className="pd5-image-zoom-nav-icon" />
          </button>
          
          <div 
            className="pd5-image-zoom-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <img
              src={imageUrl}
              alt={`Zoomed view ${currentIndex + 1}`}
              className="pd5-image-zoom-img"
              style={{
                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
              }}
            />
          </div>
          
          <button className="pd5-image-zoom-nav-btn pd5-image-zoom-next" onClick={onNext}>
            <ChevronRight className="pd5-image-zoom-nav-icon" />
          </button>
        </div>
        
        <div className="pd5-image-zoom-controls">
          <button className="pd5-image-zoom-control-btn" onClick={handleZoomOut} title="Zoom Out">
            <ZoomOut className="pd5-image-zoom-control-icon" />
            <span>Zoom Out</span>
          </button>
          <button className="pd5-image-zoom-control-btn" onClick={handleResetZoom} title="Reset Zoom">
            <span>Reset</span>
          </button>
          <button className="pd5-image-zoom-control-btn" onClick={handleZoomIn} title="Zoom In">
            <ZoomIn className="pd5-image-zoom-control-icon" />
            <span>Zoom In</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Video Player Modal Component
interface VideoPlayerModalProps {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
}

function VideoPlayerModal({ isOpen, videoUrl, onClose }: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Auto-play prevented:", error);
          });
        }
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 3);
    }
  };

  const handleSkipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 3);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleToggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume;
        setIsMuted(false);
      } else {
        videoRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="pd5-video-modal-overlay" onClick={onClose}>
      <div className="pd5-video-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="pd5-video-modal-header">
          <h3 className="pd5-video-modal-title">Property Video</h3>
          <button className="pd5-video-modal-close" onClick={onClose}>
            <XIcon className="pd5-video-modal-close-icon" />
          </button>
        </div>
        
        <div className="pd5-video-player-container">
          <video
            ref={videoRef}
            src={videoUrl}
            className="pd5-video-player"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            controls={false}
          />
          
          <div className="pd5-video-controls">
            <div className="pd5-video-progress-container">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="pd5-video-progress"
              />
              <div className="pd5-video-time">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="pd5-video-controls-bottom">
              <div className="pd5-video-controls-left">
                <button className="pd5-video-control-btn" onClick={handlePlayPause} title={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? (
                    <Pause className="pd5-video-control-icon" />
                  ) : (
                    <Play className="pd5-video-control-icon" />
                  )}
                </button>
                <button className="pd5-video-control-btn" onClick={handleSkipBackward} title="Skip Back 3s">
                  <SkipBack className="pd5-video-control-icon" />
                  <span className="pd5-skip-text">3s</span>
                </button>
                <button className="pd5-video-control-btn" onClick={handleSkipForward} title="Skip Forward 3s">
                  <SkipForward className="pd5-video-control-icon" />
                  <span className="pd5-skip-text">3s</span>
                </button>
                
                <div className="pd5-volume-control">
                  <button className="pd5-video-control-btn" onClick={handleToggleMute} title={isMuted ? "Unmute" : "Mute"}>
                    {isMuted ? (
                      <VolumeX className="pd5-video-control-icon" />
                    ) : (
                      <Volume2 className="pd5-video-control-icon" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="pd5-volume-slider"
                  />
                </div>
              </div>
              
              <div className="pd5-video-controls-right">
                <div className="pd5-playback-rate">
                  <span>Speed:</span>
                  <select
                    value={playbackRate}
                    onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
                    className="pd5-playback-select"
                  >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // Static contact details
  const contactNumbers = [
    { number: '+91 6374656460', name: 'Esakky pandian' },
    { number: '+91 8682800268', name: 'Rishi' }
  ];
  const contactEmail = 'ananthitechnologies@gmail.com';

  // Fetch property details from API
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      if (!id) {
        setError('No property ID provided');
        setLoading(false);
        return;
      }
      
      console.log(`Fetching property details for ID: ${id}`);
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://realestatebackend-8adg.onrender.com/api/properties/${id}`);
        
        console.log(`API Response Status: ${response.status}`);
        
        if (response.status === 404) {
          throw new Error('Property not found. Please check the property ID.');
        }
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('API Response Data:', data);
        
        if (data && typeof data === 'object') {
          if (data.success === false) {
            throw new Error(data.message || 'Failed to fetch property');
          }
          
          if (data.property) {
            setProperty(data.property);
          } else {
            setProperty(data);
          }
        } else {
          throw new Error('Invalid data received from server');
        }
        
      } catch (err) {
        console.error('Error fetching property details:', err);
        
        let errorMessage = 'Failed to load property details. ';
        if (err instanceof Error) {
          errorMessage += err.message;
        }
        
        setError(errorMessage);
        setProperty(null);
        
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format price for display
  const formatPrice = () => {
    if (!property?.priceDetails) return 'Price not available';
    
    const price = property.priceDetails.price;
    const unit = property.priceDetails.priceUnit;
    
    if (unit === 'lakh') {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    } else if (unit === 'crore') {
      return `₹${(price / 10000000).toFixed(2)} Crore`;
    } else if (unit === 'sqft') {
      return `₹${price.toLocaleString()} per sq.ft`;
    } else if (unit === 'month') {
      return `₹${price.toLocaleString()} per month`;
    }
    return `₹${price.toLocaleString()}`;
  };

  // Get price per sqft
  const getPricePerSqft = () => {
    if (!property?.priceDetails || !property?.features?.builtUpArea) return '';
    
    const price = property.priceDetails.price;
    const area = property.features.builtUpArea;
    
    if (area > 0) {
      const pricePerSqft = Math.round(price / area);
      return `₹${pricePerSqft.toLocaleString()}/sqft`;
    }
    return '';
  };

  // Get property location
  const getLocation = () => {
    if (!property?.location) return 'Location not specified';
    
    const loc = property.location;
    if (loc.locality && loc.district) {
      return `${loc.locality}, ${loc.district}, ${loc.state || 'Tamil Nadu'} ${loc.pincode || ''}`;
    }
    return loc.fullAddress || 'Location not specified';
  };

  const handleContactOwner = () => {
    alert(`Contacting our team...\n\nCall us at:\n${contactNumbers[0].number} (${contactNumbers[0].name})\n${contactNumbers[1].number} (${contactNumbers[1].name})\n\nEmail: ${contactEmail}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.title || 'Property',
        text: `Check out this property: ${property?.title}`,
        url: window.location.href
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleSendInterest = () => {
    setShowInterestForm(true);
  };

  const handleInterestSubmit = async (formData: InterestFormData) => {
    try {
      const payload = {
        propertyTitle: property?.title || 'Property',
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        message: formData.message
      };

      const response = await fetch(
        'https://realestatebackend-8adg.onrender.com/api/messages',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to submit interest');
      }

      setShowInterestForm(false);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Interest submission error:', error);
      alert('Failed to submit interest. Please try again.');
    }
  };

  const handleImageClick = () => {
    if (property?.images && property.images.length > 0) {
      setShowImageZoom(true);
    }
  };

  const handleVideoClick = (index: number) => {
    setSelectedVideoIndex(index);
    setShowVideoPlayer(true);
  };

  const handleNextImage = () => {
    if (property?.images) {
      setActiveImage((prev) => (prev + 1) % property.images!.length);
    }
  };

  const handlePrevImage = () => {
    if (property?.images) {
      setActiveImage((prev) => (prev - 1 + property.images!.length) % property.images!.length);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="pd5-property-details-page">
        <Header scrolled={scrolled} />
        <div className="pd5-loading-container">
          <div className="pd5-spinner" aria-hidden="true"></div>
          <p>Loading property details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error && !property) {
    return (
      <div className="pd5-property-details-page">
        <Header scrolled={scrolled} />
        <div className="pd5-error-container">
          <p>⚠️ {error}</p>
          <p className="pd5-debug-info">Property ID: {id}</p>
          <button className="pd5-back-btn" onClick={() => navigate('/buy')}>
            <ArrowLeft className="pd5-back-btn-icon" />
            Back to Properties
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pd5-property-details-page">
        <Header scrolled={scrolled} />
        <div className="pd5-error-container">
          <p>Property not found</p>
          <p>Please check if the property ID is correct.</p>
          <button className="pd5-back-btn" onClick={() => navigate('/buy')}>
            <ArrowLeft className="pd5-back-btn-icon" />
            Back to Properties
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pd5-property-details-page">
      <Header scrolled={scrolled} />

      {/* Back Button */}
      <div className="pd5-property-details-back-container">
        <button className="pd5-property-details-back-btn" onClick={() => navigate('/buy')}>
          <ArrowLeft className="pd5-property-details-back-icon" />
          <span className="pd5-back-btn-text">Back to Properties</span>
        </button>
      </div>

      {/* Property Header */}
      <main className="pd5-property-details-main">
        <div className="pd5-property-details-header-section">
          <div className="pd5-property-details-title-section">
            <h1 className="pd5-property-details-title">{property.title}</h1>
            <div className="pd5-property-details-location">
              <MapPin className="pd5-property-details-location-icon" />
              <span className="pd5-location-text">{getLocation()}</span>
            </div>
          </div>
          <div className="pd5-property-details-price-section">
            <div className="pd5-property-details-price">{formatPrice()}</div>
            {getPricePerSqft() && (
              <div className="pd5-property-details-price-sub">{getPricePerSqft()}</div>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="pd5-property-details-gallery">
          <div className="pd5-property-details-main-image">
            <img 
              src={property.images && property.images.length > 0 ? property.images[activeImage].fileUrl : 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'}
              alt={property.title}
              className="pd5-property-details-active-image"
              loading="lazy"
              onClick={handleImageClick}
              style={{ cursor: 'pointer' }}
            />
            <div className="pd5-property-details-image-actions">
              <button
                className={`pd5-property-details-favorite-btn ${isFavorite ? 'pd5-active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart 
                  className="pd5-property-details-favorite-icon" 
                  fill={isFavorite ? "white" : "none"} 
                  strokeWidth={2}
                />
                <span className="pd5-favorite-text">{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
              <button 
                className="pd5-property-details-share-btn" 
                onClick={handleShare} 
                aria-label="Share property"
              >
                <Share2 className="pd5-property-details-share-icon" />
                <span className="pd5-share-text">Share</span>
              </button>
            </div>
          </div>
          <div className="pd5-property-details-thumbnails">
            {property.images && property.images.length > 0 ? (
              property.images.map((img, index) => (
                <div
                  key={index}
                  className={`pd5-property-details-thumbnail ${activeImage === index ? 'pd5-active' : ''}`}
                  onClick={() => setActiveImage(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View image ${index + 1}`}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveImage(index)}
                >
                  <img src={img.fileUrl} alt={`Thumbnail ${index + 1}`} loading="lazy" />
                </div>
              ))
            ) : (
              <div className="pd5-no-images">
                <p>No images available</p>
              </div>
            )}
            {property.videos && property.videos.length > 0 && (
              property.videos.map((video, index) => (
                <div
                  key={`video-${index}`}
                  className="pd5-property-details-thumbnail pd5-video-thumbnail"
                  onClick={() => handleVideoClick(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Play video ${index + 1}`}
                  onKeyDown={(e) => e.key === 'Enter' && handleVideoClick(index)}
                >
                  <div className="pd5-video-thumbnail-overlay">
                    <Play className="pd5-video-play-icon" />
                  </div>
                  <div className="pd5-video-label">Video {index + 1}</div>
                </div>
              ))
            )}
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
                  <div className="pd5-property-details-stat-value">{property.features?.bedrooms || 'N/A'}</div>
                  <div className="pd5-property-details-stat-label">Bedrooms</div>
                </div>
              </div>
              <div className="pd5-property-details-stat">
                <Bath className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.features?.bathrooms || 'N/A'}</div>
                  <div className="pd5-property-details-stat-label">Bathrooms</div>
                </div>
              </div>
              <div className="pd5-property-details-stat">
                <Maximize className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.features?.builtUpArea || property.features?.carpetArea || 'N/A'}</div>
                  <div className="pd5-property-details-stat-label">Sq. Ft.</div>
                </div>
              </div>
              <div className="pd5-property-details-stat">
                <Car className="pd5-property-details-stat-icon" />
                <div className="pd5-property-details-stat-content">
                  <div className="pd5-property-details-stat-value">{property.features?.parkingCount || (property.features?.parking ? 'Yes' : 'No')}</div>
                  <div className="pd5-property-details-stat-label">Parking</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Description</h2>
              <p className="pd5-property-details-description">{property.description || 'No description available'}</p>
            </div>

            {/* Specifications */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Property Specifications</h2>
              <div className="pd5-property-details-specs-grid">
                {/* Property Type */}
                <div className="pd5-property-details-spec-item">
                  <span className="pd5-property-details-spec-label">PROPERTY TYPE</span>
                  <span className="pd5-property-details-spec-value">
                    {property.propertyType ? property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1) : 'N/A'} - {property.propertyCategory || 'N/A'}
                  </span>
                </div>
                
                {/* Sub Category */}
                {property.propertySubCategory && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">SUB CATEGORY</span>
                    <span className="pd5-property-details-spec-value">
                      {property.propertySubCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                )}
                
                {/* Built-up Area */}
                {property.features?.builtUpArea && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">BUILT-UP AREA</span>
                    <span className="pd5-property-details-spec-value">{property.features.builtUpArea.toLocaleString()} sqft</span>
                  </div>
                )}
                
                {/* Carpet Area */}
                {property.features?.carpetArea && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">CARPET AREA</span>
                    <span className="pd5-property-details-spec-value">{property.features.carpetArea.toLocaleString()} sqft</span>
                  </div>
                )}
                
                {/* Facing */}
                {property.features?.facing && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">FACING</span>
                    <span className="pd5-property-details-spec-value">{property.features.facing}</span>
                  </div>
                )}
                
                {/* Property Age */}
                {property.features?.propertyAge && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">PROPERTY AGE</span>
                    <span className="pd5-property-details-spec-value">{property.features.propertyAge} years</span>
                  </div>
                )}
                
                {/* Furnishing */}
                {property.features?.furnished !== undefined && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">FURNISHING</span>
                    <span className="pd5-property-details-spec-value">
                      {property.features.furnished ? 'Fully Furnished' : 'Unfurnished'}
                    </span>
                  </div>
                )}
                
                {/* Floor Number */}
                {property.features?.floor && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">FLOOR NUMBER</span>
                    <span className="pd5-property-details-spec-value">{property.features.floor}</span>
                  </div>
                )}
                
                {/* Total Floors */}
                {property.features?.totalFloors && (
                  <div className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">TOTAL FLOORS</span>
                    <span className="pd5-property-details-spec-value">{property.features.totalFloors}</span>
                  </div>
                )}
                
                {/* Display additional property details */}
                {property.propertyDetails && Object.entries(property.propertyDetails).map(([key, value]) => (
                  <div key={key} className="pd5-property-details-spec-item">
                    <span className="pd5-property-details-spec-label">
                      {key.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ').toUpperCase()}
                    </span>
                    <span className="pd5-property-details-spec-value">
                      {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value || 'N/A')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Amenities & Features</h2>
              <div className="pd5-property-details-amenities">
                {property.features?.amenities && property.features.amenities.length > 0 ? (
                  property.features.amenities.map((amenity, index) => (
                    <div key={index} className="pd5-property-details-amenity">
                      <Check className="pd5-property-details-amenity-icon" />
                      <span className="pd5-amenity-text">{amenity}</span>
                    </div>
                  ))
                ) : (
                  <p className="pd5-no-amenities">No amenities listed</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Info */}
          <div className="pd5-property-details-right-column">
            {/* Static Owner Contact Card */}
            <div className="pd5-property-details-contact-card">
              <h3 className="pd5-property-details-contact-title">Contact Our Team</h3>
              <div className="pd5-property-details-owner-info">
                <div className="pd5-property-details-owner-header">
                  <div className="pd5-property-details-owner-avatar">
                    DP
                  </div>
                  <div className="pd5-property-details-owner-details">
                    <div className="pd5-property-details-owner-name">
                      <span className="pd5-owner-name-text">DreamProperties Team</span>
                      <Shield className="pd5-property-details-verified-icon" />
                    </div>
                    <div className="pd5-property-details-owner-rating">
                      <Star className="pd5-property-details-rating-icon" />
                      <span className="pd5-rating-text">4.8/5 (Verified)</span>
                    </div>
                  </div>
                </div>
                <div className="pd5-property-details-contact-info">
                  {contactNumbers.map((contact, index) => (
                    <div key={index} className="pd5-property-details-contact-item">
                      <Phone className="pd5-property-details-contact-icon" />
                      <div className="pd5-contact-details">
                        <div className="pd5-contact-number">{contact.number}</div>
                        <div className="pd5-contact-name">({contact.name})</div>
                      </div>
                    </div>
                  ))}
                  <div className="pd5-property-details-contact-item">
                    <Mail className="pd5-property-details-contact-icon" />
                    <div className="pd5-contact-details">
                      <div className="pd5-contact-email">{contactEmail}</div>
                      <div className="pd5-contact-label">Email Address</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pd5-property-details-contact-actions">
                <button className="pd5-property-details-interest-btn" onClick={handleSendInterest}>
                  <MessageSquare className="pd5-property-details-interest-icon" />
                  <span className="pd5-interest-text">Send Interest</span>
                </button>
                <button className="pd5-property-details-call-btn" onClick={handleContactOwner}>
                  <Phone className="pd5-property-details-call-icon" />
                  <span className="pd5-call-text">Call Now</span>
                </button>
              </div>
            </div>

            {/* Location & Nearby */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Location Details</h2>
              <div className="pd5-property-details-nearby">
                {property.location?.district && (
                  <div className="pd5-property-details-nearby-item">
                    <div className="pd5-property-details-nearby-icon"><Building /></div>
                    <div className="pd5-property-details-nearby-content">
                      <div className="pd5-property-details-nearby-name">District</div>
                      <div className="pd5-property-details-nearby-distance">{property.location.district}</div>
                    </div>
                  </div>
                )}
                {property.location?.locality && (
                  <div className="pd5-property-details-nearby-item">
                    <div className="pd5-property-details-nearby-icon"><MapPin /></div>
                    <div className="pd5-property-details-nearby-content">
                      <div className="pd5-property-details-nearby-name">Locality</div>
                      <div className="pd5-property-details-nearby-distance">{property.location.locality}</div>
                    </div>
                  </div>
                )}
                {property.location?.landmark && (
                  <div className="pd5-property-details-nearby-item">
                    <div className="pd5-property-details-nearby-icon"><Layers /></div>
                    <div className="pd5-property-details-nearby-content">
                      <div className="pd5-property-details-nearby-name">Landmark</div>
                      <div className="pd5-property-details-nearby-distance">{property.location.landmark}</div>
                    </div>
                  </div>
                )}
                {property.location?.pincode && (
                  <div className="pd5-property-details-nearby-item">
                    <div className="pd5-property-details-nearby-icon"><Shield /></div>
                    <div className="pd5-property-details-nearby-content">
                      <div className="pd5-property-details-nearby-name">Pincode</div>
                      <div className="pd5-property-details-nearby-distance">{property.location.pincode}</div>
                    </div>
                  </div>
                )}
                {!property.location?.district && !property.location?.locality && (
                  <div className="pd5-no-location">
                    <p>Location details not specified</p>
                  </div>
                )}
              </div>
            </div>

            {/* Property Status */}
            <div className="pd5-property-details-section">
              <h2 className="pd5-property-details-section-title">Property Status</h2>
              <div className="pd5-property-status">
                <div className="pd5-status-item">
                  <span className="pd5-status-label">Status:</span>
                  <span className={`pd5-status-value ${property.status?.toLowerCase()}`}>
                    {property.status || 'N/A'}
                  </span>
                </div>
                <div className="pd5-status-item">
                  <span className="pd5-status-label">Listed On:</span>
                  <span className="pd5-status-value">
                    {property.createdAt ? new Date(property.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      {/* Interest Form Modal */}
      <InterestFormModal
        isOpen={showInterestForm}
        onClose={() => setShowInterestForm(false)}
        onSubmit={handleInterestSubmit}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* Image Zoom Modal */}
      {property.images && property.images.length > 0 && (
        <ImageZoomModal
          isOpen={showImageZoom}
          imageUrl={property.images[activeImage].fileUrl}
          onClose={() => setShowImageZoom(false)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          currentIndex={activeImage}
          totalImages={property.images.length}
        />
      )}

      {/* Video Player Modal */}
      {property.videos && property.videos.length > 0 && (
        <VideoPlayerModal
          isOpen={showVideoPlayer}
          videoUrl={property.videos[selectedVideoIndex].fileUrl}
          onClose={() => setShowVideoPlayer(false)}
        />
      )}

      <Footer />
    </div>
  );
}