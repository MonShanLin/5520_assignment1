import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../helper/colors';

export default function Input({ children, style }) {
    return <View style={[styles.card, style]}>{children}</View>; 
}

const styles = StyleSheet.create({
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
});
