import React, { useState, useEffect } from 'react';
import {KeyboardAvoidingView, View, Text, TextInput, Image, FlatList, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchedItem, setSearchedItem] = useState();

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
            <Text style={styles.itemName}>
                Item Name
            </Text>
            <Image
                source={require('../../assets/icon.png')} // Placeholder image for post
                style={styles.postImage}
            />
            <View style={styles.postFooter}>
                <Text style={styles.username}>
                    Username
                </Text>
                <Text style={styles.description}>
                    Description
                </Text>
                <Text style={styles.comments}>
                    Comments
                </Text>
            </View>
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
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
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
    color: '#342F2F',
  },
  
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#342F2F',
  },
  itemName: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    padding: 16,
    fontSize: 16,
    color: '#FFF5D2',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#FFF5D2',
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postFooter: {
    padding: 16,
  },
  description: {
    marginBottom: 8,
    color: '#FFF5D2',
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
    backgroundColor: '#C2A3A3', // Background color of the search button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    color: '#342F2F',
    fontWeight: 'bold',
  },
});

export default MainPage;
