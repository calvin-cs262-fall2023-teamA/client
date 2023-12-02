/* eslint-disable */
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import * as styles from '../../styles/detailsStyles';
const PopupScreen2 = ({ isVisible, onClose }) => {
return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>When you make a post with the + button you must give your post a title. </Text>
          <Text> </Text>
          <Text>After clicking the submit button, your posted item will seamlessly integrate into the list on this app, appearing at the bottom.</Text>
          <Text> </Text>
          <Text>The orange button with a magnifying glass is the search button. This button searches through the list of items on the screen.</Text>
          <Text> </Text>
          <Text> The lost and found toggle at the bottom of the screen can be used as a filter to show only lost or found items in our app.</Text>
          <Text> </Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.helpButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopupScreen2;
