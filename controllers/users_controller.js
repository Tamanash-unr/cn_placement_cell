const User = require('../models/user');
const CryptoJS = require('crypto-js');

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        req.flash('warning', "Already Logged In!");
        return res.redirect('/');
    }    
    
    return res.render('user_SignIn', {
        title: "Placement Cell | Sign In"
    })
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        req.flash('warning', "Already Logged In!");
    }

    return res.render('user_SignUp', {
        title: "Placement Cell | Sign Up"
    })
}

module.exports.createUser = function(req, res){
    if(req.body.password != req.body.confirmPassword){
        console.log(req.body)
        console.log("Passwords do not Match - Redirecting..")
        req.flash('error', "Passwords do not Match!")
        return res.redirect('back');
    }

    console.log("Searching for User..")

    User.findOne({email: req.body.email}).then((user)=>{
        if(!user){
            User.create({
                email: req.body.email,
                password: CryptoJS.MD5(req.body.password).toString(),
                name: req.body.name,
            }).then((user)=>{
                if(user){
                    console.log("User Created :", user);
                    req.flash('success', "User Created! You can now Sign In");

                    return res.redirect('/users/sign-in');
                } else {
                    return res.redirect('back');
                }
            }).catch((err)=>{
                if(err){
                    req.flash('error', err)
                    console.log("Error in Creating User on Sign Up :", err);
                }
            })
        } else {
            req.flash('error', "User Already Exists!")
            return res.redirect('back');
        }
    }).catch((err)=>{
        if(err){
            req.flash('error', err)
            console.log("Error Occured on Signing Up :", err);
        }
    })
}

module.exports.createUserSession = function(req, res){
    req.flash('success', 'Logged in Successfully!');

    return res.redirect('/');
}

// Handle User Sign Out
module.exports.destroySession = function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!');
        res.redirect('/');
    });
}