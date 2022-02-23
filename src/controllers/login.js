const loginRoutes = require("../routes/login");
const {validationResult} = require('express-validator');
const Post = require('../models/signup');

exports.getLogin = async (req, res, next) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userEmail = await Post.findOne({email : email});
        const token = await userEmail.generateAuthToken();
        console.log(token);

        if(userEmail.password === password)
            res.send("Successfully logged in");
        else
            res.send("Invalid credentials");
    } catch(exe){
        console.log(exe);
    }
};