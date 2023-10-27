import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../components/ImageViewer';
// do we need a page? or make card bigger on main page?
const Detail = ({  }) => {
    
  return (
    <Text>Hello world</Text>
  )}

export default Detail;

const wordStyles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange elements horizontally
    justifyContent: 'center',
  },
  lost: {
    flex: 1, // Take equal space
    justifyContent: 'center',
    alignItems: 'center', // Center text horizontally
    marginBottom: 450,
  },
  found: {
    flex: 1, // Take equal space
    justifyContent: 'center',
    alignItems: 'center', // Center text horizontally
    marginBottom: 450,
  },
  line: {
    borderBottomWidth: 1, // Add a 1-pixel thick bottom border
    width: '80%', // Adjust the width as needed
    borderBottomColor: 'black', // Color of the line
  },
});

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Push content to the top and bottom of the screen
    alignItems: 'center',
  },
  userIconStyle: {
    width: 100,
    height: 100,
    marginTop: 50,
  },
});



