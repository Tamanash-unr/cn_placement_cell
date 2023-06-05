const mongoose = require('mongoose');

// Schema for Interview
const interviewSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    interviewDate:{
        type: Date,
        required: true
    }
},{
    timestamps: true
});

const Interviews = mongoose.model('Interviews', interviewSchema);

module.exports = Interviews;