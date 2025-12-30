import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../utils/api.jsx';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar.jsx';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [user]);

  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) return;
    
    setLoading(true);
    try {
      const response = await api.put('/users/profile', formData);
      updateUser(response.data.user);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setLoading(true);
    try {
      await api.put('/users/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, dataType = 'profile') => {
    if (dataType === 'profile') {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    }
    
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6"> <FontAwesomeIcon icon="user-circle" className="mr-3 text-blue-600" />My Profile</h1>
        
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4"><FontAwesomeIcon icon="user" className="mr-2 text-blue-600" />Profile Information</h2>
          
          {!isEditing ? (
            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <p className="text-gray-900">{user?.fullName}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Role</label>
                <p className="text-gray-900 capitalize">{user?.role}</p>
              </div>
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>
          ) : (
            <form onSubmit={handleProfileUpdate}>
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange(e, 'profile')}
                error={errors.fullName}
              />
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e, 'profile')}
                error={errors.email}
              />
              
              <div className="flex space-x-3">
                <Button type="submit" loading={loading} icon="save">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  icon="times"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      fullName: user.fullName,
                      email: user.email,
                    });
                    setErrors({});
                  }}
                  
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
        
        {/* Change Password */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4"><FontAwesomeIcon icon="key" className="mr-2 text-blue-600" />Change Password</h2>
          
          <form onSubmit={handlePasswordChange}>
            <Input
              label="Current Password"
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={(e) => handleChange(e, 'password')}
              error={errors.currentPassword}
            />
            
            <Input
              label="New Password"
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={(e) => handleChange(e, 'password')}
              error={errors.newPassword}
            />
            
            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={(e) => handleChange(e, 'password')}
              error={errors.confirmPassword}
            />
            
            <Button type="submit" loading={loading}>
              Change Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
