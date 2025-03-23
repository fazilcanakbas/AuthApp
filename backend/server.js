require('dotenv').config();  // çevresel değişkenler için
const express = require('express');  //express framework
const cors = require('cors');  // RN ile backend'in iletişimi için
const mongoose = require('mongoose'); //mongoDB bağlantısı 
const authRoutes = require('./routes/authRoutes');  // auth işlemleri için routes

const app = express();  //express uygulaması oluşturuldu

app.use(express.json());  // JSON verileri almak için
app.use(cors());  // cors politikası 
const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

// mongoDB bağlantısı 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB'ye bağlandı!"))
  .catch(err => console.error("Bağlantı hatası:", err));



app.use('/api/auth', authRoutes);  // Auth ile ilgili işlemler bu route altında yapılıcak

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
