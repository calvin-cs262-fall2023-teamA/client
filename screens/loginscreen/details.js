/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../styles/detailsStyles';
import * as demoImageGetter from '../addpage/demoimages.js'; // specifically for demo. final images will probably work differently
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, List } from 'react-native-paper';
import PopupScreen from './detailsHelpPage';
/**
 * This page shows a detailed view of the selected item.
 * This page also implements comments and allows the user to delete an item if they had posted it.
 **/

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
  // help page pop-up
  const [isPopupVisible, setPopupVisibility] = useState(false);

  const [email, setEmail] = useState('');

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };
  //comments
  let readComments = [];
  const [isLoading, setIsLoading] = useState(true); //for loading initial comment content. Will try to load "displayedComment" before it is defined otherwise.
  
  useEffect(() => {
    // Retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { ID, userName, profileimage, email } = JSON.parse(userData);
                setUserID(ID)
                setUsername(userName);
                setEmail(email);
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

  const handleDelete = () => {
    // updates archived -> true for a given item
    fetch(`https://calvinfinds.azurewebsites.net/items/archive/${itemData.id}`, {
        method: 'POST', // actually PUT, but it works with POST and not PUT.
      })
      .then((response) => response.json)
      .catch(error => {
        console.error(error);
    });
    navigation.navigate('MainPage', { prevRoute: 'archive' }); // change so that the user can get a message on main page
  };

  const deleteBackButton = () => {
    if (userID === itemData.postuser) {
      return ( <>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete()}>
            <Text style={styles.primaryButtonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </>)
    } 
    
    //else
    // disabled for readability
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return ( <>
      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.primaryButtonText}>Go Back</Text>
      </TouchableOpacity>
    </>)
    
  }

  return (
    <SafeAreaView style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* ... other components ... */}
        <View style={styles.contentContainer}>
          <TouchableOpacity style={styles.helpButtonContainer} onPress={togglePopup}> 
            <Text style={styles.helpButton}>?</Text>
          </TouchableOpacity>
          <Image
          // TODO: change from '../../assets/DemoPlaceholders/demobottle.jpg' to '../../assets/placeholder.jpg' after demo
            source={itemData.itemimage == null ? require('../../assets/DemoPlaceholders/demobottle.jpg') : demoImageGetter.getImage(itemData.itemimage)} // Placeholder image for post. item.itemimage is a uri for now
            style={styles.postImage}
          />
          <View style={styles.row}>
            <View>
            <Text>{itemData.name} {itemData.lostfound} a...</Text>
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
              <View style={styles.userNameEmailContainer}>
                <Text style={styles.userName}>{itemData.name}</Text>
                <Text style={styles.userEmail}>{itemData.emailaddress}</Text>
              </View>
              <Text style={styles.userComment}>{itemData.description}</Text>
            </View>


            <PopupScreen isVisible={isPopupVisible} onClose={togglePopup} />
          </View>

        </View>
        {/* Implement scroll for comments with ScrollView */}
        {/* TODO: integrate read items */} 
        <ScrollView style={styles.ScrollViewContainer}>
          {/* makes comments appear seperate from each other so it looks like two posts and not one when someone comments twice */}
          {/* only run if isLoading = false */}
          {!isLoading && displayedComment.map((commentData, index) => (
            //NOTE: newest comments show up at top. if that is a problem, reverse readComments array in getComments() after pushing all elements and before setDisplayedComment(readComments); (around line 62)
            <View key={index} style={styles.userCommentContainer}>
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
        <KeyboardAvoidingView 
          style={styles.bottomContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : -20} // Adjust the offset as needed
        >
          {/* user input */}
          <View style={styles.postCommentContainer}>
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
            {deleteBackButton()}
          </View>
        </KeyboardAvoidingView>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default Details;
