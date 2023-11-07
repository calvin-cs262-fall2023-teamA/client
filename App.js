import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from './Navigation'; 
import { UserProvider } from './context/UserContext';

export default function App() {
  return (<UserProvider><Navigation /></UserProvider>);
}
