import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import agLogo from '../assets/AG_logo.jpeg';

interface LoginForm {
  email: string;
  password: string;
}

interface AdminLoginProps {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    watch 
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  // const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [logoHover, setLogoHover] = useState<boolean>(false);
  const [logoPulse, setLogoPulse] = useState<boolean>(true);

  const passwordValue = watch("password");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      // setWindowWidth(width);
      setIsMobile(width < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!passwordValue) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (passwordValue.length >= 8) strength += 1;
    if (/\d/.test(passwordValue)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) strength += 1;
    if (/[A-Z]/.test(passwordValue)) strength += 1;
    if (/[a-z]/.test(passwordValue)) strength += 1;
    
    setPasswordStrength(strength);
  }, [passwordValue]);

  useEffect(() => {
    if (logoPulse) {
      const interval = setInterval(() => {
        setLogoPulse(p => !p);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [logoPulse]);

  const onSubmit = async (data: LoginForm) => {
    if (passwordStrength < 3) {
      alert("Password must be at least 8 characters with a number and special character");
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Login successful:", data);
    
    onLogin();
    navigate("/dashboard");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Minimum 8 characters required"
    },
    validate: {
      hasNumber: (value: string) => 
        /\d/.test(value) || "Must contain at least one number (0-9)",
      hasSpecialChar: (value: string) => 
        /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Must contain at least one special character (!@#$%^&*)",
      hasUppercase: (value: string) => 
        /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
      hasLowercase: (value: string) => 
        /[a-z]/.test(value) || "Must contain at least one lowercase letter"
    }
  };

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="background-wrapper">
        <div className="bg-grid"></div>
        <div className="bg-dots"></div>
        
        {/* Dynamic Blobs */}
        <div className={`blob blob1 ${isMobile ? 'mobile' : ''}`}></div>
        <div className={`blob blob2 ${isMobile ? 'mobile' : ''}`}></div>
        <div className={`blob blob3 ${isMobile ? 'mobile' : ''}`}></div>
        
        {/* Elegant Pattern */}
        <div className="elegant-pattern"></div>
      </div>

      {/* Main Login Card */}
      <div className="login-card-wrapper">
        <div className="login-card">
          {/* Company Header */}
          <div className="company-header">
            <div className="logo-main-container">
              <div 
                className="logo-main"
                onMouseEnter={() => setLogoHover(true)}
                onMouseLeave={() => setLogoHover(false)}
                onClick={() => setLogoPulse(!logoPulse)}
              >
                <div className={`logo-glass ${logoHover ? 'hover' : ''} ${logoPulse ? 'pulse' : ''}`}>
                  <div className="logo-image-container">
                    <img 
                      src={agLogo} 
                      alt="Ananthi Group Logo" 
                      className="company-logo-image"
                    />
                  </div>
                  <div className={`logo-glow-effect ${logoHover ? 'active' : ''}`}></div>
                </div>
              </div>

              <div className="company-text-container">
                <h1 className="company-name">
                  ANANTHI GROUP
                </h1>
                <div className="company-subtitle">
                  <span className="established-badge">
                    <span className="established-icon">🏗️</span>
                    <span className="company-since">ESTABLISHED 2015</span>
                  </span>
                </div>
                <div className="company-tagline-wrapper">
                  <span className="company-tagline">BUILDING TOMORROW'S DREAMS</span>
                  <div className="tagline-underline"></div>
                </div>

                {/* Business Tags */}
                <div className="business-tags-container">
                  <div className="business-tags">
                    <span className="business-tag construction">
                      <span className="tag-icon">🏗️</span>
                      <span className="tag-text">Construction</span>
                    </span>
                    <span className="business-tag real-estate">
                      <span className="tag-icon">🏢</span>
                      <span className="tag-text">Real Estate</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {/* Email Field */}
            <div className="form-field">
              <label htmlFor="email" className="field-label">
                <span className="label-icon">📧</span>
                <span>Email Address</span>
              </label>
              <div className={`input-container ${errors.email ? 'error' : ''}`}>
                <input
                  type="email"
                  id="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid email address"
                    }
                  })}
                  placeholder="admin@ananthigroup.com"
                  className="form-input"
                />
                <div className="input-border"></div>
              </div>
              {errors.email && (
                <div className="error-message">
                  <span className="error-icon">⚠</span>
                  {errors.email.message}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="form-field">
              <label htmlFor="password" className="field-label">
                <span className="label-icon">🔒</span>
                <span>Password</span>
              </label>
              <div className={`input-container ${errors.password ? 'error' : ''}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", passwordValidation)}
                  placeholder="Min 8 characters with number & special character"
                  className="form-input"
                />
                <div className="input-border"></div>
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {/* Password Strength */}
              <div className="password-strength">
                <div className="strength-bars">
                  <div className={`strength-bar ${passwordStrength >= 1 ? 'active' : ''}`}></div>
                  <div className={`strength-bar ${passwordStrength >= 2 ? 'active' : ''}`}></div>
                  <div className={`strength-bar ${passwordStrength >= 3 ? 'active' : ''}`}></div>
                  <div className={`strength-bar ${passwordStrength >= 4 ? 'active' : ''}`}></div>
                  <div className={`strength-bar ${passwordStrength >= 5 ? 'active' : ''}`}></div>
                </div>
                <div className="strength-text">
                  {passwordStrength < 3 ? "Weak password" : passwordStrength < 5 ? "Good password" : "Strong password"}
                </div>
              </div>

              {errors.password && (
                <div className="error-message">
                  <span className="error-icon">⚠</span>
                  {errors.password.message}
                </div>
              )}
            </div>

            {/* Form Options */}
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Remember this device</span>
              </label>
              <a href="/forgot-password" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="button-spinner"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="button-icon">🚀</span>
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <footer className="login-footer">
            <div className="footer-content">
              <p className="copyright">
                © 2015-2025 Ananthi Group of Companies • Building Excellence Since 2015
              </p>
              <p className="footer-links">
                <a href="/privacy">Privacy Policy</a>
                <span className="divider">•</span>
                <a href="/terms">Terms of Service</a>
                <span className="divider">•</span>
                <a href="/support">24/7 Support</a>
              </p>
              <p className="version">
                Secure Portal v2.4.1
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}