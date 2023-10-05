import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

class MyTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '', // Store the input text in component state
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder="Enter text here"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default MyTextInput;
