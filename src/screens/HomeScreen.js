import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

import Header from '../components/Header/index'
import Product from '../components/Product/index'
import { firestore } from '../firebase/config'

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [orientation, setOrientation] = useState('portrait')
  const [isLoading, setLoading] = useState(true)

  const isPortrait = () => {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
  }

  useEffect(() => {

  })

  useEffect(() => {
    const fetchProducts = async () => {
      const dbProducts = await (await firestore.collection('products').get()).docs.map((product => {
        return { id: product.id, ...product.data() }
      }))
      return dbProducts
    }

    fetchProducts()
      .then((res) => {
        setProducts(res)
        console.log('All data: ', res)
        setLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, margin: 30 }}>
        <Text style={{ textAlign: 'center', color: 'darkblue' }}>Loading...</Text>
      </View>
    )
  }

  const renderItem = ({ item }) => {
    return (
      <Product
        key={item.id}
        id={item.id}
        name={item.name}
        image={item.photoUrl}
        price={item.price}
        description={item.description}
      />
    )
  }

  return (
    <View>
      <Header navigation={navigation} />
    </View>
  )

};

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
    height: '90%',
    backgroundColor: 'black',
    marginTop: 20,
  },
  scrollView: {
    borderWidth: 5,
  },
  productContainer: {
    width: '100%',
    height: '70%',
  },
  button: {
    backgroundColor: 'orange',
    maxWidth: '50%',
    padding: 8,
    borderRadius: 16,
    fontSize: 21,
  }
});

export default HomeScreen