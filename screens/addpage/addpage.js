import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from './styles/global';
import MyTextInput from './text';


function AddPage() {

  const navigation = useNavigation(); //used for navigation.navigate()
  
  /* A list of options for what kinds of things the user can add 
  (an item they lost or something they found). */
  // <Button title="Pick an image" onPress={() => navigation.navigate('Submit')}/>
  const [reviews, setReviews] = useState([
      { title: "Add lost Item", title2: "", task1: "What is your lost item?", name: "", key: '1',
          email: "What is your email?",
          pickImage: ""
        },
      {title: "", title2: "Add found Item", task1: " ", key: '2',
          description: "Where did you find this item?", name: "What is your name?", email: " "},

  ]);

  return (
    <View style={globalStyles.container}>
      <View style={{ flex: 1, padding: 20}}>
          {/* Display list of options (add lost/add found) */}
          <FlatList data={reviews} renderItem={({ item })=> (
              <TouchableOpacity onPress={() => 
                { 
                  {/* vvv sends information back to Selection screen */}
                  navigation.navigate({
                    name: 'Selection',
                    params: { prevRoute: "reset"},
                    merge: true,
                  }),
                  navigation.navigate('AddDetails', item)
                }}>
                  <Text style={{ marginTop: 10, textAlign: 'center' }}>{item.title }</Text>
                  <Text style={{ marginTop: -10, textAlign: 'center'  }}>{ item.title2 + "\n"}</Text>
              </TouchableOpacity>
          )} />
      </View>
      
    </View>
  );
}

export default AddPage;


