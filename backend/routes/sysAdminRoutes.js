

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SysAdmin = require('../models/SysAdmin');
const Skill = require('../models/Skill'); // 
const router = express.Router();

// Register SysAdmin
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newAdmin = new SysAdmin({ name, email, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'SysAdmin registered' });
  } catch (err) {
    res.status(400).json({ error: 'Email already in use' });
  }
});

// Login SysAdmin
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await SysAdmin.findOne({ email });
  if (!admin) return res.status(401).json({ error: 'Invalid email' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ message: 'Login successful', token });
});


// GET /api/sysadmin/skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// POST /api/sysadmin/skills
router.post('/skills', async (req, res) => {
  try {
    const { name } = req.body;
    const newSkill = new Skill({ name });
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
});

module.exports = router;
