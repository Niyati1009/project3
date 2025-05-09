

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProjectAdminPage() {
  const [projectName, setProjectName] = useState('');
  const [projectAdminName, setProjectAdminName] = useState('');
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/sysadmin/skills');
        setSkills(res.data.skills || res.data);
      } catch (err) {
        alert('Error fetching skills');
      }
    };

    fetchSkills();
  }, []);

  const handleSkillChange = (skillId, skillName, competency) => {
    setSelectedSkills((prev) => {
      const existing = prev.find(s => s.skillId === skillId);
      if (existing) {
        return prev.map(s =>
          s.skillId === skillId ? { ...s, competency } : s
        );
      } else {
        return [...prev, { skillId, skillName, competency }];
      }
    });
  };

  const handleAssignSkills = async () => {
    if (!projectName || !projectAdminName) {
      alert("Please enter both project name and admin name.");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/projectadmin/assign-skills', {
        projectName,
        projectAdminName,
        skills: selectedSkills
      });
      alert(res.data.message || 'Skills assigned successfully');
    } catch (err) {
      alert('Error assigning skills');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Assign Skills to Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={e => setProjectName(e.target.value)}
        style={{ margin: '10px 0', width: '100%' }}
      />

      <input
        type="text"
        placeholder="Project Admin Name"
        value={projectAdminName}
        onChange={e => setProjectAdminName(e.target.value)}
        style={{ marginBottom: '20px', width: '100%' }}
      />

      {skills.map(skill => (
        <div key={skill._id} style={{ marginBottom: '10px' }}>
          <label>{skill.name}:</label>
          <select
            onChange={e => handleSkillChange(skill._id, skill.name, e.target.value)}
            defaultValue=""
          >
            <option value="">Select Competency</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      ))}

      <button onClick={handleAssignSkills} style={{ marginTop: '20px' }}>
        Assign Skills to Project
      </button>
    </div>
  );
}

export default ProjectAdminPage;
