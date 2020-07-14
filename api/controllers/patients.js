const express = require('express');
const mongoose = require('mongoose');
const Patient = require('../models/patients');
const Doctors = require('../models/doctors');
const { db } = require('../models/patients');

//view all patient
exports.viewAll = (req, res, next) => {
    Patient.find()
        .select("status date id doctor")
        .populate('doctor', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        id: doc.id,
                        name: doc.name,
                        status: doc.status,
                        doctor: doc.doctor,
                        request: {
                            type: "GET",
                            url: "http://localhost:8000/patients/" + doc.id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
//view patient profile
exports.profile = (req, res) => {
    Patient.find({ id: req.params.id })
        .exec()
        .then(patient => {
            if (!patient) {
                return res.status(404).json({
                    message: "Patient not found"
                });
            }
            res.status(200).json({
                patient: patient,
                request: {
                    type: "GET",
                    url: "http://localhost:8000/patients"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}
//register the patient
exports.addPatient = (req, res, next) => {

    Patient.find({ id: req.body.id }).
        exec().
        then(patient => {
            if (patient.length >= 1) {
                res.status(200).json({
                    patient: patient,
                    request: {
                        type: "GET",
                        url: "http://localhost:8000/patients/" + patient[0].id
                    }
                });
            } else {
                Doctors.findById(req.body.doctorId)
                    .then(doctor => {
                        if (!doctor) {
                            return res.status(404).json({
                                message: 'No such doctor exists'
                            })
                        }
                        const patient = new Patient({
                            id: req.body.id,
                            name: req.body.name,
                            status: req.body.status,
                            report: req.body.report,
                            date: req.body.date,
                            doctor: req.body.doctorId
                        });
                        return patient.save()
                    })
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "Patient Added",
                            addPatient: {
                                id: result.id,
                                name: result.name,
                                date: result.date
                            },
                            request: {
                                type: 'GET',
                                url: "http://localhost:8000/patients/" + result.id
                            }
                        });
                    }).catch(err => {
                        console.log(err);
                        error: err
                    })

            }
        })
}

//create report in form of an array
exports.createReport = (req, res, next) => {
    Patient.find({ id: req.params.id }).
        exec().
        then(patient => {
            if (patient.length >= 1) {
                Patient.updateOne({ id: patient[0].id }, { $push: {report:req.body.report} })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            message: "Report updated",
                            request: {
                                type: "GET",
                                url: "http://localhost:8000/products/" + patient[0].id
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
            else{
                return res.status(404).json({
                    message: "Patient not found"
                });
            }
        })
}

//filter the search
exports.findby = (req,res,next)=>{
    Patient.find({$or: [{status: req.params.status},{name: req.params.status},{id: req.params.status}]},{date: req.params.status})
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
              res.status(200).json({
                patient: doc,
                request: {
                  type: "GET",
                  url: "http://localhost:8000/patients"
                }
              });
            } else {
              res
                .status(404)
                .json({ message: "No valid entry found for provided ID" });
            }
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
          });
}