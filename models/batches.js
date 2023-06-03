const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
    batchName:{
        type:  String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    }
},{
    timestamps: true
});

const Batches = mongoose.model('Batches', batchSchema);

module.exports = Batches;