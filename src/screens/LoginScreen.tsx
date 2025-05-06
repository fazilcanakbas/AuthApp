import React, { useState, useEffect } from "react";
import { TextInput, Alert, View, StyleSheet, Text, TouchableOpacity, Image, StatusBar, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView } from "react-native-gesture-handler";
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const { width, height } = Dimensions.get('window');

// Firebase config'in (google-services.json'dan veya Firebase Console'dan aldığın gibi)
const firebaseConfig = {
  apiKey: "AIzaSyAFUxF38VpRaNDLRe3j8aDvXDzipIpuCM4",
  authDomain: "authapp1-20371.firebaseapp.com",
  projectId: "authapp1-20371",
  storageBucket: "authapp1-20371.appspot.com",
  messagingSenderId: "836177744715",
  appId: "1:836177744715:android:d8ef51ec34fb691e848ece"
};

// Firebase'i initialize et (birden fazla kez başlatmaz)
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();

// Web Client ID'ni buraya gir! Google Cloud Console'dan alınıyor.
const WEB_CLIENT_ID = "494991197461-6ur9gbl6k5su0e4prqhbiilu4g8r4tob.apps.googleusercontent.com";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 


  // Google AuthSession hook'u
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
  });

  useEffect(() => {
    const loginWithGoogle = async () => {
      if (response?.type === 'success') {
        try {
          const { id_token, access_token } = response.params;
          // Firebase ile Google kimlik doğrulama
          const credential = GoogleAuthProvider.credential(id_token);
          const userCredential = await signInWithCredential(auth, credential);
          const user = userCredential.user;

          // Backend'e Google ile giriş yapan kullanıcının bilgilerini gönder
          const backendResponse = await fetch("http://192.168.197.88:5000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              name: user.displayName,
              profile_image: user.photoURL,
              token: id_token,
            }),
          });
          const backendData = await backendResponse.json();

          if (backendResponse.status === 200) {
            await AsyncStorage.setItem("token", backendData.token);
            navigation.navigate("UserProfile");
          } else {
            Alert.alert("Hata", backendData.message || "Google girişi başarısız oldu");
          }
        } catch (error) {
          console.error("Google giriş hatası:", error);
          Alert.alert("Hata", "Google ile giriş yapılırken bir sorun oluştu.");
        }
      }
    };
    loginWithGoogle();
  }, [response, navigation]);

  const handleCheckBox = () => setIsChecked(!isChecked);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.197.88:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        await AsyncStorage.setItem("token", data.token);
        navigation.navigate("UserProfile");
      } else {
        Alert.alert("Hata", data.message);
      }
    } catch (err) {
      Alert.alert("Bağlantı Hatası", "Sunucuya bağlanırken bir hata oluştu.");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white' }}>
      <StatusBar backgroundColor="#e0c3fc" barStyle="dark-content" />
      <LinearGradient
        colors={["#e0c3fc", "#8ec5fc", "#ffffff"]}
        locations={[0, 0.4, 0.8]}
        style={{ width: '100%', height: '100%', alignItems: "center" }}
      >
        {/* logo */}
        <View style={{ marginTop: 40 }}>
          <Text>Logo Ipsum</Text>
        </View>
        {/* login screen */}
        <View
          style={{
            width: "89%",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
            height: height * 0.80,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#a1729f", padding: 10 }}>Get Started Now</Text>
            <Text style={{ fontSize: 12, fontWeight: '500', color: '#adacad' }}>Create a account or log in explore to our app </Text>
            {/* Google login button */}
            <TouchableOpacity onPress={() => promptAsync()} disabled={!request}>
              <View style={{ borderWidth: 1.5, borderColor: '#d7d9dc', borderRadius: 10, marginTop: 20, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * 0.7, height: height * 0.057 }}>
                <Image
                  source={require('../../assets/google.png')}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={{ fontSize: 14, fontWeight: '500' }}>Sign in with Google</Text>
              </View>
            </TouchableOpacity>
            {/* facebook login button */}
            <TouchableOpacity>
              <View style={{ borderWidth: 1.5, borderColor: '#d7d9dc', borderRadius: 10, marginTop: 20, padding: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * 0.7, height: height * 0.057 }}>
                <Image
                  source={require('../../assets/facebook.png')}
                  style={{ width: 25, height: 25, marginRight: 10 }}
                />
                <Text style={{ fontSize: 14, fontWeight: '500' }}>Sign in with Facebook</Text>
              </View>
            </TouchableOpacity>
            {/* or line */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
              <View style={{ borderWidth: 0.8, borderColor: '#f3f3f8', height: 1, width: 120 }} />
              <Text style={{ marginHorizontal: 10, fontSize: 14, color: '#a3a7aa', marginLeft: 15, marginRight: 15 }}>Or</Text>
              <View style={{ borderWidth: 0.8, borderColor: '#f3f3f8', height: 1, width: 120 }} />
            </View>
          </View>
          {/* email,password,rememberme,forgotpassword input and button */}
          <View style={{ marginRight: 'auto', marginLeft: 'auto' }}>
            <View style={{ marginLeft: 0 }}>
              <Text style={{ alignSelf: 'flex-start', color: '#535456', marginTop: 20, fontWeight: '500', fontSize: 13 }}>Email</Text>
              <TextInput
                style={{
                  borderWidth: 1, borderColor: '#d7d9dc', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * 0.7, height: height * 0.057, marginTop: 5, paddingLeft: 10
                }}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View style={{ marginLeft: 0 }}>

              <Text style={{ alignSelf: 'flex-start', color: '#535456', marginTop: 15, fontWeight: '500', fontSize: 13 }}>Password</Text>
              {/* password input and eye icon */}
              <View style={{  borderWidth: 1, borderColor: '#d7d9dc', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width * 0.7, height: height * 0.057, marginTop: 5,
                  paddingLeft: 10}}>
              <TextInput
                style={{
                  flex: 1,
                  height: 50,
                  paddingHorizontal: 1,
                  fontSize: 16,
                  color: '#1E293B',
                }}
                value={password}
                onChangeText={setPassword}
                keyboardType='default'
                secureTextEntry={!showPassword}
                
              />
              <TouchableOpacity 
                style={{padding: 12}}
                onPress={() => setShowPassword(!showPassword)} 

              >
                <MaterialIcons 
                  name={showPassword ? "visibility" : "visibility-off"} 
                  size={22} 
                  color="#64748B" 
                />
              </TouchableOpacity>
             </View>
            </View>
            {/* remember me and forgot password button */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, }}>
              <View style={{ flexDirection: 'row', marginTop: 10, }}>
                <TouchableOpacity
                  onPress={handleCheckBox}
                  style={{
                    width: 15,
                    height: 15,
                    borderWidth: 1.5,
                    borderColor: isChecked ? '#4d81e7' : 'black',
                    borderRadius: 4,
                    marginRight: 8,
                    marginTop: 0,
                    backgroundColor: isChecked ? '#4d81e7' : '#fff',
                  }}
                >
                  {isChecked && <AntDesign name="check" size={12} style={{ marginTop: 0 }} color="white" />}
                </TouchableOpacity>
                <Text style={{ color: '#535456', fontWeight: '500', fontSize: 10.5 }}>Remember me</Text>
              </View>
              <TouchableOpacity>
                <Text style={{ color: '#4d81e7', marginTop: 10, fontWeight: '500', fontSize: 11 }}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            {/* log in and sign up button */}
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={handleLogin}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30, width: width * 0.7, height: 55, borderRadius: 15, backgroundColor: '#2768e8' }}>
                  <Text style={{ color: '#e5edfc', fontWeight: '500' }}>Log In</Text>
                </View>
              </TouchableOpacity>
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ fontWeight: '400' }}>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                ><Text style={{ color: '#2768e8', fontWeight: '500' }}>  Sign Up</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default LoginScreen;