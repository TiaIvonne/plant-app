//Mandatory
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


//check in mongo shell => use garden => db.garden.find()
const plantSchema = new Schema ({
  //create new Schema with validations
  name:             { type:  String, unique: true},
  scientific_name:  { type:  String, unique: true},
  description:      { type:  String },  
  reviews:          { type:  Array  },
  image_url:        { type:  String },
  easy_care:        { type:  String,   enum:['Easy care' , 'Average level', 'You need time!']},
  advice_care:      { type:  String },
  pet_friendly:     { type:  String,   enum:['Besties with cats and dog', 'No!']},
  purifying_air:    { type:  String,   enum: ['Yes', 'No']},
},
  
//declare a timestamp, register movements into database
{
  timestamps: {
    createdAt: true,
    updatedAt: true,
  }

});
  
//Asign database model 
const Plant = mongoose.model('Plants', plantSchema);
//export 
module.exports=Plant;