const express = require('express');
const mongoose = require('mongoose');
const Doctors = require('../models/doctors');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth_check = require('../middleware/auth-check');
const doctorController = require('../controllers/doctors');


router.get('/:doctorId',auth_check,doctorController.doctor_profile);
router.post('/signup',doctorController.register);
router.post('/signin', doctorController.login);
router.get('/',auth_check, doctorController.listAll);

module.exports = router;