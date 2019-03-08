/**
 * @author Ivonne Y. Mendoza <imendoza@imendoza.io>
 * route created for save a new plants into database garden
 */

var express = require('express');
var router = express.Router();
const Plant= require("../model/Plants.js");

//get route create 
router.get('/create', (req, res) => {
      res.render('create');
});


//add new plant
router.post('/create', (req, res)=>{
  //create data schema
  const {reviews, name, scientific_name, description,image_url, easy_care, advice_care, pet_friendly, purifying_air} = req.body;
  const newPlant = new Plant(req.body);
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