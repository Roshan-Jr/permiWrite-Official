// import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import { object, string } from 'yup';
import { Form, Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Home from './Home';
import { db } from "../Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";


let userSchema = object({
    fullName: string()
        .max(50)
        .required('Required'),
    email: string()
        .email('Must be a valid email')
        .required('Required')
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[kgkite]+(?:\.[ac.in]+)*$/, 'College email only!'),
        phoneNumber: string()
        .required('Required')
        .matches(/^[0-9]{10}$/, 'Must be a valid phone number')
});


export default function TeacherRegistration({ navigation }) {
  const addData = async (value) => {
    try {
      const docRef = await addDoc(collection(db, "teacherData"), value);
      console.log("values.fullName")
      console.log("values.phoneNumber")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

    return (
        <Formik
            initialValues={{ fullName: '', email: '',}}
            validateOnMount={true}
            onSubmit={values => console.log(values)}
            validationSchema={userSchema}
        >
            {({ handleChange, handleBlur, values, touched, errors }) => (
                <View style={styles.overall}>
                  <Text style={styles.title}>Teacher Registration</Text>
                    <View style={styles.inputContainer}>
                            <TextInput
                                onChangeText={handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                                style={styles.fullnameInput}
                                placeholder='Full Name'
                                placeholderTextColor='grey'
                            />
                            {(errors.fullName && touched.fullName) &&
                                <Text style={styles.errors}>{errors.fullName}</Text>
                            }
                        </View>


                    <View style={styles.inputContainers}>
                        <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={styles.mailId}
                            placeholder='College Mail ID'
                            placeholderTextColor='grey'
                            keyboardType='email-address'
                            />

                        {(errors.email && touched.email) &&
                            <Text style={styles.errors}>{errors.email}</Text>
                        }
                    </View>

                    <View style={styles.inputContainer}>
                    <TextInput
                        onChangeText={handleChange('phoneNumber')}
                        onBlur={handleBlur('phoneNumber')}
                        value={values.phoneNumber}
                        style={styles.phoneInput}
                        placeholder='Phone Number'
                        placeholderTextColor='grey'
                        keyboardType='numeric'
                    />
                    {(errors.phoneNumber && touched.phoneNumber) &&
                        <Text style={styles.errors}>{errors.phoneNumber}</Text>
                    }
                    </View>

                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                if (Object.keys(errors).length === 0) {
                                addData({
                                    fullName: values.fullName,
                                    email: values.email,
                                    phoneNumber: values.phoneNumber
                                });
                                navigation.navigate('MainScreen');
                                } else {
                                Alert.alert('Error', 'Please fill out all required fields correctly.');
                                }
                            }}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    overall: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    phoneInput: {
        borderWidth: 1,
        width: 350,
        height: 60,
        borderRadius: 10,
        marginTop: 10,
        textAlign: 'center'
      },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainers: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullnameInput: {
        borderWidth: 1,
        width: 350,
        height: 60,
        borderRadius: 10,
        marginTop: 20,
        textAlign: 'center'
    },
    headText: {
        textAlign: 'center'
    },
    mailId: {
        width: 350,
        height: 60,
        textAlign: 'center',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10
    },
    rollNo: {
        borderWidth: 1,
        width: 350,
        height: 60,
        borderRadius: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    errors: {
        fontSize: 12,
        color: 'red',
        fontWeight: 'medium',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        width: 350,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
      },
})
