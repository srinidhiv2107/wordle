import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { showToast } from './Toast';
import BackButton from './BackButton';
import '../Styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('https://srinidhiv2107-wordle.onrender.com/api/auth/login', formData);

    switch(res.data.message) {
      case "invalid-user":
        showToast("User not found"); break;
      case "invalid-password":
        showToast("Wrong password"); break;
      default:
        localStorage.setItem("token", res.data.token);
        navigate("/game");
        break;
    }
  };

  return (
    <div className="login-container">
      <Toaster/>
      <BackButton/>
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="login-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Login</button>
        <p>Don't have an account, <Link className="link" to="/signup">signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
