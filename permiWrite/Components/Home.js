import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Letter from './Letter';
import { useNavigation } from '@react-navigation/native';

export default function Home({route}) {
    const navigation = useNavigation();
    return(
        <View style={styles.overall}>
            <View>
                <Text style={styles.welcome}>Hello, {route.params.paramKey} from {route.params.paramKeyRoll}.</Text>
            </View>

            <View style={styles.leaveLetter}>
                <Letter  name={route.params.paramKey} rollno={route.params.paramKeyRoll}/>
            </View>

            {/* Button to redirect to Requested page */}
            {/* <TouchableOpacity style={styles.Button} onPress={() => navigation.navigate('Requested')}>
                <Text style={{color: '#000000'}}>View Requested Permissions</Text>
            </TouchableOpacity> */}
        </View>
    )
}

const styles = StyleSheet.create({
    overall:{
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        // alignItems: 'center',
        backgroundColor: "#fff",
    },
    Button: {
        backgroundColor: '#ffffff',
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
    },
    requestPage: {
        opacity: .54
    },
    leaveLetter: {
        opacity: 1
    },
    welcome: {
        fontWeight: '900',
        textAlign: 'center',
        padding: 20
    }
})
