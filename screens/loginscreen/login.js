import { Dimensions } from 'react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Illustration from '../../assets/login-vector.svg';




const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width; //get screen width so illustration can be resized according to screen size
  const svgWidth = screenWidth * 0.8;  // Adjust the multiplier as needed
  //detect if email or password input is focused
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const isFormFilled = email !== '' && password !== '';


  
  const handleLogin = () => {
    // Implement the login, verify email and password
    if (email === 'admin' && password === 'password') {
      navigation.navigate('MainPage'); // Use navigation.navigate here
    }
  };

  return (    
    <View style={styles.container}>

      <View style={styles.artContainer}>
        <Illustration width={svgWidth} height={svgWidth} />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="ab12@calvin.edu"
          placeholderTextColor="#9E8B8D" 
          onChangeText={(text) => setEmail(text)}
          value={email}
          //detecting if email input is focused
          onFocus={() => setEmailFocused(true)}
          onBlur={() => setEmailFocused(false)}
          style={[styles.input, isEmailFocused && styles.inputFocused]}
        />
        <TextInput
          placeholder="********"
          placeholderTextColor="#9E8B8D" 
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          style={[styles.input, isPasswordFocused && styles.inputFocused]}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.loginButton, isFormFilled && styles.buttonFilled]} onPress={handleLogin}>
          <Text style={[styles.loginButtonText, isFormFilled && styles.buttonTextFilled]}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

    </View>
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
    marginBottom: 80,
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
    height: 60,
    borderWidth: 0,
    marginBottom: 30,
    padding: 8,
    paddingHorizontal: 15,
    backgroundColor: '#EDE7E7',
    borderRadius: 15,
    fontSize: 20,
    fontWeight: '900',
    color: '#2F2E41',
  },

  inputFocused: {
    backgroundColor: 'white',
    
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
  
  loginButton: {
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

  loginButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 20,
  },
  signupButton: {
    flex: 1,
    borderRadius: 50,
    padding: 18,
    alignItems: 'center',

  },
  buttonFilled: {
    backgroundColor: '#F77361',
  },
  buttonText: {
    color: '#C2A3A3',
    fontWeight: '900',
    fontSize: 20,
  },
  buttonTextFilled: {
    color: '#fff',
  },
});

export default LoginScreen;
