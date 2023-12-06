/* eslint-disable import/namespace */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ImageButton from '../components/Buttons';
import ImageViewer from '../components/ImageViewer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as demoImageGetter from '../addpage/demoimages'; // any placeholder/template images retrieved from here. Should be unnecessary once images are properly stored in server.

const Profile = ({}) => {
  const navigation = useNavigation()

  // image handled below

  const [PlaceholderImage, setPlaceholderImage] = useState(require('../../assets/profileIcon.png')); // can be overwritten for now. will likely be reverted later
  // const PlaceholderImage = require('../../assets/profileIcon.png');
  const [selectedImage, setSelectedImage] = useState(null);
  // const { userData } = useUser();
  // const { userID, userName } = userData;
  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [userName, setUsername] = useState('');
  // const [profileIcon, setProfileIcon] = useState(''); //got empty values for some reason
  let profileIcon = '';
  const [postedCount, setPostedCount] = useState(0);
  const [archivedCount, setArchivedCount] = useState(0);

  const [userLoading, setUserLoading] = useState(true);
  

  useEffect(() => {
    // Retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { ID, userName, email, profileimage } = JSON.parse(userData);
                setUserID(ID);
                setEmail(email);
                setUsername(userName);
                // setProfileIcon(profileimage); //empty values for some reason
                profileIcon = profileimage;
            }
        } catch (error) {
            console.error(error);
        }
        
        if (profileIcon) {
          setPlaceholderImage(demoImageGetter.getImage(profileIcon));
          setUserLoading(false);
        }
        
    };
    
      retrieveUserData();
}, []);

useEffect(() => {
  // whenever user data is gotten from async storage (currently the only time setUserID is used.)
  // necessary because userID is needed for the following function, but wasn't updated because retrieveUserData is async 
  if (userID !== '') updateCount();
}, [userID])

const updateCount = async () => {
try {
  const postResponse = await fetch(`https://calvinfinds.azurewebsites.net/items/post/${userID}`);
  const postJson = await postResponse.json(); // if fetch returns null (size 0), an error is thrown
  setPostedCount(postJson.length);
  await AsyncStorage.setItem('postedData', JSON.stringify(postJson));
  // await AsyncStorage.setItem('postedCount', postJson.length.toString());
  } catch (error) {
    setPostedCount(0); // if fetch returns null (returned 0 items)
  }
  
  try{
  const archivedResponse = await fetch(`https://calvinfinds.azurewebsites.net/items/archived/${userID}`);
  const archivedJson = await archivedResponse.json(); // if fetch returns null (size 0), an error is thrown
  setArchivedCount(archivedJson.length);
  await AsyncStorage.setItem('archivedData', JSON.stringify(archivedJson));
} catch (error) {
  setArchivedCount(0); // if fetch returns null (returned 0 items)
}
};
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      // handleNewImage() //update in database/locally //bugged for now, commented out.
    } else {
      alert('You did not select any image.');
    }
  }

  // const handleNewImage = async () => {
  //   /* update in service */
    
  //   console.log(selectedImage);
  //   fetch('https://calvinfinds.azurewebsites.net/users/image', {
  //       method: 'POST', //actually PUT
  //       headers: {
  //         "Content-type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         id: userID, image: await selectedImage,
  //       }),
  //     })
  //     /* update locally, add the new comment to the list of displayedComments via getComments() */
  //     .then((response) => {response.json})
  //     .catch(error => {
  //       console.error(error);
  //   });
  //   /* update local information */
  //   await AsyncStorage.mergeItem('userData', JSON.stringify({ profileimage: selectedImage }));

  // }

  // one update for changing db, one get for getting current image. the get might already be done in login.
  // also update locally (userData)

  const handleLogout = async () => {
    try {
      // Clear all stored data in AsyncStorage
      await AsyncStorage.clear()
      // Navigate to the login page
      navigation.navigate('Login', { prevRoute: 'Login' })
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <View style={styles.container}>
      {!userLoading &&
      <TouchableOpacity onPress={pickImageAsync}>
          <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          onPress={pickImageAsync} // click on image to modify.
          style={styles.ImageViewerStyle}
          />          
      </TouchableOpacity>
      }

      <Text style={styles.userName}>{userName}</Text>
      <Text style={styles.userEmail}>{email}</Text>

      <View style={styles.flexContainer}>

        {/* this Button should lead to item page for user */}
        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.navigate('MainPage', { prevRoute: "post", key: Math.random().toString()})}>
          <Text style={styles.tertiaryButtonTitle}>{postedCount}</Text>
          <Text style={styles.tertiaryButtonText}>Posted</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.navigate('MainPage', { prevRoute: "claim", key: Math.random().toString()})}>
          <Text style={styles.tertiaryButtonTitle}>{archivedCount}</Text>
          <Text style={styles.tertiaryButtonText}>Archived</Text>
        </TouchableOpacity> 

      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('MainPage')}>
        <Text style={styles.primaryButtonText}>Go Back</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={handleLogout}>
        <Text style={styles.secondaryButtonText}>Log Out</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDE7E7',
    padding: 35
  },
  ImageViewerStyle: {
    width: 150,
    height: 150,
    borderRadius: 200
  },
  userName: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '900',
    paddingTop: 16,
    fontSize: 30,
    color: '#2F2E41'
  },
  userEmail: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 3
  },
  flexContainer: {
    marginTop: 80,
    marginBottom: 80,
    flexDirection: 'row', // Arrange elements horizontally
    justifyContent: 'center'
  },

  lostNFound: {
    flex: 1, // Take equal space
    justifyContent: 'center',
    alignItems: 'center', // Center text horizontally
    backgroundColor: 'fff',
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     // drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7, //  drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
    zIndex: -1
  },

  primaryButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 20
  },

  secondaryButton: {
    alignItems: 'center',
    //  backgroundColor: '#FAF2F2',
    borderRadius: 50,
    width: '85%',
    padding: 18,
    marginBottom: 10,
    marginTop: 10
  },
  secondaryButtonText: {
    color: '#9E8B8D',
    fontWeight: '900',
    fontSize: 20
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
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7 // drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },

  tertiaryButtonTitle: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 50
  },

  tertiaryButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 18,
    marginTop: -6,
    marginBottom: 6,
  },
  profileimage: {
    width: 400,
    height: 200,
    borderRadius: 20,
  },
});

