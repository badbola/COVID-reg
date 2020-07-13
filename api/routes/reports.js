const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Patient = require('../models/patients');
const Doctors = require('../models/doctors');
const auth_check = require('../middleware/auth-check');
const patientController = require('../controllers/patients');


router.get('/:status',auth_check,patientController.findby);

module.exports = router;