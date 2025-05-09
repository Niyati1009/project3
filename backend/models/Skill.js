

const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  competencies: [
    {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Expert'],
    }
  ],
});

module.exports = mongoose.model('Skill', skillSchema);
