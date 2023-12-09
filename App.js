import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Navigation from './Navigation'; 
/**
 * Root component for the React Native application for CalvinFinds.
 * This component serves as the entry point for the app, rendering the main navigation structure.
 * The app is designed for tracking lost and found items, allowing users to
 * report and discover lost or found items within the Calvin community.
 * @returns {JSX.Element} - JSX representation of the root App component.
 * 
 * @author: CalvinFinds Team
 * @date: Fall, 2023
 */
export default function App() {
  return (<Navigation />);
}
