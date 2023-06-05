const mongoose = require('mongoose');

// Schema for Course Scores
const courseScoreSchema = new mongoose.Schema({
    student:{
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Students'
    },
    DSA:{
        type: Number,
        default: 0
    },
    Web_Development:{
        type: Number,
        default: 0
    },
    React:{
        type: Number,
        default: 0
    }
},{
    timestamps: true
});

const CourseScore = mongoose.model('CourseScores', courseScoreSchema);

module.exports = CourseScore;