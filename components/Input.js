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
    