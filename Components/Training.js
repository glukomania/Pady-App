import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Modal, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LevelStart } from './Gameplay/LevelStart'
import { LevelInfo } from './Gameplay/LevelInfo'
import { LevelQuizz } from './Gameplay/LevelQuizz'
import { MiddleQuizz } from './Gameplay/MiddleQuizz'
import { LevelWon } from './Gameplay/LevelWon'
import { examples } from '../data/examples.js'
import { rules } from '../data/rules.js'
import { useNavigation } from '@react-navigation/native'
import Purchases from 'react-native-purchases'

const Stack = createNativeStackNavigator()

export const Training = (props) => {
  const [score, setScore] = useState(0)
  const [questionCounter, setQuestionCounter] = useState(0)
  const navigation = useNavigation()
  const [pastQuestions, setPastQuestions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubsModalOpen, setIsSubsModalOpen] = useState(false)

  const [currentLevel, setCurrentLevel] = useState(
    props.storageProgress || {
      pad: 1,
      type: 'singular',
    },
  )

  const saveProgressPad = async (pad) => {
    try {
      await AsyncStorage.setItem('pad', pad.toString())
    } catch (error) {
      // Error saving data
      alert(error)
    }
  }

  const saveProgressType = async (type) => {
    try {
      await AsyncStorage.setItem('type', type)
    } catch (error) {
      // Error saving data
      alert(error)
    }
  }

  const quizzQuestion = useMemo(() => {
    let poolQuestions = []

    for (let i = 1; i <= currentLevel.pad; i++) {
      const newPool = examples[i].singular.concat(examples[i].plural)

      poolQuestions = poolQuestions.concat(newPool)
    }

    let randNumber = Math.floor(Math.random() * poolQuestions.length)

    while (pastQuestions.includes(randNumber)) {
      randNumber = Math.floor(Math.random() * poolQuestions.length)
      if (pastQuestions.length === poolQuestions.length) {
        setPastQuestions([])
      }
    }
    setPastQuestions([...pastQuestions, randNumber])

    return poolQuestions[randNumber]
  }, [questionCounter, currentLevel])

  const question = useMemo(() => {
    if (currentLevel.type !== 'quizz') {
      let randNumber = Math.floor(
        Math.random() * examples[currentLevel.pad][currentLevel.type].length,
      )

      while (pastQuestions.includes(randNumber)) {
        randNumber = Math.floor(
          Math.random() * examples[currentLevel.pad][currentLevel.type].length,
        )
        if (
          pastQuestions.length === examples[currentLevel.pad][currentLevel.type].length ||
          score === props.maxScoreToWin
        ) {
          setIsModalOpen(false)
          navigation.navigate('LevelWon')
          break
        }
      }
      setPastQuestions([...pastQuestions, randNumber])

      return examples[currentLevel.pad][currentLevel.type][randNumber]
    } else {
      return quizzQuestion
    }
  }, [questionCounter, currentLevel, quizzQuestion])

  const padName = useMemo(() => rules[currentLevel.pad].question)

  const saveProgress = useCallback(() => {
    let newProgress
    if (currentLevel.type === 'singular') {
      newProgress = { pad: currentLevel.pad, type: 'plural' }
    } else if (currentLevel.type === 'plural') {
      newProgress = { pad: currentLevel.pad, type: 'quizz' }
    } else if (currentLevel.type === 'quizz' && currentLevel.pad < 7) {
      newProgress = { pad: currentLevel.pad + 1, type: 'singular' }
    } else if (currentLevel.type === 'quizz' && currentLevel.pad === 7) {
      newProgress = { pad: 1, type: 'singular' }
    } else {
      alert('no way to get here')
    }

    setCurrentLevel(newProgress)
    saveProgressPad(newProgress.pad)
    saveProgressType(newProgress.type)
  }, [currentLevel])

  useEffect(() => {
    console.log('==== Trainng screen is started ======')
    const revenueCatInit = async () => {
      Purchases.setDebugLogsEnabled(true)

      if (Platform.OS === 'ios') {
        await Purchases.configure({ apiKey: 'appl_mxIogORnjOEasSfQYoKMVAiEHSR' })
        console.log('iOS? Gooood!')
        setIsSubsModalOpen(true)
      } else if (Platform.OS === 'android') {
        console.log('Android?? Who ever need android??')
        // await Purchases.configure({ apiKey: 'public_google_sdk_key' })
      }
    }

    revenueCatInit()
  }, [])

  useEffect(() => {
    props.storageProgress && setCurrentLevel(props.storageProgress)
  }, [props.storageProgress])

  useEffect(() => {
    if (score === props.maxScoreToWin) {
      saveProgress()
      setIsModalOpen(false)
      navigation.navigate('LevelWon')
    }
  }, [score, props.storageProgress])

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSubsModalOpen}
        onRequestClose={() => {
          console.log('close condition')
        }}
      >
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#00000040',
            paddingTop: '25%',
            paddingLeft: '7%',
            paddingRight: '7%',
            paddingBottom: '25%',
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '20%',
              paddingLeft: '7%',
              paddingRight: '7%',
            }}
          >
            <View>
              <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '700' }}>
                Vyber si typ předplatného
              </Text>
              <Text></Text>
              <Text style={{ textAlign: 'center', fontSize: 25, color: '#ec9706' }}>
                a my tě naučíme skloňovat!
              </Text>

              <View
                style={{
                  marginTop: '15%',
                  height: '15%',
                  borderRadius: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ec9706',
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '700', color: 'white', paddingBottom: '2%' }}
                >
                  19 Kč / week
                </Text>
                <Text>with 3 days free trial</Text>
              </View>
              <View
                style={{
                  marginTop: '10%',
                  height: '15%',
                  borderRadius: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ec9706',
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '700', color: 'white', paddingBottom: '2%' }}
                >
                  29 Kč / month
                </Text>
                <Text>with 3 days free trial</Text>
              </View>
              <View
                style={{
                  marginTop: '10%',
                  height: '15%',
                  borderRadius: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#ec9706',
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '700', color: 'white', paddingBottom: '2%' }}
                >
                  99 Kč / year
                </Text>
                <Text>with 3 days free trial</Text>
              </View>
            </View>
            <Text>logs are here</Text>
          </View>
        </View>
      </Modal>
      <View style={{ width: '100%', height: '100%' }}>
        <Stack.Navigator>
          <Stack.Screen
            name="LevelStart"
            options={{ headerShown: false }}
            children={() => (
              <LevelStart
                onPress={() => {
                  try {
                    navigation.navigate('LevelInfo')
                  } catch (error) {
                    Sentry.Native.captureException(error)
                  }
                }}
                rule={currentLevel}
                currentLevel={currentLevel}
                onQuizzPress={() => {
                  try {
                    setTimeout(navigation.navigate('MiddleQuizz'), 5000)
                  } catch (error) {
                    Sentry.Native.captureException(error)
                  }
                }}
              />
            )}
          />
          <Stack.Screen
            name="LevelInfo"
            options={{ headerShown: false }}
            children={() => (
              <LevelInfo
                onPress={() => {
                  setScore(0)
                  setPastQuestions([])
                  setQuestionCounter(0)
                  navigation.navigate('LevelQuizz')
                }}
                rule={currentLevel}
                currentLevel={currentLevel}
                padName={padName}
              />
            )}
          />

          <Stack.Screen
            name="LevelQuizz"
            options={{ headerShown: false }}
            children={() => (
              <LevelQuizz
                question={question}
                onPress={() => {
                  navigation.navigate('LevelQuizz')
                }}
                score={score}
                setScore={setScore}
                setQuestionCounter={setQuestionCounter}
                questionCounter={questionCounter}
                maxScoreToWin={props.maxScoreToWin}
                rule={currentLevel}
                currentLevel={currentLevel}
                padName={padName}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          />

          <Stack.Screen
            name="MiddleQuizz"
            options={{ headerShown: false }}
            children={() => (
              <MiddleQuizz
                question={quizzQuestion}
                onPress={() => {
                  navigation.navigate('MiddleQuizz')
                }}
                score={score}
                setScore={setScore}
                setQuestionCounter={setQuestionCounter}
                questionCounter={questionCounter}
                maxScoreToWin={props.maxScoreToWin}
                rule={quizzQuestion.rule}
                currentLevel={currentLevel}
                padName={padName}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          />

          <Stack.Screen name="LevelWon" options={{ headerShown: false }}>
            {() => (
              <LevelWon
                onPress={() => {
                  navigation.navigate('LevelInfo')
                }}
                onOkPress={() => {
                  navigation.navigate('LevelInfo')
                }}
                onQuizzPress={() => {
                  navigation.navigate('MiddleQuizz')
                }}
                currentLevel={currentLevel}
                onNePress={() => {
                  setScore(0)
                  setPastQuestions([])
                  setQuestionCounter(0)
                  navigation.navigate('LevelStart')
                }}
                setScore={setScore}
                setPastQuestions={setPastQuestions}
                setQuestionCounter={setQuestionCounter}
                saveProgress={saveProgress}
                score={score}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default Training
