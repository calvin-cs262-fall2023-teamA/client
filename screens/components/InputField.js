import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
/* Handles the styling of input fields for the "add page." */

export default function InputField({ header, bodySize, changeText }) {

    return (
        //doesn't avoid keyboard yet.
        <View style={styles.component}>
            <Text style={styles.titleText}>{header}</Text>
            <TextInput
                style={[styles.input, {height: bodySize}]}
                onChangeText={(text) => {changeText(text)}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    component: {
        marginBottom: '10%',
    },
    header: {
        
    },
    input: {
        
    },
});