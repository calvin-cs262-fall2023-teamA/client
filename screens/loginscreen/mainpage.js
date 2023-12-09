/* eslint-disable import/namespace */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Modal, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopupScreen2 from './mainHelpPage';

// use external stylesheet
import styles from '../../styles/MainPageStyles'; 
import * as demoImageGetter from '../addpage/demoimages'; // specifically for demo. final images will probably work differently
import { useFocusEffect } from '@react-navigation/native';
import ImageViewer from '../components/ImageViewer';

/**
 * This page presents a simple list of items from the CalvinFinds database.
 * The items are retrieved from the database usign ReactNative networking, which includes
 * the item's id, title, description, category, location, lostfound status, datePosted, and other 
 * categories of each item.
 * The image for each item is retrieved from the storage accounts in Azure.
 * 
 * This page also displays the list of posted or archived items for the current user when
 * navigated from the posted or archived button on the profile page.
 * 
 */

const MainPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchedItem, setSearchedItem] = useState('');
  const {prevRoute} = route.params|| {};   // Used by the useEffect for the popup.
  /* set to "Login" if coming from login screen, "AddPage" if coming from add screen, 
  and is reset to "reset" if navigating to addpage from this screen. */

  // Define state to control the visibility of the Details popup
  const [detailsVisible, setDetailsVisible] = useState(false);

  const [searchActive, setSearchActive] = useState(true);  
  const [itemWithUsernames, setItemWithUsernames] = useState([]);

  const [email, setEmail] = useState('');
  const [userID, setUserID] = useState('');
  const [userName, setUsername] = useState('');
  const [profileIcon, setProfileIcon] = useState(null);


  const [lostOrFoundFilter, setLostOrFoundFilter] = useState('Found');

  const [isPopupVisible, setPopupVisibility] = useState(false);

  const toggleLostOrFoundFilter = () => {
    setLostOrFoundFilter(lostOrFoundFilter === 'Found' ? 'Lost' : 'Found');
  };
  
  useEffect(() => {
    // Retrieve user data from AsyncStorage
    const retrieveUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { ID, name, userEmail, password, profileimage } = JSON.parse(userData);
                setUserID(ID)
                setEmail(userEmail);
                setUsername(name);
                setProfileIcon(profileimage)
            }
        } catch (error) {
            console.error(error);
        }
    };

    retrieveUserData();
}, []);

  const handleSearch = () => {
    setSearchActive(!searchActive);  // Toggle the searchActive state
  };

  // clears results (resets search to show all results to user) when "x" is pressed. CHANGE: may want to check whether searchedItem='' (is the search bar empty?)
  const resetSearch = () => {
    // called by "x" button displayed when search bar is open.
    handleSearch() // what was originally called by that button
    getItems() // reset the search results.
  }

  /* Function/useEffect used to give feedback to the user after they (successfully, determined by the conditional below) add an item 
    (from adddetails.js) to the database. 
    Right now, that just means that the user made an item listing at the "addPage" screen. */
  useEffect(() => {
    if (prevRoute === "AddPage") alert("Your item has been posted!"); 
    if (prevRoute === 'archive') alert('Your item has been archived and will no longer appear in search results.')
  }, [prevRoute]); // If prevRoute changes (which it does when navigating to this page), run the function.


  const fetchData = async () => {
    try {
      // Load data based on the previous route
      if (prevRoute === "post") {
        // If coming from the profile page looking for user.postUser (that user's posts)
        const postData = await getItemsPosted();
        // Handle empty array only when the data retrieval is complete
        if (postData.length === 0) {
          alert("No posted items found.");
          navigation.navigate('Profile');
        }
      } else if (prevRoute === "claim") {
        // If coming from the profile page looking for user.claimUser (that user's claimed items)
        const archivedData = await getItemsArchived();
        // Handle empty array only when the data retrieval is complete
        if (archivedData.length === 0) {
          alert("No archived items found.");
          navigation.navigate('Profile');
        }
      } else {
        // Default case, e.g., loading all items
        const allData = await getItems();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Set loading to false
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts or when the previous route changes
    fetchData();
  }, [prevRoute, route.params?.key]);

  

  const getItems = async () => {
    try {
    const response = await fetch('https://calvinfinds.azurewebsites.net/items');
      const json = await response.json();
      setData(json);
    } catch (error) {
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePopup = () => {
    setPopupVisibility(!isPopupVisible);
  };

  const searchItem = async (text) => {
    setSearchedItem(text)
    try {
      const response = await fetch(`https://calvinfinds.azurewebsites.net/items/search/${text}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setData([]);
      } finally {
        setIsLoading(false);
      };
  };

  const getItemsPosted = async () => {

  // Retrieve posted data from AsyncStorage
  try {
    // Retrieve posted data from AsyncStorage
    const postedData = await AsyncStorage.getItem('postedData');

    if (postedData) {
      // Parse the string as JSON
      const json = JSON.parse(postedData);
      // Set the data state
      setData(json);
      return json;
    }
    setData([]);
    return [];
  } catch (error) {
    // Handle errors
    setData([]);
    return [];
  } finally {
    setIsLoading(false);
  }
  };

  const getItemsArchived = async () => {

  try {
    // Retrieve archived data from AsyncStorage
    const archivedData = await AsyncStorage.getItem('archivedData');

    if (archivedData) {
      // Parse the string as JSON
      const json = JSON.parse(archivedData);
      // Set the data state
      setData(json);
      return json;
    }
    setData([]);
    return [];
  } catch (error) {
    // Handle errors
    setData([]);
    return [];
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

  const handleDetailsOpen = (selectedItem) => {
        // send information to the main (current) page to "reset" the pop up.
        // Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
        navigation.navigate({
            name: 'MainPage',
            params: { prevRoute: 'reset'},
            merge: true,
        }),
        // navigate to the AddPage (where the user will actually end up)
        navigation.navigate('Details', { itemData: selectedItem }) // pass json data of a given item as itemData
    } 

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDetailsOpen(item)}>
      <View style={styles.itemContainer}>
        <View style={styles.postContainer}>
            <View style={styles.row}>  
                <View style={styles.nameDescription}>
                    <Text style={styles.itemName}>
                        {item.title}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                </View>

                <View style={styles.userDate}>
                    <Text style={styles.username}> 
                        {item.name}
                    </Text>
                    <Text style={styles.date}>
                        {item.dateposted}
                    </Text>
                    {/* comments should be only visible in item page */}
                    {/* <Text style={styles.comments}>
                        Comments
                    </Text> */}
                </View>
            </View>
            <Image
                source={item.itemimage == null ? require('../../assets/placeholder.jpg') : demoImageGetter.getImage(item.itemimage)} //  Placeholder image for post. item.itemimage is a uri for now
                style={styles.postImage}
            />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <PopupScreen2 isVisible={isPopupVisible} onClose={togglePopup} />
      {/* <PopupScreen isVisible={isPopupVisible} onClose={togglePopup} /> */}
      <TouchableOpacity style={styles.helpButtonContainer} onPress={togglePopup}> 
        <Text style={styles.helpButton}>?</Text>
      </TouchableOpacity>
        <FlatList
        data={data}
        keyExtractor={({id}) => id} // {(item) => item.id} // old
        renderItem={renderItem}
        />
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
          keyboardVerticalOffset={Platform.OS === "ios" ? -160 : -20} //  Adjust the offset as needed
        >

          <TouchableOpacity style={styles.addButton}
              onPress={() => {
                  // send information to the main (current) page to "reset" the pop up.
                  // Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
                  navigation.navigate({
                      name: 'MainPage',
                      params: { prevRoute: 'reset'},
                      merge: true,
                  }),
                  // navigate to the AddPage (where the user will actually end up)
                  navigation.navigate('AddPage')
              }}>
              <Image source={require('../../assets/add.png')} style={styles.addIconStyle} />
          </TouchableOpacity>

          {/* search button */}
          {searchActive && (
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Image source={require('../../assets/search.png')} style={styles.searchIconStyle} />
            </TouchableOpacity>
          )}

          {/* Activated Search Bar */}
          {!searchActive && (
          <View style={styles.searchBarContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={resetSearch}>
                  <Image source={require('../../assets/close.png')} style={styles.searchIconStyle} />
              </TouchableOpacity>
              <TextInput
                  style={styles.searchInput}
                  placeholder="Type to search item"
                  placeholderTextColor="#9E8B8D" 
                  value={searchedItem}
                  onChangeText={(text) => searchItem(text)}
              />
          </View>
          )}

        </KeyboardAvoidingView>

        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}

          <View style={styles.bottomRow}>

            <View style={styles.toggleContainer}>
              <TouchableOpacity 
                style={lostOrFoundFilter === 'Lost' ? styles.activeButton : styles.inactiveButton} 
                onPress={toggleLostOrFoundFilter}>
                <View style={{alignItems:"center"}}>
                  <Text style={styles.toggleButtonText}>Lost</Text>
                  <Text style={styles.toggleButtonText}>Items</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={lostOrFoundFilter === 'Found' ? styles.activeButton : styles.inactiveButton} 
                onPress={toggleLostOrFoundFilter}>
                <View style={{alignItems:"center"}}>
                  <Text style={styles.toggleButtonText}>Found</Text>
                  <Text style={styles.toggleButtonText}>Items</Text>
                </View>
              </TouchableOpacity>
            </View>

            
            <TouchableOpacity onPress={() => {
              // send information to the main (current) page to "reset" the pop up.
              // Without this, the popup will only work once (unless the corresponding useEffect is refactored in the future).
              navigation.navigate({
                  name: 'Profile',
                  params: { prevRoute: 'reset'},
                  merge: true,
              }),
              // navigate to the AddPage (where the user will actually end up)
              navigation.navigate('Profile')
             }}>
              <Image source={demoImageGetter.getImage(profileIcon)} style={styles.userIconStyle} />
            </TouchableOpacity>
          </View>



    </SafeAreaView>
  );
};

export default MainPage;
