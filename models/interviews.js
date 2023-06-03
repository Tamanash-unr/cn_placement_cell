const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    interviewDate:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Interviews = mongoose.model('Interviews', interviewSchema);

module.exports = Interviews;