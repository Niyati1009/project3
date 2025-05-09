import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SignupPage() {
  const { type } = useParams();
  const [name, setName] = useState('');
  const [projectName, setProjectName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    const payload = type === 'projectadmin'
      ? { name, email, password, projectName }
      : { name, email, password };

    try {
      const res = await axios.post(`http://localhost:5000/api/${type}/register`, payload);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>{type === 'sysadmin' ? 'System Admin' : 'Project Admin'} Signup</h2>
        <div>
          <input
            placeholder="Name"
            onChange={e => setName(e.target.value)}
          /><br />
          {type === 'projectadmin' && (
            <div>
              <input
                placeholder="Project Name"
                onChange={e => setProjectName(e.target.value)}
              /><br />
            </div>
          )}
          <input
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          /><br />
          <button onClick={handleSignup}>Sign Up</button><br />
        </div>
      </div>
    </>
  );
}

export default SignupPage;
