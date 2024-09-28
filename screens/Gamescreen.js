import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function Gamescreen({ phoneNumber, onRestart }) {
    const [gameStarted, setGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [attemptsLeft, setAttemptsLeft] = useState(4);
    const [guess, setGuess] = useState('');
    const [inputFocused, setInputFocused] = useState(false); 
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [correctNumber, setCorrectNumber] = useState(null); 
    const [lastDigit, setLastDigit] = useState(null);

        // Timer logic: decrease the timer by 1 second every interval
    useEffect(() => {
        let timer;
        if (gameStarted && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            Alert.alert('The game is over!', 'You are out of time');
            onRestart();  // Restart the game when the timer hits 0
        }
        return () => clearInterval(timer);
    }, [gameStarted, timeLeft]);

    useEffect(() => {
        // Get the last digit of the phone number
        const lastDigit = parseInt(phoneNumber.slice(-1));
        // Set the last digit in the state
        setLastDigit(lastDigit);
        const multiples = [];

        // Generate multiples of the last digit between 1 and 100
        for (let i = lastDigit; i <= 100; i += lastDigit) {
            multiples.push(i);
        }

        // Select a random multiple as the correct number
        const randomMultiple = multiples[Math.floor(Math.random() * multiples.length)];
        setCorrectNumber(randomMultiple);
    }, [phoneNumber]);

    const handleStartGame = () => {
        setGameStarted(true);
    };

    // Validation logic as the user types
    const handleGuessInput = (text) => {
        const parsedGuess = parseInt(text, 10);

        // Check if the input is a valid number between 1 and 100
        if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
            Alert.alert('Invalid Input', 'The number cannot be alphabetical or outside of the range of 1 and 100');
            setGuess('');  // Clear the invalid input
        } else {
            setGuess(text);  // Set the valid input
        }
    }; 

    const handleSubmitGuess = () => {
        const parsedGuess = parseInt(guess, 10);

        if (attemptsLeft === 0) {
            Alert.alert('The game is over!', 'You are out of attempts');
            
            return;
        }

        // Compare the guess with the correct number
        if (parsedGuess === correctNumber) {
            Alert.alert('Congratulations!', 'You guessed corrected!');
            // Reset the game or trigger any success logic
        } else {
            const hint = parsedGuess > correctNumber ? 'lower' : 'higher';
            setFeedbackMessage(`You did not guess correct!\nYou should guess ${hint}.`);
            setFeedbackVisible(true);
            // Decrease attempts left by 1
            setAttemptsLeft((prevAttempts) => prevAttempts - 1);  
        }
    };

    const handleTryAgain = () => {
        setFeedbackVisible(false);
        setGuess('');  // Clear the input
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
                <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>

            {!gameStarted ? (
                <View style={styles.card}>
                    <Text style={styles.info}>Guess a number between 1 & 100 that is a multiple of {lastDigit}.</Text>
                    <Button title="Start" onPress={handleStartGame} />
                </View>
            ) : feedbackVisible ? (
                // Feedback card when the guess is incorrect
                <View style={styles.card}>
                <Text style={styles.info}>{feedbackMessage}</Text>
                <TouchableOpacity onPress={handleTryAgain}>
                    <Text style={styles.tryAgainButton}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.endGameButton}>End the Game</Text>
                </TouchableOpacity>
            </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.info}>Guess a number between 1 & 100 that is a multiple of  {lastDigit}.</Text>
                    <TextInput
                        style={[
                            styles.input,
                            inputFocused && { borderBottomColor: '#0074D9' },  // Change border color when focused
                        ]}
                        keyboardType="numeric"
                        value={guess}
                        onChangeText={handleGuessInput}
                        placeholder="Enter here"
                        onFocus={() => setInputFocused(true)}  // Set focus state when input gains focus
                        onBlur={() => setInputFocused(false)}  // Reset focus state when input loses focus
                    />

                    <Text style={styles.hintInfo}>Attempts left: {attemptsLeft}</Text>
                    <Text style={styles.hintInfo}>Timer: {timeLeft}s</Text>

                    <View style={styles.buttonContainer}>
                        <Button title="Use a Hint" />
                        <Button title="Submit guess" onPress={handleSubmitGuess} />
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
    tryAgainButton: {
        color: '#4B0082',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },
    endGameButton: {
        color: '#4B0082',
        fontSize: 18,
        marginTop: 10,
    },
});
