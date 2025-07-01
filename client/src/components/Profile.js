import React, { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Profile() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    API.get('/auth/user')
      .then(res => setUser(res.data.user))
      .catch(() => nav('/'));
  }, []);

  const logout = async () => {
    await API.post('/auth/logout');
    nav('/');
  };

  return user && (
    <>
      <Header />
      <main className="main-container">
        <div className="home-container">
          <h2>Hi, {user.username} 👋</h2>
          <button onClick={logout}>Logout</button>
        </div>
      </main>
    </>
  );
}
