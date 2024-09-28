import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';

export default function Startscreen({ onRegister }) { 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isTouched, setIsTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const [focusedInput, setFocusedInput] = useState(null);


  const validateName = () => name.length > 1 && isNaN(name);
  const validateEmail = () => email.includes('@') && email.includes('.');
  const validatePhone = () => phone.length === 10 && !phone.endsWith('0') && !phone.endsWith('1');

  const handleRegister = () => {
    if (validateName() && validateEmail() && validatePhone() && isChecked) {
      onRegister(name, email, phone);
    } else {
      Alert.alert('Invalid input');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsChecked(false);
    setIsTouched({ name: false, email: false, phone: false });
    setFocusedInput(null);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onFocus={() => {
            setIsTouched((prevState) => ({ ...prevState, name: true }));
            setFocusedInput('name');
          }}
          onBlur={() => setFocusedInput(null)}
          onChangeText={(text) => setName(text)}
          style={[styles.input, focusedInput === 'name' && styles.focusedInput]}
        />
        {isTouched.name && name.length > 0 && !validateName() && (
          <Text style={styles.errorText}>Please enter a valid name</Text>
        )}

        <Text style={styles.label}>Email address</Text>
        <TextInput
          value={email}
          onFocus={() => {
            setIsTouched((prevState) => ({ ...prevState, email: true }));
            setFocusedInput('email');
          }}
          onBlur={() => setFocusedInput(null)}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, focusedInput === 'email' && styles.focusedInput]}
        />
        {isTouched.email && email.length > 0 && !validateEmail() && (
          <Text style={styles.errorText}>Please enter a valid email</Text>
        )}

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          value={phone}
          onFocus={() => {
            setIsTouched((prevState) => ({ ...prevState, phone: true }));
            setFocusedInput('phone');
          }}
          onBlur={() => setFocusedInput(null)}
          onChangeText={(text) => setPhone(text)}
          keyboardType="numeric"
          style={[styles.input, focusedInput === 'phone' && styles.focusedInput]}
        />
        {isTouched.phone && phone.length > 0 && !validatePhone() && (
          <Text style={styles.errorText}>Please enter a valid phone number</Text>
        )}

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{ true: 'purple', false: 'gray' }}
          />
          <Text style={styles.checkboxLabel}>I am not a robot</Text>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.resetButton}>
            <Button title="Reset" color="red" onPress={handleReset} />
          </View>
          <View style={styles.registerButton}>
            <Button
              title="Register"
              color={isChecked ? 'blue' : 'white'}
              onPress={handleRegister}
              disabled={!isChecked} 
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: 'darkgray',
    borderRadius: 10,
    padding: 20,
    elevation: 5, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titleContainer: {
    position: 'absolute',
    top: 100,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 30,
    color: '#4B0082',
  },
  input: {
    borderBottomColor: '#4B0082',
    color: '#4B0082',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    marginBottom: 10,
    padding: 5,
    fontSize: 20,
  },
  focusedInput: {
    borderBottomColor: 'red',
  },
  errorText: {
    color: '#ff4d4d',
    marginBottom: 40,
    fontSize: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#4B0082',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resetButton: {
    width: '45%',
  },
  registerButton: {
    width: '45%',
  },
});

