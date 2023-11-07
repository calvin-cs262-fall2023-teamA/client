import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Modal, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
//use external stylesheet
import styles from '../../styles/MainPageStyles'; 
import { useUser } from '../../context/UserContext'; // Import the useUser hook


const MainPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchedItem, setSearchedItem] = useState('');
  const {prevRoute} = route.params;   //Used by the useEffect for the popup.
  /*set to "Login" if coming from login screen, "AddPage" if coming from add screen, 
  and is reset to "reset" if navigating to addpage from this screen.*/

  // Define state to control the visibility of the Details popup
  const [detailsVisible, setDetailsVisible] = useState(false);

  const [searchActive, setSearchActive] = useState(true);  

  const handleSearch = () => {
    setSearchActive(!searchActive);  // Toggle the searchActive state
  };

  //clears results (resets search to show all results to user) when "x" is pressed. CHANGE: may want to check whether searchedItem='' (is the search bar empty?)
  const resetSearch = () => {
    //called by "x" button displayed when search bar is open.
    handleSearch() //what was originally called by that button
    getItems() //reset the search results.
  }

  /*Function/useEffect used to give feedback to the user after they (successfully, determined by the conditional below) add an item 
    (from adddetails.js) to the database. 
    Right now, that just means that the user made an item listing at the "addPage" screen.*/
  useEffect(() => {
    if (prevRoute === "AddPage") alert("Your item has been posted!"); 
  }, [prevRoute]); //If prevRoute changes (which it does when navigating to this page), run the function.


  useEffect(() => {
      //load data
      if(prevRoute === "post") {
        //if coming from profile page looking for user.postUser (that user's posts) 
        getItemsPosted();
      } else if (prevRoute === "claim") {
        //if coming from profile page looking for user.claimUser (that user's claimed items)
        getItemsClaimed();
      } else {
        getItems();
        //setIsLoading(false);
        //setData(generatePlaceholderData(5)); // Generate 10 placeholder posts
      }
  }, [prevRoute]);

  const getItems = async () => {
    try {
    const response = await fetch('https://calvinfinds.azurewebsites.net/items');
      const json = await response.json();
      setData(json);
    } catch (error) {
      //console.error(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const searchItem = async (text) => {
    setSearchedItem(text)
    try {
      const response = await fetch('https://calvinfinds.azurewebsites.net/items/search/' + text);
        const json = await response.json();
        setData(json);
      } catch (error) {
        //console.error(error);
        setData([]);
      } finally {
        setIsLoading(false);
      };
  };

  const getItemsPosted = async () => {
    try {
    const response = await fetch('https://calvinfinds.azurewebsites.net/items/post/Edom@gmail.com'); //hardcoded for demo
      const json = await response.json();
      setData(json);
    } catch (error) {
      //console.error(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getItemsClaimed = async () => {
    try {
    const response = await fetch('https://calvinfinds.azurewebsites.net/items/claim/Edom@gmail.com'); //hardcoded for demo
      const json = await response.json();
      setData(json);
    } catch (error) {
      //console.error(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleDetailsOpen = () => {
        //send information to the main (current) page to "reset" the pop up.
        //Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
        navigation.navigate({
            name: 'MainPage',
            params: { prevRoute: 'reset'},
            merge: true,
        }),
        //navigate to the AddPage (where the user will actually end up)
        navigation.navigate('Details')
    }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={handleDetailsOpen}>
      <View style={styles.container}>
        <View style={styles.postContainer}>
            <View style={styles.row}>  
                <View style={styles.nameDescription}>
                    <Text style={styles.itemName}>
                        {item.name}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                </View>

                <View style={styles.userDate}>
                    <Text style={styles.username}>
                        Edom {/* placeholder for now. */}
                    </Text>
                    <Text style={styles.date}>
                        11/3/23 {/* placeholder, not currently stored in database */}
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
    </TouchableOpacity>
  );

  return (
    <View>
        <FlatList
        data={data}
        keyExtractor={({id}) => id} //{(item) => item.id} //old
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
                <TouchableOpacity style={styles.closeButton} onPress={resetSearch}>
                    <Image source={require('../../assets/close.png')} style={styles.searchIconStyle} />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for an item"
                    placeholderTextColor="#9E8B8D" 
                    value={searchedItem}
                    onChangeText={(text) => searchItem(text)}
                />
                {/* handles search bar and account icon */}
                <TouchableOpacity style={styles.searchButtonActive} onPress={handleSearch}>
                    <Image source={require('../../assets/search.png')} style={styles.searchIconStyle} />
                </TouchableOpacity>
            </View>
            )}

        </KeyboardAvoidingView>

    </View>
  );
};

export default MainPage;
