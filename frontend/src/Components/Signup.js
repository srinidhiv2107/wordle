import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { showToast } from './Toast';
import BackButton from './BackButton';
import '../Styles/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.username.length < 7)
      showToast("Username too short, should have at least 7 characters");
    else if(formData.password.length < 7)
      showToast("Password should have at least 7 characters");
    else {
      const res = await axios.post('https://srinidhiv2107-wordle.onrender.com/api/auth/signup', formData);
      if(res.data.message === "email-exists")
        showToast("User already exists");
      else if(res.data.message === "username-exists")
        showToast("Username exists");
      else navigate('/login');
    }
  };

  return (
    <div className="signup-container">
      <Toaster/>
      <BackButton/>
      <h1 className="signup-title">Signup</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
          required
        />
        <button type="submit" className="signup-button">Signup</button>
        <p>Already have an account, <Link className="link" to="/login">signin</Link></p>
      </form>
    </div>
  );
};

export default Signup;
