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
  const [isQuizzPassed, setIsQuizzPassed] = useState(false);

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

  const quizzQuestion = useMemo(() => {
    let poolQuestions = [];

    for (let i = 1; i <= currentLevel.pad; i++) {
      const newPool = examples[i].singular.concat(examples[i].plural);

      poolQuestions = poolQuestions.concat(newPool);
    }

    let randNumber = Math.floor(Math.random() * poolQuestions.length);

    while (pastQuestions.includes(randNumber)) {
      randNumber = Math.floor(Math.random() * poolQuestions.length);
      if (pastQuestions.length === poolQuestions.length) {
        setPastQuestions([]);
      }
    }
    setPastQuestions([...pastQuestions, randNumber]);

    return poolQuestions[randNumber];
  }, [questionCounter, currentLevel]);

  const question = useMemo(() => {
    if (currentLevel.type !== "quizz") {
      let randNumber = Math.floor(
        Math.random() * examples[currentLevel.pad][currentLevel.type].length
      );

      while (pastQuestions.includes(randNumber)) {
        randNumber = Math.floor(
          Math.random() * examples[currentLevel.pad][currentLevel.type].length
        );
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
    } else {
      return quizzQuestion;
    }
  }, [questionCounter, currentLevel, quizzQuestion]);

  const padName = useMemo(() => rules[currentLevel.pad].question);

  const saveProgress = () => {
    let newProgress;
    if (currentLevel.type === "singular") {
      newProgress = { pad: currentLevel.pad, type: "plural" };
    } else if (currentLevel.type === "plural" && currentLevel.pad < 7) {
      newProgress = { pad: currentLevel.pad, type: "quizz" };
    } else if (currentLevel.type === "quizz" && currentLevel.pad < 7) {
      newProgress = { pad: currentLevel.pad + 1, type: "singular" };
    } else if (currentLevel.type === "quizz" && currentLevel.pad === 7) {
      newProgress = { pad: 1, type: "singular" };
    } else {
      setIsModalOpen(false);
      navigation.navigate("LevelWon");
      newProgress = { pad: 7, type: "quizz" };
    }

    setCurrentLevel(newProgress);
    saveProgressPad(newProgress.pad);
    saveProgressType(newProgress.type);
  };

  useEffect(() => {
    props.storageProgress && setCurrentLevel(props.storageProgress);
  }, [props.storageProgress]);

  useEffect(() => {
    if (score === props.maxScoreToWin) {
      setIsModalOpen(false);
      navigation.navigate("LevelWon");
    }
  }, [score, props.storageProgress]);

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
            name="LevelStart"
            options={{ headerShown: false }}
            children={() => (
              <LevelStart
                onPress={() => {
                  navigation.navigate("LevelInfo");
                }}
                rule={currentLevel}
                currentLevel={currentLevel}
                onQuizzPress={() => {
                  navigation.navigate("MiddleQuizz");
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
                  setScore(0);
                  setPastQuestions([]);
                  setQuestionCounter(0);
                  navigation.navigate("LevelQuizz");
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
                  navigation.navigate("LevelQuizz");
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
                  navigation.navigate("MiddleQuizz");
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
                  saveProgress();
                  navigation.navigate("LevelInfo");
                }}
                onOkPress={() => {
                  saveProgress();
                  navigation.navigate("LevelInfo");
                }}
                onQuizzPress={() => {
                  setScore(0);
                  setPastQuestions([]);
                  setQuestionCounter(0);
                  saveProgress();
                  navigation.navigate("MiddleQuizz");
                }}
                currentLevel={currentLevel}
                onNePress={() => {
                  setScore(0);
                  setPastQuestions([]);
                  setQuestionCounter(0);
                  saveProgress();
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
