


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const sysAdminRoutes = require('./routes/sysAdminRoutes');
const projectAdminRoutes = require('./routes/projectAdminRoutes');
const projectSkillAssignmentRoutes = require('./routes/projectSkillAssignmentRoutes');

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/sysadmin', sysAdminRoutes);
app.use('/api/projectadmin', projectAdminRoutes);
app.use('/api/project-skill-assignment', projectSkillAssignmentRoutes);

app.use((req, res) => {
  console.log('Unhandled request:', req.method, req.originalUrl);
  res.status(404).send('Route not found');
});


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
})
.catch(err => {
  console.error(' MongoDB connection error:', err);
});
