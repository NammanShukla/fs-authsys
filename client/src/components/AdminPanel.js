import React, { useEffect, useState } from 'react';
import API from '../api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await API.get('/admin/users');
      setUsers(res.data.users);
    } catch (err) {
      alert('Access Denied or Failed to Load Users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const startEditing = (id, currentRole) => {
    setEditingUserId(id);
    setSelectedRole(currentRole);
    setSuccessMsg('');
  };

  const confirmUpdate = async () => {
    try {
      await API.patch(`/admin/user/${editingUserId}/role`, { role: selectedRole });
      setSuccessMsg("User's role has been updated");
      setEditingUserId(null);
      setSelectedRole('');
      fetchUsers();
    } catch (err) {
      alert('Failed to update role');
    }
  };

  return (
    <div className="main-container">
      <div className="home-container">
        <h2>Admin Panel</h2>

        <div className="admin-panel-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Current Role</th>
                <th>Change Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    {editingUserId === u._id ? (
                      <select
                        className="styled-select"
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    ) : (
                      <button
                        className="confirm-btn"
                        onClick={() => startEditing(u._id, u.role)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                  <td>
                    {editingUserId === u._id && (
                      <button className="confirm-btn" onClick={confirmUpdate}>
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {successMsg && <p className="success-msg">{successMsg}</p>}
      </div>
    </div>
  );
}
