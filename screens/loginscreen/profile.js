import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Profile = ({  }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/user.png')} style={profileStyles.userIconStyle} />
      <Text style={styles.userName}>User Name</Text>
      <Text style={styles.userEmail}>ab12@calvin.edu</Text>
      <View style={styles.flexContainer}>

        {/* this Button should lead to item page for user */}
        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.goBack()}> 
          <Text style={styles.tertiaryButtonTitle}>0</Text>
          <Text style={styles.tertiaryButtonText}>Posted</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tertiaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.tertiaryButtonTitle}>13</Text>
          <Text style={styles.tertiaryButtonText}>Archived</Text>
        </TouchableOpacity> 

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
  userName: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '900',
    paddingTop: 16,
    fontSize: 30,
    color: '#2F2E41',
  },
  userEmail: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 3,
  },
  flexContainer: {
    marginTop: 80,
    marginBottom: 130,
    flexDirection: 'row', // Arrange elements horizontally
    justifyContent: 'center',
  },

  lostNFound: {
    flex: 1, // Take equal space
    justifyContent: 'center',
    alignItems: 'center', // Center text horizontally
    backgroundColor: 'fff',
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },

  buttonContainer: {
    flexDirection: 'row',
    bottom: 15,
    maxWidth: 350,
    margin: 10,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: '#FAF2F2',
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

  tertiaryButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 50,
    width: 100,
    padding: 18,
    alignItems: 'center',
    marginHorizontal: 14,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },

  tertiaryButtonTitle: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 50,
  },

  tertiaryButtonText: {
    color: '#342F2F',
    fontWeight: '900',
    fontSize: 18,
    marginTop: -6,
    marginBottom: 6,
  },
});

const profileStyles = StyleSheet.create({
  userIconStyle: {
    width: 130,
    height: 130,
    marginTop: 50,
    borderRadius: 100,
  },
});

