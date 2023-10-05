// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/loginscreen/login'; 
import MainPage from './screens/loginscreen/mainpage';
import SelectionScreen from './screens/selectionpage';
import AddPage from './screens/addpage/addpage';
import AddDetails from './screens/addpage/adddetails';
import SubmitApp from "./screens/addpage/screens/submit";


const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Selection" component={SelectionScreen} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="AddPage" component={AddPage} />
        <Stack.Screen name="AddDetails" component={AddDetails} />
        <Stack.Screen name="Submit" component={SubmitApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
