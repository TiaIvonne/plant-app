//call mongoose
const mongoose = require('mongoose');
//call Plants mode
const Plants = require("../model/Plants.js");

//connect mongoose with db 
mongoose.connect('mongodb://localhost/garden', {useNewUrlParser: true}, function(err){
    if(err) console.log("ERROR",err);
    else {
      console.log("connected to garden");
    }
});

//create array with plants
const plantsArray = [
  {
    name:                   "Kim Kardashian",
    scientific_name  :      "Monstera Deliciosa",
    description:            "An Instagram friendly plant",
    reviews:                ["K. West: Great Plant", "K.Jenner: Easy to care"],
    image_url:              "https://cdn.shopify.com/s/files/1/0044/6146/1619/products/image_ed9e36c6-cd8d-4a46-8287-eac75e442185_1296x1296.jpg?v=1528366706",
    easy_care:              "Average level",
    advice_care:            "lorem ipsum asdfgg",
    pet_friendly:           "No!",
    purifying_air:          "Yes",

  },
  {
    name:                   "Joey Tribbiani",
    scientific_name  :      "Areca",
    description:            "Nice plant, only don't share his food",
    reviews:                ["M.Geller: Need to bring a lot of water"],
    image_url:              "https://cdn.shopify.com/s/files/1/0044/6146/1619/products/image_ed9e36c6-cd8d-4a46-8287-eac75e442185_1296x1296.jpg?v=1528366706",
    easy_care:              "Average level",
    advice_care:            "Areca needs a lot of water, sun and humidity",
    pet_friendly:           "No!",
    purifying_air:          "Yes",
  },
  {
    name:                   "Regina George",
    scientific_name  :      "Filodendro",
    description:            "Pretty, selfish plant",
    reviews:                ["C.Heron: Pretty but needs so much attention"],
    image_url:              "https://cdn.shopify.com/s/files/1/0044/6146/1619/products/image_ed9e36c6-cd8d-4a46-8287-eac75e442185_1296x1296.jpg?v=1528366706",
    easy_care:              "Average level",
    advice_care:            "Filodendro needs a lot of water, sun and humidity",
    pet_friendly:           "No!",
    purifying_air:          "Yes",

  },
  {
    name:                   "George Harrison",
    scientific_name  :      "Ficus",
    description:            "Etereum, purifying air",
    reviews:                ["J.Lennon: So much pisces plant"],
    image_url:              "https://cdn.shopify.com/s/files/1/0044/6146/1619/products/image_ed9e36c6-cd8d-4a46-8287-eac75e442185_1296x1296.jpg?v=1528366706",
    easy_care:              "Average level",
    advice_care:            "George needs a lot of water, sun and humidity, peace and love",
    pet_friendly:           "No!",
    purifying_air:          "Yes",

  }
  
];

//call Plants model an asign to array with plants
Plants.create(plantsArray,(err) =>{
    if(err) console.log(err);
    else console.log('ok');
});




