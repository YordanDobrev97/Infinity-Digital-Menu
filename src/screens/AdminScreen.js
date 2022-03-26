import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

const AdminScreen = ({ navigation }) => {

  const onHomeScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>Администрация</Text>
        <TouchableOpacity style={styles.back} onPress={onHomeScreen}>
          <Text style={styles.backText}>Начална страница</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <View style={styles.products}>
          <Text style={styles.productText}>Нови Продукти</Text>
          <TouchableOpacity
            style={styles.addProduct}
            onPress={() => navigation.navigate('AddProduct')}>
            <Text style={styles.productText}>Добави</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "#3D3B3C"
  },
  top: {
    marginTop: 50,
    width: '100%',
    height: '20%',
    borderStartColor: '#BA9FF8',
    borderBottomWidth: 3,
    borderRadius: 18,
    padding: 8,
    marginBottom: 15,
  },
  title: {
    color: '#ffff',
    fontSize: 28,
    textAlign: 'center'
  },
  actions: {
    width: '100%',
    height: '50%',
    padding: 10,
    marginTop: '10%',
    backgroundColor: '#252837'
  },
  products: {
    width: '90%',
    height: '70%',
    margin: 11,
    borderRadius: 20,
    backgroundColor: '#626262'
  },
  productText: {
    color: '#ffff',
    fontSize: 20,
    textAlign: 'center'
  },
  addProduct: {
    backgroundColor: '#BCBDBF',
    color: '#ffff',
    width: '40%',
    padding: 10,
    borderRadius: 17,
    marginLeft: '30%',
    marginTop: 10,
  },
  backText: {
    fontSize: 19,
    color: '#ffff',
    textAlign: 'center'
  },
  back: {
    fontSize: 17,
    backgroundColor: '#4C4D4F',
    width: '70%',
    marginTop: 8,
    marginLeft: '15%',
    padding: 4,
    borderRadius: 12,
  }
})

export default AdminScreen