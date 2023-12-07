// Navigation.js
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/loginscreen/login'; 
import SignupScreen from './screens/loginscreen/signup'; 
import MainPage from './screens/loginscreen/mainpage';
import AddPage from './screens/addpage/addpage';
import Profile from './screens/loginscreen/profile';
import Details from './screens/loginscreen/details';
import PopupScreen from './screens/loginscreen/detailsHelpPage';
import PopupScreen2 from './screens/loginscreen/mainHelpPage';
import PopupScreen3 from './screens/loginscreen/profileHelpPage';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
