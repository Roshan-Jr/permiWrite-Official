import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../Firebase";
import { collection, getDocs, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, Avatar } from "react-native-paper";

export default function Requested({ route }) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      const querySnapshot = await getDocs(collection(db, "studentData"));
      const data = [];
      querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setData(data);
    };
  
    fetchStudentData();
  
    const unsubscribe = onSnapshot(collection(db, "studentData"), (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() }));
      setData(data);
    });
  
    return unsubscribe;
  }, []);
  
  
  const updateStatus = async (id, newStatus) => {
    try {
      const studentRef = doc(db, "studentData", id);
      await updateDoc(studentRef, { status: newStatus });
    } catch (error) {
      console.error(error);
    }
  };

  if (!route.params || !route.params.paramKey) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      {data.map((item) => {
        if (item.name === route.params.paramKey) {
          let statusStyle = styles.statusPending;
          let statusText = "Pending";
          if (item.status === "approved") {
            statusStyle = styles.statusApproved;
            statusText = "Approved";
          } else if (item.status === "denied") {
            statusStyle = styles.statusDenied;
            statusText = "Denied";
          }
          return (
            <Card key={item.id} style={styles.card}>
              <Card.Title
                title={item.name}
                subtitle={`RollNo: ${item.rollNo}`}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="account"
                    style={styles.avatar}
                  />
                )}
              />
              <Card.Content>
                <Text style={styles.text}>
                  <Text style={styles.label}>Reason: </Text>
                  {item.reason}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>From Date: </Text>
                  {item.fromDate} {/* Display the fromDate */}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>To Date: </Text>
                  {item.toDate} {/* Display the toDate */}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Description: </Text>
                  {item.description}
                </Text>
                <Text style={[styles.text, statusStyle]}>
                  <Text style={styles.label}>Status: </Text>
                  {statusText}
                </Text>
              </Card.Content>
            </Card>
          );
        }
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  card: {
    margin: 8,
    elevation: 4,
  },
  avatar: {
    backgroundColor: "#007bff",
  },
  label: {
    fontWeight: "bold",
  },
  text: {
    marginVertical: 4,
  },
  statusPending: {
    color: "orange",
    fontWeight: "bold",
  },
  statusApproved: {
    color: "green",
    fontWeight: "bold",
  },
  statusDenied: {
    color: "red",
    fontWeight: "bold",
  },
});
