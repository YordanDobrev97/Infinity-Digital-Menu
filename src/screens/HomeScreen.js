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
      />
    )
  }

  const onNextPage = async () => {
    if (maxCount < products.length) {
      setCurrentCount(maxCount)
      setMaxCount(maxCount + 3)
    }
  }

  const onPreviosPage = async () => {
    if (!(currentCount === 0 && maxCount === 3)) {
      setCurrentCount(currentCount - 3);
      setMaxCount(maxCount - 3);
    }
  }

  const currentProducts = products.slice(currentCount, maxCount)

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

      <View style={{ marginTop: 28, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

        {currentCount > 0 && <TouchableOpacity style={styles.button} onPress={onPreviosPage}>
          <Text>Предишна страница</Text>
        </TouchableOpacity>}

        {maxCount < products.length && <TouchableOpacity disabled={currentCount === products.length} style={styles.button} onPress={onNextPage}>
          <Text>Следваща страница</Text>
        </TouchableOpacity>}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
    height: '80%',
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