import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import colors from '../helper/colors';
import Card from '../components/Card';

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
    const [hint, setHint] = useState('');// State for storing the hint
    const [isHintUsed, setIsHintUsed] = useState(false);
    const [attemptsUsed, setAttemptsUsed] = useState(0); // Store the number of attempts used
    const [hasGuessedCorrectly, setHasGuessedCorrectly] = useState(false); // Track if the user guessed correctly
    const [isGameOver, setIsGameOver] = useState(false);  // Add game over state
    const [isOutOfTime, setIsOutOfTime] = useState(false);  // New state to track if the game ended because of time
    const [isOutOfAttempts, setIsOutOfAttempts] = useState(false); 

        // Timer logic: decrease the timer by 1 second every interval
    useEffect(() => {
        let timer;
        if (gameStarted && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsOutOfTime(true);  // Mark that the game ended due to time
            handleEndGame();  // End the game when the timer hits 0
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

    // Function to randomly choose a new number based on the phone number's last digit
    const chooseNewNumber = () => {
        const lastDigit = parseInt(phoneNumber.slice(-1));
        setLastDigit(lastDigit);
        const multiples = [];

        // Generate multiples of the last digit between 1 and 100
        for (let i = lastDigit; i <= 100; i += lastDigit) {
            multiples.push(i);
        }

        // Select a random multiple as the correct number
        const randomMultiple = multiples[Math.floor(Math.random() * multiples.length)];
        setCorrectNumber(randomMultiple);
    };

    useEffect(() => {
        // Choose a new number when clicking new game
        chooseNewNumber(); 
    }, [phoneNumber]);

    const handleNewGame = () => {
        setHasGuessedCorrectly(false); // Reset correct guess state
        setAttemptsLeft(4); // Reset attempts left
        setTimeLeft(60); // Reset timer
        setGuess(''); // Clear the guess input
        chooseNewNumber(); // Choose a new correct number
        setGameStarted(false); // Restart game
        setIsHintUsed(false); // Reset hint usage
        setHint(''); // Clear hint
        setIsGameOver(false); // Reset game over state
        setFeedbackVisible(false); // Hide feedback
        setIsOutOfTime(false);  // Reset the out-of-time flag
        setIsOutOfAttempts(false);  // Reset the out-of-attempts flag
    };

    const handleStartGame = () => {
        setGameStarted(true);
        setIsGameOver(false);  // Reset game over state when starting a new game
    };

    // Validation logic as the user types
    const handleGuessInput = (text) => {
        const parsedGuess = parseInt(text, 10);

        // Check if the input is a valid number between 1 and 100
        if (/[^0-9]/.test(text) || text === '' || parseInt(text, 10) < 1 || parseInt(text, 10) > 100) {
            Alert.alert('Invalid Input', 'The number cannot be alphabetical or outside of the range of 1 and 100');
            setGuess('');  // Clear the invalid input
        } else {
            setGuess(text);  // Set the valid input
        }
    }; 

    const handleSubmitGuess = () => {
        const parsedGuess = parseInt(guess, 10);

        if (attemptsLeft === 0 || isGameOver) {
            Alert.alert('The game is over!', 'You are out of attempts');
            
            return;
        }

        // Compare the guess with the correct number
        if (parsedGuess === correctNumber) {
            // Set the correct guess state
            setHasGuessedCorrectly(true); 
            // Calculate attempts used
            setAttemptsUsed(4 - attemptsLeft + 1); 
        } else {
            const hint = parsedGuess > correctNumber ? 'lower' : 'higher';
            setFeedbackMessage(`You did not guess correct!\nYou should guess ${hint}.`);
            setFeedbackVisible(true);
            // Decrease attempts left by 1
            setAttemptsLeft((prevAttempts) => prevAttempts - 1);  
            if (attemptsLeft - 1 === 0) {
                setIsOutOfAttempts(true);  // Mark that the game ended due to attempts
                handleEndGame();  // End the game when attempts run out
            }
        }
    };

    const handleTryAgain = () => {
        setFeedbackVisible(false);
        setGuess('');  // Clear the input
    };

    const handleUseHint = () => {
        if (correctNumber < 50) {
            setHint('The number is less than 50');
          } else {
            setHint('The number is greater than 50');
          }
          setIsHintUsed(true);
        };

    // Function to End the Game
    const handleEndGame = () => {
        setIsGameOver(true); // Set the game over state when user clicks "End the Game"
        
    };    

    // Determine the message to display on the game over card
    const gameOverMessage = isOutOfTime ? 'You are out of time' : isOutOfAttempts ? 'You are out of attempts' : '';

    // Image URL based on the correct number
    const imageUrl = `https://picsum.photos/id/${correctNumber}/100/100`;    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onRestart} style={styles.restartButton}>
                <Text style={styles.restartButtonText}>Restart</Text>
            </TouchableOpacity>

            {!gameStarted ? (
                <Card>
                    <Text style={styles.info}>Guess a number between 1 & 100 that is a multiple of {lastDigit}.</Text>
                    <Button title="Start" onPress={handleStartGame} />
                </Card>

            ) : isGameOver ? (
                // Show this card when the game is over
                <Card>
                    <Text style={styles.info}>The game is over!</Text>
                    <Image source={require('../assets/sad_smiley.jpg')} style={styles.image} />
                    <Text style={styles.info}>{gameOverMessage}</Text>
                    <TouchableOpacity onPress={handleNewGame}>
                        <Text style={styles.newGameButton}>New Game</Text>
                    </TouchableOpacity>
                </Card>
            
            ) : hasGuessedCorrectly ? (
                // Show this card when the user guessed correctly
                <Card>
                    <Text style={styles.info}>You guessed correct!</Text>
                    <Text style={styles.info}>Attempts used: {attemptsUsed}</Text>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <TouchableOpacity onPress={handleNewGame}>
                        <Text style={styles.newGameButton}>New Game</Text>
                    </TouchableOpacity>
                </Card>

            ) : feedbackVisible ? (
                // Feedback card when the guess is incorrect
                <Card>
                <Text style={styles.info}>{feedbackMessage}</Text>
                <TouchableOpacity onPress={handleTryAgain}>
                    <Text style={styles.tryAgainButton}>Try Again</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEndGame}>
                    <Text style={styles.endGameButton}>End the Game</Text>
                </TouchableOpacity>
            </Card>

            ) : (
                <Card>
                    <Text style={styles.info}>Guess a number between 1 & 100 that is a multiple of  {lastDigit}.</Text>
                    <TextInput
                        style={[
                            styles.input,
                            inputFocused && { borderBottomColor: colors().blue },  // Change border color when focused
                        ]}
                        keyboardType="numeric"
                        value={guess}
                        onChangeText={handleGuessInput}
                        placeholder="Enter here"
                        onFocus={() => setInputFocused(true)}  // Set focus state when input gains focus
                        onBlur={() => setInputFocused(false)}  // Reset focus state when input loses focus
                    />

                    {/* Display hint */}
                    {hint ? <Text style={styles.hintText}>{hint}</Text> : null}

                    <Text style={styles.hintInfo}>Attempts left: {attemptsLeft}</Text>
                    <Text style={styles.hintInfo}>Timer: {timeLeft}s</Text>

                    <View style={styles.buttonContainer}>
                        <Button title="Use a Hint" onPress={handleUseHint} disabled={isHintUsed}/>
                        <Button title="Submit guess" onPress={handleSubmitGuess} />
                    </View>
                </Card>
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
        backgroundColor: colors().gray,
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
        color: colors().purple,
    },
    hintInfo: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: colors().black,
    },

    hintText: {
        fontSize: 18,
        color: colors().blue,
        marginBottom: 10,
        textAlign: 'center',
    },
    
    input: {
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: colors().purple,
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
        backgroundColor: colors().blue,
        borderRadius: 5,
    },
    restartButtonText: {
        color: colors().white,
        fontWeight: 'bold',
        fontSize: 16,
    },
    tryAgainButton: {
        color: colors().blue,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },
    endGameButton: {
        color: colors().blue,
        fontSize: 18,
        marginTop: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },

    newGameButton: {
        color: colors().blue,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },
});
