import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Choose Login Type</h1>
      <button onClick={() => navigate('/login/sysadmin')}>System Admin</button>
      <button onClick={() => navigate('/login/projectadmin')}>Project Admin</button>
    </div>
  );
}

export default Home;
