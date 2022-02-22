import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Header({ title }) {

  const openMenu = () => {
    //navigation.openDrawer();
  }

  return (
    <View style={styles.header}>
      <MaterialIcons name='menu' size={8} onPress={openMenu} style={styles.icon} />
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
  },
  icon: {
    position: 'absolute',
    left: 0,
    color: 'black',
    fontSize: 32,
  },
  headerTitle: {
    flexDirection: 'row'
  },
});