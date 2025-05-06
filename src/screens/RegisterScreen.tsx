import React, { useState } from "react";
import { TextInput, Button, Alert, View, StyleSheet, Text, TouchableOpacity, Image, Platform, Modal, FlatList,Dimensions, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Calendar from 'expo-calendar';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const {width,height} = Dimensions.get('screen');

const countryCodes = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+90", country: "TR", flag: "🇹🇷" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+55", country: "BR", flag: "🇧🇷" },

];

function RegisterScreen({ navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [birthofdate, setBirthOfDate] = useState("");
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
    const [countryCodeModalVisible, setCountryCodeModalVisible] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
  
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  

    const handleRegister = async () => {

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        Alert.alert('Hata', 'Lütfen geçerli bir e-posta adresi girin.');
        return;
      }
    
      if (password.length < 6) {
        Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
        return;
      }

      try {
        const response = await fetch("http://192.168.197.88:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password ,name,lastname,phonenumber,birthofdate:date.toISOString(),}),
        });

        Alert.alert("Success", "You have successfully registered.");
        navigation.navigate("Login");
        
      
      } catch (err) {
        Alert.alert("Bağlantı Hatası", "Sunucuya bağlanırken bir hata oluştu.");
      }
    };
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (selectedDate: React.SetStateAction<Date>) => {
      setDate(selectedDate);
      hideDatePicker();
    };
    

    const renderCountryCodeItem = ({ item }: { item: { code: string; country: string; flag: string } }) => (
      <TouchableOpacity
        style={styles.countryCodeItem}
        onPress={() => {
          setSelectedCountryCode(item);
          setCountryCodeModalVisible(false);
        }}
      >
        <Text style={styles.countryFlag}>{item.flag}</Text>
        <Text style={styles.countryCodeText}>{item.code} ({item.country})</Text>
      </TouchableOpacity>
    );

  return (
    <>
    <StatusBar backgroundColor="#8ec5fc" barStyle="dark-content" />
    <LinearGradient
      colors={["#8ec5fc", "#ffffff"]}
      locations={[0, 0.8]}
      style={{ width:'100%',height:'100%',  alignItems: "center" }}>
   <ScrollView contentContainerStyle={styles.scroll}>
        <View style={{marginTop:40}}>
            <Text>Logo Ipsum</Text>
        </View>
        <View   style={{
          width: width*0.9,
          backgroundColor: "white",
          padding: 20,
          borderRadius: 20,
          marginTop:40
        }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
         <Ionicons name="arrow-back-outline" size={24} color="black" /> 
         </TouchableOpacity>
          <View style={{ alignItems: "center", }}>
            
          
            <Text style={{fontSize:25,fontWeight:'bold',color:"#a1729f",padding:10}}>Sign Up</Text>
            <View style={{flexDirection:'row'}}>
            <Text  style={{fontWeight:'400'}} >Already have an a account?</Text>
            <TouchableOpacity
            onPress={() => navigation.navigate("Login")}><Text style={{color:'#2768e8',fontWeight:'500'}}>  Login</Text></TouchableOpacity>
          </View>
          </View>   
           
          <View style={{alignItems: 'center', justifyContent: 'center',gap:20,marginTop:20}}>
            <View style={{flexDirection:'row',gap:30,}}>
  
                <View >
                    <Text style={{color: '#535456', fontWeight: '500', fontSize: 13}}>Name</Text>
                    <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: '#d7d9dc',
                        borderRadius: 10,
                        width: 125,
                        height: 45,
                        marginTop: 5,
                        paddingLeft: 10
                    }}
                    value={name}
                    onChangeText={setName}
                    />
                </View>


                <View >
                    <Text style={{color: '#535456', fontWeight: '500', fontSize: 13}}>Last Name</Text>
                    <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: '#d7d9dc',
                        borderRadius: 10,
                        width: 125,
                        height: 45,
                        marginTop: 5,
                        paddingLeft: 10
                    }}
                    value={lastname}
                    onChangeText={setLastName}
                    />
                </View>

                </View>
                <View >
                    <Text style={{color: '#535456', fontWeight: '500', fontSize: 13}}>Email</Text>
                    <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: '#d7d9dc',
                        borderRadius: 10,
                        width: 280,
                        height: 45,
                        marginTop: 5,
                        paddingLeft: 10
                    }}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
            
                    />
                </View>
                </View>

        <View>
          
         {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />  */}
        <Text style={{color:'#535456', fontWeight: '500', fontSize: 13,marginLeft:15,marginTop:20}}>Birth of Date</Text>
        <TouchableOpacity 
        onPress={showDatePicker}>
   
        <View style={{}}>
                   
                    <View style={{alignItems: 'center', justifyContent: 'center',}}>
                    <View
                    style={{
                        borderWidth: 1,
                        borderColor: '#d7d9dc',
                        borderRadius: 10,
                        width: 280,
                        height: 45,
                        marginTop:5,
                        paddingLeft: 10,
                        justifyContent:'space-between',
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                    <Text style={{fontSize:14,fontWeight:'500'  }}>
                        {date.toLocaleDateString()}
                    </Text>
                    <AntDesign style={{marginRight:10}} name="calendar" size={24} color="black" />
                    </View>
                    </View>
                </View>
        </TouchableOpacity>

        {/* Phone Number Section */}
        <Text style={{color:'#535456', fontWeight: '500', fontSize: 13,marginLeft:15,marginTop:20}}>Phone Number</Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 280,
            marginTop: 5,
          }}>
            {/* Country Code Selector */}
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#d7d9dc',
                borderRadius: 10,
                height: 45,
                width: 80,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 8,
              }}
              onPress={() => setCountryCodeModalVisible(true)}
            >
              <Text style={{fontSize: 14}}>{selectedCountryCode.flag} {selectedCountryCode.code}</Text>
              <AntDesign name="caretdown" size={12} color="#535456" />
            </TouchableOpacity>

            {/* Phone Number Input */}
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#d7d9dc',
                borderRadius: 10,
                height: 45,
                width: 190,
                paddingLeft: 10,
              }}
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={phonenumber}
              onChangeText={setPhoneNumber}
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
        </View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity
                 onPress={(handleRegister)}>
                    <View style={{alignItems:'center',justifyContent:'center',marginTop:30,width:280,height:55,borderRadius:15,backgroundColor:'#2768e8'}}>
                    
                    <Text style={{color:'#e5edfc',fontWeight:'500'}}>Register</Text>
                    </View>
                </TouchableOpacity>
                </View>
        </View>

        {/* Country Code Modal */}
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={countryCodeModalVisible}
          onRequestClose={() => setCountryCodeModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country Code</Text>
                <TouchableOpacity onPress={() => setCountryCodeModalVisible(false)}>
                  <AntDesign name="close" size={24} color="#535456" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={countryCodes}
                renderItem={renderCountryCodeItem}
                keyExtractor={(item) => item.code}
                style={styles.countryCodeList}
              />
            </View>
          </View>
        </Modal>
          </View>
          </ScrollView>
    </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width:350,
    height: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d7d9dc',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#535456',
  },
  countryCodeList: {
    flex: 1,
  },
  countryCodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  countryFlag: {
    fontSize: 22,
    marginRight: 10,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#535456',
  },
  scroll:{
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default RegisterScreen;