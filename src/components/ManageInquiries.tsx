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
      priority: 'High',
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
      priority: 'Medium',
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
      priority: 'High',
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
      priority: 'Low',
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
      priority: 'Medium',
      notes: 'Scheduled for tomorrow'
    }
  ]);

  const [selectedInquiry, setSelectedInquiry] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesFilter = filter === 'all' || inquiry.status.toLowerCase() === filter;
    const matchesSearch = inquiry.property.toLowerCase().includes(search.toLowerCase()) ||
                         inquiry.client.toLowerCase().includes(search.toLowerCase()) ||
                         inquiry.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateStatus = (id: number, newStatus: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
    ));
  };

  const sendReply = () => {
    if (selectedInquiry && replyText.trim()) {
      alert(`Reply sent to inquiry #${selectedInquiry}: ${replyText}`);
      setReplyText('');
      updateStatus(selectedInquiry, 'Responded');
    }
  };

  return (
    <div className="manage-inquiries">
      <div className="page-header">
        <div className="header-content">
          <h1>Manage Inquiries</h1>
          <p className="subtitle">Handle client inquiries and follow-ups</p>
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
          <div className="stat-card">
            <span className="stat-number">2.4 hrs</span>
            <span className="stat-label">Avg. Response Time</span>
          </div>
        </div>
      </div>

      <div className="inquiries-container">
        <div className="inquiries-sidebar">
          <div className="sidebar-header">
            <h3>All Inquiries</h3>
            <span className="inquiry-count">{filteredInquiries.length} found</span>
          </div>

          <div className="search-filter-section">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search inquiries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-section">
              <label className="filter-label">Filter by Status:</label>
              <div className="filter-chips">
                <button 
                  className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`filter-chip ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
                <button 
                  className={`filter-chip ${filter === 'responded' ? 'active' : ''}`}
                  onClick={() => setFilter('responded')}
                >
                  Responded
                </button>
                <button 
                  className={`filter-chip ${filter === 'follow-up' ? 'active' : ''}`}
                  onClick={() => setFilter('follow-up')}
                >
                  Follow-up
                </button>
                <button 
                  className={`filter-chip ${filter === 'closed' ? 'active' : ''}`}
                  onClick={() => setFilter('closed')}
                >
                  Closed
                </button>
              </div>
            </div>

            <div className="priority-filter">
              <label className="filter-label">Priority:</label>
              <div className="priority-chips">
                <span className="priority-chip high">High</span>
                <span className="priority-chip medium">Medium</span>
                <span className="priority-chip low">Low</span>
              </div>
            </div>
          </div>

          <div className="inquiries-list">
            {filteredInquiries.map((inquiry) => (
              <div 
                key={inquiry.id}
                className={`inquiry-item ${selectedInquiry === inquiry.id ? 'selected' : ''}`}
                onClick={() => setSelectedInquiry(inquiry.id)}
              >
                <div className="inquiry-header">
                  <div className="inquiry-title">
                    <h4>{inquiry.property}</h4>
                    <span className={`priority-badge ${inquiry.priority.toLowerCase()}`}>
                      {inquiry.priority}
                    </span>
                  </div>
                  <span className={`status-badge ${inquiry.status.toLowerCase()}`}>
                    {inquiry.status}
                  </span>
                </div>
                <div className="inquiry-client">
                  <span className="client-icon">👤</span>
                  <span className="client-name">{inquiry.client}</span>
                  <span className="inquiry-type">{inquiry.type}</span>
                </div>
                <div className="inquiry-meta">
                  <span className="date-time">
                    {inquiry.date} • {inquiry.time}
                  </span>
                  <span className="unread-dot"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="inquiry-detail">
          {selectedInquiry ? (
            (() => {
              const inquiry = inquiries.find(i => i.id === selectedInquiry);
              if (!inquiry) return null;
              
              return (
                <>
                  <div className="detail-header">
                    <div className="detail-title">
                      <h2>{inquiry.property}</h2>
                      <div className="inquiry-tags">
                        <span className={`status-tag ${inquiry.status.toLowerCase()}`}>
                          {inquiry.status}
                        </span>
                        <span className={`priority-tag ${inquiry.priority.toLowerCase()}`}>
                          {inquiry.priority} Priority
                        </span>
                        <span className="type-tag">{inquiry.type}</span>
                      </div>
                    </div>
                    <div className="header-actions">
                      <button className="action-btn call-btn">
                        <span className="icon">📞</span>
                        Call
                      </button>
                      <button className="action-btn email-btn">
                        <span className="icon">📧</span>
                        Email
                      </button>
                      <button className="action-btn schedule-btn">
                        <span className="icon">📅</span>
                        Schedule
                      </button>
                    </div>
                  </div>

                  <div className="detail-content">
                    <div className="client-section">
                      <h3>Client Information</h3>
                      <div className="client-info-grid">
                        <div className="info-item">
                          <span className="info-label">Name:</span>
                          <span className="info-value">{inquiry.client}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Email:</span>
                          <span className="info-value">{inquiry.email}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Phone:</span>
                          <span className="info-value">{inquiry.phone}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Inquiry Date:</span>
                          <span className="info-value">{inquiry.date} at {inquiry.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="notes-section">
                      <h3>Notes & Details</h3>
                      <div className="notes-box">
                        <p>{inquiry.notes}</p>
                      </div>
                    </div>

                    <div className="communication-section">
                      <h3>Communication</h3>
                      <div className="chat-history">
                        <div className="message client">
                          <div className="message-header">
                            <span className="sender">{inquiry.client}</span>
                            <span className="time">Today, 10:30 AM</span>
                          </div>
                          <div className="message-content">
                            Hi, I'm interested in viewing the property. When would be a good time?
                          </div>
                        </div>
                        <div className="message admin">
                          <div className="message-header">
                            <span className="sender">Admin (You)</span>
                            <span className="time">Today, 11:15 AM</span>
                          </div>
                          <div className="message-content">
                            We can schedule a viewing for tomorrow at 4 PM. Does that work for you?
                          </div>
                        </div>
                      </div>

                      <div className="reply-section">
                        <textarea
                          className="reply-input"
                          placeholder="Type your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          rows={3}
                        />
                        <div className="reply-actions">
                          <div className="status-update">
                            <label>Update Status:</label>
                            <select 
                              className="status-select"
                              value={inquiry.status}
                              onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Responded">Responded</option>
                              <option value="Follow-up">Follow-up</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </div>
                          <button 
                            className="send-btn"
                            onClick={sendReply}
                            disabled={!replyText.trim()}
                          >
                            <span className="icon">✉️</span>
                            Send Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })()
          ) : (
            <div className="no-selection">
              <div className="empty-state">
                <div className="empty-icon">📨</div>
                <h3>Select an Inquiry</h3>
                <p>Select an inquiry from the list to view details and respond</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="quick-actions-bar">
        <div className="actions-header">
          <h3>Quick Actions</h3>
        </div>
        <div className="actions-grid">
          <button className="quick-action">
            <span className="action-icon">📋</span>
            <span className="action-text">Generate Report</span>
          </button>
          <button className="quick-action">
            <span className="action-icon">📧</span>
            <span className="action-text">Bulk Email</span>
          </button>
          <button className="quick-action">
            <span className="action-icon">📱</span>
            <span className="action-text">SMS Blast</span>
          </button>
          <button className="quick-action">
            <span className="action-icon">📊</span>
            <span className="action-text">Analytics</span>
          </button>
          <button className="quick-action">
            <span className="action-icon">⚙️</span>
            <span className="action-text">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageInquiries;