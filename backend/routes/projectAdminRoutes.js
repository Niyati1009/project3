// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const ProjectAdmin = require('../models/ProjectAdmin');
// const router = express.Router();

// // Register
// router.post('/register', async (req, res) => {
//   const { name, email, password, projectName } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   try {
//     const newAdmin = new ProjectAdmin({ name, email, password: hashedPassword, projectName });
//     await newAdmin.save();
//     res.status(201).json({ message: 'ProjectAdmin registered' });
//   } catch (err) {
//     res.status(400).json({ error: 'Email already in use' });
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const admin = await ProjectAdmin.findOne({ email });
//   if (!admin) return res.status(401).json({ error: 'Invalid email' });

//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

//   const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
//   res.json({ message: 'Login successful', token });
// });

// module.exports = router;

const express = require('express');
const ProjectAdmin = require('../models/ProjectAdmin');
const Project = require('../models/Project');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ProjectSkillAssignment=require('../models/ProjectSkillAssignment');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, projectName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newAdmin = new ProjectAdmin({ name, email, password: hashedPassword, projectName });
    await newAdmin.save();
    res.status(201).json({ message: 'ProjectAdmin registered' });
  } catch (err) {
    res.status(400).json({ error: 'Email already in use' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await ProjectAdmin.findOne({ email });
  if (!admin) return res.status(401).json({ error: 'Invalid email' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ message: 'Login successful', token });
});

// Fetch all admins
router.get('/all', async (req, res) => {
  try {
    const admins = await ProjectAdmin.find({}, 'name _id');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// Assign Skills to Project
router.post('/assign-skills', async (req, res) => {
    // console.log('Assign Skills endpoint hit!'); 
    // console.log('Request body:', req.body);
    const { projectName, projectAdminName, skills } = req.body;

    try {
      const admin = await ProjectAdmin.findOne({ name: projectAdminName });
      if (!admin) return res.status(404).json({ error: 'Admin not found' });

      const skillEntries = skills.map(s => ({
        skill: s.skillId,
        competency: s.competency
      }));

      const assignment = new ProjectSkillAssignment({
        projectName,
        projectAdmin: admin._id,
        skills: skillEntries
      });

      await assignment.save();

      res.status(200).json({ message: 'Skills assigned to project successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to assign skills' });
    }
});

module.exports = router;
