import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from './styles/global';
import MyTextInput from './text';
import ImageViewer from '../components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import ImageButton from '../components/Buttons';

function AddPage({ route }) {
  const navigation = useNavigation(); //used for navigation.navigate()

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

  /* A list of options for what kinds of things the user can add 
  (an item they lost or something they found). */
  const [reviews, setReviews] = useState([
    {
      title: "Add lost Item",
      title2: "",
      task1: "What is your lost item?",
      name: "",
      key: '1',
      email: "What is your email?",
      pickImage: ""
    },
    {
      title: "",
      title2: "Add found Item",
      task1: " ",
      key: '2',
      description: "Where did you find this item?",
      name: "What is your name?",
      email: " ",
    },
  ]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Display the fields of the received movie object. 2nd page*/}
      <Text>{ "\n" + "\n" + reviews[0].name + "\n"}</Text>
      <Text>{ reviews[0].task1 }</Text>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <MyTextInput />
      </View>
      <Text>{ reviews[1].description }</Text>
      <Text>{ reviews[1].pickImage }</Text>
      <Text>{"\n" + "\n" + "\n" + reviews[1].email }</Text>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <MyTextInput />
      </View>

      {/* Selection screen uses info about which page directed to
        it to determine what to display.*/}
      <View style={styles.footerContainer}>
        <ImageButton theme="primary" label="Choose a photo" onPress={pickImageAsync} />
      </View>

      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>

      {/* Go to Selection screen and send back which route it is coming from. 
      Should return route.name for whatever route triggers the pop up.*/}
      <Button title="Submit" onPress={() => navigation.navigate('MainPage', { prevRoute: route.name })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingBottom: 8,
    marginBottom: 200,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    // flex: 1 / 3,
    marginBottom: 10,
  },
});

export default AddPage;
