import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <div className="text-center mb-5">
          <i className="bi bi-person-circle display-1 text-primary mb-3 d-block"></i>
          <h2 className="fw-bold h1">Welcome Back</h2>
          <p className="text-muted">Enter your details to access your account</p>
        </div>
        
        {error && <div className="alert alert-danger px-4 py-3 rounded-4 mb-4 border-0 shadow-sm">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label fw-bold small text-uppercase">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="name@company.com"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-5">
            <label className="form-label fw-bold small text-uppercase">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100 py-3 shadow">
            Sign In
          </button>
        </form>
        
        <div className="text-center mt-5">
          <p className="text-muted">
            Don't have an account yet? <Link to="/register" className="text-primary fw-bold text-decoration-none">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
