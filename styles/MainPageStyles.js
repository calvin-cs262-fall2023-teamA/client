import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Add your styles here to format the feed items, headers, images, etc.
  // This is a simplified example, and you may need to customize it further.
  itemContainer: {
    flex: 1,  
    
  },

  container: {
    minHeight: '100%',
    backgroundColor: '#EDE7E7',
    paddingBottom: 110,  // make the bottom bar not covering the last item 
  },
  
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    margin: 28,
    borderRadius: 20,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7, // android shadow
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginBottom: 10,
    marginTop: 14,
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
  description: {
    marginBottom: 8,
    color: '#2F2E41',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: -3,
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
    height: 200,
    borderRadius: 20,

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
    backgroundColor: '#EDE7E7',
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    width: '100%',
    // height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addWrapper: {
    width: 50,
    // height: 50,
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
    backgroundColor: '#FAF2F2', 
    borderRadius: 50,
    marginHorizontal: 10,
    marginBottom: 30,
    marginTop: 5,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7, // android shadow
  },

  searchBarContainer: {
    // flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FAF2F2', 
    borderRadius: 50,
    marginHorizontal: 23,
    marginBottom: 30,
    marginTop: 5,
    fontSize: 20,
    shadowColor: '#A59D95',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 7, // android shadow

  },

  addIconStyle: {
    width: 30, // or whatever size you want
    height: 30, // or whatever size you want
  },
  toggleIconStyle: {
    width: 30, // or whatever size you want
    height: 30, // or whatever size you want
    margin: 4,
    marginLeft: -6,
  },
  searchIconStyle: {
    width: 40, // or whatever size you want
    height: 40, // or whatever size you want
  },
  userIconStyle: {
    width: 70, // or whatever size you want
    height: 70, // or whatever size you want
    borderRadius: 50,
    marginHorizontal: 10,
    marginBottom: 30,
    marginTop: 5,
  },

  searchInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    color: '#2F2E41',
    height: 60,
    padding: 20,
    marginTop: 7,
  },
  searchButton: {
    backgroundColor: '#FFAF66', // Background color of the search button
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 50,
  },
  searchButtonActive: {
    backgroundColor: '#FFAF66', // Background color of the search button
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
  closeButton: {
    backgroundColor: '#FFF', // Background color of the search button
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    marginBottom: 30,
    padding: 3,
    paddingHorizontal: 15,
    backgroundColor: '#EDE7E7',
    borderRadius: 15,
  },
  buttonText: {
    color: '#342F2F',
    fontWeight: 'bold',
  },

  addButton: {
    backgroundColor: '#FAF2F2', // Background color of the add button
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 50,

  },
  toggleButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  toggleButtonText: {
    fontSize: 16,
    color: '#342F2F',
    fontWeight: '900',
    lineHeight: 17,
    // marginBottom: -7,

  },

  // for PostPopup
    // container for everything, makes space for it on the screen.
  popupContainer: {
      order: 3,
      // backgroundColor: 'red', //for testing, to see where it is and how big it is.
  },
  // the actual part the text goes in.
  popup: {
      marginTop: '100%', // 0% = top, 100% = center, 200% = bottom 
      borderRadius: 7.5,
      paddingHorizontal: 20,
      height: 60, // constant for now

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

export default styles;
