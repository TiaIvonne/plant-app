// signup and login 
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User= require("../model/Users");

router.get('/auth/signup',(req, res) => {
  res.render('signup', req.flash());
});

//validate and create a new user
router.post('/auth/signup', (req, res) =>{

  const username = req.body.username;
  const password = req.body.password;

    
  //check if username already exists and send an error
  User.findOne({username:username})
    .then(username => {
      if (username) {
          console.log("meow");
          
          req.flash('errorMessage', "user already exists");
          res.redirect('/auth/signup');
          return;
      }
      //check if username or password are empty and send an error
      // else {
      //   if (username === "" || password === "") {
      //     req.flash('errorMessage', "Type an user and password");
      //     res.redirect("/auth/signup");
      //   } 

      // }

    });

    

  //after validations create new user
  const newUser = {
      username: req.body.username,
      password:req.body.password,
    };
    //debugger;
    //use bcrypt
    bcrypt.hash(req.body.password, 10, function(err,hash){
      //store hash in password db
      //debugger
      newUser.password = hash;
      User.create(newUser, (err) =>{
        if(err) {
            
            console.log(err);}
        else {
            //debugger;
            req.flash("message", "great success");
            res.redirect('/auth/login');
        }
      });
  
    });
       
});

router.get('/auth/login',(req, res) => {
  res.render('login', req.flash());
});


//Post for login
router.post('/auth/login', (req, res) =>{

  //validations for user and password
  User.findOne({username: req.body.username}, (err,result)=> {
      if(err){
        req.flash("message", "Server error");
        res.redirect("/auth/login");
      }
      if(!result) {
        req.flash("message", "Couldn't find account");
        res.redirect("/auth/login");
      }
        else{
          bcrypt.compare(req.body.password, result.password, function (err, equal) {
            if(err)res.status(500).send("error");
            else if (equal){
              req.session.user = result;
              res.cookie("username", req.body.username);
              // res.status(200).send("logged in");
            
              res.redirect('/garden');
            }else{
              res.status(403).send("invalid username or password");
            }
            
          });
        }
    }
    );
});



//logout and clear cookies
router.get('/logout', (req,res, next)=>{
  req.session.destroy ((err) => {
    res.clearCookie('username');
    res.redirect('/auth/login');
  });
});










module.exports = router;
