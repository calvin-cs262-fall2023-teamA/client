// Navigation.js
import React from 'react';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/loginscreen/login'; 
import SignupScreen from './screens/loginscreen/signup'; 
import MainPage from './screens/loginscreen/mainpage';
import SelectionScreen from './screens/selectionpage';
import AddPage from './screens/addpage/addpage';
import SubmitApp from "./screens/addpage/screens/submit";


const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#EDE7E7"
        barStyle="dark-content"
        //color="#000"
     />
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="AddPage" component={AddPage} />
        <Stack.Screen name="Submit" component={SubmitApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
