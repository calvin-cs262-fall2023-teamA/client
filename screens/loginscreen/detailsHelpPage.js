/* eslint-disable */
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import * as styles from '../../styles/detailsStyles';
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
