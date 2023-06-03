const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    student:{
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Students'
    },
    company:{
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Interviews'
    },
    interviewResult:{
        type: String,
        default: "Didn't Attempt"
    }
},{
    timestamps: true
});

const Results = mongoose.model('Results', resultSchema);

module.exports = Results;