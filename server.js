require('dotenv').config();
const express = require('express');
const app = express();
// DB connection
const connectDB = require('./config/db');
connectDB();

// routes
const bootcamps = require('./routes/bootcamps');

// mount routes & other middlewares
app.use(express.json());
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
