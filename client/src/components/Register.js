import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ username: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
  const [serverError, setServerError] = useState('');

  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    const cleanedValue = name === 'username' ? value.replace(/\s/g, '') : value;

    setForm(prev => ({ ...prev, [name]: cleanedValue }));

    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }

    validate(name, cleanedValue);
    if (name === 'password') checkStrength(cleanedValue);
  };

  const validate = (name, value) => {
    const newErrors = { ...errors };

    if (name === 'username') {
      if (value.length < 3) {
        newErrors.username = 'Must be at least 3 characters';
      } else if (/^\d/.test(value)) {
        newErrors.username = 'Username should not start with a number';
      } else if (/\s/.test(value)) {
        newErrors.username = 'Username cannot contain spaces';
      } else {
        delete newErrors.username;
      }
    }

    if (name === 'password') {
      if (value.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      } else {
        delete newErrors.password;
      }
    }

    setErrors(newErrors);
  };

  const checkStrength = (value) => {
    if (value.length < 6) return setStrength('');
    const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const medium = /^(?=.*[a-z])(?=.*\d).{6,}$/;

    if (strong.test(value)) setStrength('strong');
    else if (medium.test(value)) setStrength('medium');
    else setStrength('weak');
  };

  const isValid = Object.keys(errors).length === 0 && form.username && form.password;

  const register = async (e) => {
  e.preventDefault();
  if (!isValid) return;
  try {
    await API.post('/auth/register', form);
    nav('/login');
  } catch (err) {
    const message = err.response?.data?.error || 'Registration failed';
    setServerError(message);
  }
};


  return (
    <>
      <Header />
      <main className="main-container">
        <form onSubmit={register} className="form-container">
          <h2>Register</h2>
          <div className="input-group">
            <input
              name="username"
              placeholder="Username"
              autoComplete="off"
              value={form.username}
              onChange={handleChange}
              required
            />
            {touched.username && errors.username && (
              <p className="error-msg">{errors.username}</p>
            )}
            {serverError && <p className="error-msg">{serverError}</p>}

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
            {touched.password && errors.password && (
              <p className="error-msg">{errors.password}</p>
            )}
          </div>

          {form.password.length >= 6 && (
            <div className={`strength-bar ${strength}`}>
              Password Strength: <strong>{strength}</strong>
              <p className="suggestion">
                Use at least 8 characters with uppercase, numbers & symbols.
              </p>
            </div>
          )}

          <button type="submit" disabled={!isValid}>Register</button>

          <div className="btn-group">
            <button type="button" onClick={() => nav('/login')}>Go to Login</button>
            <button type="button" onClick={() => nav('/')}>Back to Home</button>
          </div>
        </form>
      </main>
    </>
  );
}
