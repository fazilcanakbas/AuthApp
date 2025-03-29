const express = require('express'); 
const jwt = require('jsonwebtoken'); // JWT için
const User = require('../models/User'); // User modeli import edildi
const router = express.Router(); // express router oluşturuldu



router.post('/register', async (req, res) => {
    const { name, email, password ,lastname,birthofdate,phonenumber} = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'Bu email ile kayıtlı bir kullanıcı mevcut.' });
  
      const user = new User({ name, email, password,lastname,birthofdate,phonenumber,createdAt: new Date() });
      await user.save();
      
      // kullanıcıyı kaydettikten sonra token oluşturuyoruz
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ message: 'Kullanıcı başarıyla kaydedildi!', token });
  
    } catch (error) {
      res.status(500).json({ message: 'Bir hata oluştu', error });
    }
  });

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) return res.status(401).json({ message: 'Şifre yanlış' });
  
      // Giriş başarılı, token oluşturuluyor
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ message: 'Giriş başarılı!', token ,email:user.email,username:user.username,password:user.password });
  
    } catch (error) {
      res.status(500).json({ message: 'Bir hata oluştu', error });
    }
  });

  // const authMiddleware = (req, res, next) => {
  //   const token = req.header('Authorization');
  //   if (!token) return res.status(401).json({ message: 'Yetkisiz erişim' });
  
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = decoded; // Token'dan userId çekiyoruz
  //     next();
  //   } catch (error) {
  //     res.status(401).json({ message: 'Geçersiz token' });
  //   }
  // };
  
  router.get('/User', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Bir hata oluştu', error });
    }
  });
  
  module.exports = router; // router dışa aktarılıyor