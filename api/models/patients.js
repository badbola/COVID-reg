const mongoose = require('mongoose');
//schema for array reports
const reportSchema = mongoose.Schema({
    day: Number,
    date: Date,
    status: String
})
//schema for patient
const patientSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    report: [reportSchema],
    date:{
        type: Date,
        required: true
    },
    doctor: {
        type: String,
        ref: 'Doctors',
        required: true
    },
    // note: {
    //     type: String,
    // }
});

module.exports = mongoose.model("Patients", patientSchema);