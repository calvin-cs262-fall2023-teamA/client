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
        marginBottom: 10,
        marginTop: 14,
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
        paddingVertical: 10,
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
    userIconStyle: {
        width: 60, // or whatever size you want
        height: 60, // or whatever size you want
        borderRadius: 50,
        marginHorizontal: 10,
        marginBottom: 30,
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
        alignItems: 'center',
        borderWidth: 0,
        padding: 3,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    inputText:{
        fontSize: 18,
        fontWeight: '900',
        color: '#2F2E41',
        height: 50,
      },
});

export default styles;
