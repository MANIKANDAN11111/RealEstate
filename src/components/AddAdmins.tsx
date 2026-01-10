import { useState, useEffect } from 'react';
import './AddAdmins.css';

// Define TypeScript interfaces
interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar: string;
  mobileNumber: string;
  password: string;
}

interface FormData {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  sendInvite: boolean;
}

interface EditFormData {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  status: string;
}

interface Errors {
  name?: string;
  email: string;
  mobileNumber: string;
  password: string;
}

interface ApiMessage {
  type: 'success' | 'error' | '';
  text: string;
}

const AddAdmins = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const [formData, setFormData] = useState<FormData>({ 
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    sendInvite: true
  });

  const [errors, setErrors] = useState<Errors>({
    email: '',
    mobileNumber: '',
    password: ''
  });

  const [apiMessage, setApiMessage] = useState<ApiMessage>({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('add');
  
  // For edit functionality
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<EditFormData>({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    status: 'Active'
  });
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [editErrors, setEditErrors] = useState<{ mobileNumber: string; password: string }>({
    mobileNumber: '',
    password: ''
  });

  // Mobile menu state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Detect device type
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Fetch admins from API
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setFetchError('');
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://realestatebackend-8adg.onrender.com/getalladmin', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'omit'
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText || 'Unknown error'}`);
      }
      
      let data = await response.json();
      
      if (!data) {
        throw new Error('No data received from server');
      }
      
      if (!Array.isArray(data)) {
        if (data.data && Array.isArray(data.data)) {
          data = data.data;
        } else if (data.admins && Array.isArray(data.admins)) {
          data = data.admins;
        } else {
          throw new Error('API response is not an array');
        }
      }
      
      const formattedAdmins: Admin[] = data.map((admin: any, index: number) => ({
        id: admin.id || admin._id || `admin-${index + 1}`,
        name: admin.name || 'Unknown',
        email: admin.email || 'No email',
        role: 'Admin',
        status: admin.status === 'Active' ? 'Active' : (admin.status === 'Inactive' ? 'Inactive' : 'Active'),
        lastActive: 'Recently',
        avatar: admin.name 
          ? admin.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
          : 'AD',
        mobileNumber: admin.mobileNumber || admin.phone || 'Not provided',
        password: admin.password || ''
      }));
      
      setAdmins(formattedAdmins);
      setFetchError('');
      
    } catch (error: any) {
      console.error('Error fetching admins:', error);
      const errorMessage = error.message || 'Failed to fetch admins';
      setFetchError(`Failed to load admins: ${errorMessage}`);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  const validateName = (name: string) => {
    if (!name.trim()) return 'Name is required';
    if (name.trim().length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateMobileNumber = (mobileNumber: string) => {
    if (!mobileNumber) return '';
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNumber)) return 'Please enter a valid 10-digit mobile number';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (apiMessage.text) {
      setApiMessage({ type: '', text: '' });
    }
    
    if (name === 'name') {
      const error = validateName(value);
      setErrors(prev => ({ ...prev, name: error }));
    } else if (name === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (name === 'mobileNumber') {
      setErrors(prev => ({ ...prev, mobileNumber: validateMobileNumber(value) }));
    } else if (name === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    }
  };

  // DELETE ADMIN FUNCTION
  const deleteAdmin = async (email: string) => {
    if (window.confirm(`Are you sure you want to delete admin with email: ${email}?`)) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`https://realestatebackend-8adg.onrender.com/admin/delete?email=${encodeURIComponent(email)}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          // Remove from local state
          setAdmins(prevAdmins => prevAdmins.filter(admin => admin.email !== email));
          alert('Admin deleted successfully!');
          await fetchAdmins(); // Refresh the list
        } else {
          const errorText = await response.text();
          alert(`Failed to delete admin: ${errorText}`);
        }
      } catch (error: any) {
        console.error('Error deleting admin:', error);
        alert(`Error deleting admin: ${error.message}`);
      }
    }
  };

  // EDIT ADMIN FUNCTIONS
  const openEditModal = (admin: Admin) => {
    setEditingAdmin(admin);
    setEditFormData({
      name: admin.name,
      email: admin.email,
      mobileNumber: admin.mobileNumber === "Not provided" || admin.mobileNumber === "0" ? "" : admin.mobileNumber,
      password: '', // Don't show current password for security
      status: admin.status
    });
    setEditErrors({ mobileNumber: '', password: '' });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingAdmin(null);
    setEditFormData({
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
      status: 'Active'
    });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'mobileNumber') {
      setEditErrors(prev => ({ ...prev, mobileNumber: validateMobileNumber(value) }));
    } else if (name === 'password') {
      if (value && value.length < 8) {
        setEditErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters long' }));
      } else {
        setEditErrors(prev => ({ ...prev, password: '' }));
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const mobileNumberError = validateMobileNumber(editFormData.mobileNumber);
    const passwordError = editFormData.password ? (editFormData.password.length < 8 ? 'Password must be at least 8 characters long' : '') : '';
    
    if (mobileNumberError || passwordError) {
      setEditErrors({
        mobileNumber: mobileNumberError,
        password: passwordError
      });
      return;
    }

    if (!editingAdmin) return;

    try {
      setApiLoading(true);
      const token = localStorage.getItem('token');
      
      // Prepare update data
      const updateData: any = {};
      if (editFormData.name !== editingAdmin.name) updateData.name = editFormData.name;
      if (editFormData.mobileNumber !== editingAdmin.mobileNumber) 
        updateData.mobileNumber = editFormData.mobileNumber || "0";
      if (editFormData.password) updateData.password = editFormData.password;
      if (editFormData.status !== editingAdmin.status) updateData.status = editFormData.status;
      
      // If no changes, just close the modal
      if (Object.keys(updateData).length === 0) {
        alert('No changes made');
        closeEditModal();
        return;
      }
      
      const response = await fetch(`https://realestatebackend-8adg.onrender.com/admin/update?email=${encodeURIComponent(editingAdmin.email)}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      const responseText = await response.text();
      
      if (response.ok) {
        alert('Admin updated successfully!');
        await fetchAdmins();
        closeEditModal();
      } else {
        alert(`Failed to update admin: ${responseText}`);
      }
    } catch (error: any) {
      console.error('Error updating admin:', error);
      alert(`Error updating admin: ${error.message}`);
    } finally {
      setApiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const mobileNumberError = validateMobileNumber(formData.mobileNumber);
    const passwordError = validatePassword(formData.password);
    
    if (nameError || emailError || mobileNumberError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        mobileNumber: mobileNumberError,
        password: passwordError
      });
      return;
    }

    const apiData = {
      name: formData.name,
      email: formData.email,
      mobileNumber: formData.mobileNumber || "0",
      password: formData.password
    };

    setApiLoading(true);
    setApiMessage({ type: '', text: '' });

    try {
      const response = await fetch('https://realestatebackend-8adg.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      let data;
      const responseText = await response.text();
      
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        data = { message: responseText };
      }

      const isSuccess = response.ok || 
                        responseText.includes('Success') || 
                        responseText.includes('Registered') ||
                        (data && (data.message && data.message.includes('Success') || 
                                 data.message && data.message.includes('Registered')));

      if (isSuccess) {
        const successMessage = 'Admin added successfully!';
        alert(successMessage);
        setApiMessage({ type: 'success', text: successMessage });
        await fetchAdmins();
        
        setFormData({
          name: '',
          email: '',
          mobileNumber: '',
          password: '',
          sendInvite: true
        });
        setErrors({ email: '', mobileNumber: '', password: '' });
      } else {
        const errorMessage = data.message || data.error || responseText || 'Failed to add admin. Please try again.';
        setApiMessage({ type: 'error', text: errorMessage });
        alert(`Error: ${errorMessage}`);
      }
    } catch (error: any) {
      console.error('Error adding admin:', error);
      
      const errorMessage = error.toString();
      if (errorMessage.includes('Success') || errorMessage.includes('Registered')) {
        const successMessage = 'Admin added successfully! (Network issue occurred)';
        alert(successMessage);
        setApiMessage({ type: 'success', text: successMessage });
        
        await fetchAdmins();
        
        setFormData({
          name: '',
          email: '',
          mobileNumber: '',
          password: '',
          sendInvite: true
        });
        setErrors({ email: '', mobileNumber: '', password: '' });
      } else {
        const networkErrorMessage = 'Network error. Please check your connection and try again.';
        setApiMessage({ type: 'error', text: networkErrorMessage });
        alert(`Error: ${networkErrorMessage}`);
      }
    } finally {
      setApiLoading(false);
    }
  };

  const toggleAdminStatus = async (id: string) => {
    if (window.confirm('Are you sure you want to change this admin\'s status?')) {
      try {
        setAdmins(prevAdmins => prevAdmins.map(admin => 
          admin.id === id 
            ? { ...admin, status: admin.status === 'Active' ? 'Inactive' : 'Active' }
            : admin
        ));
        
        const admin = admins.find(a => a.id === id);
        alert(`Admin ${admin?.name} status changed to ${admin?.status === 'Active' ? 'Inactive' : 'Active'}`);
      } catch (error) {
        console.error('Error updating admin status:', error);
        alert('Failed to update admin status');
      }
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="add-admins">
      {/* Edit Admin Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Admin</h2>
              <button className="modal-close" onClick={closeEditModal}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={editFormData.mobileNumber}
                    onChange={handleEditInputChange}
                    className={`form-input ${editErrors.mobileNumber ? 'error' : ''}`}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    pattern="\d{10}"
                  />
                  {editErrors.mobileNumber && <div className="error-message">{editErrors.mobileNumber}</div>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">New Password (Optional)</label>
                  <input
                    type="password"
                    name="password"
                    value={editFormData.password}
                    onChange={handleEditInputChange}
                    className={`form-input ${editErrors.password ? 'error' : ''}`}
                    placeholder="Leave empty to keep current password"
                  />
                  {editErrors.password && <div className="error-message">{editErrors.password}</div>}
                  <small className="input-hint">Minimum 8 characters. Leave empty to keep current password.</small>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditInputChange}
                    className="form-input"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="cancel-btn" 
                    onClick={closeEditModal}
                    disabled={apiLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={apiLoading}
                  >
                    {apiLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Updating...
                      </>
                    ) : (
                      'Update Admin'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="page-header">
        <div className="header-content">
          <h1>Admin Management</h1>
          <p className="subtitle">Add and manage administrator accounts</p>
        </div>
        
        <div className="header-stats">
          <div className="stat-card large">
            <span className="stat-number">{loading ? '...' : admins.length}</span>
            <span className="stat-label">Total Admins</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {loading ? '...' : admins.filter(a => a.status === 'Active').length}
            </span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {loading ? '...' : admins.filter(a => a.status === 'Inactive').length}
            </span>
            <span className="stat-label">Inactive</span>
          </div>
        </div>
      </div>

      <div className="admin-tabs">
        {/* Mobile Menu Button */}
        <div className="mobile-tab-menu">
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '×' : '☰'}
          </button>
          <span className="mobile-tab-title">
            {activeTab === 'add' ? 'Add New Admin' : 'Manage Admins'}
          </span>
        </div>

        <div className={`tab-buttons ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <button 
            className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('add');
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="tab-icon">➕</span>
            {!isMobile ? 'Add New Admin' : 'Add'}
          </button>
          <button 
            className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('manage');
              setIsMobileMenuOpen(false);
            }}
          >
            <span className="tab-icon">👥</span>
            {!isMobile ? 'Manage Admins' : 'Manage'}
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'add' && (
            <div className="add-admin-form">
              <div className="form-header">
                <h2>Add New Administrator</h2>
                <p className="form-subtitle">Fill in the details to create a new admin account</p>
              </div>

              {apiMessage.text && (
                <div className={`api-message ${apiMessage.type}`}>
                  {apiMessage.text}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="basic-info-section">
                  <h3>Basic Information</h3>
                  <div className="form-grid-simple">
                    <div className="form-group">
                      <label className="form-label">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Enter full name"
                        required
                        disabled={apiLoading}
                      />
                      {errors.name && <div className="error-message">{errors.name}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Email Address <span className="required">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="admin@example.com"
                        required
                        disabled={apiLoading}
                      />
                      {errors.email && <div className="error-message">{errors.email}</div>}
                      <div className="input-hint">Enter valid email address</div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className={`form-input ${errors.mobileNumber ? 'error' : ''}`}
                        placeholder="Enter 10-digit mobile number"
                        maxLength={10}
                        pattern="\d{10}"
                        disabled={apiLoading}
                      />
                      {errors.mobileNumber && <div className="error-message">{errors.mobileNumber}</div>}
                      <div className="input-hint">Optional</div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Password <span className="required">*</span>
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`form-input ${errors.password ? 'error' : ''}`}
                        placeholder="Enter password (min. 8 characters)"
                        required
                        disabled={apiLoading}
                      />
                      {errors.password && <div className="error-message">{errors.password}</div>}
                      <div className="input-hint">Minimum 8 characters required</div>
                    </div>
                  </div>
                </div>

                <div className="form-actions-centered">
                  <button 
                    type="button" 
                    className="cancel-btn" 
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        mobileNumber: '',
                        password: '',
                        sendInvite: true
                      });
                      setErrors({ email: '', mobileNumber: '', password: '' });
                      setApiMessage({ type: '', text: '' });
                    }}
                    disabled={apiLoading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={apiLoading}
                  >
                    {apiLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Adding Admin...
                      </>
                    ) : (
                      'Add Admin'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="manage-admins">
              <div className="manage-header">
                <h2>Admin Accounts</h2>
                <div className="header-actions">
                  <button 
                    className="refresh-btn" 
                    onClick={fetchAdmins} 
                    disabled={loading}
                  >
                    <span className="icon">🔄</span>
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </button>
                </div>
              </div>

              <div className="admins-table-container">
                {loading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading admins...</p>
                  </div>
                ) : fetchError ? (
                  <div className="no-data error">
                    <p className="error-text">{fetchError}</p>
                    <button className="refresh-btn" onClick={fetchAdmins}>
                      Try Again
                    </button>
                  </div>
                ) : admins.length === 0 ? (
                  <div className="no-data">
                    <p>No admin accounts found.</p>
                    <button className="refresh-btn" onClick={fetchAdmins}>
                      Refresh List
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="table-info">
                      <p>Showing {admins.length} admin{admins.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="table-wrapper">
                      <div className="table-responsive">
                        <table className="admins-table">
                          <thead>
                            <tr>
                              <th>ADMIN</th>
                              <th>NAME</th>
                              {!isMobile && <th>ROLE</th>}
                              <th>STATUS</th>
                              <th>EMAIL</th>
                              {!isMobile && <th>MOBILE</th>}
                              <th>ACTIONS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {admins.map((admin) => (
                              <tr key={admin.id}>
                                <td className="admin-cell">
                                  <div className="admin-info">
                                    <div className="admin-avatar">
                                      {admin.avatar}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="admin-name-text">{admin.name}</span>
                                </td>
                                {!isMobile && (
                                  <td>
                                    <span className="role-badge admin-role">
                                      {admin.role}
                                    </span>
                                  </td>
                                )}
                                <td>
                                  <span className={`status-badge ${admin.status.toLowerCase()}`}>
                                    {admin.status}
                                  </span>
                                </td>
                                <td>
                                  <span className="admin-email">{admin.email}</span>
                                </td>
                                {!isMobile && (
                                  <td>
                                    <span className="mobile-number">
                                      {admin.mobileNumber === "0" || admin.mobileNumber === "Not provided" 
                                        ? "Not provided" 
                                        : admin.mobileNumber}
                                    </span>
                                  </td>
                                )}
                                <td>
                                  <div className="action-buttons">
                                    <button 
                                      className="action-btn edit-btn"
                                      onClick={() => openEditModal(admin)}
                                      title="Edit Admin"
                                      aria-label={`Edit ${admin.name}`}
                                    >
                                      ✏️
                                    </button>
                                    <button 
                                      className="action-btn delete-btn"
                                      onClick={() => deleteAdmin(admin.email)}
                                      title="Delete Admin"
                                      aria-label={`Delete ${admin.name}`}
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAdmins;