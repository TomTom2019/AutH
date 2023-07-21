const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

<<<<<<< HEAD
// connect to database
const mongoUri = `mongodb+srv://admin:testing123@cluster0.lwqgg.mongodb.net/WebAutH?retryWrites=true&w=majority`;
=======
const mongoUri = ``;
>>>>>>> 9d49e182bf60bd5c93dd232c0d90c46857b46cdc
mongoose.connect(mongoUri);

///MIDDLEWARE
app.use(bodyParser.json());


/// MODELS
const { User } = require('./models/user');




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`started on port ${port}`)
})
