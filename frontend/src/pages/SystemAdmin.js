import React, { useState } from 'react';
import axios from 'axios';
function SystemAdminPage() {
  const [skillName, setSkillName] = useState('');
  const [competencies, setCompetencies] = useState('');
  
  const handleAddSkill = async () => {
    const competencyList = competencies.split(',').map(item => item.trim());
    try {
      const res = await axios.post('http://localhost:5000/api/sysadmin/skills', {
        name: skillName,
        competencies: competencyList,
      });
      alert(res.data.message);
    } catch (err) {
      alert('Error adding skill');
    }
  };

  return (
    <div>
      <h2>Add Universal Skill</h2>
      <input
        type="text"
        placeholder="Skill Name"
        onChange={e => setSkillName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Competencies (comma separated)"
        onChange={e => setCompetencies(e.target.value)}
      />
      <br />
      <button onClick={handleAddSkill}>Add Skill</button>
    </div>
  );
}

export default SystemAdminPage;
