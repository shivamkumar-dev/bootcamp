require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const fileupload = require('express-fileupload');
const app = express();
const errorHandler = require('./middleware/error');
// DB connection
const connectDB = require('./config/db');
connectDB();

// router
const router = require('./routes');

// Fileupload
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});

app.use(limiter);

// prevent http param pollution
app.use(hpp());

// Enable Cors
app.use(cors());

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

// mount routes & other middlewares
app.use(express.json());
app.use(cookieParser());
app.use('/', router);
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
