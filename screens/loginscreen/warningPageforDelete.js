/* eslint-disable */
import React from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import styles from '../../styles/detailsStyles';

const WarnScreen = ({ isVisible, onClose, navigation, route }) => {
    // after you click yes the item gets deleted
    const confirmDelete = () => {
        const {itemData} = route.params;
        // updates archived -> true for a given item
        fetch(`https://calvinfinds.azurewebsites.net/items/archive/${itemData.id}`, {
            method: 'POST', // actually PUT, but it works with POST and not PUT.
        })
        .then((response) => response.json)
        .catch(error => {
            console.error(error);
        });
        navigation.navigate('MainPage', { prevRoute: 'archive' }); // change so that the user can get a message on main page
     };
return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
            <View style={styles.modalBackground}>
                <View style={styles.warningContainer}>
                    <Text style={styles.warningText}>Are you sure you want to delete?</Text>
                        <TouchableOpacity onPress={confirmDelete}>
                            <Text style={styles.confirmText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                 </View>
            </View>
    </Modal>
    );
};

export default WarnScreen;