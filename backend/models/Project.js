const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
});

module.exports = mongoose.model('Project', projectSchema);
