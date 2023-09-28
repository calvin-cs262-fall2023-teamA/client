import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Illustration from '../../assets/login-vector.svg';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
  const handleLogin = () => {
    // Implement the login, verify email and password
    if (email === 'admin' && password === 'password') {
      navigation.navigate('MainPage'); // Use navigation.navigate here
    }
  };

  return (


    
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Illustration width={270} height={270} />
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="ab12@calvin.edu"
          placeholderTextColor="#C9C1B1" 
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="********"
          placeholderTextColor="#C9C1B1" 
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'right',
    backgroundColor: '#EDE7E7',
    padding: 30,
  },
  //login illustration
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
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
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    bottom: 15,
    color: '#FAF2F2',
    backgroundColor: '#FAF2F2',
    borderRadius: 50,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#FAF2F2',
    borderRadius: 50,
    width: 100,
    padding: 15,
    marginRight: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#C2A3A3',
    fontWeight: '900',
    fontSize: 20,
  },
  signupButton: {
    flex: 1,
    backgroundColor: '#FFAF66',
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: -10,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 20,
  },
});

export default LoginScreen;
