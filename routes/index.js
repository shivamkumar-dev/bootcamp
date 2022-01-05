const express = require('express');

const bootcamps = require('./bootcamps');
const courses = require('./courses');
const auth = require('./auth');
const users = require('./users');

const router = express.Router();

router.use('/api/v1/bootcamps', bootcamps);
router.use('/api/v1/courses', courses);
router.use('/api/v1/auth', auth);
router.use('/api/v1/users', users);

module.exports = router;
