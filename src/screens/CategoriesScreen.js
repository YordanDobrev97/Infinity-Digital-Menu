import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome'
import { firestore } from '../firebase/config'

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const dbCategories = await (await firestore.collection('categories').get())
      .docs.map((category => {
        return { id: category.id, ...category.data() }
      }))
      return dbCategories
    }

    fetchCategories()
      .then(res => {
        setCategories(res)
        setLoading(false)
      })

  }, [])

  if (loading) {
    return (
      <View style={{ backgroundColor: 'black', flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"white"} />
      </View>
    )
  }

  const fetchProducts = async () => {
    const dbProducts = await (await firestore.collection('products').get()).docs.map((product => {
      return { id: product.id, ...product.data() }
    }))
    return dbProducts
  }

  const backToAdmin = () => {
    navigation.navigate('Admin')
  }

  const onEditCategory = (id) => {
    navigation.navigate('EditCategory', {
      id: id
    })
  }

  const onDeleteCategory = (id, name) => {
    firestore.collection('categories').doc(id).delete()
    .then(async (res) => {
      await removeCategoryFromProducts(name)
      const filtered = categories.filter(x => x.id !== id)
      setCategories(filtered)
    })
  }

  const removeCategoryFromProducts = async (categoryName) => {
    const products = await fetchProducts()
    const filtered = products.filter(p => p.category === categoryName)
    
    filtered.forEach(product => {
      const {id, name, photoUrl, description, price} = product
      firestore.collection('products').doc(id).update({
        name,
        photoUrl,
        description,
        price,
        category: null
      })
    })
  }

  const addCategory = () => {
    navigation.navigate('AddCategory')
  }

  const RowCategory = ({ item }) => {
    return (
      <View key={item.id} style={styles.category}>
          <Text style={{ color: '#ffff', margin: 4 }}>{item.name}</Text>
          <View style={styles.action}>
          <TouchableOpacity onPress={() => onEditCategory(item.id)}>
            <Icon name='edit' style={{fontSize: 20, margin: 4, color: '#ffff'}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteCategory(item.id, item.name)}>
            <Icon name='trash' style={{fontSize: 20,margin: 4, color: '#ffff'}}/>
          </TouchableOpacity> 
          </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity onPress={backToAdmin}>
          <Icon name="arrow-left" style={{color: 'white', fontSize: 22}}/>
        </TouchableOpacity>
        <Text style={styles.title}>Категории</Text>
      </View>

      <View style={{margin: 5}}>
        <TouchableOpacity onPress={addCategory}>
          <Icon name='plus' style={{ textAlign: 'center', color: 'white', fontSize: 23 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.tableCategory}>
        <FlatGrid
          itemDimension={180}
          data={categories}
          renderItem={RowCategory}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "black"
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
  tableCategory: {
    width: '100%',
    height: '70%',
    marginTop: 5,
    borderRadius: 18,
    backgroundColor: '#1F1F21',
    padding: 6
  },
  category: {
    margin: 3,
    padding: 10,
    borderRadius: 40,
    minWidth: '100%',
    backgroundColor: "#444340",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

export default CategoriesScreen