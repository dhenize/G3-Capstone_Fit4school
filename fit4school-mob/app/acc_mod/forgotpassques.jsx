import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen({ navigation }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answer, setAnswer] = useState('');

  const questions = [
    { id: 1, label: 'What is your favorite food?' },
    { id: 2, label: 'What is your birth place?' },
    { id: 3, label: 'What is your first dog?' },
  ];

  const handleConfirm = () => {
    if (!selectedQuestion) {
      Alert.alert('Error', 'Please choose one (1) Security Question.');
    } else if (answer.trim() === '') {
      Alert.alert('Error', 'Please provide your answer.');
    } else {
      Alert.alert('Success', 'Your answer has been submitted.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Forgot Password</Text>
      </View>

      {/* Security Questions */}
      {questions.map((q) => {
        const isSelected = selectedQuestion === q.id;
        const isDisabled = selectedQuestion !== null && !isSelected;

        return (
          <View key={q.id}>
            <TouchableOpacity
              disabled={isDisabled}
              style={[
                styles.questionRow,
                isSelected && styles.selectedRow,
                isDisabled && styles.disabledRow,
              ]}
              onPress={() => setSelectedQuestion(q.id)}
            >
              <Text
                style={[
                  styles.questionText,
                  isSelected && styles.selectedText,
                  isDisabled && styles.disabledText,
                ]}
              >
                {q.label}
              </Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={isDisabled ? '#AAA' : 'black'}
              />
            </TouchableOpacity>

            {/* Show input only for selected question */}
            {isSelected && (
              <TextInput
                style={styles.input}
                placeholder="Type your answer here"
                value={answer}
                onChangeText={setAnswer}
              />
            )}
          </View>
        );
      })}

      {/* Error Message */}
      {!selectedQuestion && (
        <Text style={styles.errorText}>
          Please choose one (1) Security Question and answer it correctly.
        </Text>
      )}

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>CONFIRM</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFDFD',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
    top: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10,
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  selectedRow: {
    backgroundColor: '#F1FDF3',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  disabledRow: {
    opacity: 0.5,
  },
  questionText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
  },
  selectedText: {
    fontWeight: '600',
    color: '#388E3C',
  },
  disabledText: {
    color: '#999',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 15,
  },
  errorText: {
    color: '#E57373',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 370,
    marginBottom: 15,
  },
  confirmButton: {
    backgroundColor: '#64C97F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 0,
  },
  confirmText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
