import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ImageButton from '../components/Buttons';
import ImageViewer from '../components/ImageViewer';

const Profile = ({  }) => {
  const navigation = useNavigation();

  //image handled below

  const PlaceholderImage = require('../../assets/user.png');
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
      
    }
  }
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImageAsync}>
        <ImageViewer
          style={profileStyles.userIconStyle}
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          onPress={pickImageAsync} //click on image to modify.
        />
      </TouchableOpacity>
      
      <Text style={styles.userName}>User Name</Text>
      <Text style={styles.userEmail}>ab12@calvin.edu</Text>

      <View style={styles.flexContainer}>

        {/* this Button should lead to item page for user */}
        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.goBack()}> 
          <Text style={styles.tertiaryButtonTitle}>0</Text>
          <Text style={styles.tertiaryButtonText}>Posted</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.tertiaryButtonTitle}>13</Text>
          <Text style={styles.tertiaryButtonText}>Claimed</Text>
        </TouchableOpacity> 

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.secondaryButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDE7E7',
    padding: 35,
  },
  userName: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '900',
    paddingTop: 16,
    fontSize: 30,
    color: '#2F2E41',
  },
  userEmail: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 3,
  },
  flexContainer: {
    marginTop: 80,
    marginBottom: 130,
    flexDirection: 'row', // Arrange elements horizontally
    justifyContent: 'center',
  },

  lostNFound: {
    flex: 1, // Take equal space
    justifyContent: 'center',
    alignItems: 'center', // Center text horizontally
    backgroundColor: 'fff',
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },

  buttonContainer: {
    flexDirection: 'row',
    bottom: 15,
    maxWidth: 350,
    margin: 10,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: '#FAF2F2',
    borderRadius: 50,
    width: 100,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },

  primaryButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 20,
  },

  secondaryButton: {
    flex: 1,
    borderRadius: 50,
    padding: 18,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#9E8B8D',
    fontWeight: '900',
    fontSize: 20,
  },

  tertiaryButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 100,
    padding: 18,
    alignItems: 'center',
    marginHorizontal: 14,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },

  tertiaryButtonTitle: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 50,
  },

  tertiaryButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 18,
    marginTop: -6,
    marginBottom: 6,
  },
});

const profileStyles = StyleSheet.create({
  userIconStyle: {
    width: 130,
    height: 130,
    marginTop: 50,
    borderRadius: 100,
  },
});

