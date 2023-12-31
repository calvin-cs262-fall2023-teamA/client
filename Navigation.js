// Navigation.js
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./screens/loginscreen/login"; 
import SignupScreen from "./screens/loginscreen/signup"; 
import MainPage from "./screens/mainpage/mainpage";
import AddPage from "./screens/addpage/addpage";
import Profile from "./screens/profile/profile";
import Details from "./screens/details/details";
import PopupScreen from "./screens/details/detailsHelpPage";
import PopupScreen2 from "./screens/mainpage/mainHelpPage";
import PopupScreen3 from './screens/profile/profileHelpPage';
import WarnScreen from './screens/details/warningPage';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#EDE7E7"
        barStyle="dark-content"
        // color="#000"
     />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="AddPage" component={AddPage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="PopupScreen" component={PopupScreen} />
        <Stack.Screen name="PopupScreen2" component={PopupScreen2} />
        <Stack.Screen name="PopupScreen3" component={PopupScreen3} />
        <Stack.Screen name="WarnScreen" component={WarnScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
