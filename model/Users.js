//call mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create new schema
const userSchema = new Schema({
    username:      {type: String, unique: true, match: [/^[A-Za-z]+$/, "ok"]},
    password:      {type: String},
    likes:         [{type : Schema.Types.ObjectId, ref: 'Plants'}],
},

//declare a timestamp, register movements into database
{
    timestamps: {
      createdAt: true,
      updatedAt: true,
}

});

const User = mongoose.model('users', userSchema);

module.exports = User;