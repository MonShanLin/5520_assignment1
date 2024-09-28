import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Startscreen from './screens/Startscreen'; 
import Confirmscreen from './screens/Confirmscreen'; 

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

  const handleRegister = (name, email, phone) => {
    setUserData({ name, email, phone });
    setModalVisible(true);
  };

  const handleBackToStart = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    setModalVisible(false);

  };

  return (
    <LinearGradient colors={['#a6ddf5', '#3b5998', '#7d7eb8']} style={styles.gradient}>
      <View style={styles.container}>
        <Startscreen onRegister={handleRegister} />

        <Confirmscreen
          visible={modalVisible}
          userData={userData}
          onConfirm={handleConfirm}
          onBack={handleBackToStart}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
