/* eslint-disable */
import React from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
// import * as styles from '../../styles/detailsStyles';
const PopupScreen = ({ isVisible, onClose }) => {
return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>This page shows details of a specific lost or found item posted by a user.</Text>
          <Text> </Text>
          <Text>You can leave a comment on this post and contact the poster.</Text>
          <Text> </Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.helpButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopupScreen;


const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 20, 
    flex: 1, 
    justifyContent: 'center'
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