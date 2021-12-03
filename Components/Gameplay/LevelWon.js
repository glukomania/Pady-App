import React, { useCallback } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { colors } from "../../data/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

export const LevelWon = (props) => {
  const renderSumQuizz = () => {
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
            <Ionicons name={"speedometer-outline"} size={100} color={"#e8e8e8"} />
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
            }}
          >
            <Ionicons name={"trending-up-outline"} size={100} color={"#e8e8e8"} />
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
              Skvěle to jde!
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

  const renderQuizzPassed = () => {
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
            <Ionicons name={"ribbon-outline"} size={100} color={"gold"} />
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
                color: colors.green,
                fontSize: 40,
                fontWeight: "700",
                marginBottom: "10%",
                paddingTop: "10%",
              }}
            >
              Konečně!
            </Text>
            <Text
              style={{
                color: colors.darkGrey,
                fontSize: 18,
                paddingLeft: "10%",
                paddingRight: "10%",
              }}
            >
              {`Teďka ${props.currentLevel.pad}. pad máte hotový. Jdeme dál na ${
                props.currentLevel.pad + 1
              }.?`}
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
              <Text style={styles.buttonText}>{"OK!"}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const renderTotalWin = () => {
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
              Kdo by si pomyslel!
            </Text>
            <Text style={{ color: colors.textGrey, fontSize: 18 }}>
              {`Teď umíte skloňovat lépe než kterýkoli Čech!`}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderWinScreen = useCallback(() => {
    if (
      props.currentLevel.pad < 7 ||
      (props.currentLevel.pad === 7 && props.currentLevel.type !== "quizz")
    ) {
      if (props.currentLevel.type === "quizz") {
        return renderQuizzPassed();
      } else if (props.currentLevel.type === "singular") {
        return renderCongrats();
      } else if (props.currentLevel.type === "plural") {
        return renderSumQuizz();
      }
    } else {
      renderTotalWin();
    }
  }, [props.currentLevel]);

  return <View style={{ flex: 1 }}>{renderWinScreen()}</View>;
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
