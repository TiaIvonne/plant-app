var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Plant= require("../model/Plants.js");
const User= require("../model/Users.js");


//get garden page an render all plants into garden page
router.get('/garden', function(req, res, next) {
    Plant.find()
        .then((allPlants) => {
            res.render('garden', {allPlants});
        })
        .catch((err) =>{
            console.log("error", err);
            next();
        });
});

//see more details about plants
router.get('/garden/:id', (req, res, next) =>{
    Plant.findById(req.params.id)
        .then((onePlant)=>{
            res.render('garden/details.hbs', {onePlant});
        })
        .catch((err) => {
            console.log('error: ', err);
        next();
        });
});

//save and add plant into my own plant's collection


// get my garden page
router.post('/garden', function(req, res, next) {
    //debugger;

    let plantId = req.body.plantId;
    let userId = req.session.user._id;
    // debugger;
    User.findByIdAndUpdate(userId, { $push: { likes: plantId }})
    // User.findByIdAndUpdate(userId, {upsert: true}, {$push: {likes: plantId}})
    .then(() => { 
        console.log('update!');
    // debugger;
        res.json({message: "plant saved"});
    })
    .catch(err => { 
    // debugger;
        res.json({message: "error"});
        console.log('error:', err);
    });

});

router.get('/garden/mygarden', function(req, res, next){

    let user = req.session.user;
    User.findById(user._id).populate('likes').exec()
    .then((userPlants) => {
        //render index page with all plants
        res.render('garden/mygarden.hbs', {userPlants});
    })
    .catch((err)=>{
        console.log("error", err);
     
    });

});






module.exports = router;