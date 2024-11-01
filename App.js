import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

export default function App() {
  const questions = [
    { id: 1, image: require('./img/owl.jpg'), question: "What is this animal?", options: ["Owl", "Pigeon", "Blue Jay"], answer: "Owl" },
    { id: 2, image: require('./img/leopard.jpg'), question: "What is this animal?", options: ["Jaguar", "Leopard", "Cat"], answer: "Leopard" },
    { id: 3, image: require('./img/tiger.jpg'), question: "What is this animal?", options: ["Lion", "Tiger", "Panther"], answer: "Tiger" },
    { id: 4, image: require('./img/turtle.jpg'), question: "What is this animal?", options: ["Jellyfish", "Crab", "Turtle"], answer: "Turtle" },
    { id: 5, image: require('./img/deer.jpg'), question: "What is this animal?", options: ["Deer", "Moose", "Horse"], answer: "Deer" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerChange = (value) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: value,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    Alert.alert("Quiz Completed", `You have ${correctCount} correct answers.`);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setScore(null);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
      <View style={styles.container}>
        {score === null ? (
            <>
              <Image source={currentQuestion.image} style={styles.image} />
              <Text style={styles.question}>{currentQuestion.question}</Text>
              <Picker
                  selectedValue={selectedAnswers[currentQuestionIndex]}
                  onValueChange={handleAnswerChange}
                  style={styles.picker}
              >
                {currentQuestion.options.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker>
              <Button title={currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"} onPress={handleNextQuestion} />
            </>
        ) : (
            <>
              <Text style={styles.scoreText}>You scored {score} out of {questions.length}</Text>
              <Button title="Redo Quiz" onPress={resetQuiz} />
            </>
        )}
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    width: 200,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
