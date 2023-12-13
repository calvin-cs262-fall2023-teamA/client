/* eslint-disable */
import React from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
// import * as styles from '../../styles/detailsStyles';
const PopupScreen2 = ({ isVisible, onClose }) => {
return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.outerContainer}>
        <View style={styles.mainContainer}>
          <Text style={styles.description}>Main Page</Text>
          <Text style={styles.textContainer}>The orange button with a magnifying glass is the search button. This button searches through the list of items on the screen.</Text>
          <Text> </Text>
          <Text style={styles.textContainer}>The lost and found toggle at the bottom of the screen is a filter to show only lost or found items in our app.</Text>
          <Text> </Text>
          <Text style={styles.textContainer}>Click on a post to see more details about the item.</Text>
          <Text> </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopupScreen2;


const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 20, 
    flex: 1, 
    justifyContent: 'center'
  },
  description: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: -3,
  },
  mainContainer: {
    backgroundColor: 'white', 
    padding: 30, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#A59D95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7, //  drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
  },
  textContainer: {
    fontSize: 15, 
  },

  primaryButton: {
      alignItems: 'center',
      backgroundColor: '#FAF2F2',
      borderRadius: 50,
      width: '85%',
      padding: 18,
      marginBottom: 10,
      marginTop: 10,
      shadowColor: '#A59D95',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 7, //  drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
    },
  
    primaryButtonText: {
      color: '#342F2F',
      fontWeight: '900',
      fontSize: 20
    },

});