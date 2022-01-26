import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PracticeQuizz } from "./Gameplay/PracticeQuizz";
import { PracticeWon } from "./Gameplay/PracticeWon";
import { useNavigation } from "@react-navigation/native";
import { examples } from "../data/examples.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export const Practice = () => {
  const navigation = useNavigation();
  const [pastQuestions, setPastQuestions] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modeInput, setModeInput] = useState(false);

  const [score, setScore] = useState(0);

  const maxScoreToWin = 20;

  const pool = useMemo(() => {
    let poolQuestions = [];
    for (let i = 1; i <= 7; i++) {
      const newPool = examples[i].singular.concat(examples[i].plural);

      poolQuestions = poolQuestions.concat(newPool);
    }
    return poolQuestions;
  }, []);

  const question = useMemo(() => {
    let randNumber = Math.floor(Math.random() * pool.length);

    while (pastQuestions.includes(randNumber)) {
      randNumber = Math.floor(Math.random() * pool.length);
      if (pastQuestions.length === pool.length) {
        setPastQuestions([]);
      }
    }
    setPastQuestions([...pastQuestions, randNumber]);
    return pool[randNumber];
  }, [questionCounter]);

  useEffect(() => {
    if (score === maxScoreToWin) {
      setIsModalOpen(false);
      setQuestionCounter(questionCounter + 1);
      navigation.navigate("PracticeWon");
    }
  }, [score]);

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ width: "100%", height: "100%" }}>
        <Stack.Navigator>
          <Stack.Screen
            name="PracticeQuizz"
            options={{ headerShown: false }}
            children={() => (
              <PracticeQuizz
                question={question}
                onPress={() => {
                  navigation.navigate("PracticeQuizz");
                }}
                score={score}
                setScore={setScore}
                setQuestionCounter={setQuestionCounter}
                questionCounter={questionCounter}
                maxScoreToWin={modeInput ? pool.length : maxScoreToWin}
                padName={"Сvičení"}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                modeInput={modeInput}
              />
            )}
          />
          <Stack.Screen name="PracticeWon" options={{ headerShown: false }}>
            {() => (
              <PracticeWon
                setModeInput={setModeInput}
                modeInput={modeInput}
                onPress={() => {
                  setModeInput(true);
                  navigation.navigate("PracticeQuizz");
                }}
                onNePress={() => {
                  navigation.navigate("PracticeQuizz");
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default Practice;
