import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../helper/colors';

export default function Confirmscreen({ visible, userData, onConfirm, onBack }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.6)', 'transparent']} style={styles.gradient}>
        <View style={styles.modalContainer}>
          <View style={styles.card}>
            <Text style={styles.greeting}>Hello {userData.name}</Text>
            <Text style={styles.info}>Here is the information you entered:</Text>
            <Text style={styles.data}>{userData.email}</Text>
            <Text style={styles.data}>{userData.phone}</Text>
            <Text style={styles.info}>If it is not correct, please go back and edit them.</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.backButton]} onPress={onBack}>
                <Text style={styles.backButtonText}>GO BACK</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={onConfirm}>
                <Text style={styles.continueButtonText}>CONTINUE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '60%',
    marginTop: '30%',
  },
  card: {
    backgroundColor: colors().gray,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors().purple,
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
    color: colors().purple,
  },
  data: {
    fontSize: 18,
    color: colors().red,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: colors().red,
  },
  continueButton: {
    backgroundColor: colors().blue,
  },
  backButtonText: {
    color: colors().white,  
    fontWeight: 'bold',
    fontSize: 16,
  },
  continueButtonText: 