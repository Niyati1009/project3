const mongoose = require('mongoose');

const ProjectAdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  projectName: String
});

module.exports = mongoose.model('ProjectAdmin', ProjectAdminSchema);
