/**
 * @author Ivonne Y. Mendoza <imendoza@imendoza.io>
 * route display a page garden with all plants, details, and more features
 */
var express = require('express');
var router = express.Router();
const Plant= require("../model/Plants.js");
const User= require("../model/Users.js");


//get garden page an render all plants into garden page
router.get('/garden', function(req, res, next) {
    Plant.find()
        .then((allPlants) => {
            res.render('garden/garden.hbs', {allPlants});
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


// get my garden page and save and add plant into my own plant collection
router.post('/garden', function(req, res, next) {
    let plantId = req.body.plantId;
    let userId = req.session.user._id;
    User.findByIdAndUpdate(userId, { $push: { likes: plantId }})
        .then(() => { 
            console.log('update!');
            res.json({message: "plant saved"});
        })
        .catch(err => { 
            res.json({message: "error"});
            console.log('error:', err);
        });
});

//render my garden page, with my plants already save in previous method
router.get('/garden/mygarden', function(req, res, next){
    let user = req.session.user;
    User.findById(user._id).populate('likes').exec()
        .then((userPlants) => {
        //render index page with all plants
        res.render('garden/mygarden', {userPlants});
        })
        .catch((err)=>{
            console.log("error", err);
        });
});

module.exports = router;