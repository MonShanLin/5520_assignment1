import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import colors from '../helper/colors';
import Card from '../components/Card';
import Input from '../components/Input';
import CustomButton from '../components/Button';

export default function Startscreen({ onRegister }) { 
  // Add a new state to keep track of the name
  const [name, setName] = useState(''); 
  // Add a new state to keep track of the email
  const [email, setEmail] = useState(''); 
  // Add a new state to keep track of the phone number
  const [phone, setPhone] = useState('');
  // Add a new state to keep track of the checkbox state
  const [isChecked, setIsChecked] = useState(false); 
  // Add a new state to keep track of the touched state of the input fields
  const [isTouched, setIsTouched] = useState({
    name: false,
    email: false,
    phone: false,
  });
  // Add a new state to keep track of the focused input field
  const [focusedInput, setFocusedInput] = useState(null);

  // Validate the name of non-numeric and more than 1 character
  const validateName = () => name.length > 1 && isNaN(name);
  // Validate the email of having '@' and '.'
  const validateEmail = () => email.includes('@') && email.includes('.');
  // Validate the phone number of having 10 digits and not ending with 0 or 1
  const validatePhone = () => phone.length === 10 && !phone.endsWith('0') && !phone.endsWith('1');
  // Handle the register button press
  const handleRegister = () => {
    if (validateName() && validateEmail() && validatePhone() && isChecked) {
      onRegister(name, email, phone);
    } else {
      Alert.alert('Invalid input');
    }
  };
  // Handle the reset button press to clear all the input fields
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

      <Card>
        <Input
          label="Name"
          value={name}
          onFocus={() => {
            setIsTouched((prevState) => ({ ...prevState, name: true }));
            setFocusedInput('name');
          }}
          onBlur={() => setFocusedInput(null)}
          onChangeText={setName}
          isTouched={isTouched.name}
          validate={validateName}
          errorMessage="Please enter a valid name"
          isFocused={focusedInput === 'name'}
        />

        <Input
          label="Email address"
          value={email}
          onFocus={() => {
            setIsTouched((prevState) => ({ ...prevState, email: true }));
            setFocusedInput('email');
          }}
          onBlur={() => setFocusedInput(null)}
          onChangeText={setEmail}
          isTouched={isTouched.email}
          validate={validateEmail}
          errorMessage="Please enter a valid email"
          isFocused={focusedInput === 'email'}
        />

        <Input
          label="Phone Number"
          value={phone}
          onFocus={() => {
            setIsTouched((prevState) => ({ ...prevState, phone: true }));
            setFocusedInput('phone');
          }}
          onBlur={() => setFocusedInput(null)}
          onChangeText={setPhone}
          keyboardType="numeric"
          isTouched={isTouched.phone}
          validate={validatePhone}
          errorMessage="Please enter a valid phone number"
          isFocused={focusedInput === 'phone'}
        />

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{ true: colors.purple, false: colors.gray }}
          />
          <Text style={styles.checkboxLabel}>I am not a robot</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Reset"
            onPress={handleReset}
            color={colors().red}
          />
          <CustomButton
            title="Register"
            onPress={handleRegister}
            color={isChecked ? colors().blue : colors().gray}
            disabled={!isChecked}
          />
        </View>
        
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: colors().purple,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: colors().purple,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

