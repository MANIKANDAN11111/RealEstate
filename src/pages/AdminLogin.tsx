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
    watch,
    setError,
    clearErrors,
    setValue
  } = useForm<LoginForm>();

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [logoHover, setLogoHover] = useState<boolean>(false);
  const [logoPulse, setLogoPulse] = useState<boolean>(true);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const passwordValue = watch("password");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
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
    let interval: ReturnType<typeof setInterval>;


    if (logoPulse) {
      interval = setInterval(() => {
        setLogoPulse(p => !p);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [logoPulse]);

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    clearErrors();
    setIsLoading(true);

    if (passwordStrength < 3) {
      setError("password", { type: "manual", message: "Password is too weak" });
      setIsLoading(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch("https://realestatebackend-8adg.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/plain" // We accept text/plain for the raw token response
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
        signal: controller.signal,
        mode: "cors",
        credentials: "include" 
      });

      clearTimeout(timeoutId);

      // ----------------------------------------------------------------
      // Handle HTTP errors (401, 500, etc.)
      // ----------------------------------------------------------------
      if (!res.ok) {
        let errorMessage = `Login failed (${res.status})`;
        
        // Try to read the error body, regardless of content type
        try {
            const errorText = await res.text();
            
            // Try to parse error text as JSON if it looks like it
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const errorData = JSON.parse(errorText);
                errorMessage = errorData.message || errorData.error || errorText;
            } else {
                errorMessage = errorText || errorMessage;
            }
        } catch {
            // Ignore parse errors if the body is empty or malformed
        }
        
        // Handle specific status codes
        if (res.status === 401) {
          errorMessage = "Invalid email or password. Please check your credentials.";
        } else if (res.status === 403) {
          errorMessage = "Access denied. Contact administrator.";
        } else if (res.status >= 500) {
          errorMessage = "Server error. Please try again later.";
        }

        setServerError(errorMessage);
        setIsLoading(false);
        return;
      }

      // ----------------------------------------------------------------
      // 🔥 SUCCESS BLOCK: Processing the Raw Token Text Response
      // ----------------------------------------------------------------
      let token: string | null = null;
      let responseText: string = "";
      
      try {
        // Read the entire response body as text
        responseText = await res.text();
        
        // Trim any leading/trailing whitespace (e.g., newlines)
        const trimmedToken = responseText.trim(); 
        
        // Validate that the trimmed response looks like a token
        // A JWT is typically long and contains at least two dots (.).
        if (trimmedToken && trimmedToken.length > 20 && trimmedToken.includes('.')) { 
            token = trimmedToken;
        } else {
            setServerError(`Login succeeded, but server returned an empty or invalid token string.`);
            setIsLoading(false);
            return;
        }

      } catch (parseError) {
        console.error("Failed to read response content:", parseError);
        setServerError(`Invalid response from server: Failed to read content.`);
        setIsLoading(false);
        return;
      }

      // Successful token extraction and storage
      if (token) {
        // Ensure the token doesn't start with "Bearer " (which it shouldn't, but as a safeguard)
        const cleanToken = token.startsWith("Bearer ") ? token.substring(7) : token;
        localStorage.setItem("token", cleanToken);
      }
      
      // Store the email from the form data (no user data is available from the server response)
      localStorage.setItem("authEmail", data.email);
      
      // Call parent callback and navigate
      onLogin();
      navigate("/dashboard", { replace: true });

    } catch (err: unknown) {
      setIsLoading(false);
      
      if (err instanceof Error && err.name === "AbortError") {
        setServerError("Request timeout. Please check your connection and try again.");
        return;
      }

      console.error("Login error:", err);
      
      if (err instanceof TypeError) {
        if (err.message.includes("Failed to fetch")) {
          setServerError("Cannot connect to backend. Please ensure:\n1. Backend server is running on http://localhost:8080\n2. CORS is properly configured on backend");
        } else {
          setServerError("Network error. Check console for details.");
        }
      } else {
        setServerError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fillTestCredentials = () => {
    setValue("email", "admin@gmail.com");
    setValue("password", "Admin@123");
    setServerError(null);
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
      {/* Debug/Test Button */}
      <button 
        onClick={fillTestCredentials}
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          padding: '5px 10px',
          fontSize: '12px',
          zIndex: 1000,
          opacity: 0.7,
          cursor: 'pointer'
        }}
      >
        Fill Admin Credentials
      </button>

      {/* Background Elements */}
      <div className="background-wrapper">
        <div className="bg-grid"></div>
        <div className="bg-dots"></div>
        
        <div className={`blob blob1 ${isMobile ? 'mobile' : ''}`}></div>
        <div className={`blob blob2 ${isMobile ? 'mobile' : ''}`}></div>
        <div className={`blob blob3 ${isMobile ? 'mobile' : ''}`}></div>
        
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
            
            {/* Server error area */}
            {serverError && (
              <div className="server-error">
                <div className="server-error-header">⚠️ Login Error</div>
                <div className="server-error-body">
                  {serverError.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
            )}

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
                  placeholder="admin@gmail.com"
                  className="form-input"
                />
                <div className="input-border"></div>
              </div>
              {errors.email && errors.email.message && (
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
                  placeholder="Enter your password"
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

              {errors.password && errors.password.message && (
                <div className="error-message">
                  <span className="error-icon">⚠</span>
                  {errors.password.message}
                </div>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Remember me</span>
              </label>
              <a href="/forgot-password" className="forgot-link">
                Forgot Password?
              </a>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting || isLoading ? (
                <>
                  <span className="button-spinner"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="button-icon">🚀</span>
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          <footer className="login-footer1">
            <div className="footer-content1">
              <p className="copyright1">
                © 2015-2025 Ananthi Group of Companies
              </p>
              <p className="version1">
                v2.4.2
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}