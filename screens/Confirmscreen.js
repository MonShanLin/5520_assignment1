import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../helper/colors';
import Card from '../components/Card';
import CustomButton from '../components/Button';

export default function Confirmscreen({ visible, userData, onConfirm, onBack }) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <LinearGradient colors={['rgba(0, 0, 0, 0.6)', 'transparent']} style={styles.gradient}>
        <View style={styles.modalContainer}>
        {/* Use Card component for display */}
        <Card style={{ alignItems: 'center' }}>
            <Text style={styles.greeting}>Hello {userData.name}</Text>
            <Text style={styles.info}>Here is the information you entered:</Text>
            <Text style={styles.data}>{userData.email}</Text>
            <Text style={styles.data}>{userData.phone}</Text>
            <Text style={styles.info}>If it is not correct, please go back and edit them.</Text>

            <View style={styles.buttonContainer}>
              {/* Use CustomButton component for 'GO BACK' */}
              <CustomButton
                title="GO BACK"
                onPress={onBack}
                color={colors().red}
              />

              {/* Use CustomButton component for 'CONTINUE' */}
              <CustomButton
                title="CONTINUE"
                onPress={onConfirm}
                color={colors().blue}
              />
            </View>

          </Card>
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
});

