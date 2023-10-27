import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = ({  }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/user.png')} style={profileStyles.userIconStyle} />
      <View style={styles.flexContainer}>

        <View style={styles.lost}>
          <Text>Lost Items</Text>
          <Text>0</Text>
        </View>

        <View style={styles.found}>
          <Text>Found Items</Text>
          <Text>0</Text>
        </View>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.primaryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.secondaryButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDE7E7',
    padding: 35,
  },

  flexContainer: {
    marginTop: 30,
    flexDirection: 'row', // Arrange elements horizontally
    justifyContent: 'center',
  },
  lost: {
    flex: 1, // Take equal space
    justifyContent: 'center',
    alignItems: 'center', // Center text horizontally
    marginBottom: 450,
  },
  found: {
    flex: 1, // Take equal space
    justifyContent: 'center',
    alignItems: 'center', // Center text horizontally
    marginBottom: 450,
  },
  buttonContainer: {
    flexDirection: 'row',
    bottom: 15,
    maxWidth: 350,
    margin: 10,
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
  secondaryButtonText: {
    color: '#9E8B8D',
    fontWeight: '900',
    fontSize: 20,
  },
});

const profileStyles = StyleSheet.create({
  userIconStyle: {
    width: 100,
    height: 100,
    marginTop: 50,
    borderRadius: 50,
  },
});

