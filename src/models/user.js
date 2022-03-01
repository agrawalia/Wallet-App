import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    balance: {
      type: Number,
      default: 5000,
      required: false,
    },
    confirmed: {
      type: Boolean,
      default: false,
      required: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

// To maintain JWT user session
userSchema.methods.generateAuthToken = async function (req, res) {
  try {
    console.log(this._id.toString());
    const obj = jwt.sign({ _id: this._id.toString() }, process.env.JWT_KEY);
    console.log(obj);
    this.tokens = this.tokens.concat({ token: obj });
    await this.save();
    return obj;
  } catch (error) {
    console.log("the error part " + error);
  }
};

module.exports = mongoose.model("User", userSchema);
