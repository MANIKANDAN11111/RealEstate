import { useState } from 'react';
import './ManageInquiries.css';

const ManageInquiries = () => {
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      property: 'Luxury 3 BHK in Bandra',
      client: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      phone: '+91 98765 43210',
      date: '2024-01-15',
      time: '14:30',
      status: 'Pending',
      type: 'Property Viewing',
      notes: 'Interested in weekend viewing'
    },
    {
      id: 2,
      property: 'Office Space in BKC',
      client: 'Priya Sharma',
      email: 'priya@company.com',
      phone: '+91 87654 32109',
      date: '2024-01-14',
      time: '11:15',
      status: 'Responded',
      type: 'Price Inquiry',
      notes: 'Requested price negotiation'
    },
    {
      id: 3,
      property: 'Modern Villa in Whitefield',
      client: 'Arun Patel',
      email: 'arun@business.com',
      phone: '+91 76543 21098',
      date: '2024-01-13',
      time: '09:45',
      status: 'Follow-up',
      type: 'Documentation',

      notes: 'Documents pending verification'
    },
    {
      id: 4,
      property: 'Retail Shop in CP',
      client: 'Meera Gupta',
      email: 'meera@retail.com',
      phone: '+91 65432 10987',
      date: '2024-01-12',
      time: '16:20',
      status: 'Closed',
      type: 'Rental Inquiry',
     
      notes: 'Deal closed successfully'
    },
    {
      id: 5,
      property: '2 BHK in Hi-Tech City',
      client: 'Sanjay Verma',
      email: 'sanjay@tech.com',
      phone: '+91 54321 09876',
      date: '2024-01-11',
      time: '13:10',
      status: 'Pending',
      type: 'Virtual Tour',
    
      notes: 'Scheduled for tomorrow'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesFilter = filter === 'all' || inquiry.status.toLowerCase() === filter;
    const matchesSearch = inquiry.property.toLowerCase().includes(search.toLowerCase()) ||
                         inquiry.client.toLowerCase().includes(search.toLowerCase()) ||
                         inquiry.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateStatus = (id, newStatus) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
    ));
  };

  return (
    <div className="manage-inquiries">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Manage Inquiries</h1>
          <h3 className="subtitle">Handle client inquiries and follow-ups</h3>
        </div>
        
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{inquiries.length}</span>
            <span className="stat-label">Total Inquiries</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{inquiries.filter(i => i.status === 'Pending').length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{inquiries.filter(i => i.status === 'Responded').length}</span>
            <span className="stat-label">Responded</span>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-grid">
          {/* Search Box */}
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search inquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filter Chips */}
          <div className="filter-chips">
            {['all', 'pending', 'responded', 'closed'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`filter-chip ${filter === filterOption ? 'active' : ''}`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <div className="table-scroll">
          <table className="inquiries-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Client</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>
                    <div className="property-name">{inquiry.property}</div>
                  </td>
                  <td>
                    <div className="client-name">{inquiry.client}</div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="contact-email">{inquiry.email}</div>
                      <div className="contact-phone">{inquiry.phone}</div>
                    </div>
                  </td>
                  <td>
                    <span className="type-badge">{inquiry.type}</span>
                  </td>
          
                  <td>
                    <div className="datetime-info">
                      <div>{inquiry.date}</div>
                      <div className="datetime-time">{inquiry.time}</div>
                    </div>
                  </td>
                  <td>
                    <select
                      value={inquiry.status}
                      onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                      className="status-dropdown"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Responded">Responded</option>
            
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td>
                    <div className="notes-text">{inquiry.notes}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredInquiries.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <div className="empty-title">No inquiries found</div>
            <div className="empty-subtitle">Try adjusting your search or filters</div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default ManageInquiries;