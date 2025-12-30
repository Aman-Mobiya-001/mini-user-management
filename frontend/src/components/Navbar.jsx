import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../context/AuthContext';
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
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-xl font-bold flex items-center hover:text-blue-200 transition">
              <FontAwesomeIcon icon="shield-alt" className="mr-2 text-2xl" />
              User Management
            </Link>
            {user && (
              <div className="hidden md:flex space-x-4">
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="flex items-center hover:text-blue-200 transition px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon="users" className="mr-2" />
                    Admin Dashboard
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className="flex items-center hover:text-blue-200 transition px-3 py-2 rounded-lg hover:bg-blue-700"
                >
                  <FontAwesomeIcon icon="user-circle" className="mr-2" />
                  Profile
                </Link>
              </div>
            )}
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right bg-blue-700 px-4 py-2 rounded-lg">
                <div className="flex items-center">
                  <FontAwesomeIcon icon="user" className="mr-2" />
                  <p className="font-semibold">{user.fullName}</p>
                </div>
                <div className="flex items-center text-xs text-blue-200 mt-1">
                  <FontAwesomeIcon icon={user.role === 'admin' ? 'user-shield' : 'user'} className="mr-1" />
                  <p className="capitalize">{user.role}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition flex items-center shadow-lg hover:shadow-xl"
              >
                <FontAwesomeIcon icon="sign-out-alt" className="mr-2" />
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
