import React, { useCallback } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { colors } from "../../data/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

export const PracticeWon = (props) => {
  const renderLevelUp = () => {
    return (
      <View>
        <View
          style={{
            height: "89%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              height: "40%",
              justifyContent: "flex-end",
              marginBottom: "7%",
            }}
          >
            <Ionicons name={"rocket-outline"} size={100} color={"#e8e8e8"} />
          </View>
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              paddingBottom: "10%",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            <Text
              style={{
                color: colors.orange,
                fontSize: 35,
                fontWeight: "700",
                marginBottom: "10%",
              }}
            >
              Výborně!
            </Text>
            <Text style={{ color: colors.textGrey, fontSize: 18 }}>
              {`S výběrem odpovědí si snadno poradíš. Teď to ztížíme, ano?`}
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
            <Pressable onPress={props.onPress} style={styles.button}>
              <Text style={styles.buttonText}>{"Jistě!"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const renderSuperWin = () => {
    return (
      <View>
        <View
          style={{
            height: "89%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Ionicons name={"trophy-outline"} size={100} color={"gold"} />
          </View>
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              paddingBottom: "10%",
            }}
          >
            <Text
              style={{
                color: colors.orange,
                fontSize: 40,
                fontWeight: "700",
                marginBottom: "10%",
                paddingTop: "10%",
              }}
            >
              Wow!
            </Text>
            <Text
              style={{
                color: colors.darkGrey,
                fontSize: 18,
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              {`Nyní jsi skutečně prokázal své dovednosti! Jsi můj hrdina!`}
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "flex-end", height: "11%", flexDirection: "row" }}>
          <View style={{ width: "100%" }}>
            <Pressable onPress={props.onNePress} style={styles.button}>
              <Text style={styles.buttonText}>{"Začít znovu!"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return <View style={{ flex: 1 }}>{props.modeInput ? renderSuperWin() : renderLevelUp()}</View>;
};

export default PracticeWon;

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
