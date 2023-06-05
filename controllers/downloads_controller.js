const json2csv = require('json2csv').parse;
const fs = require('fs');
const Results = require('../models/results');
const Scores = require('../models/courseScores');

module.exports.downloadCSV = async function(req, res){
    try {
        let data = await Results.find({}).populate('student').populate('company');

        let jsonData = [];
        data.forEach((result) => {
            Scores.findOne({student: result.student._id}).then((score)=>{
                let newJson ={
                    Student_Id: result.student.id,
                    Student_Name: result.student.name,
                    Student_College: result.student.college,
                    Student_Status: result.student.status,
                    DSA_Final_Score: score.DSA,
                    WebD_Final_Score: score.Web_Development,
                    React_Final_Score: score.React,
                    Company: result.company.companyName,
                    Interview_Date: new Date(result.company.interviewDate).toDateString(),
                    Student_Result: result.interviewResult
                }
    
                jsonData.push(newJson);
            });
        });

        let parseData = function(){
            if(jsonData.length != data.length){
                setTimeout(() => {
                    parseData();
                }, 500);

                return;
            }

            const csv = json2csv(jsonData);

            return res.json(200, {
                csv: csv,
                message: "Download Started!"
            });
        }
        
        parseData();
    } catch (error) {
        console.log("Failed to get Download:", error);
        req.flash('error', "Failed to get Download!");
        return res.redirect('back');
    }
}