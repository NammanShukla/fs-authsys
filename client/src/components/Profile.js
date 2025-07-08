import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 

import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Profile() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    API.get('/auth/user')
      .then(res => setUser(res.data.user))
      .catch(() => {
        dispatch(logout());
        alert('Session expired. Please log in again.');
        nav('/login'); 
      });
  }, [dispatch, nav]);

  const handleLogout = () => {
    dispatch(logout());
    nav('/login');
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);

    try {
      const res = await API.post('/profile/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(prev => ({ ...prev, avatar: res.data.avatar }));
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed');
    }
  };

  return user && (
    <>
      <Header />
      <main className="main-container">
        <div className="home-container">
          <h2>Hi, {user.username}!</h2>

          <div className="avatar-section">
            <img
              src={
                user.avatar
                  ? `http://localhost:5000/uploads/${user.avatar}`
                  : 'https://via.placeholder.com/150'
              }
              alt="Profile"
              width={150}
              style={{ borderRadius: '50%', marginBottom: '1rem' }}
            />
            <input type="file" accept="image/*" onChange={handleUpload} />
          </div>

          <button onClick={handleLogout}>Logout</button>
        </div>
      </main>
    </>
  );
}
