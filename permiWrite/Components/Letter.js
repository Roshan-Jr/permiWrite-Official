import { Formik, Field, Form } from "formik";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { object, string } from "yup";
import DropdownComponent from "../SubComponents/leaveLetterDropDown";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { db } from "../Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from '@expo/vector-icons';


let userSchema = object({

  Description: string().max(50).required("Required"),
  fromDate: string()
    .max(10)
    .matches(/^[0-9/]*$/, 'only "DD/MM/YYYY"'),
  rollNo: string().max(10).required("Required"),
});

export default function Letter(props) {

  const [isFromDateVisible, setFromDateVisibility] = useState(false);
  const [isToDateVisible, setToDateVisibility] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const showFromDatePicker = () => {
    setFromDateVisibility(true);
  };

  const hideFromDatePicker = () => {
    setFromDateVisibility(false);
  };

  const handleFromDateConfirm = (date) => {
    setFromDate(date.toDateString());
    hideFromDatePicker();
  };

  const showToDatePicker = () => {
    setToDateVisibility(true);
  };

  const hideToDatePicker = () => {
    setToDateVisibility(false);
  };

  const handleToDateConfirm = (date) => {
    setToDate(date.toDateString());
    hideToDatePicker();
  };

  const handleSubmit = () => {
    firebase.database().ref('dates').push({
      from: fromDate,
      to: toDate,
    });
  };


  const navigation = useNavigation();
  const [dataset, setDataset] = useState("");
  const addData = async (value) => {
    // if (myArray[0] !== values.email) {
    try {
      const docRef = await addDoc(collection(db, "studentData"), value);
      console.log("values.fullName")
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // } else {
    //   alert("data is there");
    // }
  };
  // const [isFocus, setIsFocus] = useState(false);
  const home = (home) => {
    setDataset(home);
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        Description: "",
        rollNo: "",
        fromDate: "",
        toDate: "",
      }}
      validateOnMount={true}
      onSubmit={(values) => console.log(values)}
      validationSchema={userSchema}
    >
      {({ handleChange, handleBlur, values, touched, errors }) => (
        <View style={styles.overAll}>
          <DropdownComponent home={home} />

          <View style={styles.inputContainers}>
            <TextInput
              multiline
              minHeight={100}
              onChangeText={handleChange("Description")}
              onBlur={handleBlur("Description")}
              value={values.Description}
              style={styles.description}
              placeholder="Explain the Situation"
              placeholderTextColor="grey"
            />

            {errors.Description && touched.Description && (
              <Text style={styles.errors}>{errors.Description}</Text>
            )}
          </View>

          {/* <View style={styles.parentView}>
            <View style={styles.containedView1}>
              <Text style={styles.text1}>From Date</Text>
              <TextInput
                onChangeText={handleChange("fromDate")}
                onBlur={handleBlur("fromDate")}
                value={values.fromDate}
                style={styles.fromDate}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="grey"
              />
              {errors.fromDate && touched.fromDate && (
                <Text style={styles.errors}>{errors.fromDate}</Text>
              )}
            </View>
            <View style={styles.containedView2}>
              <Text style={styles.text2}>To Date</Text>
              <TextInput
                onChangeText={handleChange("toDate")}
                onBlur={handleBlur("toDate")}
                value={values.toDate}
                style={styles.toDate}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="grey"
              />
            </View>
          </View> */}

          <View style={styles.container}>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={showFromDatePicker}>
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={styles.datePickerText}>{fromDate || 'From Date'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isFromDateVisible}
          mode="date"
          onConfirm={handleFromDateConfirm}
          onCancel={hideFromDatePicker}
        />
      </View>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={showToDatePicker}>
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={styles.datePickerText}>{toDate || 'To Date'}</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isToDateVisible}
          mode="date"
          onConfirm={handleToDateConfirm}
          onCancel={hideToDatePicker}
        />
      </View>
      {/* <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity> */}
    </View>

          <View style={styles.inputContainer}>
            <View style={styles.Button}>
              <Button
                // style={styles.Button}
                title="Submit"
                // disabled={Object.keys(errors).length !== 0}
                onPress={() => {
                  console.log(dataset + "dataset");
                  console.log(values.Description);
                  console.log(values.fromDate);
                  console.log(values.toDate);
                  console.log(props.name);
                  console.log(props.rollno);
                  addData( {
                    "description": values.Description,
                    "fromDate": fromDate,
                    "rollNo": props.rollno,
                    "toDate": toDate,
                    "reason": dataset,
                    "name": props.name,
                  });
                  navigation.navigate("Requested",{paramKey: props.name});
                }}
              />
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  parentView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingLeft: 24,
    paddingRight: 24,
  },
  overAll: {
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  datepicker: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containedView1: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  containedView2: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainers: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  fullnameInput: {
    borderWidth: 1,
    width: 350,
    height: 60,
    // padding: 4,
    borderRadius: 10,
    marginTop: 20,
    textAlign: "center",
  },
  description: {
    width: 350,
    height: 60,
    textAlign: "center",
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
  },
  rollNo: {
    borderWidth: 1,
    width: 350,
    height: 60,
    // padding: 4,
    borderRadius: 10,
    marginTop: 10,
    textAlign: "center",
  },
  errors: {
    fontSize: 12,
    color: "red",
    fontWeight: "medium",
    marginTop: 10,
  },
  // buttonText: {
  //     color: 'white'
  // }
  Button: {
    width: 350,
    marginTop: 10,
  },
  text1: {
    paddingTop: 10,
    // color: 'black'
    fontWeight: "900",
  },
  text2: {
    paddingTop: 10,
    fontWeight: "900",
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 10,
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  label: {
    marginLeft: 10,
  },
});
