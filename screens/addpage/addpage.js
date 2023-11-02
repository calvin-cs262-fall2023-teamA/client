import React, { useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
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
  //status = resolved or unresolved. Not entered when creating the card.
  const [lostorfound, setLostOrFound] = useState("lost") //the user either lost or found this item. A string for now but could technically be a boolean.
  
  //for Switch (selecting lost/found)
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState); 
    isEnabled ? setLostOrFound("found") : setLostOrFound("lost");
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
            name: name, description: description, category: value, location: location, status: "not claimed" //nothing for whether it was lost/found (lostorfound)
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
  

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImageAsync}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          onPress={pickImageAsync} //click on image to modify. Should probably *change* the default to make it more apparent that you can modify/upload images.
        />
      </TouchableOpacity>

      {/* A list of options for what kinds of things the user can add 
        (an item they lost or something they found). */}
      <View style={styles.inputContainer}>
        <View style={styles.switchContainer}>
          {/* Text and a switch */}
          <Text style={!isEnabled ? styles.selectText : styles.unselectText}>I Lost...</Text>
          <Switch
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text style={isEnabled ? styles.selectText : styles.unselectText}>I Found...</Text>
        </View>
        <InputField header="Title" bodySize={50} changeText={setName} />
        <InputField header="Description" bodySize={100} changeText={setDescription} />
        {/* From react-native-dropdown-picker, https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage */}
        <DropDownPicker 
          style={styles.dropdown}
          items={categories}
          value={value}
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setCategories}

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
      </View>
       
      <Button title="Submit Item" onPress={() => handleCreateItem()} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    //paddingBottom: 8,
    marginBottom: 75,
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  inputContainer: {
    marginBottom: '0%',
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
    
  },
  map: {
    width: '90%',
    height: '35%',
    alignSelf: 'center',
  }
});

export default AddPage;
