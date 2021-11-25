import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Fontisto, EvilIcons } from "@expo/vector-icons";

export const Quizz = () => {
  return (
    <View>
      <Text>Endless quizz starts here. Maybe some stats to add, or options for training</Text>
    </View>
  );
};

export default Quizz;
