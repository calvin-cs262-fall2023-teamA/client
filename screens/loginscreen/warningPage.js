/* eslint-disable */
import React from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';

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
            <View style={styles.outerContainer}>
             <View style={styles.mainContainer}>
                    <Text style={styles.description}>Are you sure you want to delete?</Text>
                    <Text> </Text>
                        <TouchableOpacity style={styles.primaryButton} onPress={confirmDelete}>
                            <Text style={styles.primaryButtonText}>Yes</Text>
                        </TouchableOpacity>
                        <Text> </Text>
                        <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
                            <Text style={styles.secondaryButtonText}>Cancel</Text>
                        </TouchableOpacity>
                 </View>
            </View>
    </Modal>
    );
};

export default WarnScreen;


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
      fontSize: 20, 
    },
  
    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#F77361',
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

    secondaryButton: {
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
        color: '#fff',
        fontWeight: '900',
        fontSize: 20
      },
      secondaryButtonText: {
        color: '#342F2F',
        fontWeight: '900',
        fontSize: 20
      },
      description: {
        marginBottom: 8,
        color: '#2F2E41',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: -3, 
    }
  
  });