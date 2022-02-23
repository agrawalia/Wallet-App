const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        trim: true
      },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required : true
      },
    password: {
        type: String,
        required: true,
        select: false
      },
    // emailToken: {
    //     type : String,
    //     required: false
    // },
    // isVerified: {
    //     type : Boolean,
    //     default: false,
    //     required: false
    // },
    // wallet: {
    balance: {
        type : Number,
        default: 5000,
        required: false
        },
    tokens:[{
            token :{
                type : String,
                required: true 
            }
    }]
    //     isPaid: { 
    //         type: Boolean, 
    //         default: false,
    //         required: false 
    //     }
    //   },
      
          
      
},{timestamps : true})

userSchema.methods.generateAuthToken = async function() {
    try{
        console.log(this._id);
        const obj = jwt.sign({_id:this._id.toString()},"mynameisishanagrawalfromsolulabindia");
        console.log(obj);
        this.tokens = tokens.concat({token : obj})
        await this.save();
        return obj;
    }catch(error){
        res.send("the error part "+ error);
        console.log("the error part "+ error);
    }
}

module.exports = mongoose.model('User', userSchema);