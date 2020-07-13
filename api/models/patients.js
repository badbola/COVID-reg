const mongoose = require('mongoose');
//schema for array reports
const reportSchema = mongoose.Schema({
    day: Number,
    status: String
})
//schema for patient
const patientSchema = mongoose.Schema({
    id: {
        type: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    // note: {
    //     type: String,
    // }
});

module.exports = mongoose.model("Patients", patientSchema);