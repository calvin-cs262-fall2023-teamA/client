import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity, Keyboard, Modal } from 'react-native';

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
                source={require('../../assets/icon.png')} // Placeholder image for post
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
                <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for an item"
                    value={searchedItem}
                    onChangeText={(text) => setSearchedItem(text)}
                />
                </View>
                
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
                      <Text>+</Text>
                </TouchableOpacity>
                {/* END OF PLACEHOLDER */}

                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
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

const styles = StyleSheet.create({
  // Add your styles here to format the feed items, headers, images, etc.
  // This is a simplified example, and you may need to customize it further.
  container: {
    flex: 1,
    backgroundColor: '#EDE7E7',
  },
  
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    margin: 28,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
    alignItems: 'baseline',
  },
  itemName: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: '900',
    // padding: 16,
    fontSize: 30,
    color: '#2F2E41',
  },
  username: {
    fontWeight: '900',
    fontSize: 16,
    color: '#888',
  },
  date: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,

  },
  userDate: {
    
  },
  description: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: -3,
  },
  comments: {
    color: '#888',
  },

//   input: {
//     paddingVertical: 0,
//     paddingHorizontal: 15,
//     backgroundColor: '#FFF',
//     borderRadius: 30,
//     borderColor: '#C0C0C0',
//     borderWidth: 1,
//     width: 150,
//   },

  writeTaskWrapper: {
    flex: 1,
    backgroundColor: '#342F2F',
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    width: '100%',
    //height: 100,
    flexDirection: 'row',
    //justifyContent: 'space-around',
    alignItems: 'center'
  },
  addWrapper: {
    width: 50,
    //height: 50,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
  searchButtonText: {
    color: '#C2A3A3',
    fontWeight: 'bold',
  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0', // Background color of the search container
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 50,
  },

  searchBarContainer: {
    flex: 1,
  },

  searchInput: {
    padding: 10,
  },
  searchButton: {
    backgroundColor: '#FFAF66', // Background color of the search button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    color: '#342F2F',
    fontWeight: 'bold',
  },

  addButton: {
    backgroundColor: '#C2A3A3', // Background color of the add button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  //for PostPopup
    //container for everything, makes space for it on the screen.
  popupContainer: {
      order: 3,
      //backgroundColor: 'red', //for testing, to see where it is and how big it is.
  },
  //the actual part the text goes in.
  popup: {
      marginTop: '100%', //0% = top, 100% = center, 200% = bottom 
      borderRadius: 7.5,
      paddingHorizontal: 20,
      height: 60, //constant for now

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
  //End of styles for PostPopup
});

export default MainPage;
