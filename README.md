# AuthApp

Mobil kullanıcı giriş ve kayıt uygulaması.


## Özellikler

- **Kullanıcı Kaydı (Register)**
  - Ad, soyad, e-posta, şifre, doğum tarihi ve telefon numarası ile üyelik oluşturma
  - E-posta benzersizliği ve şifre güvenliği kontrolü
  - Eksik veya hatalı bilgiler için kullanıcı dostu uyarılar
  - Doğum tarihi seçim arayüzü ve ülke kodu ile telefon girişi desteği

- **Kullanıcı Girişi (Login)**
  - E-posta ve şifre ile güvenli giriş
  - Yanlış şifre veya bulunmayan kullanıcı uyarıları
  - Hatalı giriş denemelerinde bilgilendirme

- **Google ile Giriş**
  - Google hesabı ile hızlı ve güvenli kimlik doğrulama
  - Firebase Authentication ve OAuth desteği

- **JWT Tabanlı Kimlik Doğrulama**
  - Sunucu tarafında JWT token üretimi ve doğrulaması
  - Güvenli ve oturum bazlı işlem desteği (token ile korunan uç noktalar)

- **Profil Sayfası**
  - Kullanıcıya ait profil bilgilerini görüntüleme
  - Üyelik tarihi, profil resmi, e-posta ve diğer kişisel bilgiler
  - Profil güncelleme ve şifre değiştirme seçenekleri

- **Şifre Değiştirme**
  - Mevcut şifre ile doğrulama ve yeni şifre belirleme
  - Hatalı mevcut şifre kontrolü ve bilgilendirme

- **Bildirim & Ayarlar**
  - Bildirim ayarlarını değiştirme (geliştirilebilir)
  - Kullanıcı çıkışı (logout)

- **Modern ve Duyarlı Arayüz**
  - React Native ve Expo ile tasarlanmış, mobil uyumlu modern tasarım
  - Şık geçişler, durum göstergeleri ve kullanıcıya rehberlik eden arayüzler

- **Veri Güvenliği**
  - Şifrelerin güvenli şekilde hashlenmesi (bcrypt ile)
  - Hassas verilerin korunması ve backend erişimlerinin sınırlandırılması
 

## Ekran Görüntüleri

## Kurulum

1. Bağımlılıkları Yükle

   ```bash
   npm install
   ```

2. Projeyi Başlat
3. 
   ```bash
    npx expo start
   ```

