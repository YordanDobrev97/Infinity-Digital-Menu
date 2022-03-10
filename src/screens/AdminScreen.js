import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  adminContainer: {
    backgroundColor: '#1C1F1F',
    width: '100%',
    height: '100%'
  },
  mainTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 28
  },
})

const AdminScreen = ({ navigation }) => {
  return (
    <View style={styles.adminContainer}>
      <Text style={styles.mainTitle}>Администрация</Text>
      
      <Button
      title='Добави продукт'
      onPress={() => navigation.navigate('AddProduct')}/>
    </View>
  )
}

export default AdminScreen