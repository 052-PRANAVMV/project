const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  fname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  pass: {
    type: String,
    required: true
  },
  dep: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
}, {
  timestamps: true 
});


const User = mongoose.model('User', userSchema);

module.exports = User;