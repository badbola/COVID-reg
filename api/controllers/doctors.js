const express = require('express');
const mongoose = require('mongoose');
const Doctors = require('../models/doctors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//profile of doctor
exports.doctor_profile = (req,res,next)=>{
    const id = req.params.doctorId;
    Doctors.findById(id)
    .select('name password _id')
    .exec()
    .then(doc => {
        const decoded = jwt.verify(req.headers.authorization, "covid");
        console.log(decoded.doctorId);
        if (id == decoded.doctorId) {
            res.status(200).json({
                doctors: doc
            });
        }else if (id !== decoded.doctorId) {
            res.status(404).json({message: 'This ID does not belogs to you'});
        }else {
            res.status(404).json({message: 'No such doctor Exist'});
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    })
}
//doctor signup
exports.register = (req,res,next)=>{
    Doctors.find({email: req.body.email}).
    exec().
    then(doctor => {
        if(doctor.length>=1){
            return res.status(409).json({
                message: 'Email already exists'
            });
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const doctors = new Doctors({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        name: req.body.name,
                        password: hash
                    });
                    doctors.save().then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Welcome to the COVID-19 register',
                            url: 'http://localhost:8000/doctors/signin'
                        });
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({error: err});
                    })
                }
            })  
        }
    })
    
}

exports.login = (req,res,next)=>{
    Doctors.find({email: req.body.email}).
    exec().
    then(doctor =>{
        if(doctor.length<1){
            return res.status(401).json({
                message: 'Login Failed'
            });
        }
        bcrypt.compare(req.body.password,doctor[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({
                    message: 'Login Failed'
                });
            }
            if(result){
                const token=jwt.sign({
                    email: doctor[0].email,
                    doctorId: doctor[0]._id
                }, "covid",
                {
                    expiresIn: "1h"
                }
                )
                return res.status(200).json({
                    message:'Login Successfull',
                    token: token
                })
            }
            res.status(401).json({
                message: 'Login Failed'
            });

        })
    }).
    catch()
}

exports.listAll = (req,res,next)=>{
    const id = req.params.doctorId;
    Doctors.find()
    .select('_id name')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            doctors: docs.map(doc=>{
                return {
                    name: doc.name,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:8000/doctors/'+doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    })
}