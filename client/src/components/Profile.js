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

  return user && (
    <>
      <Header />
      <main className="main-container">
        <div className="home-container">
          <h2>Hi, {user.username} !</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </main>
    </>
  );
}
