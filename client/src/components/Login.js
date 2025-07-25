import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {useDispatch} from 'react-redux';
import { setCredentials} from '../redux/authSlice';

import { useSelector } from 'react-redux';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [touched, setTouched] = useState({ username: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if(token){
      nav('/profile')
    }
  }, [token, nav]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const cleanedValue = name === 'username' ? value.replace(/\s/g, '') : value;

    setForm(prev => ({ ...prev, [name]: cleanedValue }));

    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
  };

  const isValid = form.username.trim() !== '' && form.password !== '';

  const login = async (e) => {
  e.preventDefault();
  if (!isValid) return;
  try {
    const res = await API.post('/auth/login', form);
    console.log('Login success:', res.data);
    dispatch(setCredentials(res.data));
    nav('/profile');
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
    alert('Login failed');
  }
};


  return (
    <>
      <Header />
      <main className="main-container">
        <form onSubmit={login} className="form-container">
          <h2>Login</h2>

          <div className="input-group">
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              autoComplete="off"
              onChange={handleChange}
              required
            />
            {touched.username && !form.username.trim() && (
              <p className="error-msg">Username is required</p>
            )}
          </div>

          <div className="input-group">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {touched.password && !form.password && (
              <p className="error-msg">Password is required</p>
            )}
          </div>

          <button type="submit" disabled={!isValid}>Login</button>

          <div className="btn-group">
            <button type="button" onClick={() => nav('/register')}>Go to Register</button>
            <button type="button" onClick={() => nav('/')}>Back to Home</button>
          </div>
        </form>
      </main>
    </>
  );
}
