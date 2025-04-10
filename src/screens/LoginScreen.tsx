import React, { useState } from "react";
import { TextInput, Button, Alert, View, StyleSheet ,Text,TouchableOpacity,Image, StatusBar,Dimensions} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Google from 'expo-auth-session';
import { initializeApp, getApps } from 'firebase/app';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import UserProfileScreen from "./UserProfileScreen";
import { ScrollView } from "react-native-gesture-handler";

if (!getApps().length) {
  initializeApp({
    apiKey: 'AIzaSyCsrosfva8xrf4ZvGNw4YmqcA5maEO0OaE',
    projectId: 'authapp-81b6b',
    appId: '1:937920369763:android:ac5b17d1a4841549991456',
  });
} else {
  const app = getApps()[0];
}

const { width,height } = Dimensions.get('window');


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // const [request, response, promptAsync] = Google.useAuthRequest({
  //   clientId: '937920369763-a6tkfkrdid6l8reqfe80r2ip4n580241.apps.googleusercontent.com.apps.googleusercontent.com',
  // });



  const handleCheckBox = () => {
    setIsChecked(!isChecked);  
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.202.88:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,password }),
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
    <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:'white'}}>

    <StatusBar backgroundColor="#e0c3fc" barStyle="dark-content" />

    <LinearGradient
      colors={["#e0c3fc","#8ec5fc", "#ffffff"]} 
      locations={[0,0.4, 0.8]} 

      style={{ width:'100%',height:'100%',  alignItems: "center" }} 
    >

       {/*logo*/}
      <View style={{marginTop:40}}>
            <Text>Logo Ipsum</Text>
       </View>

      {/*login screen */}
      <View
        style={{
          width: "89%",
          // backgroundColor: "#FFFFFFCC",
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
          marginTop:40,
          height: height*0.80,
        }}
      >
        <View style={{ alignItems: "center", }}>

        <Text style={{fontSize:25,fontWeight:'bold',color:"#a1729f",padding:10}}>Get Started Now</Text>
        <Text style={{fontSize:12,fontWeight:'500',color:'#adacad'}}>Create a account or log in explore to our app </Text>

        {/*google login button*/}
        <TouchableOpacity>
        <View style={{borderWidth:1.5,borderColor:'#d7d9dc',borderRadius:10,marginTop:20,padding:10,flexDirection:'row',alignItems:'center',justifyContent:'center',width:width*0.7,height:height*0.057}}> 
        <Image
        source={require('../../assets/google.png')}
        style={{width:20,height:20,marginRight:10}  
        }
        >

        </Image>
        <Text style={{fontSize:14,fontWeight:'500'}}>Sign in with Google</Text>
        </View>

        </TouchableOpacity>

        {/* facebook login button*/}
        <TouchableOpacity>  
        <View style={{borderWidth:1.5,borderColor:'#d7d9dc',borderRadius:10,marginTop:20,padding:10,flexDirection:'row',alignItems:'center',justifyContent:'center',width:width*0.7,height:height*0.057}}>
        <Image
        source={require('../../assets/facebook.png')}
        style={{width:25,height:25,marginRight:10}  
        }
        >

        </Image>
        <Text style={{fontSize:14,fontWeight:'500'}}>Sign in with Facebook</Text>
        </View>

        </TouchableOpacity>

        {/*or line*/}
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            <View style={{borderWidth: 0.8, borderColor: '#f3f3f8', height: 1, width: 120}} />
            <Text style={{marginHorizontal: 10, fontSize: 14,color:'#a3a7aa',marginLeft:15,marginRight:15}}>Or</Text>
            <View style={{borderWidth: 0.8, borderColor: '#f3f3f8', height: 1, width: 120}} />
        </View>


        </View>
        
        {/*email,password,rememberme,forgotpassword input and button*/}
        <View style={{marginRight:'auto',marginLeft:'auto'}}>

       <View  style={{marginLeft:0}}>
       <Text style={{alignSelf: 'flex-start',color:'#535456',marginTop:20,fontWeight:'500',fontSize:13}}>Email</Text>
        <TextInput
          style={{
            borderWidth:1,borderColor:'#d7d9dc',borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'center',width:width*0.7,height:height*0.057,marginTop:5,paddingLeft:10
          }}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
       </View>

    
        <View  style={{marginLeft:0}}>
        <Text style={{alignSelf: 'flex-start',color:'#535456',marginTop:15,fontWeight:'500',fontSize:13}}>Password</Text>
        <TextInput
         style={{
            borderWidth:1,borderColor:'#d7d9dc',borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'center',width:width*0.7,height:height*0.057,marginTop:5,
            paddingLeft:10
          }}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          keyboardType='default'
        />
        </View>
       

         {/*remember me and forgot password button*/}
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,}}>
        <View style={{flexDirection: 'row', marginTop:10,}}>
        <TouchableOpacity 
          onPress={handleCheckBox} 
          style={{
            width: 15, 
            height: 15, 
            borderWidth: 1.5, 
            borderColor: isChecked ? '#4d81e7' : 'black',
            borderRadius: 4, 
            marginRight: 8, 
      
            marginTop:0,
            backgroundColor: isChecked ? '#4d81e7' : '#fff', 
          
            
          }}
        >
          {isChecked &&<AntDesign name="check" size={12} style={{marginTop:0}} color="white" />} 
        </TouchableOpacity>
        <Text style={{color: '#535456',  fontWeight: '500', fontSize: 10.5}}>Remember me</Text>
      </View>
      <TouchableOpacity>
      <Text style={{color: '#4d81e7', marginTop: 10, fontWeight: '500', fontSize: 11}}>Forgot Password?</Text>
      </TouchableOpacity>
        </View>

        {/*log ın and sıgn up button */}
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <TouchableOpacity onPress={handleLogin}>
                <View style={{alignItems:'center',justifyContent:'center',marginTop:30,width:width*0.7,height:55,borderRadius:15,backgroundColor:'#2768e8'}}>
                <Text style={{color:'#e5edfc',fontWeight:'500'}}>Log In</Text>
                </View>
            </TouchableOpacity>
            <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row',marginTop:20}}>
            <Text style={{fontWeight:'400'}}>Don't have an account?</Text> 
            <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            ><Text style={{color:'#2768e8',fontWeight:'500'}}>  Sign Up</Text></TouchableOpacity>
            </View>
        </View>

        </View>
         {/*email,password,rememberme,forgotpassword,login input and button  end*/}

      </View>

      
    </LinearGradient>
    </ScrollView>
  )};




export default LoginScreen;