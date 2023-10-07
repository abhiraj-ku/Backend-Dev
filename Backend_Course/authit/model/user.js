import mongoose from "mongoose";

const { Schema } = mongoose;
const authSchema = new Schema({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", authSchema); //in this user is the name of collection(table) and authSchema is the structure it follows
