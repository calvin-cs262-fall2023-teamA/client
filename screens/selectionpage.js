import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const SelectionPage = ({ route, navigation }) => {
  const { prevRoute } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(prevRoute);
    if (prevRoute === 'AddPage') setModalVisible(true);
  }, [prevRoute]);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.headingTop}>Calvin</Text>
          <Text style={styles.headingBottom}>Finds</Text>
        </View>
        <View style={styles.imageContainer}></View>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.lostButton}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('MainPage')}>
              I LOST SOMETHING
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.foundButton}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('AddPage')}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.popupContainer}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.popup}>
            <Text style={styles.postPopupText}>Your item has been posted!</Text>
            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.postPopupText}>OK</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE7E7',
    alignItems: 'center',
  },
  headingContainer: {
    flexDirection: 'row-reverse',
    flex: 1,
    width: '100%',
    margin: 20,
  },
  titleContainer: {
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    marginRight: '10%',
  },
  imageContainer: {
    width: '50%',
  },
  buttonContainer: {
    flexDirection: 'column', // Use flexDirection: 'column' to place buttons vertically
    justifyContent: 'flex-end', // Align buttons to the bottom
    minHeight: 180, // Set minHeight to ensure space for buttons
    margin: 30,
    marginTop: 'auto', // Move both buttons to the bottom
  },
  buttonGroup: {
    flex: 1, // Make each button group take equal space
  },
  headingTop: {
    color: '#2F2E41',
    fontSize: 60,
    fontWeight: '900',
    marginBottom: -20,
  },
  headingBottom: {
    color: '#2F2E41',
    fontSize: 60,
    fontWeight: '800',
    marginLeft: 20,
  },
  lostButton: {
    backgroundColor: '#FF9B53',
    padding: 2,
    borderRadius: 50,
    height: 60,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
    marginTop: 95, // Adjust marginBottom to control the spacing between buttons
  },
  foundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F04564',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 180,
    marginTop: 10, // Adjust marginBottom to control the spacing between buttons
  },
  buttonText: {
    color: '#FAF2F2',
    fontWeight: 'bold',
    fontSize: 18,
  },
  popupContainer: {
    padding: '4.25%',
  },
  popup: {
    marginTop: '100%',
    borderRadius: 7.5,
    paddingHorizontal: 20,
    height: 60,
    alignSelf: 'center',
    backgroundColor: '#F04564',
    alignItems: 'center',
  },
  postPopupText: {
    color: '#2F2E41',
    fontSize: 20,
  },
  popupButton: {
    backgroundColor: '#FAF2F2',
    height: '50%',
    paddingHorizontal: '5%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectionPage;
