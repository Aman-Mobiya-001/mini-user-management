import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { userAPI } from '../../services/api.jsx';
import Pagination from 'react-bootstrap/Pagination';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const { data } = await userAPI.getAllUsers(page);
      setUsers(data.data);
      setCurrentPage(data.page);
      setTotalPages(data.pages);
      setTotalUsers(data.total);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusChange = async (userId, currentStatus) => {
    if (!window.confirm(`Activate this ${currentStatus === 'active' ? 'inactive' : 'active'}?`)) return;

    try {
      await userAPI.updateUserStatus(userId, currentStatus === 'active' ? 'inactive' : 'active');
      toast.success('User status updated');
      window.location.reload();
      fetchUsers(currentPage);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handlePageChange = (page) => {
    fetchUsers(page);
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" /></div>;

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item 
        key={number} 
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>👨‍💼 User Management</h3>
        <span className="badge bg-secondary">{totalUsers} total users</span>
      </div>

      <div className="card shadow">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th>Email</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.fullName}</td>
                  <td>
                    <span className={`badge bg-${user.role === 'admin' ? 'danger' : 'secondary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${user.status === 'active' ? 'success' : 'warning'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${user.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => handleStatusChange(user._id, user.status)}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="card-footer">
            <Pagination size="sm">{paginationItems}</Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
