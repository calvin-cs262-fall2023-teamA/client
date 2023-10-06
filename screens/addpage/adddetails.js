import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from './styles/global';
import MyTextInput from './text';
import ImageViewer from '../components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import ImageButton from '../components/Buttons';

/*currently get a warning that "non-serializable values were found in the navigation state. Check:
    AddDetails > params.pickImage.$$typeof (Symbol(react.element))" 
    when transitioning from addpage to this screen. It still runs though but would be nice to
    look into when there is time.*/

function AddDetails({ route, navigation }) {
    //const navigation = useNavigation();
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
        <View style={{ flex: 1, padding: 20}}>
            {/* Display the fields of the received movie object. 2nd page*/}
            <Text>{ "\n" + "\n" + route.params.name + "\n"}</Text>
            <Text>{ route.params.task1 }</Text>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <MyTextInput />
            </View>
            <Text>{ route.params.description }</Text>
            <Text>{ route.params.pickImage }</Text>
            <Text>{"\n" + "\n" + "\n" + route.params.email }</Text>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <MyTextInput />
            </View>

            {/* Selection screen uses info about which page directed to
            it to determine what to display.*/}

            
            <View style={styles.footerContainer}>
          <ImageButton theme="primary" label="Choose a photo" onPress={pickImageAsync} />
            {/* <ImageButton label="Use this photo" /> */}
          </View>

            <View style={styles.imageContainer}>
          <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
          </View>
          
            <Button title="Submit" onPress={() => navigation.navigate('Selection', 
            { prevRoute: route.name })}/> 
            {/* <Button title="Submit" onPress={() => navigation.navigate('Selection')}/> */}
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

export default AddDetails;