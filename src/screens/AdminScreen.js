import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatGrid } from 'react-native-super-grid'
import { firestore } from '../firebase/config'
const AdminScreen = ({ navigation }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const dbProducts = await (await firestore.collection('products').get()).docs.map((product => {
        return { id: product.id, ...product.data() }
      }))
      return dbProducts
    }

    fetchProducts()
      .then(res => {
        setItems(res)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"black"} />
      </View>
    )
  }

  const onHomeScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    })
  }

  const onAddProductScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AddProduct' }]
    })
  }

  const onEditScreen = (id) => {
    navigation.navigate('EditProduct', {
      id: id
    })
  }

  const onAddCategory = () => {
    navigation.navigate('AddCategory')
  }

  const onNavigateCategories = () => {
    navigation.navigate('Categories')
  }

  const navigateToProducts = () => {
    navigation.navigate('Products')
  }

  const onDeleteProduct = async (id) => {
    firestore.collection('products').doc(id).delete()
    .then((res) => {
      const filtered = items.filter(x => x.id !== id)
      setItems(filtered)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={onHomeScreen}>
          <Icon name="home" style={{marginTop: 5,color: 'white', textAlign: 'center', fontSize: 28}}/>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>??????????????????????????</Text>

      <View style={styles.productContainer}>
        <TouchableOpacity onPress={navigateToProducts}>
        <Text style={{color: 'white', textAlign: 'center', textDecorationLine: 'underline'}}>???????????? ????????????????</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.productContainer}>
        <TouchableOpacity onPress={onNavigateCategories}>
          <Text  style={{color: 'white', textAlign: 'center', textDecorationLine: 'underline'}}>??????????????????</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.topHeader}>
        <TouchableOpacity style={styles.addProduct} onPress={onAddProductScreen}>
          <Text style={{ textAlign: 'center' }}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.category} onPress={onAddCategory}>
          <Text style={styles.categoryText}>???????????? ??????????????????</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onNavigateCategories}>
          <Text style={styles.categoryText}>??????????????????</Text>
        </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <FlatGrid
          itemDimension={280}
          data={items}

          renderItem={({ item, index }) => (
            <View key={item.id} style={[styles.itemContainer,
            { backgroundColor: '#303650', height: 260 }]}>
              <View style={{
                flexGrow: 1,
                justifyContent: "center",
                alignItems: "baseline",
                flexDirection: "row"
              }}>
                <Image
                  style={{ width: '100%', height: '100%' }}
                  source={{ uri: item.photoUrl }}
                />
              </View>

              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>????????: {item.price}</Text>
              <Text style={styles.productPrice}>??????????????????: {item.category ?? '????????????'}</Text>

              <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                <TouchableOpacity style={styles.buttonToCart} onPress={() => onEditScreen(item.id)}>
                  <Icon name='edit' style={{ color: 'white', fontSize: 23 }} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonToCart} onPress={() => onDeleteProduct(item.id)}>
                  <Icon name='trash' style={{ color: 'white', fontSize: 23 }} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View> */}

    </View>
  )
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "black"
  },
  productContainer: {
    width: '80%',
    margin: 30,
    padding: 15,
    border: 1,
    backgroundColor: '#394961',
    borderRadius: 30
  },
  top: {
    marginTop: 25,
    width: '100%',
    height: '10%',
    border: 1,
    borderBottomWidth: 3,
    borderRadius: 18,
  },
  title: {
    color: 'white',
    fontSize: 24,
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
    width: '15%',
    padding: 10,
    borderRadius: 17,
    marginLeft: 10,
    marginTop: 3,
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
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 22,
    margin: 0,
    width: '100%',
    height: 220,
    backgroundColor: '#AC7F24'
  },
  productName: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  productPrice: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  topHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  category: {
    width: '60%',
    margin: 18
  },
  categoryText: {
    textAlign: 'center',
    color: '#ffff'
  }
})

export default AdminScreen