import { useEffect, useState } from 'react';
import './ManageInquiries.css';

/* =======================
   TYPES
======================= */
interface Inquiry {
  id: string;
  property: string;
  client: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  status: 'Pending' | 'Responded' | 'Closed';
  type: string;
  notes: string;
}

interface ApiMessage {
  id: string;
  propertyTitle: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: string;
  dateTime: string;
}

/* =======================
   COMPONENT
======================= */
const ManageInquiries: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  /* =======================
     CHECK SCREEN SIZE
  ======================= */
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  /* =======================
     FETCH API DATA
  ======================= */
  useEffect(() => {
    setLoading(true);
    fetch('https://realestatebackend-8adg.onrender.com/api/messages')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch inquiries');
        }
        return res.json();
      })
      .then((data: ApiMessage[]) => {
        const mapped: Inquiry[] = data.map((item) => {
          const dateObj = new Date(item.dateTime);

          return {
            id: item.id,
            property: item.propertyTitle || 'N/A',
            client: item.name || 'N/A',
            email: item.email || 'N/A',
            phone: item.phoneNumber || 'N/A',
            date: dateObj.toISOString().split('T')[0],
            time: dateObj.toTimeString().slice(0, 5),
            status: (item.status as Inquiry['status']) || 'Pending',
            type: 'Property Inquiry',
            notes: item.message || 'No message'
          };
        });

        setInquiries(mapped);
      })
      .catch((error) => {
        console.error(error);
        alert('Unable to load inquiries');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  /* =======================
     FILTER + SEARCH
  ======================= */
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesFilter =
      filter === 'all' || inquiry.status.toLowerCase() === filter;

    const matchesSearch =
      inquiry.property.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.client.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.type.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  /* =======================
     UPDATE STATUS
  ======================= */
  const updateStatus = async (id: string, newStatus: Inquiry['status']) => {
    try {
      const res = await fetch(
        `https://realestatebackend-8adg.onrender.com/api/messages/${id}/status?status=${newStatus}`,
        {
          method: 'PUT'
        }
      );

      if (!res.ok) {
        throw new Error('Failed to update status');
      }

      // Update UI after backend success
      setInquiries((prev) =>
        prev.map((inq) =>
          inq.id === id ? { ...inq, status: newStatus } : inq
        )
      );
    } catch (error) {
      console.error(error);
      alert('Status update failed');
    }
  };

  const totalCount = inquiries.length;
  const pendingCount = inquiries.filter(i => i.status === 'Pending').length;
  const respondedCount = inquiries.filter(i => i.status === 'Responded').length;
  const closedCount = inquiries.filter(i => i.status === 'Closed').length;

  /* =======================
     TRUNCATE TEXT
  ======================= */
  const truncateText = (text: string, maxLength: number = 30): string => {
    if (!text) return 'N/A';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="manage-inquiries">

      {/* HEADER */}
      <div className="page-header">
        <div className="header-top">
          <div className="header-content">
            <h1>Manage Inquiries</h1>
            <h3 className="subtitle">Handle client inquiries and follow-ups</h3>
          </div>

          <div className={`header-stats ${isMobile ? 'mobile-stats' : ''}`}>
            <div className="stat-card">
              <span className="stat-number">{totalCount}</span>
              <span className="stat-label">Total</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">{pendingCount}</span>
              <span className="stat-label">Pending</span>
            </div>

            <div className="stat-card">
              <span className="stat-number">{respondedCount}</span>
              <span className="stat-label">Responded</span>
            </div>

          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters-section">
        <div className="filters-grid">
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

          <div className="filter-chips">
            <button
              onClick={() => setFilter('all')}
              className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`filter-chip ${filter === 'pending' ? 'active' : ''}`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('responded')}
              className={`filter-chip ${filter === 'responded' ? 'active' : ''}`}
            >
              Responded
            </button>
            <button
              onClick={() => setFilter('closed')}
              className={`filter-chip ${filter === 'closed' ? 'active' : ''}`}
            >
              Closed
            </button>
          </div>
        </div>
      </div>

      {/* TABLE/CARDS */}
      <div className="table-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <div className="loading-text">Loading inquiries...</div>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <div className="empty-title">No inquiries found</div>
            <div className="empty-subtitle">Try adjusting your search or filters</div>
          </div>
        ) : (
          <>
            {/* Mobile/Tablet Cards View */}
            {(isMobile || isTablet) ? (
              <div className="inquiries-cards">
                {filteredInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="inquiry-card">
                    <div className="card-header">
                      <div className="card-title">
                        <h3 className="card-property">{truncateText(inquiry.property, 40)}</h3>
                        <span className="card-client">{truncateText(inquiry.client, 20)}</span>
                      </div>
                      <div className="card-status">
                        <select
                          value={inquiry.status}
                          onChange={(e) =>
                            updateStatus(inquiry.id, e.target.value as Inquiry['status'])
                          }
                          className="status-dropdown"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Responded">Responded</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="card-row">
                        <span className="card-label">Contact:</span>
                        <span className="card-value">
                          <div>{truncateText(inquiry.email, 25)}</div>
                          <div>{inquiry.phone}</div>
                        </span>
                      </div>
                      
                      <div className="card-row">
                        <span className="card-label">Date:</span>
                        <span className="card-value">
                          {inquiry.date} {inquiry.time}
                        </span>
                      </div>
                      
                      <div className="card-row">
                        <span className="card-label">Type:</span>
                        <span className="type-badge">{inquiry.type}</span>
                      </div>
                      
                      <div className="card-row">
                        <span className="card-label">Notes:</span>
                        <span className="card-value notes-text" title={inquiry.notes}>
                          {truncateText(inquiry.notes, 60)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Desktop Table View */
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
                        <td className="property-name" title={inquiry.property}>
                          {truncateText(inquiry.property, 30)}
                        </td>
                        <td className="client-name" title={inquiry.client}>
                          {truncateText(inquiry.client, 20)}
                        </td>

                        <td>
                          <div className="contact-info">
                            <div title={inquiry.email}>{truncateText(inquiry.email, 20)}</div>
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
                            onChange={(e) =>
                              updateStatus(inquiry.id, e.target.value as Inquiry['status'])
                            }
                            className="status-dropdown"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Responded">Responded</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>

                        <td className="notes-text" title={inquiry.notes}>
                          {truncateText(inquiry.notes, 40)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default ManageInquiries;