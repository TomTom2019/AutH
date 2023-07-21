const mongoose = require('mongoose');

//Dont forget export => module.exports = {User}
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:6
    }
})

const User = mongoose.model('User',userSchema)
module.exports = {User}