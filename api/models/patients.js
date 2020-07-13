const mongoose = require('mongoose');
const reportSchema = mongoose.Schema({
    day: Number,
    status: String
})
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
    // day:{
    //     type: String,
    //     required: true
    // },
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