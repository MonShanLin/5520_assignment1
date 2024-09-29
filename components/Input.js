import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../helper/colors';

export default function Input({   
    
    label,
    value,
    onFocus,
    onBlur,
    onChangeText,
    isTouched,
    validate,
    errorMessage,
    keyboardType = 'default',
    isFocused, }) {
    return (

        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            style={[styles.input, isFocused && styles.focusedInput]}
            />
            {isTouched && value.length > 0 && !validate() && (
            <Text style={styles.errorText}>{errorMessage}</Text>
            )}
        </View>
    );
  };
    
  const styles = StyleSheet.create({
    label: {
      fontSize: 20,
      marginBottom: 30,
      color: colors().purple,
    },
    input: {
      height: 40,
      borderBottomColor: colors().purple,
      color: colors().purple,
      fontWeight: 'bold',
      borderBottomWidth: 2,
      marginBottom: 20,
      padding: 5,
      fontSize: 20,
    },
    focusedInput: {
      borderBottomColor: colors().red,
    },
    errorText: {
      color: colors().red,
      marginBottom: 40,
      fontSize: 20,
    },
  });
