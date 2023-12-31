/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../styles/detailsStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, List } from 'react-native-paper';
import PopupScreen from './detailsHelpPage';
import WarnScreen from './warningPage';
/**
 * Details component for displaying detailed information about a specific item.
 * This page also implements comments and allows the user to delete an item if they had posted it.
 * @param {Object} navigation - Navigation object for screen navigation.
 * @param {Object} route - Route object containing parameters passed to the screen.
 * @returns {JSX.Element} - JSX representation of the Details component.
 **/

function Details({ navigation, route }) {
  const [comment, setComment] = useState(''); // State to store the entered comment
  const [displayedComment, setDisplayedComment] = useState();  
  // State to store the comment to be displayed
  const {itemData, prevRoute } = route.params || {};  
  const [isBottomContainerVisible, setBottomContainerVisibility] = useState(true);
  
  // these states are used to display the current user's username for comments
  const [userName, setUsername] = useState('');
  const [userID, setUserID] = useState('');
  const [email, setEmail] = useState('');
  const [profileIcon, setProfileIcon] = useState('');
  const [userLoading, setUserLoading] = useState(true); // loading user info from async storage

  // help page pop-up
  const [isPopupVisible, setPopupVisibility] = useState(false);
  // warning popup when you delete an item
  const [isWarningVisible, setWarningVisibility] = useState(false);

  
  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const warningPopup = () => {
    setWarningVisibility(!isWarningVisible);
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
    warningPopup();
  };

  const handleGoBack = () => {
    if (prevRoute === "post"){
      try {
        // Navigate to the main page
        navigation.navigate('MainPage', { prevRoute: "post", key: Math.random().toString()})
      } catch (error) {
        console.error(error)
      }
    } else if (prevRoute === "archived"){
      try {
        // Navigate to the main page
        navigation.navigate('MainPage', { prevRoute: "archived", key: Math.random().toString()})
      } catch (error) {
        console.error(error)
      }
  }else{
    try {
      // Navigate to the main page
      navigation.navigate('MainPage', { prevRoute: '' })
    } catch (error) {
      console.error(error)
    }
  }
}

  const deleteBackButton = () => {
    if (userID === itemData.postuser && itemData.archived === false) {
      return ( <>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete()}>
            <Text style={styles.primaryButtonText}>Archive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={() => handleGoBack()}>
            <Text style={styles.primaryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </>
        );
    };
    
    //else
    
    return ( <>
      <TouchableOpacity style={styles.primaryButton} onPress={() => handleGoBack()}>
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
          {/* "|| (itemData.itemimage).includes('../')" if the service does not return a base64 uri, it will return a local url (../../assets/placeholder.jpg by default) 
                The reason for this is that old versions of the system would fail if there was no default in the database */}
          <Image
            source={(itemData.itemimage == null || (itemData.itemimage).includes('../')) ? require('../../assets/placeholder.jpg') : { uri: itemData.itemimage}}
            style={styles.postImage}
          />
          <View style={styles.row}>
            <View>
            <Text style={styles.userFoundOrLostText}>{itemData.name} {itemData.lostfound} a...</Text>
              <Text style={styles.itemName}>{itemData.title}</Text>
            </View>
            <View>
              <Text style={styles.location}>Location:</Text>
              <Text style={styles.locationName}>{itemData.location}</Text>
            </View>
          </View>

          <View style={styles.commentContainer}>
            {/* "|| (itemData.profileimage).includes('../')" if the service does not return a base64 uri, it will return a local url (../../assets/profileIcon.png by default) 
                The reason for this is that old versions of the system would fail if there was no default in the database */}
              <Image source={(itemData.profileimage == null || (itemData.profileimage).includes('../')) ? require('../../assets/profileIcon.png') : { uri: itemData.profileimage}} style={styles.userIconStyle} />
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
        <ScrollView style={styles.ScrollViewContainer}>
          {/* makes comments appear seperate from each other so it looks like two posts and not one when someone comments twice */}
          {/* only run if isLoading = false */}
          {!isLoading && displayedComment.map((commentData, index) => (
            <View key={index} style={styles.userCommentContainer}>
              {/* "|| (commentData.userimage).includes('../')" if the service does not return a base64 uri, it will return a local url (../../assets/profileIcon.png by default) 
                The reason for this is that old versions of the system would fail if there was no default in the database */}
                <Image source={(commentData.userimage == null || (commentData.userimage).includes('../')) ? require('../../assets/profileIcon.png') : { uri: commentData.userimage}}
                style={styles.userIconStyle} />
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
                // Send information to "reset" prevRoute information (used for pop-ups, filters, etc).
                navigation.navigate({
                  name: 'Profile',
                  params: { prevRoute: 'reset' },
                  merge: true,
                });
              }}
            >
              {/* "|| (profileIcon).includes('../')" if the service does not return a base64 uri, it will return a local url (../../assets/profileIcon.png by default) 
                The reason for this is that old versions of the system would fail if there was no default in the database */}
              {!userLoading && 
              <Image source={(profileIcon == null || (profileIcon).includes('../')) ? require('../../assets/profileIcon.png') : { uri: profileIcon}}
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
                maxLength ={50} // the limit on the database is 50 characters
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendPress}>
                <Image source={require('../../assets/send.png')} style={styles.sendIconStyle} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            {deleteBackButton()}
            <WarnScreen isVisible={isWarningVisible} onClose={warningPopup} navigation={navigation} route={route}/>
          </View>
        </KeyboardAvoidingView>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

export default Details;
