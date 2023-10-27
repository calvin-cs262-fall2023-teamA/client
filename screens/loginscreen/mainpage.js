import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
//use external stylesheet
import styles from '../../styles/MainPageStyles'; 

const MainPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchedItem, setSearchedItem] = useState();
  const {prevRoute} = route.params;   //Used by the useEffect for the popup.
  /*set to "Login" if coming from login screen, "AddPage" if coming from add screen, 
  and is reset to "reset" if navigating to addpage from this screen.*/

  const [searchActive, setSearchActive] = useState(true);  

  const handleSearch = () => {
    setSearchActive(!searchActive);  // Toggle the searchActive state
  };

  /*Function/useEffect used to give feedback to the user after they (successfully, determined by the conditional below) add an item 
    (from adddetails.js) to the database. 
    Right now, that just means that the user made an item listing at the "addPage" screen.*/
  useEffect(() => {
    if (prevRoute === "AddPage") alert("Your item has been posted!"); 
  }, [prevRoute]); //If prevRoute changes (which it does when navigating to this page), run the function.


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

  // const handleSearch = () => {
  //   // Implement searching for an item
  // };

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
            {searchActive && (
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

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Image source={require('../../assets/search.png')} style={styles.searchIconStyle} />
                </TouchableOpacity>
            </View>
            )}
            
            {searchActive && (
            <TouchableOpacity onPress={() => {
              //send information to the main (current) page to "reset" the pop up.
              //Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
              navigation.navigate({
                  name: 'Profile',
                  params: { prevRoute: 'reset'},
                  merge: true,
              }),
              //navigate to the AddPage (where the user will actually end up)
              navigation.navigate('Profile')
          }}>
              <Image source={require('../../assets/user.png')} style={styles.userIconStyle} />
            </TouchableOpacity>
            )}

            {/* Search Bar */}
            
            {!searchActive && (
            <View style={styles.searchBarContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={handleSearch}>
                    <Image source={require('../../assets/close.png')} style={styles.searchIconStyle} />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for an item"
                    placeholderTextColor="#9E8B8D" 
                    value={searchedItem}
                    onChangeText={(text) => setSearchedItem(text)}
                />
                {/* handles search bar and account icon */}
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Image source={require('../../assets/search.png')} style={styles.searchIconStyle} />
                </TouchableOpacity>
            </View>
            )}

        </KeyboardAvoidingView>

    </View>
  );
};

export default MainPage;
