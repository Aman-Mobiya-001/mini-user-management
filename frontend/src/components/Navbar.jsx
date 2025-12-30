import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl font-bold">
              User Management
            </Link>
            {user && (
              <div className="hidden md:flex space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-200 transition">
                    Admin Dashboard
                  </Link>
                )}
                <Link to="/profile" className="hover:text-blue-200 transition">
                  Profile
                </Link>
              </div>
            )}
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="font-semibold">{user.fullName}</p>
                <p className="text-xs text-blue-200 capitalize">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
