/**
 * @author Ivonne Y. Mendoza <imendoza@imendoza.io>
 * route created for save a new plants into database garden
 */

var express = require('express');
var router = express.Router();
const Plant= require("../model/Plants.js");

//get route create 
router.get('/create', (req, res) => {
      res.render('create/create', req.flash());
});

//add new plant
router.post('/create', (req, res)=>{
 
  //create a new object for new plant
  //create data schema
  const addPlant = {
    reviews:          req.body.reviews, 
    name:             req.body.name, 
    scientific_name:  req.body.scientific_name, 
    description:      req.body.description,
    image_url:        req.body.image_url, 
    easy_care:        req.body.easy_care, 
    advice_care:      req.body.advice_care, 
    pet_friendly:     req.body.pet_friendly, 
    purifying_air:    req.body.purifying_air,                    
  };

  console.log("**********************");
  console.log(addPlant);
  console.log("**********************");

  //dont't repeat scientific name in the database
  const scientific_name = req.body.scientific_name;
  const name = req.body.name;
  
  Plant.findOne({scientific_name: scientific_name})
  .then(scientific_name =>{
    if(scientific_name){
      req.flash('errorMessage', 'scientific name already exists');
      res.redirect('/create');
      return;
    }

  });

  //after check scientific_name, create a new plant into database
  const newPlant = new Plant(addPlant);
   
    newPlant.save()//save data into database
    .then(() => {
      console.log('plant created');
      res.redirect('/create');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/create');
  });
});

module.exports = router;