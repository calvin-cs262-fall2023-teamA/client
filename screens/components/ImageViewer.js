// in ImageViewer.js
import { StyleSheet, Image } from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage, style }) {
    const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

    return <Image source={imageSource} style={[styles.image, style]} />;
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 200,
    borderRadius: 20,
  },
});
