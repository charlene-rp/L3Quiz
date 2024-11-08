import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';

export default function App() {
  const questions = [
    { id: 1, image: require('./img/owl.jpg'), question: "What is this animal?", options: ["Pigeon", "Owl", "Blue Jay"], answer: "Owl" },
    { id: 2, image: require('./img/leopard.jpg'), question: "What is this animal?", options: ["Jaguar", "Leopard", "Cat"], answer: "Leopard" },
    { id: 3, image: require('./img/tiger.jpg'), question: "What is this animal?", options: ["Lion", "Tiger", "Panther"], answer: "Tiger" },
    { id: 4, image: require('./img/turtle.jpg'), question: "What is this animal?", options: ["Jellyfish", "Crab", "Turtle"], answer: "Turtle" },
    { id: 5, image: require('./img/deer.jpg'), question: "What is this animal?", options: ["Moose", "Seer", "Horse"], answer: "Deer" },
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
  const pastelColors = ['#A3C9F1', '#A1D8D5', '#F9D1D1', '#E7C6FF', '#FFDF91'];

  return (
      <View style={styles.container}>
        {score === null ? (
            <>
              <View style={[
                styles.questionContainer,
                {
                  backgroundColor: pastelColors[currentQuestionIndex % pastelColors.length],
                  borderColor: pastelColors[currentQuestionIndex % pastelColors.length]
                }
              ]}>
                <Image source={currentQuestion.image} style={styles.image} />
                <Text style={styles.question}>{currentQuestion.question}</Text>
              </View>
              <Picker
                  selectedValue={selectedAnswers[currentQuestionIndex]}
                  onValueChange={handleAnswerChange}
                  style={styles.picker}
              >
                {currentQuestion.options.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option} />
                ))}
              </Picker>
              <View style={styles.buttonContainer}>
                <Button
                    title={currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
                    onPress={handleNextQuestion}
                    color="#4CAF50"
                />
              </View>
            </>
        ) : (
            <>
              <Text style={styles.scoreText}>You scored {score} out of {questions.length}</Text>
              <View style={styles.buttonContainer}>
                <Button title="Redo Quiz" onPress={resetQuiz} color="#FF5722" />
              </View>
            </>
        )}
        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbf9e6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  questionContainer: {
    alignItems: 'center',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '100%',
    borderWidth: 3,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    backgroundColor: '#e0f7fa',
    borderRadius: 5,
    marginBottom: 20,
    paddingVertical: 5,
    elevation: 2,
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 20,
    textAlign: 'center',
  },
});

