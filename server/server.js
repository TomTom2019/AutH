const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();

// connect to database
const mongoUri = `mongodb+srv://admin:testing123@cluster0.lwqgg.mongodb.net/WebAutH?retryWrites=true&w=majority`;
mongoose.connect(mongoUri);

///MIDDLEWARE
app.use(bodyParser.json());


/// MODELS
const { User } = require('./models/user');




const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`started on port ${port}`)
})