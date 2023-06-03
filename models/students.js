const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'Not Placed'
    }
},{
    timestamps: true
});

const Student = mongoose.model('Students', studentSchema);

module.exports = Student;