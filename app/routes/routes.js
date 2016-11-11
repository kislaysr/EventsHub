var express = require('express');
var router = express.Router();
var userDAO = require('../DAO/userDAO');

var passport = require('passport');


//router.use(putGroups);
/*
    // if user is authenticated in the session, carry on 
    */
    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    router.get('/', function(req, res) {
        user = req.user;
        console.log(user);
        res.render('index.ejs',{
            user : user
        }); 


            
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    router.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    router.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    
    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    router.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    router.get('/profile',isLoggedIn,function(req, res,next) {

        username = req.user.username;
        console.log(req.user);
        console.log("userRegistered",username);
        res.render('profile.ejs', {
            user : req.user,
            username : username // get the user out of session and pass to template
        
        });
    });
    
     router.post('/register',isLoggedIn,function(req,res,next){
        console.log("register::");
        id = req.user._id;
        username = req.body.username;
        regno = req.body.rgd;
        userDAO.setUser(id,username,regno);

        next();
       
    },
    function(req,res,next){
        res.redirect('/profile');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

   
   


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){
    if (req.isAuthenticated())
        return next();
    
    // if they aren't redirect them to the home page
    res.redirect('/');
};
function putUsers(req,res,next){
    userDAO.putUsers(function(users){
        req.users = users;
        next();    
    });

}

module.exports.router = router;
module.exports.isLoggedIn = isLoggedIn;

module.exports.putUsers = putUsers;