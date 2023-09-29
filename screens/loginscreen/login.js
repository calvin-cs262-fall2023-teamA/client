import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
  const handleLogin = () => {
    // Implement the login, verify email and password
    if (email === 'admin' && password === 'password') {
      navigation.navigate('Selection'); // Use navigation.navigate here
    }
  };

  return (


    
    <View style={styles.container}>

      <View style={styles.headingContainer}>
        <Text style={styles.headingTop}>CALVIN</Text>
        <Text style={styles.headingBottom}>FINDS</Text>
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
    backgroundColor: '#342F2F',
    padding: 30,
  },

  //heading styling
  headingContainer: {
    alignItems: 'flex-end',
    
  },
  headingTop: {
    fontSize: 60,
    fontWeight: '900',
    marginBottom: -20, 
    color: '#FFF5D2',
    textAlignVertical: 'center', 
  },
  headingBottom: {
    fontSize: 60,
    fontWeight: '900',
    marginBottom: 100,
    color: '#FFF5D2',
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
    backgroundColor: '#6C5E5E',
    borderRadius: 15,
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    bottom: 15,
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#342F2F',
    borderRadius: 12,
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
    backgroundColor: '#FFE34E',
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
