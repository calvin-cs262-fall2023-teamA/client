import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from './styles/global';
import MyTextInput from './text';


function AddPage() {

  const navigation = useNavigation(); //used for navigation.navigate()

  /* A list of options for what kinds of things the user can add 
  (an item they lost or something they found). */
  const [reviews, setReviews] = useState([
      { title: "Add lost Item", task1: "What is your lost item?", name: "", key: '1',
          description: "Add a picture here", email: "What is your email?",
          pickImage: <Button title="Pick an image" onPress={() => navigation.navigate('Submit')}/> },
      { title: "Add found Item", task1: " ", key: '2',
          description: "Where did you find this item?", name: "What is your name?", email: " "},

  ]);

  return (
    <View style={globalStyles.container}>
      <View style={{ flex: 1, padding: 20}}>
          {/* Display list of options (add lost/add found) */}
          <FlatList data={reviews} renderItem={({ item })=> (
              <TouchableOpacity onPress={() => navigation.navigate('AddDetails', item)}>
                  <Text>{ item.title + "\n"}</Text>
              </TouchableOpacity>
          )} />
      </View>
    </View>
  );
}

export default AddPage;


