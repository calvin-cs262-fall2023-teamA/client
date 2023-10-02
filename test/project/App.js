import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from './styles/global';
import SubmitApp from "./screens/submit";
import MyTextInput from './text';

function HomeScreen({ navigation }) {

  /* Hardcode a "database"/list of movies. For both pages */
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
          {/* Get rid of that ugly button and, instead, display our list of movies. 1st page */}
          <FlatList data={reviews} renderItem={({ item })=> (
              <TouchableOpacity onPress={() => navigation.navigate('Details', item)}>
                  <Text>{ item.title + "\n"}</Text>
              </TouchableOpacity>
          )} />
      </View>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {

  return (
      <View style={{ flex: 1, padding: 20}}>
          {/* Display the fields of the received movie object. 2nd page*/}
          <Text>{ route.params.name + "\n"}</Text>
          <Text>{ route.params.task1 + "\n"}</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MyTextInput />
          </View>
          <Text>{ route.params.description }</Text>
          <Text>{ route.params.pickImage }</Text>
          <Text>{ route.params.email + "\n"}</Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MyTextInput />
          </View>
          <Button title="Submit" onPress={() => navigation.navigate('Submit')}/>
      </View>
  );
}


const Stack = createNativeStackNavigator();

function App() {
  const [showAppOptions, setShowAppOptions] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Submit" component={SubmitApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


