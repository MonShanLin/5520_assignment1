import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

export default function Gamescreen({ phoneNumber, onRestart }) {
  return (
    <View style={styles.container}>
      {/* Use TouchableOpacity for the Restart button */}
      <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
        <Text style={styles.restartButtonText}>Restart</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.info}>
          Guess a number between 1 & 100 that is a multiple of 9.
        </Text>
        <Button title="Start" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#D3D3D3',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  info: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#4B0082',
  },
  restartButton: {
    position: 'absolute',
    top: 300,
    right: 20,
    padding: 10,
    backgroundColor: '#0074D9',
    borderRadius: 5,
  },
  restartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
