

import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectSkillAssignmentForm = () => {
  const [projectName, setProjectName] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projectadmin/all");
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchSkills();
    fetchAdmins();
  }, []);

  const handleSkillToggle = (skillId) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };
/*
  const handleAssignSkills = async () => {
    if (!projectName || !selectedAdminId) {
      alert("Please enter project name and select an admin.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/projectadmin/assign-skills", {
        projectName,
        projectAdminId: selectedAdminId,
        skills: selectedSkills,
      });

      alert(response.data.message || "Skills assigned successfully!");
      setProjectName("");
      setSelectedSkills([]);
      setSelectedAdminId("");
    } catch (error) {
      console.error("Error assigning skills:", error);
      alert("Failed to assign skills.");
    }
  };
*/

const handleAssignSkills = async () => {
    if (!projectName || !selectedAdminId) {
      alert("Please enter project name and select an admin.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/projectadmin/assign-skills", {
        projectId: projectName, 
        projectAdminId: selectedAdminId,
        skillIds: selectedSkills, // skills array
      });
  
      alert(response.data.message || "Skills assigned successfully!");
      setProjectName("");
      setSelectedSkills([]);
      setSelectedAdminId("");
    } catch (error) {
      console.error("Error assigning skills:", error);
      alert("Failed to assign skills.");
    }
  };
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Assign Skills to Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      />

      <select
        value={selectedAdminId}
        onChange={(e) => setSelectedAdminId(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
      >
        <option value="">Select Project Admin</option>
        {admins.map((admin) => (
          <option key={admin._id} value={admin._id}>
            {admin.name}
          </option>
        ))}
      </select>

      <div className="mb-4">
        <p className="font-semibold mb-2">Select Skills:</p>
        {skills.map((skill) => (
          <label key={skill._id} className="block">
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill._id)}
              onChange={() => handleSkillToggle(skill._id)}
              className="mr-2"
            />
            {skill.name}
          </label>
        ))}
      </div>

      <button
        onClick={handleAssignSkills}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Assign Skills
      </button>
    </div>
  );
};

export default ProjectSkillAssignmentForm;
