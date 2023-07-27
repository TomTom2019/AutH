const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const SALT_I = 10

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

// Middleware save =>  userSchema . this =user
// this code run before
userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next()
            })
        })  
    } else {
        next();
    }
})

/// compare the password 2
//candidatePassword = req.body.password
// this.password = hash password
userSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,function(err,isMatch){
        if(err) cb(err)
        cb(null,isMatch)
    })
}



const User = mongoose.model('User',userSchema)
module.exports = {User}