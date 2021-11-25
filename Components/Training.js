import React, { useState, useEffect, useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LevelStart } from "./Gameplay/LevelStart";
import { LevelInfo } from "./Gameplay/LevelInfo";
import { LevelQuizz } from "./Gameplay/LevelQuizz";
import { MiddleQuizz } from "./Gameplay/MiddleQuizz";
import { LevelWon } from "./Gameplay/LevelWon";
import { examples } from "../data/examples.js";
import { rules } from "../data/rules.js";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const Training = (props) => {
  const [score, setScore] = useState(0);
  const [questionCounter, setQuestionCounter] = useState(0);
  const navigation = useNavigation();
  const [pastQuestions, setPastQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentLevel, setCurrentLevel] = useState(
    props.storageProgress || {
      pad: 1,
      type: "singular",
    }
  );

  const saveProgressPad = async (pad) => {
    try {
      await AsyncStorage.setItem("pad", pad.toString());
    } catch (error) {
      // Error saving data
      console.log("Error saving pad", error);
    }
  };

  const saveProgressType = async (type) => {
    try {
      await AsyncStorage.setItem("type", type);
    } catch (error) {
      // Error saving data
      console.log("Error saving type", error);
    }
  };

  const question = useMemo(() => {
    console.log("question");
    let randNumber = Math.floor(
      Math.random() * examples[currentLevel.pad][currentLevel.type].length
    );

    while (pastQuestions.includes(randNumber)) {
      randNumber = Math.floor(Math.random() * examples[currentLevel.pad][currentLevel.type].length);
      if (
        pastQuestions.length === examples[currentLevel.pad][currentLevel.type].length ||
        score === props.maxScoreToWin
      ) {
        setIsModalOpen(false);
        navigation.navigate("LevelWon");
        break;
      }
    }
    setPastQuestions([...pastQuestions, randNumber]);

    return examples[currentLevel.pad][currentLevel.type][randNumber];
  }, [questionCounter]);

  const quizzQuestion = useMemo(() => {
    console.log("quizzQuestion");
    let questionsPool = [];

    for (let i = 1; i <= currentLevel.pad; i++) {
      console.log("examples[i].singular");

      const newPadQuestions = examples[i].singular.concat(examples[i].plural);
      questionsPool.concat(newPadQuestions);
      console.log("length", questionsPool.length);
    }

    let randNumber = Math.floor(Math.random() * questionsPool.length);

    while (pastQuestions.includes(randNumber)) {
      randNumber = Math.floor(Math.random() * questionsPool.length);
      if (score === props.maxScoreToWin) {
        setIsModalOpen(false);
        navigation.navigate("LevelWon");
        break;
      }
      if (pastQuestions.length === questionsPool.length) {
        setPastQuestions = [];
      }
    }
    setPastQuestions([...pastQuestions, randNumber]);

    return questionsPool[randNumber];
  }, [questionCounter]);

  const rule = useMemo(() => rules[currentLevel.pad][currentLevel.type], [currentLevel]);
  const padName = useMemo(() => rules[currentLevel.pad].question);

  const onOkPress = () => {
    console.log("press");
    let newProgress;

    if (currentLevel.type === "singular") {
      newProgress = { pad: currentLevel.pad, type: "plural" };
    } else if (currentLevel.type === "plural" && currentLevel.pad < 7) {
      newProgress = { pad: currentLevel.pad + 1, type: "singular" };
    } else {
      setIsModalOpen(false);
      navigation.navigate("LevelWon");
      newProgress = { pad: 1, type: "singular" };
    }

    setCurrentLevel(newProgress);
    saveProgressPad(newProgress.pad);
    saveProgressType(newProgress.type);
    navigation.navigate("LevelInfo");
  };

  useEffect(() => {
    console.log("UE storageProgress");
    props.storageProgress && setCurrentLevel(props.storageProgress);
  }, [props.storageProgress]);

  useEffect(() => {
    console.log("UE score");
    if (score === props.maxScoreToWin) {
      setIsModalOpen(false);
      navigation.navigate("LevelWon");
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
      {console.log("TRAINING starts")}
      <View style={{ width: "100%", height: "100%" }}>
        <Stack.Navigator>
          <Stack.Screen
            name="LevelStart"
            options={{ headerShown: false }}
            children={() => (
              <LevelStart
                onPress={() => {
                  console.log("onPress LevelStart");

                  navigation.navigate("LevelInfo");
                }}
                rule={rule}
                currentLevel={currentLevel}
              />
            )}
          />
          <Stack.Screen
            name="LevelInfo"
            options={{ headerShown: false }}
            children={() => (
              <LevelInfo
                onPress={() => {
                  console.log("onPress LevelInfo");
                  setScore(0);
                  setPastQuestions([]);
                  setQuestionCounter(0);
                  navigation.navigate("LevelQuizz");
                }}
                rule={rule}
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
                  console.log("onPress LevelQuizz");
                  navigation.navigate("LevelQuizz");
                }}
                score={score}
                setScore={setScore}
                setQuestionCounter={setQuestionCounter}
                questionCounter={questionCounter}
                maxScoreToWin={props.maxScoreToWin}
                rule={rule}
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
                  console.log("MiddleQuizz LevelQuizz");

                  navigation.navigate("MiddleQuizz");
                }}
                score={score}
                setScore={setScore}
                setQuestionCounter={setQuestionCounter}
                questionCounter={questionCounter}
                maxScoreToWin={props.maxScoreToWin}
                rule={rule}
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
                onPress={() => navigation.navigate("LevelInfo")}
                rule={rule}
                onOkPress={onOkPress}
                onQuizzPress={() => {
                  setScore(0);
                  setPastQuestions([]);
                  setQuestionCounter(0);
                  navigation.navigate("MiddleQuizz");
                }}
                currentLevel={currentLevel}
                onNePress={() => {
                  setScore(0);
                  setPastQuestions([]);
                  setQuestionCounter(0);
                  navigation.navigate("LevelStart");
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default Training;
