import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, isMobile, toggleSidebar }: SidebarProps) => {
  const location = useLocation();

  // Only the exact features requested
  const menuItems = [
    { 
      icon: '📊', 
      label: 'Dashboard', 
      path: '/dashboard',
      description: 'Overview and analytics'
    },
    { 
      icon: '➕', 
      label: 'Add Properties', 
      path: '/dashboard/add-properties',
      description: 'Add new properties'
    },
    { 
      icon: '🏢', 
      label: 'Manage Properties', 
      path: '/dashboard/manage-properties',
      description: 'Modify existing properties'
    },
    { 
      icon: '📨', 
      label: 'Manage Inquiries', 
      path: '/dashboard/manage-inquiries',
      description: 'Client inquiries'
    },
    { 
      icon: '👑', 
      label: 'Add Admins', 
      path: '/dashboard/add-admins',
      description: 'Add new administrators'
    },
    { 
      icon: '📈', 
      label: 'Analysis Reports', 
      path: '/dashboard/analysis-reports',
      description: 'Metrics and reports'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'} ${isMobile ? 'mobile' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-logo" onClick={toggleSidebar}>
          <div className="logo-icon">
            <div className="logo-inner">A</div>
          </div>
          <div className="logo-text">
            <h2>ANANTHI</h2>
            <span>GROUP</span>
          </div>
          {isMobile && (
            <button className="close-btn" onClick={toggleSidebar}>
              ✕
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <div className="menu-section">
            <span className="section-label">ADMIN PANEL</span>
            <ul className="menu-list">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={() => isMobile && toggleSidebar()}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <div className="menu-text">
                      <span className="menu-label">{item.label}</span>
                      {isOpen && (
                        <span className="menu-description">{item.description}</span>
                      )}
                    </div>
                    {isActive(item.path) && (
                      <span className="active-indicator"></span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer Section */}
        <div className="sidebar-footer">         
          </div>
          <p className="copyright">© 2015-2024 Ananthi Group</p>

      </aside>
    </>
  );
};

export default Sidebar;