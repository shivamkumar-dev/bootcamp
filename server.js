require('dotenv').config();
const path = require('path');
const express = require('express');
const fileupload = require('express-fileupload');
const app = express();
const errorHandler = require('./middleware/error');
// DB connection
const connectDB = require('./config/db');
connectDB();

// routes
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

// fileupload
app.use(fileupload());

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// mount routes & other middlewares
app.use(express.json());
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
