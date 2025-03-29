const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // şifreleme için

// kullanıcı şeması
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastname: { type: String, required: true },
    birthofdate: { type: Date, required: true }, 
    phonenumber: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }

  });

  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();  // Eğer şifre değişmediyse
    const salt = await bcrypt.genSalt(10);  // 10 kez hashing yapar
    this.password = await bcrypt.hash(this.password, salt);  // Şifreyi hash'ler
    next();
  });

  userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);  // Şifreyi karşılaştırır
  };

  const User = mongoose.model('User', userSchema); // User modeli oluşturuldu
  module.exports = User; // User modelini dışa aktarır