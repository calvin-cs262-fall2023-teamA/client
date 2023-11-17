import {KeyboardAvoidingView, Dimensions, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Illustration from '../../assets/login-vector.svg';


const LoginScreen = () => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width; //get screen width so illustration can be resized according to screen size
  const svgWidth = screenWidth * 0.8;  // Adjust the multiplier as needed
  //detect if email or password input is focused
  const [isNameFocused, setNameFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [isRepeatPasswordFocused, setRepeatPasswordFocused] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState('');
  const isFormFilled = Name !== '' && email !== '' && password !== '' && repeatPassword  !== '';
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setRepeatPasswordVisible] = useState(false);


  
  const handleSignup = async() => {
    // Check if passwords match
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Implement the login, verify email and password
    // if (email === 'admin' && password === 'password') {
    //   navigation.navigate('MainPage'); // Use navigation.navigate here
    // }

    // Check if the email is from @calvin.edu domain
    if (!email.endsWith('@calvin.edu')) {
      alert("Make sure you are using @calvin.edu email address.");
      return;
    }

    // Create a user object with the entered data
    const user = {
      name: Name,
      email: email,
      password: password,
      type: "Standard"
    };


    try {
      // Send a POST request to your API endpoint
      const response = await fetch('https://calvinfinds.azurewebsites.net/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // User registration was successful
        navigation.navigate('Login'); // Redirect to the login screen
      } else {
        alert('Error: Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Error: Registration failed');
    }

  };

  return (    
    //TouchableWithoutFeedback is for dismiss keyboard when touch anywhere else
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
        
        {/* Name input */}
        <View style={[styles.input, isNameFocused && styles.inputFocused]}>
          <Image source={require('../../assets/profileIcon.png')} style={styles.inputIconStyle} />
          <TextInput
              placeholder="User Name"
              placeholderTextColor="#9E8B8D" 
              onChangeText={(text) => setName(text)}
              value={Name}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              style={styles.inputText}
          />
        </View>

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
              style={styles.inputText}
          />
        </View>
        {/* password input */}
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
            style={styles.inputText}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            {isPasswordVisible ? 
              <Image source={require('../../assets/visibleEye.png')} style={styles.inputIconStyle} /> : 
              <Image source={require('../../assets/hiddenEye.png')} style={styles.inputIconStyle} />
            }
          </TouchableOpacity>
        </View>

        {/* repeat password input */}
        <View style={[styles.input, isRepeatPasswordFocused && styles.inputFocused]}>
            <Image source={require('../../assets/lock.png')} style={styles.inputIconStyle} />
            <TextInput
                placeholder="Repeat Password"
                placeholderTextColor="#9E8B8D" 
                onChangeText={(text) => setRepeatPassword(text)}
                value={repeatPassword}
                secureTextEntry={!isRepeatPasswordVisible} // Toggle based on isPasswordVisible
                onFocus={() => setRepeatPasswordFocused(true)}
                onBlur={() => setRepeatPasswordFocused(false)}
                style={styles.inputText}
            />
            <TouchableOpacity onPress={() => setRepeatPasswordVisible(!isRepeatPasswordVisible)}>
                {isRepeatPasswordVisible ? 
                    <Image source={require('../../assets/visibleEye.png')} style={styles.inputIconStyle} /> : 
                    <Image source={require('../../assets/hiddenEye.png')} style={styles.inputIconStyle} />
                }
            </TouchableOpacity>
        </View>


      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.primaryButton, isFormFilled && styles.buttonFilled]} onPress={handleSignup}>
          <Text style={[styles.primaryButtonText, isFormFilled && styles.buttonTextFilled]}>Signup</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Already Got Account?</Text>
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
  
  //login illustration
  artContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  
  //heading styling
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
    marginBottom: 15,
    padding: 3,
    paddingHorizontal: 15,
    backgroundColor: '#EDE7E7',
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
    elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
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
  buttonFilled: {
    backgroundColor: '#F77361',
  },
  buttonText: {
    color: '#9E8B8D',
    fontWeight: '900',
    fontSize: 20,
  },
  buttonTextFilled: {
    color: '#fff',
  },
});

export default LoginScreen;
