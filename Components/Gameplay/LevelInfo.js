import React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";

export const LevelInfo = (props) => {
  const adgTableHead = props.rule.adjactives.tableHead;
  const adgTableData = props.rule.adjactives.tableData;
  const subjTableHead = props.rule.subjectives.tableHead;
  const subjTableData = props.rule.subjectives.tableData;

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      {console.log("LevelInfo render")}

      <View style={{ height: "8%", marginTop: "4%" }}>
        <Text style={{ fontSize: 20, color: "#ec9706", marginTop: "6%", fontWeight: "700" }}>
          {props.padName}
        </Text>
      </View>
      <View style={{ height: "8%" }}>
        <Text style={{ fontSize: 15, color: "#ec9706", marginTop: "3%", fontWeight: "700" }}>
          {[props.currentLevel.type]}
        </Text>
      </View>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc", marginBottom: "5%" }}>
            <Row
              data={adgTableHead}
              style={styles.head}
              flexArr={[0.5, 1, 1, 1]}
              textStyle={styles.text}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={adgTableData}
                flexArr={[0.5, 1, 1, 1]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </View>

        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc", marginBottom: "5%" }}>
            <Row
              data={subjTableHead}
              style={styles.head}
              textStyle={styles.text}
              flexArr={[0.5, 1, 1, 1]}
            />
            <TableWrapper style={styles.wrapper}>
              <Rows
                data={subjTableData}
                flexArr={[0.5, 1, 1, 1]}
                style={styles.row}
                textStyle={styles.text}
              />
            </TableWrapper>
          </Table>
        </View>
      </ScrollView>
      <Pressable onPress={props.onPress} style={styles.button}>
        <Text style={styles.buttonText}>{"Ok, start the quizz"}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: "5%",
  },
  head: {
    backgroundColor: "#f1f1f1",
  },
  buttonText: {
    margin: 6,
    color: "white",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#ec9706",
    width: "100%",
    height: "11%",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    minHeight: 30,
  },
  text: {
    padding: 5,
  },
  wrapper: { flexDirection: "row" },
});

export default LevelInfo;
