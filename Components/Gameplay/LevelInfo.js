import React, { useMemo } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import { Table, Row, Rows, TableWrapper } from 'react-native-table-component'
import { rules } from '../../data/rules'

export const LevelInfo = (props) => {
  const rule = useMemo(() => {
    if (props.rule.type !== 'quizz') {
      return rules[props.rule.pad][props.rule.type]
    } else {
      return rules[props.rule.pad]['plural']
    }
  }, [props.rule])
  const adgTableHead = rule.adjactives.tableHead
  const adgTableData = rule.adjactives.tableData
  const subjTableHead = rule.subjectives.tableHead
  const subjTableData = rule.subjectives.tableData

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
      }}
    >
      <View style={{ height: '7%', marginTop: '8%' }}>
        <Text style={{ fontSize: 20, color: '#ec9706', marginTop: '6%', fontWeight: '700' }}>
          {props.padName}
        </Text>
      </View>
      <View style={{ height: '8%' }}>
        <Text style={{ fontSize: 15, color: '#ec9706', marginTop: '3%', fontWeight: '700' }}>
          {[props.currentLevel.type]}
        </Text>
      </View>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc', marginBottom: '5%' }}>
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
          <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc', marginBottom: '5%' }}>
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
        <Text style={styles.buttonText}>{'Začněme!'}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: '5%',
  },
  head: {
    backgroundColor: '#f1f1f1',
  },
  buttonText: {
    margin: 6,
    color: 'white',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#ec9706',
    width: '100%',
    height: '11%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    minHeight: 30,
  },
  text: {
    padding: 5,
  },
  wrapper: { flexDirection: 'row' },
})

export default LevelInfo
