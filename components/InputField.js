/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

/* Handles the styling of input fields for the "add page." */
export default function InputField({ header, bodySize, changeText }) {

    return (
        // doesn't avoid keyboard yet.
        <View style={styles.component}>
            <Text style={styles.headerText}>{header}</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => {changeText(text)}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
        marginBottom: 15,
        width: '90%',
        
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 15,
        Color: '#342F2F',
        // color: 'white', // Assuming you want the text color to be white for better visibility against the dark background
        padding: 0, // Added some padding for better appearance
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10, // Rounded corners
        marginTop: 5, // Added some margin for spacing between header and input
    },
});
