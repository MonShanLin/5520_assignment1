import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, color, disabled = false, style }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor: color }, style]}
            disabled={disabled}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});