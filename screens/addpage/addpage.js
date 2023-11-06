import React, { useEffect, useState } from 'react';
import { Modal, Button, View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageViewer from '../components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import ImageButton from '../components/Buttons';
import InputField from '../components/InputField';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { Marker } from 'react-native-maps';
import MarkerList from '../components/MapMarkers';

function AddPage({ route }) {
  const navigation = useNavigation(); //used for navigation.navigate()

  //information entered by the user that needs to be sent to the database for an Item.
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  

  //Main categories. May have subcategories in a different dropdown/selection tool (color? etc.) later.
  const [categories, setCategories] = useState([
    {label: 'Books/Notebooks', value: 'books'},
    {label: 'Clothing/Accessories', value: 'clothing'},
    {label: 'Electronics', value: 'electronics'},
    {label: 'Keys', value: 'keys'},
    {label: 'Personal Items (Umbrella, Water Bottle, etc.)', value: 'items'},

    {label: 'Other', value: 'other'}, //catch-all
  ]); 

  const [location, setLocation] = useState(null);
  const [lostorfound, setLostOrFound] = useState("found") //the user either lost or found this item. A string for now but could technically be a boolean.
  
  //for Switch (selecting lost/found)
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = (status) => {
    setLostOrFound(status);
  }
  

  //useStates for dropdown (category)
  const [value, setValue] = useState(null); //value stored in dropdown (see categories item label/value)
  const [open, setOpen] = useState(false); //handles user clicking on dropdown. Opens/closes the dropdown menu.

  //image handled below

  const PlaceholderImage = require('./assets/icon.png');
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
      console.log(lostorfound);
    }
  }



  const handleCreateItem = async () => {
    if (name != "") { //item MUST have a name
      //send information
        fetch('https://calvinfinds.azurewebsites.net/items', {
          method: 'POST',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            name: name, description: description, category: value, location: location, lostFound: lostorfound, postUser: 'Edom@gmail.com', claimUser: null //still need image. postUser is hardcoded for 11/3 demo.
          }),
         
        })
        .then((response) => response.json)
        .catch(error => {
          console.error(error);
        });
      //navigate back to the main page. Send back which route it is coming from.
      navigation.navigate('MainPage', { prevRoute: route.name })
    } else {
      alert('Your post MUST include a title.')
    }
  }

  const [isInputFieldFocused, setInputFieldFocused] = useState(false);
  const [isDescriptionFocused, setDescriptionFocused] = useState(false);
  const [title, setTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [isMapVisible, setMapVisible] = useState(false);


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImageAsync}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          onPress={pickImageAsync} //click on image to modify. Should probably *change* the default to make it more apparent that you can modify/upload images.
        />
      </TouchableOpacity>

      {/* A list of options for what kinds of things the user can add 
        (an item they lost or something they found). */}
      <View style={styles.inputContainer}>

        <View style={styles.buttonContainer}>
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
              onChangeText={(text) => setInputDescription(text)}
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
            //padding: 5,
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
            color: '#342F2F',
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
             //possible props I could modify [vvv] to accomplish [^^^]
          //containerProps={{
            //the dropdown container (a 'View')
          //}}
          //dropDownContainerStyle={{
          //}}
        />
        {/* Location Field */}
        {/* From react-native-maps, https://docs.expo.dev/versions/latest/sdk/map-view/ 
        and https://github.com/react-native-maps/react-native-maps#using-a-mapview-while-controlling-the-region-as-state */}
        {/* Currently a very small map. Might even make sense to put it on another page (or expand it on the current page) so that it is easier to navigate/interact with */}
        <Button title="Select Location" onPress={() => setMapVisible(true)} />
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
              //provider='google' //would force use of google maps (according to docs). Might use if accommodating both google and apple maps is too time-consuming.
              /* lat-long = 42.93105829800732, -85.58688823855098 (approx center [slightly south] of west side of campus) */
              region={{
                latitude: 42.93105829800732,
                longitude: -85.58688823855098,
                latitudeDelta: 0.007,
                longitudeDelta: 0.005,
              }}
              mapType='hybrid'
              minZoomLevel={14} //prevents the user from zooming out too far. Keeps them in the context of the school.
              //onMarkerPress={e => console.log(e.nativeEvent)} //eventually set to the name of the selected marker (or the id if the details page shows same map (main page > click on a listing/card > shows more details on details page))
            >
              {/* Space for Markers (and other components that can be in maps). */}
              {MarkerList()}
            </MapView>
            <Button title="Close Map" onPress={() => setMapVisible(false)} />
          </View>
        </Modal>
              {/* <Button title="Submit Item" onPress={() => handleCreateItem()} /> */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => handleCreateItem()}>
          <Text style={styles.primaryButtonText}>Submit Item</Text>
        </TouchableOpacity>
      </View>

       

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',    
    backgroundColor: '#EDE7E7',
  },
  inputContainer: {
    marginTop: 30,
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
    flexDirection: 'row',
    bottom: 15,
    color: '#FAF2F2',
    backgroundColor: '#FAF2F2',
    borderRadius: 50,
    maxWidth: 350,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
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
  },
  inactiveButton: {
    backgroundColor: '#FAF2F2',
  },
  activeButtonText: {
    color: '#342F2F',
  },
  inactiveButtonText: {
    color: '#C2A3A3',
  },
  switchContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    //marginHorizontal: '10%',
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
    width: '80%',
    padding: 18,
    marginBottom: 30,
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
});

export default AddPage;
