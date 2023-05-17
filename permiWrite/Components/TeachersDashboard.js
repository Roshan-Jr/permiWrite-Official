import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../Firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { IconButton } from 'react-native-paper';


export default function TeachersDashboard() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "studentData"));
        const data = [];
        querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  // const handleApprove = async (id) => {
  //   try {
  //     await updateDoc(doc(db, "studentData", id), { status: "approved" });
  //     // Refresh the data
  //     const querySnapshot = await getDocs(collection(db, "studentData"));
  //     const data = [];
  //     querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
  //     setData(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleDeny = async (id) => {
  //   try {
  //     await updateDoc(doc(db, "studentData", id), { status: "denied" });
  //     // Refresh the data
  //     const querySnapshot = await getDocs(collection(db, "studentData"));
  //     const data = [];
  //     querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
  //     setData(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, "studentData", id), { status: "approved" });
      // Remove the item from data array once it is approved
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleDeny = async (id) => {
    try {
      await updateDoc(doc(db, "studentData", id), { status: "denied" });
      // Remove the item from data array once it is denied
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <IconButton
          icon="menu"
          color="#fff"
          size={30}
          onPress={() => setVisible(true)}
        /></View> */}
      {data.map((item) => (
        <Card key={item.id} style={styles.card}>
        <Card.Title
          title={item.name}
          subtitle={`RollNo: ${item.rollNo}`}
          left={(props) => (
            <Avatar.Icon {...props} icon="account" style={styles.avatar} />
          )}
        />
        <Card.Content>
          <Text style={styles.text}>
            <Text style={styles.label}>Reason: </Text>
            {item.reason}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>From Date: </Text>
            {item.fromDate}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>To Date: </Text>
            {item.toDate}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.label}>Description: </Text>
            {item.description}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => handleApprove(item.id)}>Approve</Button>
          <Button onPress={() => handleDeny(item.id)}>Deny</Button>
        </Card.Actions>
        {item.status === "approved" && (
          <View style={styles.statusContainer}>
            <MaterialCommunityIcons name="check-circle-outline" size={24} color="green" />
            <Text style={styles.statusText}>Approved</Text>
          </View>
        )}
        {item.status === "denied" && (
          <View style={styles.statusContainer}>
            <MaterialCommunityIcons name="close-circle-outline" size={24} color="red" />
            <Text style={styles.statusText}>Denied</Text>
          </View>
        )}
      </Card>
      
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: "#03a9f4",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 10,
  },
  statusText: {
    marginLeft: 5,
  },
});