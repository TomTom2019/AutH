const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const bcrypt = require('bcrypt');


// connect to database
const mongoUri = `mongodb+srv://admin:testing123@cluster0.lwqgg.mongodb.net/WebAutH?retryWrites=true&w=majority`;



mongoose.connect(mongoUri);

///MIDDLEWARE
app.use(bodyParser.json());


/// MODELS
const { User } = require('./models/user');


/* ROUTE
Postman :http://localhost:3001/api/user  reasponse json =>{
    "email":"Pipo@gmail.com",
    "password":"test123"
}*/
app.post('/api/user',(req,res)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save((err,doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).send(doc)
    })
})

// ROUTE REGERISTER USER
app.post('/api/user/login',(req,res)=>{
    // find user if good => move foward
    User.findOne({'email': req.body.email},(err,user)=>{
        if(err) res.status(400).send(err);
        if(!user) res.json({message:'User not found'})
  
     // 2 - compare the password with the HASHED password on the DB, -> 
   user.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) res.status(400).send(err);
            if(!isMatch) res.json({message:'Bad password'})

// generateToken => stored in browser | cookie => auth => to postam
               user.generateToken((err,user)=>{
               if(err) res.status(400).send(err);
                res.cookie('auth',user.token).send('ok')
        })

            })
              
        })
    })




const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`started on port ${port}`)
})
