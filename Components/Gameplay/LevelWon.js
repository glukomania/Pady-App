import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { colors } from "../../data/colors";

export const LevelWon = (props) => {
  const renderSumQuizz = () => {
    return (
      <View>
        <View
          style={{
            height: "89%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ padding: "10%", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{ color: colors.orange, fontSize: 25, fontWeight: "700", marginBottom: "10%" }}
            >
              Gratulujeme!
            </Text>
            <Text style={{ color: colors.textGrey, fontSize: 18 }}>
              {`${props.currentLevel.pad}. pad je hotový. Pojďme otestovat vaše znalosti?`}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "flex-end", height: "11%", flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <Pressable onPress={props.onNePress} style={styles.buttonNe}>
              <Text style={styles.buttonText}>{"Ne"}</Text>
            </Pressable>
          </View>
          <View style={{ width: "50%" }}>
            <Pressable onPress={props.onQuizzPress} style={styles.button}>
              <Text style={styles.buttonText}>{"Jistě!"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const renderCongrats = () => {
    return (
      <View>
        {console.log("renderCongrats")}
        <View
          style={{
            height: "89%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ padding: "10%", flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{ color: colors.orange, fontSize: 25, fontWeight: "700", marginBottom: "10%" }}
            >
              Wow!
            </Text>
            <Text style={{ color: colors.textGrey, fontSize: 18 }}>
              {`${props.currentLevel.pad}. pad singulár je hotový. Jdeme na plurál ?`}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "flex-end", height: "11%", flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <Pressable onPress={props.onNePress} style={styles.buttonNe}>
              <Text style={styles.buttonText}>{"Ne"}</Text>
            </Pressable>
          </View>
          <View style={{ width: "50%" }}>
            <Pressable onPress={props.onOkPress} style={styles.button}>
              <Text style={styles.buttonText}>{"Jistě!"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {console.log("LevelWon render")}

      {props.currentLevel.type === "singular" ? renderCongrats() : renderSumQuizz()}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.orange,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonNe: {
    backgroundColor: colors.textGrey,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    margin: 6,
    color: "white",
    fontSize: 20,
  },
});

export default LevelWon;
