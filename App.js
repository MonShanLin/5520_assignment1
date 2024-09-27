import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Startscreen from './screens/Startscreen';

export default function App() {
  const [screen, setScreen] = useState('Startscreen');
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });

  const handleRegister = (name, email, phone) => {
    if (validInputs(name, email, phone)) {
      setUserData({ name, email, phone });
      setScreen('ConfirmScreen');
    } else {
      alert('Invalid input!');
    }
  };

  return (
    <View style={styles.container}>
      {screen === 'Startscreen' && <Startscreen onRegister={handleRegister} />}
      {screen === 'Confirmscreen' && <Confirmscreen userData={userData} onConfirm={() => setScreen('Gamescreen')} />}
      {screen === 'Gamescreen' && <Gamescreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

