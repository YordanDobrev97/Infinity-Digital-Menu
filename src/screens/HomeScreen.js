import React, { useState } from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';

import { Card } from '../components/Card/Card'

const HomeScreen = () => {
  const [counter, setCounter] = useState(0)

  const incrementCounter = () => {
    setCounter(prevValue => prevValue + 1)
  }
  return (
    <View>
       <Card />
    </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: 'center'
  },
});

export default HomeScreen;
