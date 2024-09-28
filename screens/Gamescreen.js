import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';

export default function Gamescreen({ phoneNumber, onRestart }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [attemptsLeft, setAttemptsLeft] = useState(4);
    const [guess, setGuess] = useState('');
    const [inputFocused, setInputFocused] = useState(false); 

    const handleStartGame = () => {
        setGameStarted(true);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
                <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>

            {!gameStarted ? (
                <View style={styles.card}>
                    <Text style={styles.info}>Guess a number between 1 & 100 that is a multiple of 9.</Text>
                    <Button title="Start" onPress={handleStartGame} />
                </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.info}>Guess a number between 1 & 100 that is a multiple of 9.</Text>
                    <TextInput
                        style={[
                            styles.input,
                            inputFocused && { borderBottomColor: '#0074D9' },  // Change border color when focused
                        ]}
                        keyboardType="numeric"
                        value={guess}
                        onChangeText={setGuess}
                        placeholder="Enter here"
                        onFocus={() => setInputFocused(true)}  // Set focus state when input gains focus
                        onBlur={() => setInputFocused(false)}  // Reset focus state when input loses focus
                    />

                    <Text style={styles.hintInfo}>Attempts left: {attemptsLeft}</Text>
                    <Text style={styles.hintInfo}>Timer: {timeLeft}s</Text>

                    <View style={styles.buttonContainer}>
                        <Button title="Use a Hint" />
                        <Button title="Submit guess" />
                    </View>
                </View>
            )}
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
        alignItems: 'center',
    },
    info: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        color: '#4B0082',
    },
    hintInfo: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333333',
    },
    input: {
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#4B0082',
        marginBottom: 20,
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        color: '#000',
    },
    restartButton: {
        position: 'absolute',
        top: 200,
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
