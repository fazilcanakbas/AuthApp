require('dotenv').config();  
const express = require('express');  
const cors = require('cors');  
const mongoose = require('mongoose'); 
const authRoutes = require('../backend/routes/authRoutes');
const User = require('../backend/models/User');

const app = express();  

app.use(express.json());  
app.use(cors());  

const mongoURI = process.env.MONGO_URI;
console.log(mongoURI);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB'ye bağlandı!"))
  .catch(err => console.error("Bağlantı hatası:", err));

app.use('/api/auth', authRoutes); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
