const express = require('express');
const Skill = require('../models/Skill');
const router = express.Router();

// POST /api/sysadmin/skills
router.post('/skills', async (req, res) => {
  const { name, competencies } = req.body;

  try {
    const newSkill = new Skill({ name, competencies });
    await newSkill.save();
    res.status(201).json({ message: 'Skill added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

module.exports = router;
