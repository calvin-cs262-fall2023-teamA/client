/* eslint-disable import/namespace */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, KeyboardAvoidingView, View, Modal, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity, Keyboard, LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PopupScreen2 from './mainHelpPage';

// use external stylesheet
import styles from '../../styles/MainPageStyles'; 
import { useFocusEffect } from '@react-navigation/native';
import ImageViewer from '../../components/ImageViewer';

/**
 * Main page component for the application.
 * This page presents a simple list of items from the CalvinFinds database.
 * The items are retrieved from the database usign ReactNative networking, which includes
 * the item's id, title, description, category, location, lostfound status, datePosted, and other 
 * categories of each item.
 * The image for each item is retrieved from the storage accounts in Azure.
 * 
 * This page also displays the list of posted or archived items for the current user when
 * navigated from the posted or archived button on the profile page.
 * @param {Object} navigation - Navigation object for screen navigation.
 * @param {Object} route - Route object containing parameters passed to the screen.
 * @returns {JSX.Element} - JSX representation of the main page component.
 */

const MainPage = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchedItem, setSearchedItem] = useState('');
  const {prevRoute} = route.params|| {};   // Used by the useEffect for the popup alerts.

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
  // check if user device has notch nor not
  const hasNotch = Platform.OS === 'ios' && StatusBar.currentHeight > 20;


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

  /** clears search results (resets search to show all results to user) when "x" is pressed. */
  const resetSearch = () => {
    // called by "x" button displayed when search bar is open.
    handleSearch() // collapse search bar
    // reset the search results. Based on whether you are looking through archived, posted, or all items.
    fetchData()
  }

  /* useEffect used to give feedback to the user after they add/delete an item to/from the database. */
  useEffect(() => {
    if (prevRoute === "AddPage") alert("Your item has been posted!"); 
    if (prevRoute === 'delete') alert('Your item has been archived and will no longer appear in search results.');
  }, [prevRoute]); // If prevRoute changes (which it does when navigating to this page), run the function.


  /**
   * Chooses whether to load posted items, archived items, or all items when data needs to be loaded.
   * Also sends the user alerts if there are any errors with loading data
   * (for example, if they try to load their archived items when they have 0).
   */
  const fetchData = async () => {
    try {
      // Load data based on the previous route
      if (prevRoute === "post") {
        // If coming from the profile page looking for user.postUser (that user's posts)
        const postData = await getItemsPosted();
        // Handle empty array only when the data retrieval is complete
        if (postData.length === 0) {
          alert("No posted items found.");
          navigation.navigate('Profile', {prevRoute : 'post'});
        }
      } else if (prevRoute === "archived") {
        // If coming from the profile page looking for user.postUser (that user's archived items)
        const archivedData = await getItemsArchived();
        // Handle empty array only when the data retrieval is complete
        if (archivedData.length === 0) {
          alert("No archived items found.");
          navigation.navigate('Profile', {prevRoute : 'archived'});
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

  
  // Various functions for retrieving database information about items
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
      const response = await fetch(`https://calvinfinds.azurewebsites.net/items/search/${text}/${userID}/${prevRoute}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setData([]);
      } finally {
        setIsLoading(false);
      };
  };

  const getItemsPosted = async () => {
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

  const handleDetailsOpen = (selectedItem) => {
    navigation.navigate('Details', { itemData: selectedItem , prevRoute: prevRoute}) // pass json data of a given item as itemData
  } 

  const renderItem = ({ item }) => {
    // If viewing posted/archived items, do not filter by lost/found and instead show all items. This keeps the page simple.
    if (prevRoute !== "post" && prevRoute !== "archived" ) {
      /* filter by lost/found based on the toggle at the bottom of the main page.
          If the current item does not match the filter, do not render it. */
      if (item.lostfound === lostOrFoundFilter.toLowerCase()) {
        return (
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
                  </View>
                </View>
                {/* "|| (item.itemimage).includes('../')" if the service does not return a base64 uri, it will return a local url (../../assets/placeholder.jpg by default) 
                The reason for this is that old versions of the system would fail if there was no default in the database */}
                <Image
                  source={(item.itemimage == null || (item.itemimage).includes('../')) ? require('../../assets/placeholder.jpg') : { uri: item.itemimage}}
                  style={styles.postImage}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      }
    } else {
      // Return the same JSX structure when prevRoute is not "post" or "archived"
      return (
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
                </View>
              </View>
              {/* "|| (item.itemimage).includes('../')" if the service does not return a base64 uri, it will return a local url (../../assets/placeholder.jpg by default) 
                The reason for this is that old versions of the system would fail if there was no default in the database */}
              <Image
                source={(item.itemimage == null || (item.itemimage).includes('../')) ? require('../../assets/placeholder.jpg') : { uri: item.itemimage}}
                style={styles.postImage}
              />
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return null;
  };
    

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); // Ignore all log notification

  return (
    <SafeAreaView style={styles.container}>
      <PopupScreen2 isVisible={isPopupVisible} onClose={togglePopup} />
      {/* Title Bar */}
      {prevRoute === "post" && (
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>My Posted Items</Text>
        </View>
      )}
      {prevRoute === "archived" && (
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>My Archived Items</Text>
        </View>
      )}

      {prevRoute !== "post" && prevRoute !== "archived" && (
        <TouchableOpacity style={styles.helpButtonContainer} onPress={togglePopup}> 
          <Text style={styles.helpButton}>?</Text>
        </TouchableOpacity>
      )}

      {(prevRoute === "post" || prevRoute === "archived") && (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
          style={{ marginTop: 25 }}
        />
      )}


      {prevRoute !== "post" && prevRoute !== "archived" && (
        <FlatList
        data={data}
        keyExtractor={({id}) => id}
        renderItem={renderItem}
        />
      )}

        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
          keyboardVerticalOffset={Platform.OS === "ios" ? -160 : -20} //  Adjust the offset as needed
        >

          {/* only load if you are on the main (full) list, not archived/posted items */}
          {prevRoute !== "post" && prevRoute !== "archived" && (
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
          )}

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
            {prevRoute !== "post" && prevRoute !== "archived" && (
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
            )}
            {prevRoute !== "post" && prevRoute !== "archived" && (
              <TouchableOpacity onPress={() => {
                // Send information to "reset" prevRoute information (used for pop-ups, filters, etc).
                navigation.navigate({
                    name: 'Profile',
                    params: { prevRoute: 'reset'},
                    merge: true,
                })
              }}>
                {/* "|| (profileIcon).includes('../')" if the service does not return a base64 uri, it will return a local url (../../assets/profileIcon.png by default) 
                The reason for this is that old versions of the system would fail if there was no default in the database */}
                <Image source={(profileIcon == null || (profileIcon).includes('../')) ? require('../../assets/profileIcon.png') : { uri: profileIcon}} style={styles.userIconStyle} />
              </TouchableOpacity>
            )}
            {(prevRoute === "post" || prevRoute === "archived") && (
              <TouchableOpacity style={styles.primaryButton} onPress={() => {
                // Send information to "reset" prevRoute information (used for pop-ups, filters, etc).                
                  navigation.navigate({
                      name: 'Profile',
                      params: { prevRoute: 'reset'},
                      merge: true,
                  })
              }}>
                <Text style={styles.primaryButtonText}>Go Back</Text>
              </TouchableOpacity>
            )}


          </View>



    </SafeAreaView>
  );
};

export default MainPage;
