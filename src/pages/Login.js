import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/Login.css';
import { FaEnvelope, FaLock, FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // <-- import Link

const Login = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }
    if (email === 'test@example.com' && password === 'password') {
      toast.success(`Welcome, ${email}! (Remember me: ${remember})`);
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } else {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className="row g-0 login-wrapper">
      <div className="col-md-6 d-none d-md-block login-image"></div>

      <div className="col-md-6 bg-white p-5 d-flex flex-column justify-content-center position-relative">
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={onClose}
        ></button>

        <h3 className="fw-bold mb-1">
          Welcome back <span role="img" aria-label="wave">👋</span>
        </h3>
        <p className="text-muted mb-4">Sign in to RME Salon</p>

        <form onSubmit={handleLogin}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-light border-0">
              <FaEnvelope />
            </span>
            <input
              type="email"
              className="form-control border-0 bg-light"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text bg-light border-0">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control border-0 bg-light"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="form-check-label small">
                Keep me signed in
              </label>
            </div>
            <Link to="/forgot-password" className="small text-decoration-none">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn w-100 login-btn">Log In</button>
        </form>

        <div className="text-center my-4">
          <small className="text-muted">OR CONTINUE WITH</small>
          <div className="d-flex justify-content-center gap-3 mt-2">
            <button className="btn btn-outline-dark rounded-circle"><FaGoogle /></button>
            <button className="btn btn-outline-dark rounded-circle"><FaFacebookF /></button>
            <button className="btn btn-outline-dark rounded-circle"><FaTwitter /></button>
          </div>
        </div>

        <p className="text-center small">
          New to RME Salon?{' '}
          <Link to="/register" className="fw-bold text-decoration-none">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
