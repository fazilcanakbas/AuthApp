const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

// kullanıcı şeması
const userSchema = new mongoose.Schema({
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
    lastname: { type: String, required: false },
    birthofdate: { type: String, required: false }, 
    phonenumber: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now }

  });

  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); 
    const salt = await bcrypt.genSalt(10);  
    this.password = await bcrypt.hash(this.password, salt);  
    next();
  });

  userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);  
  };

  const User = mongoose.model('User', userSchema); 
  module.exports = User; 