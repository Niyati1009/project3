import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SystemAdmin from './pages/SystemAdmin';
import ProjectAdmin from './pages/ProjectAdmin';
import ProjectSkillAssignmentForm from './pages/ProjectSkillAssignmentForm';

function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/:type" element={<LoginPage />} />
        <Route path="/signup/:type" element={<SignupPage />} />
        <Route path="/system-admin" element={<SystemAdmin />} />
        <Route path="/project-admin" element={<ProjectAdmin />} />
        <Route path="/assign-project-skills" element={<ProjectSkillAssignmentForm />} /> {/* ✅ New route */}
      </Routes>
    </Router>
  );
}

export default App;
