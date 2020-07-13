const express = require('express');
//added mongoose databse
const mongoose = require('./api/config/mongoose');
//all express libraries
const app = express();
//assign port
const port= 8000;
// to parse the json body 
const bodyParser = require('body-parser');
//route for the doctors
const doctorRoute = require('./api/routes/doctors');
//route for the patient
const patientRoute = require('./api/routes/patients');
//route for auth
const reportRoute = require('./api/routes/reports');
//extended false so that only fetch JSON files
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// tackling CORS error
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method=== 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
})
//route assign to different page
app.use('/doctors', doctorRoute);
app.use('/patients', patientRoute);
app.use('/reports', reportRoute);


app.use((req,res,next)=>{
    const err = new Error('Uh Oh! Seems like you are lost');
    err.status = 404;
    next(err);
})
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    })
})
//listen port
app.listen(port, function(err){
    if(err){ console.log(`Error in connectinf ${port} due to ${err} error`);}

    console.log(`Server is running onn port ${port}`);

});