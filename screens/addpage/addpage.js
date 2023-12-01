/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Modal, Button, View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageViewer from '../components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import ImageButton from '../components/Buttons';
import InputField from '../components/InputField';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { Marker } from 'react-native-maps';
import MarkerList from '../components/MapMarkers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';


function AddPage({ route }) {
  const navigation = useNavigation(); // used for navigation.navigate()

  // information entered by the user that needs to be sent to the database for an Item.
  // const [name, setName] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const { userID } = useUser();

  // Main categories. May have subcategories in a different dropdown/selection tool (color? etc.) later.
  const [categories, setCategories] = useState([
    {label: 'Books/Notebooks', value: 'books'},
    {label: 'Clothing/Accessories', value: 'clothing'},
    {label: 'Electronics', value: 'electronics'},
    {label: 'Keys', value: 'keys'},
    {label: 'Personal Items (Umbrella, Water Bottle, etc.)', value: 'items'},

    {label: 'Other', value: 'other'}, // catch-all
  ]); 

  const [location, setLocation] = useState("Select Location"); // TODO: no way to reset location after it has been selected.
  const locationButtonTextStyle = location === "Select Location" ? styles.locationButtonTextUnselected : styles.locationButtonText;
  const [lostorfound, setLostOrFound] = useState("found") // the user either lost or found this item. A string for now but could technically be a boolean.
  
  const date = new Date().toLocaleDateString(undefined, {year: 'numeric', month: 'numeric', day: 'numeric',});

  // for Switch (selecting lost/found)
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (status) => {
    setLostOrFound(status);
  }
  

  // useStates for dropdown (category)
  const [value, setValue] = useState(null); // value stored in dropdown (see categories item label/value)
  const [open, setOpen] = useState(false); // handles user clicking on dropdown. Opens/closes the dropdown menu.

  const [userID, setUserID] = useState('');
  const [userName, setUsername] = useState('');

  // useStates for camera images
  const [hasPermission, setHasPermission] = useState(null);
  
  useEffect(() => {
    // Retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { ID, userName, email, username, password } = JSON.parse(userData);
                setUserID(ID)
                setUsername(userName);
            }
        } catch (error) {
            console.error(error);
        }
    };

    retrieveUserData();
}, []);

  // image handled below

  const PlaceholderImage = require('./assets/icon.png');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      base64: true, // enables the return of binary image data 
    });

    if (!result.canceled) {
      // setSelectedImage(result.assets[0].uri); // old solution
      const file = result.assets[0].base64; // base 64 image data
      setSelectedImage(`data:image/jpeg;base64,${file}`); // uri = image data
    } else {
      alert('You did not select any image.');
    }
  }

  // set permissions to use camera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // image selection from camera
  const handleImageSelection = async (fromCamera) => {
    if (hasPermission === null) {
      return;
    }
    if (hasPermission === false) {
      alert('No access to camera.');;
    }

    if (fromCamera) {
      await takePhoto();
    } else {
      await pickImageAsync();
    }
  };


  // Function to launch the camera to take a photo
  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      base64: true, // enables the return of binary image data 
    });

    if (!result.canceled) {
      const file = result.assets[0].base64; // base 64 image data
      setSelectedImage(`data:image/jpeg;base64,${file}`); // uri = image data
    } else {
      alert('You did not take a photo.');
    }
  };

  const handleCreateItem = async () => {
    /* a flag to prevent the user from sending multiple upload 
      requests (by pressing the button repeatedly) */
    if (isUploading === true) return;
    if (title !== "") { // item MUST have a title
      const finalLocation = location === "Select Location" ? "N/A" : location;
      try {
      setIsUploading(true);

        // send information about item
        // Image data is handled in service
        await fetch('https://calvinfinds.azurewebsites.net/items', {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            title, description, category: value, location: finalLocation, lostFound: lostorfound, datePosted: date, postUser: userID, claimUser: null,
            archived: false, imagedata: await selectedImage, // selectedImage = base64 image data + uri string (see pickImageAsync) 
          }),
        })
      } catch (error) {
        console.error(error);
      }
      // navigate back to the main page. Send back which route it is coming from.
      navigation.navigate('MainPage', { prevRoute: route.name })
    } else {
      alert('Your post MUST include a title.')
    }
  }

  function GetMarkerList() {
    return MarkerList(setLocation);
  }

  const [isInputFieldFocused, setInputFieldFocused] = useState(false);
  const [isDescriptionFocused, setDescriptionFocused] = useState(false);
  const [inputDescription, setInputDescription] = useState('');
  const [isMapVisible, setMapVisible] = useState(false);


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : -20} // Adjust the offset as needed
    >
      <View style={styles.imageSelector}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          // onPress={() => handleImageSelection(true)} // click on image to modify. Should probably *change* the default to make it more apparent that you can modify/upload images.
        />

        {/* buttons for using the camera or choosing from the gallery */}
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.imageButton} onPress={() => handleImageSelection(true)}>
            <Text style={styles.imageButtonText}>Take a Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={() => handleImageSelection(false)}>
            <Text style={styles.imageButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* A list of options for what kinds of things the user can add 
        (an item they lost or something they found). */}
      <View style={styles.inputContainer}>

        <View style={styles.switchButtonContainer}>
          <TouchableOpacity 
            style={[styles.button, lostorfound === "found" ? styles.activeButton : styles.inactiveButton]} 
            onPress={() => toggleSwitch("found")}
          >
            <Text style={[styles.buttonText, lostorfound === "found" ? styles.activeButtonText : styles.inactiveButtonText]}>I Found</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, lostorfound === "lost" ? styles.activeButton : styles.inactiveButton]} 
            onPress={() => toggleSwitch("lost")}
          >
            <Text style={[styles.buttonText, lostorfound === "lost" ? styles.activeButtonText : styles.inactiveButtonText]}>I Lost</Text>
          </TouchableOpacity>

        </View>

        <View style={[styles.input, isInputFieldFocused && styles.inputFocused]}>
          <TextInput
              placeholder="1 to 2 words for title"
              placeholderTextColor="#9E8B8D" 
              onChangeText={(text) => setTitle(text)}
              onFocus={() => setInputFieldFocused(true)}
              onBlur={() => setInputFieldFocused(false)}
              style={styles.inputText}
          />
        </View>
        {/* <InputField header="Description" bodySize={50} changeText={setDescription} /> */}
        <View style={[styles.input, isDescriptionFocused && styles.inputFocused]}>
          <TextInput
              placeholder="Item Description"
              placeholderTextColor="#9E8B8D" 
              onChangeText={(text) => setDescription(text)}
              onFocus={() => setDescriptionFocused(true)}
              onBlur={() => setDescriptionFocused(false)}
              style={styles.inputText}
          />
        </View>
        {/* From react-native-dropdown-picker, https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage */}
        <DropDownPicker 
          style={{
            borderColor: 'transparent',
            width: "100%",
            // padding: 5,
          }}
          containerStyle={{
            backgroundColor: '#fff',
            borderRadius: 15,
            paddingVertical: 5,
          }}
          items={categories}
          value={value}
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setCategories}
          placeholder=" Select a category"
          placeholderStyle={{   // <-- Added this prop
            fontSize: 20,       // Change to your desired font size
            fontWeight: '900',  // Change to your desired font weight
            color: '#9E8B8D',
          }}
          labelStyle={{  
            fontSize: 20,       // Change to your desired font size
            fontWeight: '900',  // Change to your desired font weight
            color: '#342F2F',
          }}
          listItemLabelStyle={{
            fontSize: 16,       // Change to your desired font size for items
            fontWeight: '900',   // Change to your desired font weight for items
            color: '#342F2F',
          }}
          dropDownContainerStyle={{
            borderColor: 'transparent',
            zIndex: 999,
          }}
          
          /* It would be great if it was more apparent that the user can scroll down through a list of categories.
             My initial thought was to make the scroll bar always visible (instead of just while scrolling), but I
             haven't gotten that to work yet. */
             // possible props I could modify [vvv] to accomplish [^^^]
          // containerProps={{
            // the dropdown container (a 'View')
          // }}
          // dropDownContainerStyle={{
          // }}
        />
        {/* Location Field */}
        {/* From react-native-maps, https://docs.expo.dev/versions/latest/sdk/map-view/ 
        and https://github.com/react-native-maps/react-native-maps#using-a-mapview-while-controlling-the-region-as-state */}
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setMapVisible(true)} >
          <View style={styles.row}>
            <Image source={require('../../assets/pin.png')} style={styles.icon} />
            <Text style={locationButtonTextStyle}>{location}</Text>
          </View>
          
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isMapVisible}
          onRequestClose={() => {
            setMapVisible(!isMapVisible);
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MapView
              style={styles.map}
              /* lat-long = 42.93105829800732, -85.58688823855098 (approx center [slightly south] of west side of campus) */
              region={{
                latitude: 42.93105829800732,
                longitude: -85.58688823855098,
                latitudeDelta: 0.007,
                longitudeDelta: 0.005,
              }}
              mapType='hybrid'
              minZoomLevel={14} // prevents the user from zooming out too far. Keeps them in the context of the school.
            >
              {/* Space for Markers (and other components that can be in maps). */}
              {GetMarkerList()}
            </MapView>
            <View style={
              {paddingVertical: 10}
            }>
              <View style={styles.row}>
                <Text style={styles.primaryButtonText}>Selected Location: </Text>
                <Text style={locationButtonTextStyle}>{location === "Select Location" ? "Not Selected" : location}</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.secondaryButton, styles.closeMapButton]} onPress={() => setLocation("Select Location")} >
              <Text style={styles.primaryButtonText}>Reset Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondaryButton, styles.closeMapButton]} onPress={() => setMapVisible(false)} >
              <Text style={styles.primaryButtonText}>Close Map</Text>
            </TouchableOpacity>

          </View>
        </Modal>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.inactiveButton]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.buttonText, styles.inactiveButtonText]}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.activeButton ]} 
            onPress={() => handleCreateItem()}
          >
            <Text style={[styles.buttonText, styles.activeButtonText, styles.submitButton]}>Submit</Text>
          </TouchableOpacity>

        </View>
        {/* <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Discard</Text>
        </TouchableOpacity> */}
        {/* <Button title="Submit Item" onPress={() => handleCreateItem()} /> */}
        {/* <TouchableOpacity style={styles.primaryButton} onPress={() => handleCreateItem()}>
          <Text style={styles.primaryButtonText}>Submit Item</Text>
        </TouchableOpacity> */}
      </View>


        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',    
    backgroundColor: '#EDE7E7',
  },
  inputContainer: {
    flex: 1,
    // justifyContent: 'center',
    // justifyContent: 'flex-end', 
    alignItems: 'center',
    width: '90%',
  },
  // inputContainer: {
  //   borderRadius: 15,
  //   width: '100%',
  //   marginBottom: 20,
  // },
  
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    marginBottom: 30,
    padding: 3,
    paddingHorizontal: 15,
    backgroundColor: '#f5f0f0',
    borderRadius: 15,
    
  },
  inputText:{
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: '#2F2E41',
    height: 60,
  },

  inputFocused: {
    backgroundColor: 'white',
    
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
    width: '85%',
    flexDirection: 'row',
    color: '#FAF2F2',
    zIndex: -1,
    // backgroundColor: '#FAF2F2',
   // drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },
  switchButtonContainer: {
    marginTop: 30,
    marginBottom: 30,
    width: '85%',
    flexDirection: 'row',
    color: '#FAF2F2',
    backgroundColor: '#FAF2F2',
    borderRadius: 50,
    maxWidth: 350,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     // drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },
  button: {
    flex: 1,
    borderRadius: 50,
    padding: 18,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '900',
    fontSize: 20,
  },
  activeButton: {
    backgroundColor: '#FFAF66',
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     // drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },
  inactiveButton: {
    backgroundColor: 'transparent',
  },
  activeButtonText: {
    color: '#342F2F',
  },
  inactiveButtonText: {
    color: '#9E8B8D',
  },
  switchContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    // marginHorizontal: '10%',
    alignItems: 'center',
  },
  selectText: {
    fontWeight: 'bold',
    color: '#DBB3E3',
    fontSize: 24,
  },
  unselectText: {
    color: '#00000099',
  },
  dropdown: {
    // backgroundColor: 'fff',
    // borderColor: 'fff',
    // zIndex: 9,
  },
  map: {
    width: '100%',
    height: '90%',
    borderRadius: 20,
    flex: 1,
  },

  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#FFAF66',
    borderRadius: 50,
    width: '85%',
    padding: 18,
    marginBottom: 10,
    marginTop: 10,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     // drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
    zIndex: -1,
  },
  row: {
    flexDirection: 'row',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#FAF2F2',
    borderRadius: 50,
    width: '85%',
    padding: 18,
    marginTop: 30,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     // drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
    zIndex: -1,
  },
  icon: {
    marginRight: 8,
    width: 25, // or whatever size you want
    height: 25, // or whatever size you want
  },
  closeMapButton: {
    marginBottom: 20,
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 20,
  },
  locationButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 20,
  },
  locationButtonTextUnselected: {
    color: '#9E8B8D', // New color for unselected state
    fontWeight: '900',
    fontSize: 20,
  },
  imageSelector:{ 
    flexDirection: 'row' 
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageButton: {
    backgroundColor: 'rgba(237,231,231, 0.6)',
    paddingHorizontal: 25,
    paddingVertical: 15,
    minWidth: 220,
    borderRadius: 50,
    marginVertical: 8,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#342F2F',
    fontSize: 18,
    fontWeight: '900',
  },
});

export default AddPage;
