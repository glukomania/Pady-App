import React, { useState, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
} from 'react-native'
import { ProgressBar } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors } from '../../data/colors'
import { ModalRule } from './ModalRule'

const Item = (props) => {
  const onPressHandle = useCallback(() => {
    if (props.result === null) {
      if (props.item === props.correct || props.correct.includes(props.item)) {
        props.setScore(props.score + 1)
      } else {
        props.setScore(0)
      }
      props.setResult(props.item)
      props.setIsModalOpen(true)
    }
  }, [props.result, props.item, props.correct])

  const getBoderColor = () => {
    if (
      props.item === props.result &&
      (props.result === props.correct || props.correct.includes(props.result))
    ) {
      return colors.green
    } else if (
      props.item === props.result &&
      (props.result !== props.correct || !props.correct.includes(props.result))
    ) {
      return colors.red
    } else {
      return colors.variantBorderColor
    }
  }
  return (
    <TouchableOpacity onPress={onPressHandle}>
      <View
        style={{
          backgroundColor: 'white',
          marginBottom: '4%',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: getBoderColor(),
        }}
      >
        <Text style={styles.variant}>{props.item}</Text>
      </View>
    </TouchableOpacity>
  )
}

export const LevelQuizz = (props) => {
  const [result, setResult] = useState(null)
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false)
  const [text, onChangeText] = useState('type here')

  const nextHanle = useCallback(() => {
    setResult(null)
    props.setQuestionCounter(props.questionCounter + 1)
    props.onPress()
    props.setIsModalOpen(false)
  }, [result])

  const renderIncorrectModalText = () => {
    return (
      <View
        style={{
          padding: '10%',
          paddingBottom: '4%',
          flex: 1,
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Pressable
          onPress={() => {
            setIsRuleModalOpen(true)
          }}
        >
          <View
            style={{
              alignItems: 'flex-end',
              marginRight: '-5%',
            }}
          >
            <Ionicons name={'help-circle-outline'} size={25} color={'white'} />
          </View>

          <View
            style={{
              alignItems: 'center',
              marginTop: '-8%',
            }}
          >
            <Text style={{ color: '#800000', fontSize: 22, fontWeight: '700' }}>Chyba!</Text>
          </View>
        </Pressable>
        <View style={{ marginTop: '7%' }}>
          <Text style={styles.modalIncorrectText}>
            <Text>Odpověď: </Text>
            <Text style={{ fontWeight: '700' }}>{result}</Text>
          </Text>
          <Text style={styles.modalIncorrectText}>
            <Text>Správně: </Text>
            <Text style={{ fontWeight: '700' }}>
              {props.question.correct.constructor.name === 'Array'
                ? props.question.correct.join(', ')
                : props.question.correct}
            </Text>
          </Text>
          {props.question.correct !== props.question.model && (
            <Text style={styles.modalIncorrectText}>
              <Text>Vzor: </Text>
              <Text style={{ fontWeight: '700' }}>{props.question.model}</Text>
            </Text>
          )}
        </View>
      </View>
    )
  }

  const renderCorrectModalText = () => {
    const motivations = ['Bezva!', 'Super!', 'Šikulka!', 'Prima!', 'Přesně tak!']

    const rand = Math.floor(Math.random() * motivations.length)
    return (
      <View
        style={{
          padding: '10%',
          paddingBottom: '4%',
          flex: 1,
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Pressable
          onPress={() => {
            setIsRuleModalOpen(true)
          }}
        >
          <View
            style={{
              alignItems: 'flex-end',
              marginRight: '-5%',
            }}
          >
            <Ionicons name={'help-circle-outline'} size={25} color={'white'} />
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: '-8%',
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: '700' }}>{motivations[rand]}</Text>
          </View>
        </Pressable>
      </View>
    )
  }

  const getPadName = useCallback(() => {
    if (props.currentLevel && props.currentLevel.type === 'singular') {
      return 'singulár'
    } else if (props.currentLevel && props.currentLevel.type === 'plural') {
      return 'plurál'
    } else if (props.currentLevel && props.currentLevel.type === 'quizz') {
      return 'quizz'
    } else {
      return ' '
    }
  }, [props.currentLevel])

  const renderVariants = () => {
    return (
      <FlatList
        data={props.question.variants}
        nestedScrollEnabled={true}
        renderItem={({ item }) => (
          <Item
            item={item}
            number={props.randNumber}
            result={result}
            setResult={setResult}
            correct={props.question.correct}
            setScore={props.setScore}
            score={props.score}
            setIsModalOpen={props.setIsModalOpen}
          />
        )}
        keyExtractor={(item) => item}
      />
    )
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
      }}
    >
      <View style={{ height: '7%', marginTop: '8%' }}>
        <Text style={{ fontSize: 20, color: '#ec9706', marginTop: '6%', fontWeight: '700' }}>
          {props.padName}
        </Text>
      </View>
      <View style={{ height: '6%' }}>
        <Text style={{ fontSize: 15, color: '#ec9706', marginTop: '2%', fontWeight: '700' }}>
          {getPadName()}
        </Text>
      </View>

      <View style={{ width: '100%' }}>
        <ProgressBar
          progress={props.score === 0 ? 0 : props.score / props.maxScoreToWin}
          color={colors.green}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={props.isModalOpen}
        onRequestClose={() => {
          props.setIsModalOpen(!props.isModalOpen)
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={
              props.question.correct.includes(result)
                ? styles.modalCorrectView
                : styles.modalInorrectView
            }
          >
            {props.question.correct.includes(result)
              ? renderCorrectModalText()
              : renderIncorrectModalText()}
            <View style={styles.buttonContainer}>
              <Pressable
                style={
                  props.question.correct.includes(result)
                    ? styles.correctButton
                    : styles.incorrectButton
                }
                onPress={nextHanle}
              >
                <Text style={styles.buttonText}>
                  {'Dál'} <Ionicons name={'chevron-forward-outline'} size={19} color={'white'} />
                </Text>
              </Pressable>

              <Modal
                animationType="slide"
                transparent={true}
                visible={isRuleModalOpen}
                onRequestClose={() => {
                  setIsRuleModalOpen(!isRuleModalOpen)
                }}
              >
                <ModalRule
                  rule={props.rule}
                  setIsRuleModalOpen={setIsRuleModalOpen}
                  padName={props.padName}
                />
              </Modal>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <Text style={styles.question}>{props.question.sentance}</Text>
        {renderVariants()}
      </View>
    </View>
  )
}

export default LevelQuizz

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: '10%',
    justifyContent: 'flex-start',
    backgroundColor: colors.lightGrey,
  },

  question: {
    color: 'black',
    fontSize: 27,
    marginBottom: `10%`,
  },

  variant: {
    margin: '5%',
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  modalCorrectView: {
    width: '100%',
    height: '25%',
    backgroundColor: '#c5e1b6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: '0%',
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },

  modalInorrectView: {
    width: '100%',
    height: '45%',
    backgroundColor: '#ffc1b5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: '0%',
    alignItems: 'flex-start',
    shadowRadius: 4,
    elevation: 5,
  },

  modalIncorrectText: {
    fontSize: 18,
    color: '#800000',
    paddingBottom: '5%',
  },
  modalCorrectText: {
    fontSize: 22,
    fontWeight: '700',
    padding: '10%',
    color: colors.correctModalText,
    paddingBottom: '2%',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
  },
  correctButton: {
    paddingTop: '3%',
    paddingBottom: '7%',
    // marginBottom: '7%',
    backgroundColor: colors.green,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incorrectButton: {
    paddingTop: '3%',
    paddingBottom: '7%',
    backgroundColor: colors.red,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    margin: 6,
    color: 'white',
    fontSize: 20,
  },
  head: {
    backgroundColor: '#f1f1f1',
  },
  tablerow: {
    minHeight: 45,
  },
  tableText: {
    padding: 5,
  },
  ruleContainer: {
    flex: 1,
    backgroundColor: 'white',
    width: '90%',
    height: '90%',
  },
  ruleModalContainer: {
    flex: 1,
    width: '100%',
    paddingTop: '5%',
    justifyContent: 'flex-start',
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.orange,
    width: '100%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
