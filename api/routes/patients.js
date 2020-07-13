const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Patient = require('../models/patients');
const Doctors = require('../models/doctors');
const auth_check = require('../middleware/auth-check');
const patientController = require('../controllers/patients');

router.get("/",auth_check,patientController.viewAll );
router.get('/:id/all_reports',auth_check, patientController.profile);
router.post('/register',auth_check, patientController.addPatient);
router.post('/:id/create_report',auth_check,patientController.createReport);

module.exports = router;