import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Counter from "react-native-counters";

export const Settings = (props) => {
  const [progress, setProgress] = useState(props.storageProgress);
  const [pad, setPade] = useState();
  const [type, setType] = useState();

  const clearProgressPad = async () => {
    AsyncStorage.removeItem("pad").then(alert("pad is cleared"));
  };

  const clearProgressType = async () => {
    AsyncStorage.removeItem("type").then(alert("type is cleared"));
  };

  const readStoragePad = async () => {
    try {
      await AsyncStorage.getItem("pad").then((res) => {
        res && setPade(res);
      });
    } catch (err) {
      alert(err);
    }
  };
  const readStorageType = async () => {
    try {
      await AsyncStorage.getItem("type").then((res) => {
        res && setType(res);
      });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    readStoragePad();
    readStorageType();
  }, []);

  useEffect(() => {
    setProgress({ pad: pad, type: type });
  }, [pad, type]);

  return (
    <View style={{ flex: 1, margin: "10%" }}>
      {console.log("Settings render")}

      <View style={{ marginBottom: "20%" }}>
        <Text style={{ marginBottom: "5%", fontWeight: "700", fontSize: 18 }}>
          Number of correct answers to go to the next level:
        </Text>
        <Counter
          start={props.maxScoreToWin}
          min={1}
          max={50}
          buttonStyle={{ borderColor: "orange" }}
          buttonTextStyle={{ color: "orange", fontSize: 30 }}
          countTextStyle={{ color: "black", fontSize: 20 }}
          onChange={(item) => props.setMaxScoreToWin(item)}
        />
      </View>

      <View>
        <Text style={{ fontSize: 18 }}>
          <Text style={{ fontWeight: "700" }}>{"Current level: "}</Text>
          {progress && progress.pad !== undefined ? progress.pad + " " + progress.type : "no data"}
        </Text>
        <Pressable
          onPress={() => {
            clearProgressPad();
            clearProgressType();
            props.setShouldReadStorage(true);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{"Erase study progress"}</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => {
          readStoragePad();
          readStorageType();
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{"Read data from storage"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    margin: 6,
    color: "white",
    fontSize: 18,
  },
  text: {
    margin: 6,
  },
  button: {
    marginTop: "5%",
    backgroundColor: "#ec9706",
    borderWidth: 1,
    borderColor: "#ec9706",
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
    borderRadius: 15,
  },
});

export default Settings;
