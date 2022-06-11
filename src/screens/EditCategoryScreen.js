import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { firestore } from '../firebase/config'

const EditCategoryScreen = ({ route, navigation }) => {
  const [categoryName, setCategoryName] = useState('')
  const [oldCategoryName, setOldCategoryName] = useState('')
  const { id } = route.params

  useEffect(() => {
    const fetchCategory = async (id) => {
      return await firestore.collection('categories').doc(id).get()
    }

    fetchCategory(id)
      .then((res) => {
        const { name } = res.data()
        setCategoryName(name)
        setOldCategoryName(name)
      })
  }, [])

  const fetchProducts = async () => {
    const dbProducts = await (await firestore.collection('products').get()).docs.map((product => {
      return { id: product.id, ...product.data() }
    }))
    return dbProducts
  }

  const onEditCategory = () => {
    firestore.collection('categories').doc(id)
      .update({
        name: categoryName,
      }).then(async () => {
        try {
          const products = await fetchProducts()
          const filtered = products.filter((p) => p.category === oldCategoryName)
          await updateCategoryOnProducts(filtered)

          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
          })
        } catch (error) {
          console.log(error)
        }
      })
  }

  const updateCategoryOnProducts = async (filtered) => {
    // op - old product
    filtered.forEach((op) => {
      const { name, photoUrl, description, price } = op
      firestore.collection('products').doc(op.id).update({
        name,
        photoUrl,
        description,
        price,
        category: categoryName
      })
    })
  }

  const backToAdmin = () => {
    navigation.navigate('Categories')
  }
  
  return(
    <View style={styles.categoryPage}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={backToAdmin}>
          <Icon name="arrow-left" style={{color: 'white', fontSize: 22}}/>
        </TouchableOpacity>
        <Text style={styles.title}>Назад</Text>
      </View>

      <View style={styles.top}>
        <Text style={styles.topText}>Редактирай категория</Text>
      </View>

      <View style={styles.categoryForm}>
        <TextInput style={styles.input} value={categoryName} onChangeText={value => setCategoryName(value)} 
        placeholderTextColor={'white'} />
      
        <TouchableOpacity style={styles.addBtn} onPress={onEditCategory}>
          <Text style={styles.addBtnText}>Запиши</Text>
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
    backgroundColor: '#394961' 
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 25,
    width: '100%',
    padding: 14,
    backgroundColor: '#161922',
    border: 1,
    borderRadius: 8
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginLeft: 10
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
    padding: 20,
    color: '#ffff'
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

export default EditCategoryScreen