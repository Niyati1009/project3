
const mongoose = require('mongoose');

const ProjectSkillAssignmentSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  projectAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectAdmin',
    required: true
  },
  skills: [
    {
      skill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
      },
      competency: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Expert'],
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('ProjectSkillAssignment', ProjectSkillAssignmentSchema);
