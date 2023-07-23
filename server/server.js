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

// ROUTE GERISTER USER
app.post('/api/user/login',(req,res)=>{
    // 1 -find the user,if good, -> move forward
    User.findOne({'email': req.body.email},(err,user)=>{
        if(err) res.status(400).send(err);
        if(!user) res.json({message:'User not found'})
  
      // 2 - compare the password with the HASHED password on the DB, -> move forward-- isMatch = true or false
      bcrypt.compare(req.body.password,user.password,(err,isMatch)=>{
            if(err) res.status(400).send(err);
            
            //3 send response
            res.status(200).send(isMatch)
         })
             
        })
    })




const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`started on port ${port}`)
})
