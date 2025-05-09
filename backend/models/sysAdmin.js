const mongoose = require('mongoose');

const SysAdminSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model('SysAdmin', SysAdminSchema);
