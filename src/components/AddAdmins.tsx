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

interface Errors {
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

  // Fetch admins from API
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setFetchError('');
      console.log('Fetching admins from API...');
      const token = localStorage.getItem('token');
      
      console.log('Testing connection to:', 'https://realestatebackend-8adg.onrender.com/getalladmin');
      
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
      
      console.log('Response status:', response.status);
      console.log('Response status text:', response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText || 'Unknown error'}`);
      }
      
      let data = await response.json();
      console.log('API Response data:', data);
      
      if (!data) {
        throw new Error('No data received from server');
      }
      
      if (!Array.isArray(data)) {
        console.error('Response is not an array:', data);
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
      
      console.log('Formatted admins:', formattedAdmins);
      setAdmins(formattedAdmins);
      setFetchError('');
      
    } catch (error: any) {
      console.error('Error fetching admins:', error);
      const errorMessage = error.message || 'Failed to fetch admins';
      setFetchError(`Failed to load admins: ${errorMessage}`);
      setAdmins([]);
      
      if (error.name === 'TypeError') {
        console.error('Network error or CORS issue. Details:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validateMobileNumber = (mobileNumber: string) => {
    const mobileRegex = /^\d{10}$/;
    if (mobileNumber && !mobileRegex.test(mobileNumber)) return 'Please enter a valid 10-digit mobile number';
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
    
    if (name === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    } else if (name === 'mobileNumber') {
      setErrors(prev => ({ ...prev, mobileNumber: validateMobileNumber(value) }));
    } else if (name === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(formData.email);
    const mobileNumberError = validateMobileNumber(formData.mobileNumber);
    const passwordError = validatePassword(formData.password);
    
    if (emailError || mobileNumberError || passwordError) {
      setErrors({
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

    console.log('Submitting data:', apiData);

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
      console.log('Raw response:', responseText);
      
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.log('Response is not JSON, treating as text');
        data = { message: responseText };
      }

      console.log('Processed response:', data);

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

  const deleteAdmin = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this admin?')) {
      try {
        setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== id));
        alert('Admin removed successfully!');
      } catch (error) {
        console.error('Error deleting admin:', error);
        alert('Failed to delete admin');
      }
    }
  };

  const resendInvite = (email: string) => {
    alert(`Invitation resent to ${email}`);
  };

  return (
    <div className="add-admins">
      <div className="page-header">
        <div className="header-content">
          <h1>Admin Management</h1>
          <h3 className="subtitle">Add and manage administrator accounts</h3>
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
        <div className="tab-buttons">
          <button 
            className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <span className="tab-icon">➕</span>
            Add New Admin
          </button>
          <button 
            className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <span className="tab-icon">👥</span>
            Manage Admins
          </button>
          {/* <button 
            className={`tab-btn ${activeTab === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveTab('roles')}
          >
            <span className="tab-icon">⚙️</span>
            Roles & Permissions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <span className="tab-icon">📊</span>
            Activity Log
          </button> */}
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
                        className="form-input"
                        placeholder="Enter full name"
                        required
                        disabled={apiLoading}
                      />
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
                      <div className="input-hint">Optional - 10 digits only</div>
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
                  <button className="export-btn" onClick={fetchAdmins} disabled={loading}>
                    <span className="icon">🔄</span>
                    {loading ? 'Refreshing...' : 'Refresh'}
                  </button>
                  {/* <button className="bulk-action-btn">
                    <span className="icon">⚡</span>
                    Bulk Actions
                  </button> */}
                </div>
              </div>

              <div className="admins-table-container">
                {loading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading admins...</p>
                    <p className="loading-hint">Fetching from: https://realestatebackend-8adg.onrender.com/getalladmin</p>
                  </div>
                ) : fetchError ? (
                  <div className="no-data error">
                    <p style={{ color: '#ef4444' }}>{fetchError}</p>
                    <button className="refresh-btn" onClick={fetchAdmins} style={{marginTop: '10px'}}>
                      Try Again
                    </button>
                    <p style={{marginTop: '10px', fontSize: '12px', color: '#666'}}>
                      If this persists, check:
                      <br />1. Your internet connection
                      <br />2. CORS settings on the backend
                      <br />3. API endpoint accessibility
                    </p>
                  </div>
                ) : admins.length === 0 ? (
                  <div className="no-data">
                    <p>No admin accounts found.</p>
                    <button className="refresh-btn" onClick={fetchAdmins} style={{marginTop: '10px'}}>
                      Refresh List
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="table-info">
                      <p>Showing {admins.length} admin(s)</p>
                    </div>
                    <table className="admins-table">
                      <thead>
                        <tr>
                          <th>ADMIN</th>
                          <th>NAME</th>
                          <th>ROLE</th>
                          <th>STATUS</th>
                          <th>EMAIL</th>
                          <th>MOBILE NUMBER</th>
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
                            <td>
                              <span className={`role-badge ${admin.role.toLowerCase().replace(' ', '-')}`}>
                                {admin.role}
                              </span>
                            </td>
                            <td>
                              <span className={`status-badge ${admin.status.toLowerCase()}`}>
                                {admin.status}
                              </span>
                            </td>
                            <td>
                              <span className="admin-email">{admin.email}</span>
                            </td>
                            <td>
                              <span className="mobile-number">
                                {admin.mobileNumber === "0" || admin.mobileNumber === "Not provided" 
                                  ? "Not provided" 
                                  : admin.mobileNumber}
                              </span>
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button 
                                  className="action-btn edit-btn"
                                  title="Edit Admin"
                                >
                                  ✏️
                                </button>
                                {/* <button 
                                  className={`action-btn ${admin.status === 'Active' ? 'deactivate-btn' : 'activate-btn'}`}
                                  onClick={() => toggleAdminStatus(admin.id)}
                                  title={admin.status === 'Active' ? 'Deactivate' : 'Activate'}
                                >
                                  {admin.status === 'Active' ? '⏸️' : '▶️'}
                                </button> */}
                                <button 
                                  className="action-btn delete-btn"
                                  onClick={() => deleteAdmin(admin.id)}
                                  title="Remove Admin"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>

              {/* <div className="recent-activity">
                <h3>Recent Admin Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon success">✓</div>
                    <div className="activity-content">
                      <p>Admin list refreshed</p>
                      <span className="activity-time">Just now</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon info">i</div>
                    <div className="activity-content">
                      <p>Total {admins.length} admin(s) loaded</p>
                      <span className="activity-time">Recently</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="roles-permissions">
              <div className="roles-header">
                <h2>Roles & Permissions</h2>
                <button className="add-role-btn">
                  <span className="icon">➕</span>
                  Add New Role
                </button>
              </div>

              <div className="roles-grid">
                <div className="role-card">
                  <div className="role-header">
                    <h3>Super Admin</h3>
                    <span className="role-users">2 Users</span>
                  </div>
                  <div className="role-description">
                    Full system access with all permissions
                  </div>
                  <div className="role-permissions">
                    <span className="permission-tag">All Permissions</span>
                  </div>
                  <div className="role-actions">
                    <button className="edit-role-btn">Edit Role</button>
                    <button className="manage-users-btn">Manage Users</button>
                  </div>
                </div>

                <div className="role-card">
                  <div className="role-header">
                    <h3>Content Manager</h3>
                    <span className="role-users">1 User</span>
                  </div>
                  <div className="role-description">
                    Manage properties, content, and listings
                  </div>
                  <div className="role-permissions">
                    <span className="permission-tag">Properties</span>
                    <span className="permission-tag">Content</span>
                    <span className="permission-tag">Media</span>
                  </div>
                  <div className="role-actions">
                    <button className="edit-role-btn">Edit Role</button>
                    <button className="manage-users-btn">Manage Users</button>
                  </div>
                </div>

                <div className="role-card">
                  <div className="role-header">
                    <h3>Finance Admin</h3>
                    <span className="role-users">1 User</span>
                  </div>
                  <div className="role-description">
                    Handle financial transactions and reports
                  </div>
                  <div className="role-permissions">
                    <span className="permission-tag">Finance</span>
                    <span className="permission-tag">Reports</span>
                    <span className="permission-tag">Transactions</span>
                  </div>
                  <div className="role-actions">
                    <button className="edit-role-btn">Edit Role</button>
                    <button className="manage-users-btn">Manage Users</button>
                  </div>
                </div>

                <div className="role-card">
                  <div className="role-header">
                    <h3>Support Admin</h3>
                    <span className="role-users">1 User</span>
                  </div>
                  <div className="role-description">
                    Handle customer inquiries and support
                  </div>
                  <div className="role-permissions">
                    <span className="permission-tag">Support</span>
                    <span className="permission-tag">Users</span>
                    <span className="permission-tag">Inquiries</span>
                  </div>
                  <div className="role-actions">
                    <button className="edit-role-btn">Edit Role</button>
                    <button className="manage-users-btn">Manage Users</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="activity-log">
              <div className="log-header">
                <h2>Admin Activity Log</h2>
                <div className="log-filters">
                  <select className="filter-select">
                    <option value="all">All Activities</option>
                    <option value="login">Logins</option>
                    <option value="create">Creations</option>
                    <option value="modify">Modifications</option>
                    <option value="delete">Deletions</option>
                  </select>
                  <input 
                    type="date" 
                    className="date-filter"
                    defaultValue="2024-01-01"
                  />
                  <button className="export-log-btn">
                    <span className="icon">📥</span>
                    Export Log
                  </button>
                </div>
              </div>

              <div className="log-table-container">
                <table className="log-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Admin</th>
                      <th>Action</th>
                      <th>Details</th>
                      <th>IP Address</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="log-time">Today, 14:30</td>
                      <td className="log-admin">Manikandan</td>
                      <td className="log-action">Login</td>
                      <td className="log-details">Successful login from Chrome</td>
                      <td className="log-ip">192.168.1.100</td>
                      <td><span className="log-status success">Success</span></td>
                    </tr>
                    <tr>
                      <td className="log-time">Today, 11:15</td>
                      <td className="log-admin">Sriram</td>
                      <td className="log-action">Property Added</td>
                      <td className="log-details">Added new property "Luxury Villa"</td>
                      <td className="log-ip">192.168.1.101</td>
                      <td><span className="log-status success">Success</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="log-summary">
                <div className="summary-card">
                  <h4>Activity Summary</h4>
                  <div className="summary-stats">
                    <div className="stat-item">
                      <span className="stat-label">Total Activities</span>
                      <span className="stat-value">1,248</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Today's Activities</span>
                      <span className="stat-value">42</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Failed Attempts</span>
                      <span className="stat-value">8</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Avg. Daily</span>
                      <span className="stat-value">56</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAdmins;