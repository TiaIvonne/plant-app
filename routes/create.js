var express = require('express');
var router = express.Router();
const Plant= require("../model/Plants.js");


//get route create and display enum with values
router.get('/create', (req, res) => {
  
      //render index page with all plants
      res.render('create');


});


//add new book into database
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