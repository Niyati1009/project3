
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/${type}/login`, {
        email,
        password
      });
      
      alert(res.data.message);

  
      if (type === 'sysadmin') {
        navigate('/system-admin');
      } else if (type === 'projectadmin') {
        navigate('/project-admin');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>{type === 'sysadmin' ? 'System Admin' : 'Project Admin'} Login</h2>
      
      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Login</button><br />

     
      <div>
        <p>
          Don't have an account? <Link to={`/signup/${type}`}>{type === 'sysadmin' ? 'System Admin' : 'Project Admin'} Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;

