/* eslint-disable import/namespace */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '../../components/ImageViewer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupScreen3 from './profileHelpPage';
/**
 * Profile component for displaying user profile information.
 * This page allows users to view their profile details, including username, email, and profile picture.
 * Users are also able to click on buttons that bring them to a version of the mainpage that only contain their own posts/archives.
 * @returns {JSX.Element} - JSX representation of the profile page component.
 * */

const Profile = () => {
  const navigation = useNavigation()

  // image handled below

  const [PlaceholderImage, setPlaceholderImage] = useState(require('../../assets/profileIcon.png')); // can be overwritten for now. will likely be reverted later
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState(false); // for retrieving image data
  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [userName, setUsername] = useState('');
  let profileIcon = '';
  const [postedCount, setPostedCount] = useState('-');
  const [archivedCount, setArchivedCount] = useState('-');

  const [userLoading, setUserLoading] = useState(true);

  const [isPopupVisible, setPopupVisibility] = useState(false);

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  

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
                profileIcon = profileimage;
            }
        } catch (error) {
            console.error(error);
        }
        
        if (profileIcon) {
          /* "|| (profileIcon).includes('../')" if the service does not return a base64 uri, it will return a local url (../../assets/profileIcon.png by default) 
                The reason for this is that old versions of the system would fail if there was no default in the database */
          setPlaceholderImage((profileIcon == null || (profileIcon).includes('../')) ? require('../../assets/profileIcon.png') : { uri: profileIcon});
          setUserLoading(false);
        }
        
    };
    
      retrieveUserData();
}, []);

useEffect(() => {
  // called when the user selects an image and the 'selectedImage' changes
  if (selectedImage != null) handleNewImage();
}, [selectedImage])

useEffect(() => {
  // whenever user data is gotten from async storage (currently the only time setUserID is used.)
  // necessary because userID is needed for the updateCount function, but wasn't updated because retrieveUserData is async 
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
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: .25,
      base64: true, // enables the return of binary image data 
    })

    if (!result.canceled) {
      const file = result.assets[0].base64; // base 64 image data
      setSelectedImage(`data:image/jpeg;base64,${file}`); // uri = image data      
      // could upload here and store locally, but download into async storage at login
    } else {
      alert('You did not select any image.');
    }
  }

  /**
   * When a new image is selected,
   * - sends image data to the webservice (which sends info to database/storage account)
   * - updates local data for the user's image (async storage)
   */
  const handleNewImage = async () => {
    /* update in service */
    
    const response = await fetch('https://calvinfinds.azurewebsites.net/users/image', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id: userID, imagedata: selectedImage,
        }),
      })
      .then((response) => {response.json})
      .catch(error => {
        console.error(error);
    });
    // trigger updateLocalImage
    setStatus(!status);
  }

  const updateLocalImage = async () => {
    /* update local information */
    // may need to be in a useeffect as well
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const postResponse = await fetch(`https://calvinfinds.azurewebsites.net/users/image/${userID}`);
        const postJson = await postResponse.json();
        // replace the image
        const storeJson = JSON.stringify({ ID: userID, userName, email, password: userData.password, profileimage: postJson.userimage });
        await AsyncStorage.setItem('userData', storeJson);
      }
    } catch (error) {
      console.log(`profile image download error: ${error}`);
    }
  }

  useEffect(() => {
    // local changes to the image. triggered at the end of handleNewImage()
    if (status) updateLocalImage();
  }, [status])

  const handleLogout = async () => {
    try {
      // Clear all stored data in AsyncStorage on logout
      await AsyncStorage.clear()
      // Navigate to the login page
      navigation.navigate('Login', { prevRoute: 'Login' })
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.helpButtonContainer} onPress={togglePopup}> 
        <Text style={styles.helpButton}>?</Text>
      </TouchableOpacity>
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

      <PopupScreen3 isVisible={isPopupVisible} onClose={togglePopup} />

        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.navigate('MainPage', { prevRoute: "post", key: Math.random().toString()})}>
          <Text style={styles.tertiaryButtonTitle}>{postedCount}</Text>
          <Text style={styles.tertiaryButtonText}>Posted</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.navigate('MainPage', { prevRoute: "archived", key: Math.random().toString()})}>
          <Text style={styles.tertiaryButtonTitle}>{archivedCount}</Text>
          <Text style={styles.tertiaryButtonText}>Archived</Text>
        </TouchableOpacity> 


      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('MainPage')}>
        <Text style={styles.primaryButtonText}>Go to Main Page</Text>
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
    fontSize: 50,
  },
  helpButtonContainer: {
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    right: 10,
    top: 0,
    zIndex: 500,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7, // android shadow
    ...Platform.select({
      ios: {
        top: 40,
      },
      android: {
        top: 0,
      },
      default: {
        top: 0,
      },
    }),
  },
  helpButton: {
    color: '#9E8B8D', 
    fontSize: 20,   
    fontWeight: 'bold',      
    paddingHorizontal: 8,
    borderRadius: 10,
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

