import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Training } from "./Components/Training";
import { Quizz } from "./Components/Quizz";
import { Settings } from "./Components/Settings";
import { Info } from "./Components/Info";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function App() {
  const [storageProgress, setStorageProgress] = useState({ pad: 1, type: "singular" });
  const [maxScoreToWin, setMaxScoreToWin] = useState(10);

  const readStoragePad = async () => {
    try {
      await AsyncStorage.getItem("pad").then((res) => {
        console.log("App pad", res);
        res && setStorageProgress({ type: storageProgress.type, pad: res });
      });
    } catch (err) {
      alert(err);
    }
  };
  const readStorageType = async () => {
    try {
      await AsyncStorage.getItem("type").then((res) => {
        console.log("App type", res);
        res && setStorageProgress({ type: res, pad: storageProgress.pad });
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    console.log("==== The App is started ======");
    readStoragePad();
    readStorageType();
  }, []);

  return (
    <NavigationContainer>
      {console.log("APP renders")}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Trénink") {
              iconName = "school-outline";
            } else if (route.name === "Nastavení") {
              iconName = "cog-outline";
            } else if (route.name === "Info") {
              iconName = "information-circle-outline";
            } else if (route.name === "Quizz") {
              iconName = "barbell-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#ec9706",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Trénink"
          options={{ headerShown: false }}
          children={() => (
            <Training
              maxScoreToWin={maxScoreToWin}
              test={"test"}
              storageProgress={storageProgress}
              setStorageProgress={setStorageProgress}
            />
          )}
        />
        <Tab.Screen name="Info" component={Info} />
        <Tab.Screen
          name="Nastavení"
          children={() => (
            <Settings
              storageProgress={storageProgress}
              maxScoreToWin={maxScoreToWin}
              setMaxScoreToWin={setMaxScoreToWin}
            />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
