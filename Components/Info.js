import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { List } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { rules } from "../data/rules.js";
import { Table, Row, Rows, Col, TableWrapper, Cell } from "react-native-table-component";

export const Info = () => {
  const renderPad = (number) => {
    return (
      <List.Accordion
        title={rules[number].question}
        left={() => <Ionicons size={29} color={"#ccc"} name="chevron-down-circle-outline" />}
        titleStyle={{ color: "black" }}
      >
        <List.Accordion title="singular">
          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc", marginBottom: "5%" }}>
              <Row
                data={rules[number].singular.adjactives.tableHead}
                style={styles.head}
                flexArr={[0.5, 1, 1, 1]}
                textStyle={styles.text}
              />
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={rules[number].singular.adjactives.tableData}
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
                data={rules[number].singular.subjectives.tableHead}
                style={styles.head}
                textStyle={styles.text}
                flexArr={[0.5, 1, 1, 1]}
              />
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={rules[number].singular.subjectives.tableData}
                  flexArr={[0.5, 1, 1, 1]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
          </View>
        </List.Accordion>

        <List.Accordion title="plural">
          <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc", marginBottom: "5%" }}>
              <Row
                data={rules[number].plural.adjactives.tableHead}
                style={styles.head}
                flexArr={[0.5, 1, 1, 1]}
                textStyle={styles.text}
              />
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={rules[number].plural.adjactives.tableData}
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
                data={rules[number].plural.subjectives.tableHead}
                style={styles.head}
                textStyle={styles.text}
                flexArr={[0.5, 1, 1, 1]}
              />
              <TableWrapper style={styles.wrapper}>
                <Rows
                  data={rules[number].plural.subjectives.tableData}
                  flexArr={[0.5, 1, 1, 1]}
                  style={styles.row}
                  textStyle={styles.text}
                />
              </TableWrapper>
            </Table>
          </View>
        </List.Accordion>
      </List.Accordion>
    );
  };
  return (
    <ScrollView style={{ width: "100%", height: "65%" }}>
      <List.Section>
        {renderPad(1)}
        {renderPad(2)}
        {renderPad(3)}
        {renderPad(4)}
        {renderPad(5)}
        {renderPad(6)}
        {renderPad(7)}
      </List.Section>
    </ScrollView>
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
  },
  button: {
    marginTop: "5%",
    backgroundColor: "#ec9706",
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "5%",
    paddingRight: "5%",
    borderRadius: 15,
  },
  row: {
    minHeight: 30,
  },
  text: {
    padding: 3,
  },
  wrapper: { flexDirection: "row" },
});

export default Info;
