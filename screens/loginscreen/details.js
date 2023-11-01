import React from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import styles from '../../styles/detailsStyles'; 

const Details = ({ navigation, route }) => {
    return (
        <View style={styles.container}>

            <View style={styles.contentContainer}>
                <Image
                    source={require('../../assets/placeholder.jpg')} // Placeholder image for post
                    style={styles.postImage}
                />
                <View style={styles.row}>
                    <Text style={styles.itemName}>Item Name</Text>
                    <View>
                        <Text style={styles.location}>
                            Location:
                        </Text>
                        <Text style={styles.locationName}>
                            Johney's
                        </Text>
                    </View>
                </View>
                <View style={styles.commentContainer}>
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
                    <View style={styles.textContainer}>
                        <Text style={styles.userName}>
                            User Name
                        </Text>
                        <Text style={styles.userComment}>
                            I found some socks in johnny’s
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.commentContainer}>
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
                    <Image source={require('../../assets/user2.jpg')} style={styles.userIconStyle} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>
                        User1
                    </Text>
                    <Text style={styles.userComment}>
                        I think this is Brandon's
                    </Text>
                </View>
            </View>

            <View style={styles.commentContainer}>
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
                    <Image source={require('../../assets/user3.jpg')} style={styles.userIconStyle} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>
                        User2
                    </Text>
                    <Text style={styles.userComment}>
                        I think this is Caden's
                    </Text>
                </View>
            </View>

            
            <View style={styles.commentContainer}>
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
                <View style={styles.input}>
                    <TextInput
                        placeholder="ab12@calvin.edu"
                        placeholderTextColor="#9E8B8D" 
                        style={styles.inputText}
                        autoCapitalize={'none'}
                    />
                </View>

            </View>



        </View>
    );
}

export default Details;
