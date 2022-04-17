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
import Product from '../components/Product/index'

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

  const onDeleteProduct = async (id) => {
    firestore.collection('products').doc(id).delete()
    .then((res) => {
      console.log(res)
      const filtered = items.filter(x => x.id !== id)
      setItems(filtered)
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

      <View>
        <TouchableOpacity style={styles.addProduct} onPress={onAddProductScreen}>
          <Text style={{ textAlign: 'center' }}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <FlatGrid
          itemDimension={280}
          data={items}

          renderItem={({ item, index }) => (
            <View key={item.id} style={[styles.itemContainer,
            { backgroundColor: '#AC7F24', height: 260 }]}>
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
              <Text style={styles.productPrice}>{item.price}</Text>

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
      </View>

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
    backgroundColor: "#444341"
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
})

export default AdminScreen