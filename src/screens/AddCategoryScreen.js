import { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

import { firestore } from '../firebase/config'

const AddCategoryScreen = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('')

  const onAddCategory = () => {
    firestore.collection('categories')
      .add({
        name: categoryName,
      }).then(() => {
        try {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
          })
        } catch (error) {
          console.log(error)
        }
      })
  }
  return(
    <View style={styles.categoryPage}>
      
      <View style={styles.top}>
        <Text style={styles.topText}>Създай нова категория</Text>
      </View>

      <View style={styles.categoryForm}>
        <TextInput style={styles.input} onChangeText={value => setCategoryName(value)} placeholder='Име' placeholderTextColor={'white'}/>
      
        <TouchableOpacity style={styles.addBtn} onPress={onAddCategory}>
          <Text style={styles.addBtnText}>Добави</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryPage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "#444341" 
  },
  top: {
    margin: 20
  },
  topText: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: 26
  },
  categoryForm: {
    margin: 30,
    display: 'flex',
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    padding: 20
  },
  addBtn: {
    marginTop: 25,
    marginLeft: 5,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#008BE1',
    width: '30%'
  },
  addBtnText: {
    color: '#ffff',
    textAlign: 'center',
    padding: 8
  }
})

export default AddCategoryScreen