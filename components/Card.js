import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../helper/colors';

export default function Card({ children, style }) {
    return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    width: '85%',
    backgroundColor: colors().gray,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    //alignItems: 'center',
  },
});
