import { useState } from 'react';
import './AddAdmins.css';

const AddAdmins = () => {
  const [admins, setAdmins] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@ananthigroup.com',
      role: 'Super Admin',
      status: 'Active',
      lastActive: '2 hours ago',
      permissions: ['All'],
      avatar: 'RK'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@ananthigroup.com',
      role: 'Content Manager',
      status: 'Active',
      lastActive: '1 day ago',
      permissions: ['Properties', 'Content'],
      avatar: 'PS'
    },
    {
      id: 3,
      name: 'Arun Patel',
      email: 'arun@ananthigroup.com',
      role: 'Support Admin',
      status: 'Inactive',
      lastActive: '3 days ago',
      permissions: ['Support', 'Users'],
      avatar: 'AP'
    },
    {
      id: 4,
      name: 'Meera Gupta',
      email: 'meera@ananthigroup.com',
      role: 'Finance Admin',
      status: 'Active',
      lastActive: '5 hours ago',
      permissions: ['Finance', 'Reports'],
      avatar: 'MG'
    },
    {
      id: 5,
      name: 'Sanjay Verma',
      email: 'sanjay@ananthigroup.com',
      role: 'View Only',
      status: 'Pending',
      lastActive: 'Never',
      permissions: ['View Only'],
      avatar: 'SV'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'support',
    department: '',
    permissions: [] as string[],
    sendInvite: true
  });

  const [activeTab, setActiveTab] = useState('add');

  const permissionOptions = [
    { id: 'dashboard', label: 'Dashboard Access' },
    { id: 'properties', label: 'Manage Properties' },
    { id: 'users', label: 'Manage Users' },
    { id: 'finance', label: 'Financial Access' },
    { id: 'reports', label: 'View Reports' },
    { id: 'settings', label: 'System Settings' },
    { id: 'content', label: 'Content Management' },
    { id: 'support', label: 'Customer Support' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionToggle = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate avatar from name
    const avatar = formData.name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    const newAdmin = {
      id: admins.length + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role === 'super' ? 'Super Admin' : 
            formData.role === 'content' ? 'Content Manager' :
            formData.role === 'finance' ? 'Finance Admin' : 'Support Admin',
      status: 'Pending',
      lastActive: 'Never',
      permissions: formData.permissions.map(p => 
        permissionOptions.find(opt => opt.id === p)?.label || p
      ),
      avatar: avatar || 'AD'
    };

    setAdmins([...admins, newAdmin]);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'support',
      department: '',
      permissions: [],
      sendInvite: true
    });
    
    alert('New admin added successfully! Invitation email sent.');
  };

  const toggleAdminStatus = (id: number) => {
    setAdmins(admins.map(admin => 
      admin.id === id 
        ? { ...admin, status: admin.status === 'Active' ? 'Inactive' : 'Active' }
        : admin
    ));
  };

  const deleteAdmin = (id: number) => {
    if (window.confirm('Are you sure you want to remove this admin?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
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
          <p className="subtitle">Add and manage administrator accounts</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{admins.length}</span>
            <span className="stat-label">Total Admins</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{admins.filter(a => a.status === 'Active').length}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{admins.filter(a => a.status === 'Pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">4</span>
            <span className="stat-label">Admin Roles</span>
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
          <button 
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
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'add' && (
            <div className="add-admin-form">
              <div className="form-header">
                <h2>Add New Administrator</h2>
                <p className="form-subtitle">Fill in the details to create a new admin account</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-section">
                    <h3>Basic Information</h3>
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
                        className="form-input"
                        placeholder="admin@ananthigroup.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <div className="phone-input-group">
                        <span className="country-code">+91</span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="Enter 10-digit number"
                          maxLength={10}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>Admin Role & Permissions</h3>
                    <div className="form-group">
                      <label className="form-label">
                        Admin Role <span className="required">*</span>
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="form-select"
                        required
                      >
                        <option value="super">Super Admin</option>
                        <option value="content">Content Manager</option>
                        <option value="finance">Finance Admin</option>
                        <option value="support">Support Admin</option>
                        <option value="custom">Custom Role</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="e.g., Sales, Support, Finance"
                      />
                    </div>

                    <div className="permissions-section">
                      <label className="form-label">Permissions</label>
                      <div className="permissions-grid">
                        {permissionOptions.map((permission) => (
                          <label key={permission.id} className="permission-checkbox">
                            <input
                              type="checkbox"
                              checked={formData.permissions.includes(permission.id)}
                              onChange={() => handlePermissionToggle(permission.id)}
                              className="checkbox-input"
                            />
                            <span className="checkbox-custom"></span>
                            <span className="checkbox-label">{permission.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Invitation Settings</h3>
                  <div className="invitation-settings">
                    <label className="checkbox-label large">
                      <input
                        type="checkbox"
                        name="sendInvite"
                        checked={formData.sendInvite}
                        onChange={(e) => setFormData(prev => ({ ...prev, sendInvite: e.target.checked }))}
                        className="checkbox-input"
                      />
                      <span className="checkbox-custom"></span>
                      <div className="checkbox-content">
                        <span className="checkbox-title">Send invitation email</span>
                        <span className="checkbox-description">
                          Admin will receive an email with login credentials
                        </span>
                      </div>
                    </label>

                    <div className="setting-options">
                      <div className="setting-option">
                        <label className="option-label">Access Expiry</label>
                        <select className="option-select">
                          <option value="never">Never</option>
                          <option value="7">7 Days</option>
                          <option value="30">30 Days</option>
                          <option value="90">90 Days</option>
                        </select>
                      </div>
                      <div className="setting-option">
                        <label className="option-label">Two-Factor Auth</label>
                        <select className="option-select">
                          <option value="optional">Optional</option>
                          <option value="required">Required</option>
                          <option value="disabled">Disabled</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn">Cancel</button>
                  <button type="submit" className="submit-btn">Add Admin & Send Invite</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'manage' && (
            <div className="manage-admins">
              <div className="manage-header">
                <h2>Admin Accounts</h2>
                <div className="header-actions">
                  <button className="export-btn">
                    <span className="icon">📥</span>
                    Export List
                  </button>
                  <button className="bulk-action-btn">
                    <span className="icon">⚡</span>
                    Bulk Actions
                  </button>
                </div>
              </div>

              <div className="admins-table-container">
                <table className="admins-table">
                  <thead>
                    <tr>
                      <th>Admin</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Last Active</th>
                      <th>Permissions</th>
                      <th>Actions</th>
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
                            <div className="admin-details">
                              <span className="admin-name">{admin.name}</span>
                              <span className="admin-email">{admin.email}</span>
                            </div>
                          </div>
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
                          <span className="last-active">{admin.lastActive}</span>
                        </td>
                        <td>
                          <div className="permissions-cell">
                            {admin.permissions.slice(0, 2).map((perm, index) => (
                              <span key={index} className="permission-tag">
                                {perm}
                              </span>
                            ))}
                            {admin.permissions.length > 2 && (
                              <span className="more-permissions">
                                +{admin.permissions.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {admin.status === 'Pending' && (
                              <button 
                                className="action-btn resend-btn"
                                onClick={() => resendInvite(admin.email)}
                                title="Resend Invite"
                              >
                                🔄
                              </button>
                            )}
                            <button 
                              className="action-btn edit-btn"
                              title="Edit Admin"
                            >
                              ✏️
                            </button>
                            <button 
                              className={`action-btn ${admin.status === 'Active' ? 'deactivate-btn' : 'activate-btn'}`}
                              onClick={() => toggleAdminStatus(admin.id)}
                              title={admin.status === 'Active' ? 'Deactivate' : 'Activate'}
                            >
                              {admin.status === 'Active' ? '⏸️' : '▶️'}
                            </button>
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
              </div>

              <div className="recent-activity">
                <h3>Recent Admin Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon success">✓</div>
                    <div className="activity-content">
                      <p>Rajesh Kumar logged in from new device</p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon warning">!</div>
                    <div className="activity-content">
                      <p>Failed login attempt for Priya Sharma</p>
                      <span className="activity-time">4 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon info">i</div>
                    <div className="activity-content">
                      <p>New admin account created for Sanjay Verma</p>
                      <span className="activity-time">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
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
                      <td className="log-admin">Rajesh Kumar</td>
                      <td className="log-action">Login</td>
                      <td className="log-details">Successful login from Chrome</td>
                      <td className="log-ip">192.168.1.100</td>
                      <td><span className="log-status success">Success</span></td>
                    </tr>
                    <tr>
                      <td className="log-time">Today, 11:15</td>
                      <td className="log-admin">Priya Sharma</td>
                      <td className="log-action">Property Added</td>
                      <td className="log-details">Added new property "Luxury Villa"</td>
                      <td className="log-ip">192.168.1.101</td>
                      <td><span className="log-status success">Success</span></td>
                    </tr>
                    <tr>
                      <td className="log-time">Yesterday, 16:45</td>
                      <td className="log-admin">Arun Patel</td>
                      <td className="log-action">User Modified</td>
                      <td className="log-details">Updated user profile details</td>
                      <td className="log-ip">192.168.1.102</td>
                      <td><span className="log-status success">Success</span></td>
                    </tr>
                    <tr>
                      <td className="log-time">2 days ago, 09:30</td>
                      <td className="log-admin">System</td>
                      <td className="log-action">Security Alert</td>
                      <td className="log-details">Multiple failed login attempts</td>
                      <td className="log-ip">203.0.113.5</td>
                      <td><span className="log-status warning">Warning</span></td>
                    </tr>
                    <tr>
                      <td className="log-time">3 days ago, 14:20</td>
                      <td className="log-admin">Meera Gupta</td>
                      <td className="log-action">Report Generated</td>
                      <td className="log-details">Monthly financial report</td>
                      <td className="log-ip">192.168.1.103</td>
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