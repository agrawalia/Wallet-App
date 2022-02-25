const signUpRoutes = require("../routes/signup");
const {validationResult} = require('express-validator');
const Post = require('../models/signup');

const mailgun = require('mailgun-js');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});

// signup send verification  email
exports.getPosts = async (req, res, next) =>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const balance = req.body.balance;
        const token = jwt.sign({name,email,role,password,balance}, process.env.JWT_ACC_ACTIVATE , {expiresIn : '20m'});
        const url = `${process.env.CLIENT_URL}/authentication/activate/${token}`;
        console.log(url);
        const data = {
            from: 'noreply@ishan.com',
            to: email,
            subject: 'Account Activation Link',
            html: `<h2> Please click on given link to activate your account </h2><br><p><a>${url}</a></p>`
        };
        mg.messages().send(data, function (error, body) {
            if(error){
                return res.json({
                    error: error.message
                })
            }
            console.log(body);
            return res.json({message : "Email has been sent kindly activate your account."});
        });
    }catch(exe){
        console.log("SignUp fail");
    }
};

// signup success after email verification
exports.activateAccount = async (req, res, next) =>{
    const {token} = req.body;
    if(token){
            jwt.verify(token, process.env.JWT_ACC_ACTIVATE, async function(err, decodeToken) {
                if(err){
                    return res.status(400).json({ err: "Incorrect or expired link"});
                }
                
                const {name, email, password, role, balance} = decodeToken;
                const signupRecords = new Post({
                    name:name,
                    email:email,
                    password:password,
                    role:role,
                    balance:balance,
                    confirmed: true
                });
                const token =  await signupRecords.generateAuthToken();
                console.log(signupRecords);
                const insertRecord  = await signupRecords.save();
                res.send("SignUp success!!");
                console.log('SignUp success!!');

            })
    }
    else{
        return res.json({
            error : 'Something went wrong'
        })
    }
};