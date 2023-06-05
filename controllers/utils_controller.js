const Batch = require('../models/batches');
const Students = require('../models/students');
const Scores = require('../models/courseScores');
const Interview = require('../models/interviews');
const Results = require('../models/results');

// Get all existing Batches in DB and Display Batches Page
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

// Create a new Batch
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

// Delete an existing Batch
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

// Get all Students and Batches from DB and Display the Students Page
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

// Create a New Student in DB
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

// Delete an existing Student from the DB
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

// Get all existing interviews from DB and show the Interviews Page
module.exports.interviews = function(req, res){
    Interview.find({}).then((data)=>{
        return res.render('interviews', {
            title: "Placement Cell | Interviews",
            interviewList: data
        })
    })
}

// Schedule a new Interview
module.exports.createInterview = function(req, res){
    Interview.create({
        companyName: req.body.company_name,
        interviewDate: req.body.interview_date
    }).then(()=>{
        req.flash('success', "Interview Created!");
        return res.redirect('back');
    }).catch((error)=>{
        req.flash('error', "Failed to create Interview!");
        console.log("Failed to create Interview:", error);
        return res.redirect('back');
    });
}

// Delete an existing scheduled Interview
module.exports.deleteInterview = function(req, res){
    Interview.findByIdAndDelete(req.params.id).then(()=>{
        req.flash('success', "Interview Deleted!");
        return res.redirect('back');
    }).catch((error)=>{
        console.log("Failed to delete Interview:", error);
        req.flash('error', "Failed to delete Interview!");
        return res.redirect('back');
    });
}

// Get Interview Detail of the given ID and display the detail page
module.exports.interviewDetail = async function(req, res){
    try {
        let interview = await Interview.findById(req.params.id);
        let data = await Results.find({company: req.params.id}).populate('student');

        return res.render('interviewDetail', {
            title: "Placement Cell | Interview Detail",
            data: data,
            interview: interview
        })
    } catch (error) {
        console.log("Failed to get Detail:", error);
        req.flash('error', "Failed to get Detail!");
        return res.redirect('back');
    }
    
}

// Allot a Student to the interview
module.exports.allotStudent = function(req, res){
    Results.create({
        student: req.body.student_id,
        company: req.body.interview_id
    }).then(()=>{
        req.flash('success', "Student Alloted!");
        return res.redirect('back');
    }).catch((error)=>{
        req.flash('error', "Failed to allot Student!");
        console.log("Failed to allot Student:", error);
        return res.redirect('back');
    })
}

// Delete an existing Result of a Student alloted to the Interview
module.exports.deleteResult = function(req, res){
    Results.findByIdAndDelete(req.params.id).then(()=>{
        req.flash('success', "Result Deleted!");
        return res.redirect('back');
    }).catch((error)=>{
        console.log("Failed to delete Result:", error);
        req.flash('error', "Failed to delete Result!");
        return res.redirect('back');
    });
}

// Update the Interview Result and Placement Status of the Student
module.exports.updateResult = function(req, res){
    Students.findById(req.body.student_id).then((data)=>{
        if(req.body.student_result == 'Pass'){
            data.status = 'Placed'
        } else {
            data.status = 'Not Placed'
        }
        
        data.save();
    })

    Results.findOneAndUpdate({
            student: req.body.student_id,
            company: req.body.interview_id
        }, {
            interviewResult: req.body.student_result
    }).then(()=>{
        req.flash('success', "Result Updated!");
        return res.redirect('back');
    }).catch((error)=>{
        console.log("Failed to update Result:", error);
        req.flash('error', "Failed to update Result!");
        return res.redirect('back');
    });
}