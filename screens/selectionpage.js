import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const SelectionPage = ({ route, navigation }) => {
    //vars

    //THIS IS NOT ROUTE.NAME FOR ALL PAGES. 
    //It is a hard-coded variable passed to the selection screen.
    const {prevRoute} = route.params; 
    /*set to "Login" if coming from login screen, 
    name of adddetails ("AddDetails") if coming from add details screen,
    and... */
    

    const [modalVisible, setModalVisible] = useState(false);
    //const [hasRendered, setRenderState] = useState(false); //prevent re-renders -> infinite loop

    //methods

    /*Used to give feedback to the user after they (successfully) add an item 
    (from adddetails.js) to the database. 
    Right now, that just means that the user made an item listing at the "addPage" screen.*/
    //currently has related code in this file and addpage.js.
    //Code is messy, should probably be refactored at some point.
    useEffect(() => {
        //set modal (popup) to true until the user dismisses it.
        if (prevRoute === "AddPage") setModalVisible(true); 
    }, [prevRoute]); //might work inconsistently.
    
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
                    onPress={() => {
                        //send information to the selection (current) page to "reset" the pop up.
                        //Without this, the popup will only work once (unless the useEffect is refactored in the future).
                        navigation.navigate({
                            name: 'Selection',
                            params: { prevRoute: 'reset'},
                            merge: true,
                        }),
                        navigation.navigate('AddPage')
                    }}>I FOUND SOMETHING</Text>
                </TouchableOpacity>
            </View>

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

    //for PostPopup
    //container for everything, makes space for it on the screen.
    popupContainer: {
        order: 3,
        padding: '4.25%',         //padding: 15,
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
});

export default SelectionPage;