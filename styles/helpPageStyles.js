import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    primaryButton: {
        alignItems: 'center',
        backgroundColor: '#FAF2F2',
        borderRadius: 50,
        width: '85%',
        padding: 18,
        marginBottom: 10,
        marginTop: 30,
        shadowColor: '#A59D95',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 7, //  drop-shadow(0px 8px 24px rgba(165, 157, 149, 0.20)),
        zIndex: -1
      },
    
      primaryButtonText: {
        color: '#342F2F',
        fontWeight: '900',
        fontSize: 20
      },

});

export default styles;
