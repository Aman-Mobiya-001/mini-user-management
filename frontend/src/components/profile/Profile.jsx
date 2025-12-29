import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { userAPI } from '../../services/api.jsx';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // REFETCH USER DATA
  const fetchUser = async () => {
    try {
      const { data } = await userAPI.getMe();
      setUser(data.data);
      setFormData({
        fullName: data.data.fullName,
        email: data.data.email
      });
    } catch (error) {
      toast.error('Failed to load profile');
      console.error('Profile fetch error:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await userAPI.updateProfile(formData);
      setEditMode(false);  
      fetchUser();         
      window.location.reload();
      toast.success(' Profile updated!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    
    try {
      await userAPI.changePassword({
        currentPassword: e.target.currentPassword.value,
        newPassword: e.target.newPassword.value
      });
      e.target.reset();
      window.location.reload();
      toast.success('Password changed!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Password change failed');
    } finally {
      setPasswordLoading(false);
    }
  };

  // LOADING SCREEN
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        {/* PROFILE CARD */}
        <div className="card shadow mb-4">
          <div className="card-header bg-primary text-white">
            <h5>👤 My Profile</h5>
          </div>
          <div className="card-body">
            {editMode ? (
              /* EDIT FORM */
              <form onSubmit={handleProfileUpdate}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      '💾 Save Changes'
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => {
                      setEditMode(false);
                      fetchUser(); 
                    }}
                  >
                    ❌ Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* VIEW MODE */
              <div className="text-center text-lg-start">
                <div className="row">
                  <div className="col-lg-6">
                    <h5><strong>👤 {user.fullName}</strong></h5>
                    <p className="mb-2"><strong>📧 Email:</strong> {user.email}</p>
                  </div>
                  <div className="col-lg-6">
                    <p className="mb-2">
                      <strong>🎭 Role:</strong> 
                      <span className={`badge ms-2 bg-${user.role === 'admin' ? 'danger' : 'secondary'}`}>
                        {user.role.toUpperCase()}
                      </span>
                    </p>
                    <p className="mb-2">
                      <strong>✅ Status:</strong> 
                      <span className={`badge ms-2 bg-${user.status === 'active' ? 'success' : 'warning'}`}>
                        {user.status.toUpperCase()}
                      </span>
                    </p>
                    <p className="mb-0">
                      <strong>📅 Member Since:</strong> {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
                <button className="btn btn-primary mt-3" onClick={() => setEditMode(true)}>
                  ✏️ Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PASSWORD CARD */}
        <div className="card shadow">
          <div className="card-header bg-success text-white">
            <h6>🔐 Change Password</h6>
          </div>
          <div className="card-body">
            <form onSubmit={handlePasswordChange}>
              <div className="mb-3">
                <label className="form-label fw-bold">Current Password</label>
                <input type="password" name="currentPassword" className="form-control" required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">New Password (6+ chars)</label>
                <input type="password" name="newPassword" className="form-control" required minLength="6" />
              </div>
              <button type="submit" className="btn btn-success w-100" disabled={passwordLoading}>
                {passwordLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Changing...
                  </>
                ) : (
                  '🔄 Change Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
