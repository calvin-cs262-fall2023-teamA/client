import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyTextInput from './text';
import ImageViewer from '../components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import ImageButton from '../components/Buttons';
import InputField from '../components/InputField';

function AddPage({ route }) {
  const navigation = useNavigation(); //used for navigation.navigate()

  //information entered by the user that needs to be sent to the database for an Item.
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); //may need several, one for now until we figure out what those should be.
  const [location, setLocation] = useState(null);
  //status = resolved or unresolved. Not entered when creating the card.
  const [lostorfound, setLostOrFound] = useState("lost") //either lost or found. A string for now but could be a boolean.
  //image handled below

  const PlaceholderImage = require('../../assets/icon.png');
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
    <View style={{ flex: 1, padding: 20 }}>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImageAsync}>
        {/*make this work like a button press then remove the actuall button (or put placeholder text on the placeholder image)? Refer to figma design.*/}
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
          onPress={pickImageAsync}
        />
      </TouchableOpacity>

      {/* A list of options for what kinds of things the user can add 
        (an item they lost or something they found). */}
      <View style={styles.inputContainer}>
        <InputField header="Title" bodySize={50} changeText={setName} />
        <InputField header="Description" bodySize={100} changeText={setDescription} />
          {/* change to a dropdown later. */}
        <InputField header="Category" bodySize={50} changeText={setCategory} />
      </View>
       
      

      {/* Go to Selection screen and send back which route it is coming from. 
      Should return route.name for whatever route triggers the alert.*/}
      <Button title="Submit Item" onPress={() => navigation.navigate('MainPage', { prevRoute: route.name })} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    paddingBottom: 8,
    marginBottom: 200,
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  inputContainer: {
    
  }
});

export default AddPage;
