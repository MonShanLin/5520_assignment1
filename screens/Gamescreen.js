import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function Gamescreen({ phoneNumber, onRestart }) {


  return (
    <View style={styles.container}>

        <View style={styles.card}>
          <Text style={styles.info}>
          Guess a number between 1 & 100 that is multiply of 9.
          </Text>
          <Button title="Start" />
        </View>
      

      <Button title="Restart" onPress={onRestart} style={styles.restartButton} />
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
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  restartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
