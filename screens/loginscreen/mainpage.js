import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity, Keyboard, Modal } from 'react-native';
//use external stylesheet
import styles from '../../styles/MainPageStyles'; 

const MainPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchedItem, setSearchedItem] = useState();
  const {prevRoute} = route.params;   //Used by the useEffect for the popup.
  /*set to "Login" if coming from login screen, "AddPage" if coming from add screen, 
  and is reset to "reset" if navigating to addpage from this screen.*/
  const [modalVisible, setModalVisible] = useState(false); //modal = popup


  /*Function/useEffect used to give feedback to the user after they (successfully) add an item 
    (from adddetails.js) to the database. 
    Right now, that just means that the user made an item listing at the "addPage" screen.*/
  useEffect(() => {
    //set modal (popup) to true until the user dismisses it.
    if (prevRoute === "AddPage") setModalVisible(true); 
  }, [prevRoute]); //If it changes (which it does when navigating to this page), run the function.


  useEffect(() => {
    // Simulate loading data (e.g., fetching from an API)
    setTimeout(() => {
      setIsLoading(false);
      setData(generatePlaceholderData(5)); // Generate 10 placeholder posts
    }, 2000); // Simulate a 2-second loading delay
  }, []);

  const generatePlaceholderData = (count) => {
    const placeholderData = [];
    for (let i = 0; i < count; i++) {
      placeholderData.push({
        id: i.toString(),
        loading: true, // Indicates that the post is still loading
      });
    }
    return placeholderData;
  };

  const handleAddItem = () => {
    //Implement adding an item
  }

  const handleSearch = () => {
    // Implement searching for an item
  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
        <View style={styles.postContainer}>

            <View style={styles.row}>

                <View style={styles.nameDescription}>
                    <Text style={styles.itemName}>
                        Item Name
                    </Text>
                    <Text style={styles.description}>
                        Description
                    </Text>
                </View>

                <View style={styles.userDate}>
                    <Text style={styles.username}>
                        Username
                    </Text>
                    <Text style={styles.date}>
                        MM/DD/YY
                    </Text>
                    {/* comments should be only visible in item page*/}
                    {/* <Text style={styles.comments}>
                        Comments
                    </Text> */}
                </View>
            </View>






            <Image
                source={require('../../assets/placeholder.jpg')} // Placeholder image for post
                style={styles.postImage}
            />


        </View>
    </View>
  );

  return (
    <View>
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        />
        {/* Search for an item */}
        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
            keyboardVerticalOffset={Platform.OS === "ios" ? 50 : -20} // Adjust the offset as needed
        >

            <View style={styles.searchContainer}>
                {/* PLACEHOLDER FOR ADD BUTTON */}
                {/* The navigation.navigate part must be the same for the popup to work. 
                The current placeholder works but is not stylized. */}
                <TouchableOpacity style={styles.addButton}
                    onPress={() => {
                        //send information to the main (current) page to "reset" the pop up.
                        //Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
                        navigation.navigate({
                            name: 'MainPage',
                            params: { prevRoute: 'reset'},
                            merge: true,
                        }),
                        //navigate to the AddPage (where the user will actually end up)
                        navigation.navigate('AddPage')
                    }}>
                    <Image source={require('../../assets/add.png')} style={styles.addIconStyle} />
                </TouchableOpacity>
                {/* END OF PLACEHOLDER */}
                
                {/* Search Bar */}
                {/* <View style={styles.searchBarContainer}>

                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for an item"
                        value={searchedItem}
                        onChangeText={(text) => setSearchedItem(text)}
                    />
                </View> */}

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Image source={require('../../assets/search.png')} style={styles.searchIconStyle} />
                </TouchableOpacity>

                {/* PostPopup */}
                <View style={styles.popupContainer}>
                    <Modal
                    animationType="slide"
                    transparent={true} //show the rest of the screen; don't cover anything you don't have to.
                    /*when visible set to true, animation will play and it will be put on screen. 
                    False does same but with reverse animation direction and takes it off the screen.*/
                    visible={modalVisible} 
                    >
                        <View style={styles.popup}>
                            <Text style={styles.postPopupText}>Your item has been posted!</Text>
                            <TouchableOpacity style={styles.popupButton}
                            onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.postPopupText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
                {/* PostPopup End */}
                
            </View>


        </KeyboardAvoidingView>

    </View>
  );
};

export default MainPage;
