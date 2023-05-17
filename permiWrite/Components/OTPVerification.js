import React, { useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const OtpVerification = () => {
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();

  const verifyOtp = () => {
    
  };

  const handleInputChange = (event, ref) => {
    if (event.nativeEvent.text.length === 1 && ref.current) {
      ref.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subTitle}>Please enter the 4-digit OTP code sent to your mobile number</Text>
      <View style={styles.inputContainer}>
        <TextInput
          ref={input1}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleInputChange({ nativeEvent: { text } }, input2)}
        />
        <TextInput
          ref={input2}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleInputChange({ nativeEvent: { text } }, input3)}
        />
        <TextInput
          ref={input3}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleInputChange({ nativeEvent: { text } }, input4)}
        />
        <TextInput
          ref={input4}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={(text) => handleInputChange({ nativeEvent: { text } }, null)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        {/* <Text style={styles.buttonText}>Verify</Text> */}
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OtpVerification;
