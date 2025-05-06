const express = require('express'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 
const router = express.Router(); 
const authMiddleware = require('../middleware/auth'); 
const bcrypt = require('bcrypt');


router.post('/register', async (req, res) => {
    const { name, email, password ,lastname,birthofdate,phonenumber} = req.body;
  
    try {
      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: 'Bu email ile kayıtlı bir kullanıcı mevcut.' });
  
      const user = new User({ name, email, password,lastname,birthofdate,phonenumber,createdAt: new Date() });
      await user.save();
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
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ message: 'Giriş başarılı!', token ,email:user.email,username:user.username,password:user.password,token});
  
    } catch (error) {
      res.status(500).json({ message: 'Bir hata oluştu', error });
    }
  });

  // const authMiddleware = (req, res, next) => {
  //   const token = req.header('Authorization');
  //   if (!token) return res.status(401).json({ message: 'Yetkisiz erişim' });
  
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = decoded; 
  //     next();
  //   } catch (error) {
  //     res.status(401).json({ message: 'Geçersiz token' });
  //   }
  // };
   



  router.get('/me', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password');
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Kullanıcı bilgisi alınamadı', error: err.message });
    }
  });


// router.put('/changepassword', authMiddleware, async (req, res) => {
//   try {

    
//       const email = req.user.email;
//       const { currentPassword, newPassword } = req.body;


//       const user = await User.findOne(email);
//       if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });

//       const isMatch = await bcrypt.compare(currentPassword, user.password);
//       console.log('user.password:', user.password); 
//       console.log('currentPassword:', currentPassword); 
//       if (!isMatch) return res.status(400).json({ message: 'Mevcut şifre yanlış' });
//       console.log('isMatch:', isMatch);  // Karşılaştırma sonucunu kontrol et

    
//       console.log('currentPassword:', currentPassword);


//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPassword;
//       await user.save();

//       res.status(200).json({ message: 'Şifre başarıyla değiştirildi' });
//   } catch (error) {
//       console.error('Şifre değiştirme hatası:', error);
//       res.status(500).json({ message: 'Sunucu hatası' });

//   }
// });
    

router.put('/changepassword', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) return res.status(400).json({ message: 'Mevcut şifre yanlış' });
    
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({ message: 'Şifre başarıyla değiştirildi' });
  } catch (error) {
    console.error('Şifre değiştirme hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});



// router.post('/google', async (req, res) => {
//   try {
//     const { token, email, name, profile_image } = req.body;
    
//     // Kullanıcıyı veritabanında ara, yoksa oluştur
//     let user = await User.findOne({ email });
    
//     if (!user) {
//       // Yeni kullanıcı oluştur
//       user = new User({
//         email,
//         username: email.split('@')[0], // Email'den bir kullanıcı adı oluştur
//         name,
//         profile_image,
//         authProvider: 'google',
//         password: crypto.randomBytes(16).toString('hex') // Rastgele bir şifre oluştur
//       });
//       await user.save();
//     }
    
//     // JWT token oluştur
//     const jwtToken = jwt.sign(
//       { userId: user._id, email: user.email },
//       process.env.JWT_SECRET || 'your_jwt_secret',
//       { expiresIn: '7d' }
//     );
    
//     res.status(200).json({
//       token: jwtToken,
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//         username: user.username,
//         profile_image: user.profile_image
//       }
//     });
//   } catch (error) {
//     console.error('Google giriş hatası:', error);
//     res.status(500).json({ message: 'Sunucu hatası' });
//   }
// });


  router.get('/User', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Bir hata oluştu adamım', error });
    }
  });
  
  module.exports = router; 