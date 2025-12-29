import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.reload();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">👥 User Management</a>
        
        {user ? (
          <>
            <div className="navbar-nav ms-auto">
              <span className="navbar-text me-3">
                Hello, {user.fullName || 'User'} ({user.role})
              </span>
              {user.role === 'admin' && (
                <a 
                  className={`nav-link ${location.pathname === '/admin/users' ? 'active' : ''}`}
                  href="/admin/users"
                >
                  👨‍💼 Manage Users
                </a>
              )}
              <button className="btn btn-outline-light ms-2" onClick={logout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="navbar-nav ms-auto">
            <a className="nav-link" href="/login">Login</a>
            <a className="nav-link" href="/signup">Signup</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
