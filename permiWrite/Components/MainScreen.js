import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TeacherRequestsPage from './TeacherRequestsPage';
import TeachersDashboard from './TeachersDashboard';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={styles.container}>
      <TeacherRequestsPage />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <TeachersDashboard />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
    </View>
  );
}

function MainScreen() {
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Requests" component={HomeScreen} />
        <Tab.Screen name="Dashboard" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  },
});

export default MainScreen;
