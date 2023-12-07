/* eslint-disable */
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import * as styles from '../../styles/helpPageStyles';
const PopupScreen3 = ({ isVisible, onClose }) => {
return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text>If you click the button labeled posted you will see all the items you have posted on the app.</Text>
          <Text> </Text>
          <Text>If you click the button labeled archived you will see all the items you have not visable on the app.</Text>
          <Text> </Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PopupScreen3;
