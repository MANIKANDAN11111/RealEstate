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
      exact: true,
      description: 'Overview and analytics'
    },
    { 
      icon: '➕', 
      label: 'Add Properties', 
      path: '/dashboard/add-properties',
      exact: false,
      description: 'Add new properties'
    },
    { 
      icon: '🏢', 
      label: 'Manage Properties', 
      path: '/dashboard/manage-properties',
      exact: false,
      description: 'Modify existing properties'
    },
    { 
      icon: '📨', 
      label: 'Manage Inquiries', 
      path: '/dashboard/manage-inquiries',
      exact: false,
      description: 'Client inquiries'
    },
    { 
      icon: '👑', 
      label: 'Add Admins', 
      path: '/dashboard/add-admins',
      exact: false,
      description: 'Add new administrators'
    },
    // { 
    //   icon: '📈', 
    //   label: 'Analysis Reports', 
    //   path: '/dashboard/analysis-reports',
    //   exact: false,
    //   description: 'Metrics and reports'
    // }
  ];

  const isActive = (path: string, exact: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    // For non-exact paths, check if current path starts with the menu path
    // but ensure we don't match partial paths incorrectly
    if (path === '/dashboard') {
      // Only match /dashboard exactly or with query params
      return location.pathname === '/dashboard' || 
             location.pathname === '/dashboard/';
    }
    return location.pathname.startsWith(path + '/') || 
           location.pathname === path;
  };

  return (
    <>
      
      <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'} ${isMobile ? 'mobile' : ''}`}>
        {/* Logo Section */}
        <div className="sidebar-logo" >
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
                    className={({ isActive: navIsActive }) => 
                      `menu-item ${navIsActive ? 'active' : ''}`
                    }
                    end={item.exact}
                    onClick={() => isMobile && toggleSidebar()}
                  >
                    <span className="menu-icon">{item.icon}</span>
                    <div className="menu-text">
                      <span className="menu-label">{item.label}</span>
                      {isOpen && (
                        <span className="menu-description">{item.description}</span>
                      )}
                    </div>
                    {isActive(item.path, item.exact) && (
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
          <p className="copyright">© 2015-2024 Ananthi Group</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;