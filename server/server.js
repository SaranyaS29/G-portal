// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');  // Ensure this import path is correct
const protectedRoutes = require('./routes/protectedRoutes');  // If you have this file
const complaintRoutes = require('./routes/complaintRoutes');  // If you have this file

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // For routes like /api/auth/register or /api/auth/signin
app.use('/api', protectedRoutes);  // If you have protected routes
app.use('/api/complaints', complaintRoutes);  // Corrected route for complaints

// Connect DB & Start Server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
