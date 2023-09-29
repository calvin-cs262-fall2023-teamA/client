import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SelectionPage = () => {
    //vars
    const navigation = useNavigation();

    //methods


    //display
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.headingTop}>Calvin</Text>
                    <Text style={styles.headingBottom}>Finds</Text>
                </View>
                <View style={styles.imageContainer}>
                    {/* space for more heading elements, such as an image. 
                    Currently called imageContainer assuming an image would go here.
                    Doesn't have to be. Design will likely be changed overall.*/}
                    {/*we could probably just make the image+title all in one image,
                    similar to the login page svg*/}
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.lostButton}>
                    <Text style={styles.buttonText} 
                    onPress={() => navigation.navigate('MainPage')}>I LOST SOMETHING</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.foundButton}>
                    <Text style={styles.buttonText} 
                    onPress={() => navigation.navigate('Add')}>I FOUND SOMETHING</Text>
                    {/*'Add' is a placholder */}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    //main container
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: '#EDE7E7',
        //justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    //subcontainers (Header (title + image?) and buttons)
    headingContainer: {
        order: 1,
        //backgroundColor: '#2F2E41', //for testing, to see where the container is on the screen
        flexDirection: 'row-reverse',
        flex: 1,
        //justifyContent: 'space-around',

        width: '100%',
        margin: 20,

    },
    titleContainer: {
        order: 2,
        //backgroundColor: "red", //for testing, to see where the container is on the screen
        width: "50%",
        alignSelf: 'center',
        //alignSelf: 'flex-end',
        alignItems: 'center',
        marginRight: '10%',
    },
    imageContainer: {
        order: 1,
        //backgroundColor: 'blue', //for testing, to see where the container is on the screen
        width: "50%",
    },
    buttonContainer: {
        order: 2,
        flexDirection: 'column',
        //backgroundColor: '#9E888D', //for testing, to see where the container is on the screen
        justifyContent: 'space-between',
        
        minWidth: 200, //minimum to fit text
        height: 180, //60 button, 60 space, 60 button
        textAlign: 'center',

        margin: 30, //make sure it is not at the bottom of the page
    },
    //two lines of text in the heading
    headingTop: {
        color: '#2F2E41',

        fontSize: 60,
        fontWeight: '900',
        marginBottom: -20,
    },
    headingBottom: {
        color: '#2F2E41',

        fontSize: 60,
        fontWeight: '800',
        marginLeft: 20,
    },
    //Buttons
    lostButton: {
        backgroundColor: '#FF9B53',
        padding: 2,
        borderRadius: 50,
        height: 60, //constant height (for now)

        alignItems: 'center',
        justifyContent: 'center',

        
    },
    foundButton: {
        backgroundColor: '#F04564',
        padding: 2,
        borderRadius: 50,
        height: 60, //constant height (for now)

        alignItems: 'center',
        justifyContent: 'center',
    },
    //Button Text
    buttonText: {
        color: '#FAF2F2',
        fontWeight: 'bold',
        fontSize: 18,
    },
    
    
    
    // //heading styling
    // headingContainer: {
    //     alignItems: 'flex-end', 
    // },
    // headingTop: {
    //     fontSize: 60,
    //     fontWeight: '900',
    //     marginBottom: -20, 
    //     color: '#FFF5D2',
    //     textAlignVertical: 'center', 
    // },
    // headingBottom: {
    //     fontSize: 60,
    //     fontWeight: '900',
    //     marginBottom: 100,
    //     color: '#FFF5D2',
    //     textAlignVertical: 'center', // Vertically align the text
    // },

    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'right',
    //     backgroundColor: '#342F2F',
    //     padding: 30,
    //   },
    // // container: {
    // //     backgroundColor: '#342F2F',
    // //     flex: 1,
    // //     flexDirection: 'column',
    // //     //layout of buttons
    // //     //paddingVertical: 100,
    // //     //alignItems: 'center',
    // //     justifyContent: 'space-between',
    // //     //alignItems: 'center',
    // //     //gap: 30px,
    // // },
    // button: {
    //     flex: 1,
    //     flexGrow: 4,
    //     //top: 450,
    //     //width: 200,
    //     backgroundColor: 'red',
    //     borderRadius: 50,
    //     //height: 70,
    //     //paddingVertical: 120,
    //     //paddingHorizontal: 50,
    //     marginHorizontal: 50,
    //     marginVertical: 100,
    //     //alignItems: 'center',
    // },
    // buttonText: {

    // },
    // titleText: {

    // }
});

export default SelectionPage;