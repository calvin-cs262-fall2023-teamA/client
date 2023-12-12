/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ScrollView, Platform, KeyboardAvoidingView, Dimensions, Image ,TouchableWithoutFeedback, Keyboard, View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList, LogBox} from 'react-native';
import bcrypt from 'react-native-bcrypt';
import Illustration from '../../assets/login-vector.svg';
/**
 * LoginScreen component for user authentication.
 * It uses bcrypt to hash the user's entered password and check it with the stored 
 * password on the database.
 * @returns {JSX.Element} - JSX representation of the LoginScreen component.
 * */


function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const screenWidth = Dimensions.get('window').width; // get screen width so illustration can be resized according to screen size
  const svgWidth = screenWidth * 0.8;  // Adjust the multiplier as needed
  // detect if email or password input is focused
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const isFormFilled = email !== '' && password !== '';
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  // const [userID, setUserID] = useState('');
  // const [userName, setUsername] = useState('')

  const handleLogin = async() => {
    // Implement the login, verify email and password
    // if (email === 'admin' && password === 'password') {
    //   navigation.navigate('MainPage', { prevRoute: "Login" }); // Use navigation.navigate here
    // }
    try {
      // Clear all stored data in AsyncStorage
      await AsyncStorage.clear()
    } catch (error) {
      console.error('Error during logout:', error)
    }
    if (!email || !password) {
      alert('Email and password are required.');
      return;
    }
    try {
    
          // Fetch user data from the API
          const userDataResponse = await fetch(`https://calvinfinds.azurewebsites.net/users/email/${email}`);
          if (userDataResponse.ok) {
            // If the user data was successfully retrieved
            const userData = await userDataResponse.json();
            // Compare what the user inputted with the hashed password in the database
            const isPasswordCorrect = bcrypt.compareSync(password, userData.password);
            if (isPasswordCorrect) {
              // Store user information in AsyncStorage
              await AsyncStorage.setItem('userData', JSON.stringify({ ID: userData.id, userName: userData.name, email: userData.emailaddress, password: userData.password, profileimage: userData.profileimage }));
              navigation.navigate('MainPage', { prevRoute: 'Login' });
            } else {
              // Handle the case when user data retrieval fails
              alert('Login failed. Please check your credentials.');
            }
          } else {
            alert('Login failed. Please check your credentials.');
          }

    } catch (error) {
      console.error(error);
      alert('An error occurred during login.');
    }
    
  };

  useEffect(() => {
    // Clear email and password when navigating to the login screen
    setEmail('');
    setPassword('');
  }, [route.params]);

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); // Ignore all log notification

  return (    
    // TouchableWithoutFeedback is for dismiss keyboard when touch anywhere else
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : -20} // Adjust the offset as needed
    >

      <View style={styles.artContainer}>
        <Illustration width={svgWidth} height={svgWidth} />
      </View>
      
      <View style={styles.inputContainer}>
        
        {/* Email input */}
        <View style={[styles.input, isEmailFocused && styles.inputFocused]}>
          <Image source={require('../../assets/emailIcon.png')} style={styles.inputIconStyle} />
          <TextInput
              placeholder="Email"
              placeholderTextColor="#9E8B8D" 
              onChangeText={(text) => setEmail(text)}
              value={email}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              autoCapitalize="none" // Disable auto-capitalization
              style={styles.inputText}
          />
        </View>

        <View style={[styles.input, isPasswordFocused && styles.inputFocused]}>
          <Image source={require('../../assets/lock.png')} style={styles.inputIconStyle} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#9E8B8D" 
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!isPasswordVisible} // Toggle based on isPasswordVisible
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            autoCapitalize="none" // Disable auto-capitalization
            style={styles.inputText}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? 
              <Image source={require('../../assets/visibleEye.png')} style={styles.inputIconStyle} /> : 
              <Image source={require('../../assets/hiddenEye.png')} style={styles.inputIconStyle} />
            }
          </TouchableOpacity>
        </View>


      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.primaryButton, isFormFilled && styles.buttonFilled]} onPress={handleLogin}>
          <Text style={[styles.primaryButtonText, isFormFilled && styles.buttonTextFilled]}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText}>No Account Yet?</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDE7E7',
    padding: 35,
  },
  
  // login illustration
  artContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
  },
  
  // heading styling
  headingContainer: {
    alignItems: 'flex-end',
    
  },
  headingTop: {
    fontSize: 60,
    fontWeight: '900',
    marginBottom: -20, 
    color: '#2F2E41',
    textAlignVertical: 'center', 
  },
  headingBottom: {
    fontSize: 60,
    fontWeight: '900',
    marginBottom: 100,
    color: '#2F2E41',
    textAlignVertical: 'center', // Vertically align the text
  },


  inputContainer: {
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
  },
  
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    marginBottom: 30,
    padding: 3,
    paddingHorizontal: 15,
    backgroundColor: '#f5f0f0',
    borderRadius: 15,
  },

  inputText:{
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: '#2F2E41',
    height: 60,
  },

  inputFocused: {
    backgroundColor: 'white',
    
  },
  inputIconStyle: {
    marginRight: 8,
    width: 25, // or whatever size you want
    height: 25, // or whatever size you want
  },
  
  buttonContainer: {
    flexDirection: 'row',
    bottom: 15,
    maxWidth: 350,
    margin: 10,
    // color: '#FAF2F2',
    // backgroundColor: '#FAF2F2',
    // borderRadius: 50,
    // shadowColor: '#A59D95',
    // shadowOffset: {width: 0, height: 8},
    // shadowOpacity: 0.2,
    // shadowRadius: 24,
    // elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },
  
  primaryButton: {
    flex: 1,
    backgroundColor: '#FFAF66',
    borderRadius: 50,
    width: 100,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     // drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },

  primaryButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 20,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 50,
    padding: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: '#9E8B8D',
    fontWeight: '900',
    fontSize: 20,
  },
  buttonFilled: {
    backgroundColor: '#F77361',
  },
  buttonTextFilled: {
    color: '#fff',
  },
});

export default LoginScreen;
