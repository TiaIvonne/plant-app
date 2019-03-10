/**
 * @author Ivonne Y. Mendoza <imendoza@imendoza.io>
 * authentication routes
 */

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const User= require("../model/Users");

/************************************** */
//           Sign up section
/************************************** */

//1.render page
router.get('/auth/signup',(req, res) => {
  res.render('auth/signup.hbs',req.flash());
});

//2.validate and create a new user 
router.post('/auth/signup', (req, res) =>{

  const username = req.body.username;
  const password = req.body.password;

//check if username already exists and send an error
  User.findOne({username:username})
    .then(username => {
      if (username) {          
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
        password: req.body.password,
      };
        //use bcrypt
          bcrypt.hash(req.body.password, 10, function(err,hash){
              //store hash in password db
              newUser.password = hash;
              User.create(newUser, (err) =>{
                if(err) {
                  console.log(err);
                }
                else {
                  req.flash("message", "great success");
                  res.redirect('/auth/login');
                }
              });
          });
});


/************************************** */
//           Login section
/************************************** */

//render login page
router.get('/auth/login',(req, res) => {
  res.render('auth/login.hbs', req.flash());
});


//Post method for login
router.post('/auth/login', (req, res) =>{
  //validations for user and password
  User.findOne({username: req.body.username}, (err,result)=> {
      if(err){
        req.flash("message", "Server error");
        res.redirect("/auth/login.hbs");
      }
      if(!result) {
        req.flash("message", "Couldn't find account");
        res.redirect("/auth/login.hbs");
      }
      else{
        bcrypt.compare(req.body.password, result.password, function (err, equal) {
          if(err)res.status(500).send("error");
            else if (equal){
              req.session.user = result;
              res.cookie("username", req.body.username);
              res.redirect('/garden');
            }
            else{
              // res.status(403).send("invalid username or password");
              req.flash("message", "Wrong password, try again");
              res.redirect("/auth/login.hbs");
            }
          });
        }
  });
});

//logout and clear cookies
router.get('/logout', (req,res, next)=>{
  req.session.destroy ((err) => {
    res.clearCookie('username');
    res.redirect('/');
  });
});





//test remember-me only for test, not working yet

router.get('/auth/remember', (req, res, next)=>{
  res.render('auth/remember.hbs');
});

module.exports = router;
