import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Profile = ({  }) => {
    
  return (
    <View style={profileStyles.container}>
      <Image source={require('../../assets/user.png')} style={profileStyles.userIconStyle} />
      <View style={wordStyles.container}>
        <View style={wordStyles.lost}>
          <Text>Lost Items</Text>
          <Text>0</Text>
        </View>
        <View style={wordStyles.found}>
          <Text>Found Items</Text>
          <Text>0</Text>
        </View>
      </View>
    </View>
  );
}

export default Profile;

const wordStyles = StyleSheet.create({
  container: {
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
});

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Push content to the top and bottom of the screen
    alignItems: 'center',
  },
  userIconStyle: {
    width: 100,
    height: 100,
    marginTop: 50,
  },
});

