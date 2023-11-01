import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
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
                    <View>
                        <Text style={styles.name1}>
                            User Name
                        </Text>
                        <Text style={styles.name2}>
                            I found some socks in johnny’s
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.flexBox}>
                <Text style={styles.item}>Item 3</Text>
                <Text style={styles.item}>Item 4</Text>
            </View>
        </View>
    );
}

export default Details;
