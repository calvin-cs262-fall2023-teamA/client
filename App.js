import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>iLostIt</Text>
      <Text style={styles.regularText}>A simple lost and found app.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 40,
    //fontFamily: 'sans-serif',
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#fff',
  },
  regularText: {
    color:'#fff',
  }
});
