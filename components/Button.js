import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../helper/colors';

export default function Button({ title, onPress, color, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? colors().gray : color }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: colors().white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
