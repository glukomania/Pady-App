import React, { useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import { Table, Row, Rows, Col, TableWrapper, Cell } from "react-native-table-component";
import { colors } from "../../data/colors";
import { rules } from "../../data/rules";

export const ModalRule = (props) => {
  const rule = useMemo(() => rules[props.rule.pad][props.rule.type], [props.rule]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      {console.log("ModalRule render")}

      <View style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20, color: "#ec9706", marginTop: "9%", fontWeight: "700" }}>
            {props.padName}
          </Text>
        </View>
        <ScrollView style={{ width: "100%", height: "65%" }}>
          <View style={styles.ruleModalContainer}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc", marginBottom: "5%" }}>
              <Row
                data={rule.adjactives.tableHead}
                style={styles.head}
                flexArr={[0.5, 1, 1, 1]}
                textStyle={styles.tableText}
              />
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={rule.adjactives.tableData}
                  flexArr={[0.5, 1, 1, 1]}
                  style={styles.tablerow}
                  textStyle={styles.tableText}
                />
              </TableWrapper>
            </Table>
          </View>

          <View style={styles.ruleModalContainer}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc", marginBottom: "5%" }}>
              <Row
                data={rule.subjectives.tableHead}
                style={styles.head}
                textStyle={styles.tableText}
                flexArr={[0.5, 1, 1, 1]}
              />
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={rule.subjectives.tableData}
                  flexArr={[0.5, 1, 1, 1]}
                  style={styles.tablerow}
                  textStyle={styles.tableText}
                />
              </TableWrapper>
            </Table>
          </View>
        </ScrollView>
        <Pressable
          style={{
            height: "8%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.orange,
          }}
          onPress={() => props.setIsRuleModalOpen(false)}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Jasně</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ModalRule;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: "10%",
    justifyContent: "flex-start",
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },

  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
  },

  buttonText: {
    margin: 6,
    color: "white",
    fontSize: 20,
  },
  head: {
    backgroundColor: "#f1f1f1",
  },
  tablerow: {
    minHeight: 30,
  },
  tableText: {
    padding: 5,
  },
  ruleContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "90%",
    height: "90%",
  },
  ruleModalContainer: {
    flex: 1,
    width: "100%",
    paddingTop: "5%",
    justifyContent: "flex-start",
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
