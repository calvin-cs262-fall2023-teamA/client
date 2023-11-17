import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from '../../styles/detailsStyles';
import * as demoImageGetter from '../addpage/demoimages.js'; //specifically for demo. final images will probably work differently
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = ({ navigation, route }) => {
  const [comment, setComment] = useState(''); // State to store the entered comment
  const [displayedComment, setDisplayedComment] = useState([]); // State to store the comment to be displayed
  const {itemData} = route.params; //json information passed to the details page
  //console.log(itemData);
  
  // these states are used to display username for comments
  const [userName, setUsername] = useState('');
  const [userID, setUserID] = useState('');


  //useStates for dropdown (category)
  const [value, setValue] = useState(null); //value stored in dropdown (see categories item label/value)
  const [open, setOpen] = useState(false); //handles user clicking on dropdown. Opens/closes the dropdown menu.
  
  useEffect(() => {
    // Retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { ID, userName } = JSON.parse(userData);
                setUserID(ID)
                setUsername(userName);
            }
        } catch (error) {
            console.error(error);
        }
    };

    retrieveUserData();
}, []);

  const handleSendPress = () => {
    // Add the new comment to the list of displayedComments
    setDisplayedComment((prevComments) => [...prevComments, comment]);
    // Clear the comment in the TextInput
    setComment('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* ... other components ... */}
        <View style={styles.contentContainer}>
          <Image
          //TODO: change from '../../assets/DemoPlaceholders/demobottle.jpg' to '../../assets/placeholder.jpg' after demo
            source={itemData.itemimage == null ? require('../../assets/DemoPlaceholders/demobottle.jpg') : demoImageGetter.getImage(itemData.itemimage)} // Placeholder image for post. item.itemimage is a uri for now
            style={styles.postImage}
          />
          <View style={styles.row}>
            <View>
              <Text>I {itemData.lostfound} a...</Text>
              <Text style={styles.itemName}>{itemData.title}</Text>
            </View>
            <View>
              <Text style={styles.location}>Location:</Text>
              <Text style={styles.locationName}>{itemData.location}</Text>
            </View>   
          </View>
          <View style={styles.commentContainer}>
            <TouchableOpacity
              onPress={() => {
                //send information to the main (current) page to "reset" the pop-up.
                //Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
                navigation.navigate({
                  name: 'Profile',
                  params: { prevRoute: 'reset' },
                  merge: true,
                });
                //navigate to the AddPage (where the user will actually end up)
                navigation.navigate('Profile');
              }}
            >
              <Image source={require('../../assets/user.png')} style={styles.userIconStyle} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.userName}>{itemData.name}</Text>
              <Text style={styles.userComment}>{itemData.description}</Text>
            </View>


            {/* dropdown for close and open bottomContainer to see all comments. */} 
          </View>

        </View>
        {/* Implement scroll for comments with ScrollView */}
        <ScrollView style={styles.commentsContainer}>
          {/* makes comments appear seperate from each other so it looks like two posts and not one when someone comments twice */}
          {displayedComment.map((comment, index) => (
            <View key={index} style={styles.commentContainer}>
              <TouchableOpacity
                onPress={() => {
                // Send information to the main (current) page to "reset" the pop-up.
                // Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
                navigation.navigate({
                  name: 'Profile',
                  params: { prevRoute: 'reset' },
                  merge: true,
                });
                // Navigate to the AddPage (where the user will actually end up)
                navigation.navigate('Profile');
      }}
    >
                <Image source={require('../../assets/user2.jpg')} style={styles.userIconStyle} />
              </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userComment}>{comment}</Text>
            </View>
          </View>
        ))}  
        </ScrollView>
        <View style={styles.bottomContainer}>
          {/* user input */}
          
          <View style={styles.commentContainer}>
            <TouchableOpacity
              onPress={() => {
                // Send information to the main (current) page to "reset" the pop-up.
                // Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
                navigation.navigate({
                  name: 'Profile',
                  params: { prevRoute: 'reset' },
                  merge: true,
                });
                // Navigate to the AddPage (where the user will actually end up)
                navigation.navigate('Profile');
              }}
            >
              <Image source={require('../../assets/user.png')} style={styles.userIconStyle} />
            </TouchableOpacity>
            <View style={styles.input}>
              <TextInput
                placeholder="Leave a comment here  "
                placeholderTextColor="#9E8B8D"
                style={styles.inputText}
                autoCapitalize={'none'}
                value={comment}
                onChangeText={(text) => setComment(text)} // Update the comment state
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
                <Image source={require('../../assets/send.png')} style={styles.sendIconStyle} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={() => navigation.goBack()}>
              <Text style={styles.primaryButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
              <Text style={styles.primaryButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Details;


