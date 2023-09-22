import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // Implement the login, verify email and password
    if (email === 'edom' && password === 'password') {
      navigation.navigate('MainPage'); // Use navigation.navigate here
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingTop}>CALVIN</Text>
      <Text style={styles.headingBottom}>FINDS</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
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
    alignItems: 'center',
    backgroundColor: '#342F2F',
    padding: 16,
  },
  headingTop: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: -20, 
    color: '#FFF5D2',
    textAlignVertical: 'center', 
  },
  headingBottom: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#FFF5D2',
    textAlignVertical: 'center', // Vertically align the text
  },
  inputContainer: {
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#FFF5D2',
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  loginButton: {
    flex: 1,
    backgroundColor: '#342F2F',
    borderRadius: 12,
    width: 100,
    padding: 10,
    marginRight: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#C2A3A3',
    fontWeight: 'bold',
  },
  signupButton: {
    flex: 1,
    backgroundColor: '#FFE34E',
    borderRadius: 12,
    padding: 10,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
