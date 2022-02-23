const signUpRoutes = require("../routes/signup");
const {validationResult} = require('express-validator');
const Post = require('../models/signup');

exports.getPosts = async (req, res, next) =>{
    try{
        const signupRecords = new Post(req.body);
        const token = await signupRecords.generateAuthToken();
        // console.log(token);
        const insertRecord  = await signupRecords.save();
        res.send(insertRecord);

    }catch(exe){

    }
};