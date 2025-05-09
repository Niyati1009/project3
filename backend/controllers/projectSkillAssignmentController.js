const ProjectSkillAssignment = require('../models/ProjectSkillAssignment');

exports.assignSkillsToProject = async (req, res) => {
  try {
    const { projectName, projectAdminId, skills } = req.body;


    if (!projectName || !projectAdminId || !skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: 'All fields are required and skills should be an array.' });
    }

  
    const assignment = await ProjectSkillAssignment.findOneAndUpdate(
      { projectName, projectAdmin: projectAdminId },
      {
        projectName,
        projectAdmin: projectAdminId,
        skills
      },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json({ message: 'Skills assigned to project successfully', assignment });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while assigning skills' });
  }
};
