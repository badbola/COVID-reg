const express = require('express');
const mongoose = require('./api/config/mongoose');
const app = express();
const port= 8000;
const bodyParser = require('body-parser');
const doctorRoute = require('./api/routes/doctors');
const patientRoute = require('./api/routes/patients');
const reportRoute = require('./api/routes/reports');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method=== 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
})

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

app.listen(port, function(err){
    if(err){ console.log(`Error in connectinf ${port} due to ${err} error`);}

    console.log(`Server is running onn port ${port}`);

});