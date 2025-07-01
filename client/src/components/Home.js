import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../App.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="home-container">
          <h2>Welcome Visitor</h2>
          <p>Choose an option to continue:</p>
          <div className="btn-group">
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
          </div>
        </div>
      </main>
    </>
  );
}
