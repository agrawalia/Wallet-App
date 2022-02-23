const express = require('express');
const bodyparser = require('body-parser');
const {body} = require('express-validator');
const mongoose = require('mongoose');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const conn = require('./src/db/conn');
const Signup = require('./src/models/signup');
const SignUpRoutes = require('./src/routes/signup');

const port = process.env.PORT || 8000;
const app= express();

app.use(bodyparser.json());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    res.setHeader('Access-Control-Allow-Methods','Content-Type , Authorization');
    next();

});

//POST request signup
app.use('/api',SignUpRoutes);




app.listen(port, ()=>{
    console.log('Server is running');
});
