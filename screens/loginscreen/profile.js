import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../components/ImageViewer';

// profile page for user to see lost and found items and customise profile 
const Profile = ({  }) => {
  // used to pick image from your device
  const PlaceholderImage = require('../../assets/icon.png');
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    // if nothing is selcted then alert is shown
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  }  
  return (
    <View style={profileStyles.container}>
      <TouchableOpacity style={profileStyles.imageContainer} onPress={pickImageAsync}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          onPress={pickImageAsync} //click on image to modify. Should probably *change the default to make it more apparent that you can modify/upload images.
        />
      </TouchableOpacity>
      {/*<Image source={require('../../assets/user.png')} style={profileStyles.userIconStyle} />*/}
      <View style={wordStyles.container}>
        <View style={wordStyles.lost}>
          <Text>Lost Items</Text>
          <Text>0</Text>
          <View style={wordStyles.line}></View>
        </View>
        <View style={wordStyles.found}>
          <Text>Found Items</Text>
          <Text>0</Text>
          <View style={wordStyles.line}></View>
        </View>
      </View>
    </View>
  );
}

export default Profile;

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



