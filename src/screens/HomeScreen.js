import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native'
import Header from '../components/Header/index'
import Product from '../components/Product/index'
import { firestore } from '../firebase/config'
import CartContext from '../context/CartContext'

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [currentCount, setCurrentCount] = useState(0)
  const [maxCount, setMaxCount] = useState(3)
  const [isLoading, setLoading] = useState(true)

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
      />
    )
  }

  const currentProducts = products.splice(currentCount, maxCount)

  return (
    <View style={styles.wrapper}>
      <Header navigation={navigation} />

      <View style={styles.productContainer}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={currentProducts}
          renderItem={renderItem}
        />
      </View>

      <View style={{marginTop: 28}}>
      <Button title='Следваща страница' />
      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
    height: '80%',
    backgroundColor: 'black'
  },

  scrollView: {
    borderWidth: 5,
    borderColor: '#303B4E'
  },
  productContainer: {
    width: '100%',
    height: '80%',
  }
});

export default HomeScreen