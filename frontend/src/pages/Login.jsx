import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import Alert from '../components/Alert.jsx';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage(null);
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      
      setErrors({});
      toast.success('Login successful!', {
        duration: 3000,
        icon: '✅'
      });
      
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      const errorReason = error.response?.data?.reason;
      
      switch (errorReason) {
        case 'ACCOUNT_DEACTIVATED':
          setAlertMessage({
            type: 'error',
            message: errorMessage,
            icon: 'ban'
          });
          break;
          
        case 'WRONG_PASSWORD':
          setErrors(prevErrors => ({
            ...prevErrors,
            password: 'Your password is wrong. Please try again.'
          }));
          break;
          
        case 'EMAIL_NOT_FOUND':
          setErrors(prevErrors => ({
            ...prevErrors,
            email: 'This email is not registered'
          }));
          break;
          
        case 'MISSING_CREDENTIALS':
          setAlertMessage({
            type: 'warning',
            message: '⚠️ Please enter both email and password.',
            icon: 'exclamation-triangle'
          });
          break;
          
        default:
          setAlertMessage({
            type: 'error',
            message: errorMessage,
            icon: 'times-circle'
          });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <FontAwesomeIcon icon="user-circle" className="text-white text-3xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        {alertMessage && (
          <Alert
            type={alertMessage.type}
            message={alertMessage.message}
            icon={alertMessage.icon}
            onClose={() => setAlertMessage(null)}
          />
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email with icon */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              <FontAwesomeIcon icon="envelope" className="mr-2 text-blue-600" />
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon="envelope" className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-red-500 bg-red-50 focus:ring-red-300' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <div className="mt-2 flex items-center text-red-600">
                <FontAwesomeIcon icon="exclamation-triangle" className="mr-2" />
                <span className="text-sm font-medium">{errors.email}</span>
              </div>
            )}
          </div>
          
          {/* Password with icon and toggle */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              <FontAwesomeIcon icon="lock" className="mr-2 text-blue-600" />
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon="lock" className="text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                  errors.password 
                    ? 'border-red-500 bg-red-50 focus:ring-red-300' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={showPassword ? 'eye-slash' : 'eye'} />
              </button>
            </div>
            {errors.password && (
              <div className="mt-2 flex items-center text-red-600">
                <FontAwesomeIcon icon="exclamation-triangle" className="mr-2" />
                <span className="text-sm font-medium">{errors.password}</span>
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon="circle" className="animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon="sign-in-alt" className="mr-2" />
                Sign In
              </>
            )}
          </Button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center">
            <FontAwesomeIcon icon="user-plus" className="mr-1" />
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
