import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { globalStyles } from './styles/global';
import MyTextInput from './text';

/*currently get a warning that "non-serializable values were found in the navigation state. Check:
    AddDetails > params.pickImage.$$typeof (Symbol(react.element))" 
    when transitioning from addpage to this screen. It still runs though but would be nice to
    look into when there is time.*/

function AddDetails({ route, navigation }) {

    //const navigation = useNavigation();

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
            <Button title="Submit" onPress={() => navigation.navigate('Selection')}/>
        </View>
    );
}

export default AddDetails;