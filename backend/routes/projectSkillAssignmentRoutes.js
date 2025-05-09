

const express = require('express');
const router = express.Router();
const ProjectSkillAssignment = require('../models/ProjectSkillAssignment');
const { assignSkillsToProject } = require('../controllers/projectSkillAssignmentController');

// POST /api/project-skill-assignment
router.post('/', assignSkillsToProject);

// GET /api/project-skill-assignment/assignments/:projectName

router.get('/assignments/:projectName', async (req, res) => {
  const { projectName } = req.params;

  try {
    const assignments = await ProjectSkillAssignment.find({ projectName })
      .populate('projectAdmin', 'name email')  // Populate admin details (name, email)
      .populate('skills.skill', 'name');       // Populate skill name

    if (assignments.length === 0) {
      return res.status(404).json({ error: 'No skills assigned to this project' });
    }

    // Return the list of skill assignments
    res.json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching assigned skills' });
  }
});

router.get('/assignments', async (req, res) => {
    try {
      // Populate the skills array to get skill details along with the competency
      const assignments = await ProjectSkillAssignment.find()
        .populate({
          path: 'skills.skill',
          select: 'name'
        })
        .exec();
  
      res.status(200).json(assignments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch projects and skills' });
    }
  });

module.exports = router;
