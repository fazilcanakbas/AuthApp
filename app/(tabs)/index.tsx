import LoginScreen from "@/src/screens/LoginScreen";
import React from "react";
import { View, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "@/src/screens/RegisterScreen";
import HomeScreen from "@/src/screens/HomeScreen";

const Stack = createStackNavigator();

function TabsScreen() {
  return (
    

      


      <Stack.Navigator>
        
        <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
         <Stack.Screen  options={{headerShown:false}} name="Register" component={RegisterScreen} />
         <Stack.Screen  options={{headerShown:false}} name="Home" component={HomeScreen} />
      </Stack.Navigator>
  
  );
}

export default TabsScreen;
