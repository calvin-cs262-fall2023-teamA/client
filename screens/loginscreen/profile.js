import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ImageButton from '../components/Buttons';
import ImageViewer from '../components/ImageViewer';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = ({  }) => {
  const navigation = useNavigation();

  //image handled below

  const PlaceholderImage = require('../../assets/user.png');
  const [selectedImage, setSelectedImage] = useState(null);
  // const { userData } = useUser();
  // const { userID, userName } = userData;
  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [userName, setUsername] = useState('');
  
  useEffect(() => {
    // Retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { ID, userName, email, username, password } = JSON.parse(userData);
                setUserID(ID)
                setEmail(email);
                setUsername(userName);
            }
        } catch (error) {
            console.error(error);
        }
    };

    retrieveUserData();
}, []);
  
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
      <TouchableOpacity onPress={pickImageAsync}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          onPress={pickImageAsync} //click on image to modify.
          style={styles.ImageViewerStyle}
        />
      </TouchableOpacity>
      
      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.userEmail}>{email}</Text>

      <View style={styles.flexContainer}>

        {/* this Button should lead to item page for user */}
        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.navigate('MainPage', { prevRoute: "post" })}>
          <Text style={styles.tertiaryButtonTitle}>7</Text>
          <Text style={styles.tertiaryButtonText}>Posted</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.navigate('MainPage', { prevRoute: "claim" })}>
          <Text style={styles.tertiaryButtonTitle}>2</Text>
          <Text style={styles.tertiaryButtonText}>Archived</Text>
        </TouchableOpacity> 

      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.primaryButtonText}>Go Back</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.secondaryButtonText}>Log Out</Text>
      </TouchableOpacity>

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
  ImageViewerStyle: {
    width: 150,
    height: 150,
    borderRadius: 200,
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
    marginBottom: 80,
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

  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#FAF2F2',
    borderRadius: 50,
    width: '85%',
    padding: 18,
    marginBottom: 10,
    marginTop: 30,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
    zIndex: -1,
  },

  primaryButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 20,
    
  },

  secondaryButton: {
    alignItems: 'center',
    //backgroundColor: '#FAF2F2',
    borderRadius: 50,
    width: '85%',
    padding: 18,
    marginBottom: 10,
    marginTop: 10,
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

