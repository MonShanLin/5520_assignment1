import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Startscreen from './screens/Startscreen'; 
import Confirmscreen from './screens/Confirmscreen'; 

export default function App() {
  const [screen, setScreen] = useState('Startscreen');
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

  const handleRegister = (name, email, phone) => {
    setUserData({ name, email, phone });
    setScreen('Confirmscreen');
  };

  return (
    <LinearGradient colors={['#a6ddf5', '#3b5998', '#7d7eb8']} style={styles.gradient}>
      <View style={styles.container}>
        {screen === 'Startscreen' && <Startscreen onRegister={handleRegister} />}
        {screen === 'Confirmscreen' && (
          <Confirmscreen userData={userData} onConfirm={() => setScreen('GameScreen')} />
        )}
        {screen === 'GameScreen' && <GameScreen />}
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
