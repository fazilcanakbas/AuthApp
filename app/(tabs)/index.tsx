import React from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "@/src/screens/LoginScreen";
import RegisterScreen from "@/src/screens/RegisterScreen";
import HomeScreen from "@/src/screens/HomeScreen";
import UserProfileScreen from "@/src/screens/UserProfileScreen";
import ChangePasswordScreen from "@/src/screens/ChangePasswordScreen";



const Stack = createStackNavigator();

function TabsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
      </Stack.Navigator>
    </View>
  );
}

export default TabsScreen;

