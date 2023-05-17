import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TeacherRequestsPage() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [numApproved, setNumApproved] = useState(0);
  const [numDenied, setNumDenied] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "studentData"));
        const data = [];
        let approvedCount = 0;
        let deniedCount = 0;
        querySnapshot.forEach((doc) => {
          const request = { id: doc.id, ...doc.data() };
          data.push(request);
          if (request.status === "approved") {
            approvedCount++;
          } else if (request.status === "denied") {
            deniedCount++;
          }
        });
        setData(data);
        setNumApproved(approvedCount);
        setNumDenied(deniedCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfoContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={[styles.itemText, styles.statusText]}>
          {item.status === "approved" ? "Approved" : item.status === "denied" ? "Denied" : "Pending"}
        </Text>
      </View>
      <View style={styles.itemIconContainer}>
        <Ionicons name="chevron-forward-outline" size={24} color="#666" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsText}>
            {numApproved}
          </Text>
          <Text style={styles.statsLabel}>
            Requests approved
          </Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsText}>
            {numDenied}
          </Text>
          <Text style={styles.statsLabel}>
            Requests denied
          </Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const { width, height } = Dimensions.get("window");
const itemWidth = width * 0.85;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#fff",
  paddingHorizontal: 24,
  paddingVertical: 16,
  },
  statsContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 16,
  },
  statsItem: {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f2f2f2",
  borderRadius: 12,
  width: "45%",
  paddingVertical: 16,
  },
  statsText: {
  fontSize: 28,
  fontWeight: "bold",
  color: "#4B0082",
  },
  statsLabel: {
  fontSize: 14,
  fontWeight: "bold",
  color: "#333",
  marginTop: 8,
  },
  itemContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 16,
  marginVertical: 8,
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: {
  width: 0,
  height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  },
  itemInfoContainer: {
  flex: 1,
  },
  itemText: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#333",
  },
  statusText: {
  color: "#4B0082",
  marginTop: 4,
  },
  itemIconContainer: {
  justifyContent: "center",
  alignItems: "center",
  },
  });