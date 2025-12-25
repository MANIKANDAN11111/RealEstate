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

  /* =======================
     FETCH API DATA
  ======================= */
  useEffect(() => {
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
            property: item.propertyTitle,
            client: item.name,
            email: item.email,
            phone: item.phoneNumber,
            date: dateObj.toISOString().split('T')[0],
            time: dateObj.toTimeString().slice(0, 5),
            status: (item.status as Inquiry['status']) || 'Pending',
            type: 'Property Inquiry',
            notes: item.message
          };
        });

        setInquiries(mapped);
      })
      .catch((error) => {
        console.error(error);
        alert('Unable to load inquiries');
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
     UPDATE STATUS (UI ONLY)
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

    // update UI only after backend success
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

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="manage-inquiries">

      {/* HEADER */}
      <div className="page-header">
        <div className="header-content">
          <h1>Manage Inquiries</h1>
          <h3 className="subtitle">Handle client inquiries and follow-ups</h3>
        </div>

        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{totalCount}</span>
            <span className="stat-label">Total Inquiries</span>
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
            {['all', 'pending', 'responded', 'closed'].map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`filter-chip ${filter === opt ? 'active' : ''}`}
              >
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* TABLE */}
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
                  <td className="property-name">{inquiry.property}</td>
                  <td className="client-name">{inquiry.client}</td>

                  <td>
                    <div className="contact-info">
                      <div>{inquiry.email}</div>
                      <div>{inquiry.phone}</div>
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

                  <td className="notes-text">{inquiry.notes}</td>
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
