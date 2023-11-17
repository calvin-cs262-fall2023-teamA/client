import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#EDE7E7',
        borderRadius: 20,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
    },
    contentContainer: {
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginBottom: 5,
        marginTop: 12,
      },
    
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    
      },

    flexBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'left',
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'column',
        justifyContent: 'left',
        padding: 10,
        marginBottom: 20,
        alignItems: 'left',
    },
    item: {
        flex: 1,
        textAlign: 'center',
        margin: 5,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    itemName: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '900',
        // padding: 16,
        fontSize: 30,
        color: '#2F2E41',
      },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '600',
        // padding: 16,
        fontSize: 18,
        color: '#2F2E41',
    },
    locationName: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '900',
        // padding: 16,
        fontSize: 18,
        color: '#2F2E41',
    },
    ScrollViewContainer: {
        marginBottom: 180,
    },
    userIconStyle: {
        width: 60, // or whatever size you want
        height: 60, // or whatever size you want
        borderRadius: 50,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 5,
      },
    userName: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '900',
        // padding: 16,
        fontSize: 18,
        color: '#2F2E41',
    },
    userComment: {
        flexDirection: 'row',
        alignItems: 'center',
        fontWeight: '600',
        // padding: 16,
        fontSize: 15,
        color: '#2F2E41',
    },
    input: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0,
        marginBottom: 20,
        paddingLeft: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'space-between',
    },
    inputText:{
        fontSize: 18,
        fontWeight: '900',
        color: '#2F2E41',
        height: 50,
    },
    sendIconStyle: {
        width: 40, // or whatever size you want
        height: 40, // or whatever size you want
    },
    sendButton: {
        backgroundColor: '#FFAF66', // Background color of the search button
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 15,
        padding: 3,
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: '#EDE7E7',
        position: 'absolute',
        bottom: 0,
        paddingTop: 10,
        width: '100%',
        //height: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        bottom: 15,
        maxWidth: 350,
        margin: 10,
      },
      
    primaryButton: {
        flex: 1,
        backgroundColor: '#FAF2F2',
        borderRadius: 50,
        width: 100,
        padding: 18,
        alignItems: 'center',
        shadowColor: '#A59D95',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 7,     //drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
    },

    primaryButtonText: {
        color: '#342F2F',
        fontWeight: '900',
        fontSize: 20,
    },
    secondaryButton: {
        flex: 1,
        borderRadius: 50,
        padding: 18,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#9E8B8D',
        fontWeight: '900',
        fontSize: 20,
    },
    deleteButton: {
        flex: 1,
        Color: '#FB8282', //same as primaryButton but with a red button
        borderRadius: 50,
        width: 100,
        padding: 18,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#f03a3a', //same as primaryButton but with a red button
        fontWeight: '900',
        fontSize: 20,
    },

});

export default styles;
