import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { colors } from "../../data/colors";

export const LevelStart = (props) => {
  const renderPad = (number) => {
    const colorPad = () => {
      if (number < props.currentLevel.pad) {
        return colors.green;
      } else if (number === props.currentLevel.pad) {
        return colors.orange;
      } else {
        return colors.textGrey;
      }
    };

    const colorSing = () => {
      if (number < props.currentLevel.pad) {
        return colors.green;
      } else if (number === props.currentLevel.pad && props.currentLevel.type === "singular") {
        return colors.orange;
      } else if (number === props.currentLevel.pad && props.currentLevel.type === "plural") {
        return colors.green;
      } else {
        return colors.textGrey;
      }
    };

    const colorPlural = () => {
      if (number < props.currentLevel.pad) {
        return colors.green;
      } else if (number === props.currentLevel.pad && props.currentLevel.type === "singular") {
        return colors.textGrey;
      } else if (number === props.currentLevel.pad && props.currentLevel.type === "plural") {
        return colors.orange;
      } else {
        return colors.textGrey;
      }
    };

    return (
      <View style={{ flex: 1, flexDirection: "row" }} key={number}>
        {console.log("LevelStart renderPad render")}
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              color: colorPad(),
              fontSize: 36,
              fontWeight: "700",
              marginRight: "5%",
            }}
          >
            {number}.
          </Text>
        </View>

        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontWeight: "500", color: colorSing() }}>singulár</Text>
          <Text style={{ fontWeight: "500", color: colorPlural() }}>plurál</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, width: "100%", height: "100%" }}>
      {console.log("LeverStarts render")}
      <View style={{ flex: 1, height: "77%", margin: "12%", alignItems: "center" }}>
        <Text style={{ color: colors.orange, fontSize: 35, fontWeight: "700", marginBottom: "3%" }}>
          České pády
        </Text>
        {[1, 2, 3, 4, 5, 6, 7].map(renderPad)}
      </View>
      <Pressable style={styles.button} onPress={props.onPress}>
        <Text style={styles.buttonText}>{"Jdeme na to! "}</Text>
      </Pressable>
    </View>
  );
};

export default LevelStart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    paddingLeft: "25%",
  },
  button: {
    backgroundColor: colors.orange,
    width: "100%",
    height: "11%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    margin: 6,
    color: "white",
    fontSize: 20,
  },
});
