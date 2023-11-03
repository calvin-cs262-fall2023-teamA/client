import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from '../../styles/detailsStyles';

const Details = ({ navigation, route }) => {
  const [comment, setComment] = useState(''); // State to store the entered comment
  const [displayedComment, setDisplayedComment] = useState(''); // State to store the comment to be displayed
  const [isBottomContainerVisible, setBottomContainerVisibility] = useState(true);


  const handleSendPress = () => {
    // Update the displayedComment with the comment from the TextInput
    setDisplayedComment(comment);
    // Clear the comment in the TextInput
    setComment('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* ... other components ... */}
        <View style={styles.contentContainer}>
          <Image
            source={require('../../assets/placeholder.jpg')} // Placeholder image for post
            style={styles.postImage}
          />
          <View style={styles.row}>
            <Text style={styles.itemName}>Item Name</Text>
            <View>
              <Text style={styles.location}>Location:</Text>
              <Text style={styles.locationName}>Johnny's</Text>
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
              <Text style={styles.userName}>User Name</Text>
              <Text style={styles.userComment}>I found some socks in Johnny’s</Text>
            </View>
          </View>
        </View>
        {/* Implement scroll for comments with ScrollView I took it out fro now because I had a bug*/}
        <ScrollView style={styles.commentsContainer}>
          {/* Comment 1 */}
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
            
              <Image source={require('../../assets/user2.jpg')} style={styles.userIconStyle} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.userName}>User1</Text>
              <Text style={styles.userComment}>I think this is Brandon's</Text>
            </View>
          </View>

          {/* Comment 2 */}
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
            <Image source={require('../../assets/user3.jpg')} style={styles.userIconStyle} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.userName}>User2</Text>
              <Text style={styles.userComment}>I think this is Caden's although the scrolling feature is having issues so I will use this text to test out the scrolling
              s
              c
              o
              l
              l</Text>
            </View>
          </View>

          {/* Display the entered comment */}
          {displayedComment ? (
            <View style={styles.commentContainer}>
              <Image source={require('../../assets/user2.jpg')} style={styles.userIconStyle} />
              <View style={styles.textContainer}>
                <Text style={styles.userName}>User3</Text>
                <Text style={styles.userComment}>{displayedComment}</Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
        
        {isBottomContainerVisible && (
        <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.exit}
          onPress={() => {
          // Hide the bottomContainer
            setBottomContainerVisibility(false);
        }}>
            <Text>exit</Text>
        </TouchableOpacity>
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
            <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
              <Text style={styles.primaryButtonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
        <TouchableOpacity style={styles.exit}
          onPress={() => {
          //  show the bottomContainer
            setBottomContainerVisibility(true);
        }}>
            <Text>open</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Details;
