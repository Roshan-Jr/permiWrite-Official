import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Choose = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to permiWrite</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('TeacherRegistration')}>
        <Text style={styles.buttonText}>I am a Teacher</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>I am a Student</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#008080',
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Choose;
