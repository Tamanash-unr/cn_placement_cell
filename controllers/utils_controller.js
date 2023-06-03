const Batch = require('../models/batches');
const Students = require('../models/students');
const Scores = require('../models/courseScores');

module.exports.batches = function(req, res){
    Batch.find({}).then((batchList)=>{
        return res.render('batches',{
            title: "Placement Cell | Batches",
            batchList: batchList
        })
    }).catch((error)=>{
        console.log('Error Retrieving Batches:', error);

        return res.render('batches',{
            title: "Placement Cell | Batches",
            batchList: ''
        })
    });
}

module.exports.createBatch = function(req, res){
    Batch.create({
        batchName: req.body.batch_name,
        startDate: req.body.batch_start_date,
        endDate: req.body.batch_end_date
    }).then(()=>{
        req.flash('success', "Batch Created!");
        return res.redirect('back');
    }).catch((error)=>{
        req.flash('error', "Failed to create Batch!");
        console.log("Failed to create Batch:", error);
        return res.redirect('back');
    });
}

module.exports.deleteBatch = function(req, res){
    Batch.findByIdAndDelete(req.params.id).then(()=>{
        req.flash('success', "Batch Deleted!");
        return res.redirect('back');
    }).catch((error)=>{
        console.log("Failed to delete Batch:", error);
        req.flash('error', "Failed to delete Batch!");
        return res.redirect('back');
    });
}

module.exports.students = async function(req, res){
    try {
        let batchList = await Batch.find({});
        let studentData = await Scores.find({}).populate('student');

        if(studentData){
            return res.render('students',{
                title: "Placement Cell | Students",
                studentData: studentData,
                batchList: batchList
            })
        }
    } catch (error) {
        console.log('Error Retrieving Students:', error);

        return res.render('students',{
            title: "Placement Cell | Students",
            batchList: '',
            studentData: '',
        })
    }
}

module.exports.createStudent = async function(req, res){
    try {
        let newStudent = await Students.create({
                                                name: req.body.student_name,
                                                college: req.body.student_college,
                                                batch: req.body.batch_name
                                            });
        
        await Scores.create({
                                student: newStudent._id,
                                DSA: req.body.dsa_score,
                                Web_Development: req.body.webd_score,
                                React: req.body.react_score
                            });  
                            
        req.flash('success', "Student Created! Scores Updated!");
        return res.redirect('back');
    } catch (error) {
        req.flash('error', "Failed to create Student!");
        console.log("Failed to create Student:", error);
        return res.redirect('back');
    }
}

module.exports.deleteStudent = async function(req, res){
    try {
        await Students.findByIdAndDelete(req.params.student_id);
        await Scores.findByIdAndDelete(req.params.score_id);

        req.flash('success', "Student Deleted!");
        return res.redirect('back');
    } catch (error) {
        console.log("Failed to delete Student:", error);
        req.flash('error', "Failed to delete Student!");
        return res.redirect('back');
    }
}

module.exports.interviews = function(req, res){
    
}