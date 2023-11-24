/* eslint-disable */
/* I changed this file with eslint up intill the return statement */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import styles from '../../styles/detailsStyles';
import * as demoImageGetter from '../addpage/demoimages.js'; // specifically for demo. final images will probably work differently
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, List } from 'react-native-paper';

function Details({ navigation, route }) {
  const [comment, setComment] = useState(''); // State to store the entered comment
  const [displayedComment, setDisplayedComment] = useState(); 
  // State to store the comment to be displayed
  const {itemData} = route.params; 

  const [isBottomContainerVisible, setBottomContainerVisibility] = useState(true);
  
  // these states are used to display username for comments
  const [userName, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  // useStates for dropdown (category)
  const [profileIcon, setProfileIcon] = useState('');
  const [userLoading, setUserLoading] = useState(true);


  //value stored in dropdown (see categories item label/value)
  const [value, setValue] = useState(null);
  //handles user clicking on dropdown. Opens/closes the dropdown menu.
  const [open, setOpen] = useState(false); 

  //comments
  let readComments = [];
  const [isLoading, setIsLoading] = useState(true); //for loading initial comment content. Will try to load "displayedComment" before it is defined otherwise.
  
  useEffect(() => {
    // Retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { ID, userName, profileimage } = JSON.parse(userData);
                setUserID(ID)
                setUsername(userName);
                setProfileIcon(profileimage); // NOTE: only updates on login
            }
        } catch (error) {
            console.error(error);
        }
        setUserLoading(false);
    };

    retrieveUserData();
  }, []);

  useEffect(() => {
    //run this the first time you load the page to refresh comments. 
    getComments();
  }, []);
  
  const getComments = async () => {
    setIsLoading(true);
    try {
      // Retrieve comments where comment.user.id = this itemdata.id (comments linked to the item's id)
      const response = await fetch(`https://calvinfinds.azurewebsites.net/comments/${itemData.id}`);
        const json = await response.json();
        for (var i in json) {
          //json -> array
          readComments.push(json[i])
        };
        setDisplayedComment(readComments);
      } catch (error) {
        setDisplayedComment([]);
      }
      setIsLoading(false);
  }

  const handleSendPress = async () => {
    //create a new "comment" with user and item data
    /* update server-side (database) */
    fetch('https://calvinfinds.azurewebsites.net/comments/post', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          userID: userID, itemID: itemData.id, content: comment,
        }),
      })
      /* update locally, add the new comment to the list of displayedComments via getComments() */
      .then((response) => {response.json, getComments()})
      .catch(error => {
        console.error(error);
    });

    // Clear the comment in the TextInput
    setComment('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* ... other components ... */}
        <View style={styles.contentContainer}>
          <Image
          // TODO: change from '../../assets/DemoPlaceholders/demobottle.jpg' to '../../assets/placeholder.jpg' after demo
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
                // send information to the main (current) page to "reset" the pop-up.
                // Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
                navigation.navigate({
                  name: 'Profile',
                  params: { prevRoute: 'reset' },
                  merge: true,
                });
                // navigate to the AddPage (where the user will actually end up)
                navigation.navigate('Profile');
              }}
            >
              <Image source={itemData.profileimage == null ? require('../../assets/DemoPlaceholders/demobottle.jpg') : demoImageGetter.getImage(itemData.profileimage)} style={styles.userIconStyle} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.userName}>{itemData.name}</Text>
              <Text style={styles.userComment}>{itemData.description}</Text>
            </View>

          </View>

        </View>
        {/* Implement scroll for comments with ScrollView */}
        {/* TODO: integrate read items */} 
        <ScrollView style={styles.ScrollViewContainer}>
          {/* makes comments appear seperate from each other so it looks like two posts and not one when someone comments twice */}
          {/* only run if isLoading = false */}
          {!isLoading && displayedComment.map((commentData, index) => (
            //NOTE: newest comments show up at top. if that is a problem, reverse readComments array in getComments() after pushing all elements and before setDisplayedComment(readComments); (around line 62)
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
                <Image source={commentData.profileimage == null ? require('../../assets/DemoPlaceholders/demobottle.jpg') : demoImageGetter.getImage(commentData.profileimage)} 
                style={styles.userIconStyle} />
              </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.userName}>{commentData.name}</Text>
              <Text style={styles.userComment}>{commentData.content}</Text>
            </View>
          </View>
        ))}
        {/* what to show while comments are loading */}
        {isLoading && (<ActivityIndicator style={styles.loadingComments} size="large"/>)}  
        </ScrollView>
        {isBottomContainerVisible && ( 
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
              {!userLoading && 
              <Image source={profileIcon == null ? require('../../assets/DemoPlaceholders/demobottle.jpg') : demoImageGetter.getImage(profileIcon)} 
              style={styles.userIconStyle} /> }
            </TouchableOpacity>
            <View style={styles.input}>
              <TextInput
                placeholder="Leave a comment here  "
                placeholderTextColor="#9E8B8D"
                style={styles.inputText}
                autoCapitalize="none"
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
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
              <Text style={styles.primaryButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

export default Details;
