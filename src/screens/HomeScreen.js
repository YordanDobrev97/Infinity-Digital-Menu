import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native'

import Header from '../components/Header/index'
import Product from '../components/Product/index'
import { firestore } from '../firebase/config'

import ScreenOrientation from 'expo-screen-orientation';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [orientation, setOrientation] = useState('portrait')
  const [isLoading, setLoading] = useState(true)
  const [currentHeight, setHeight] = useState(Dimensions.get('screen').height)
  const [currentWidth, setWidth] = useState(Dimensions.get('screen').width)
  const [currentCount, setCurrentCount] = useState(0)
  const [maxCount, setMaxCount] = useState(10)
  const [productsPerPage, setProductsPerPage] = useState(2)

  useEffect(() => {
    const fetchProducts = async () => {
      const dbProducts = await (await firestore.collection('products').get()).docs.map((product => {
        return { id: product.id, ...product.data() }
      }))
      return dbProducts
    }

    fetchProducts()
      .then(async (res) => {
        setProducts(res)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!isPortrait()) {
      setOrientation('landscape')
      setProductsPerPage(4)
    } else {
      setOrientation('portrait')
      setProductsPerPage(2)
    }
  }, [currentHeight, currentWidth])

  Dimensions.addEventListener('change', () => {
    setHeight(Dimensions.get('screen').height)
    setWidth(Dimensions.get('screen').width)
  })

  const isPortrait = () => {
    const dim = Dimensions.get('screen')
    return dim.height >= dim.width
  }

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
        orientation={orientation}
      />
    )
  }

  const currentProducts = products;

  return (
    <View style={styles.wrapper}>
      <Header navigation={navigation} />

      <View style={styles.portrait}>
        {productsPerPage === 2 ? (
          <FlatList
            key={'_'}
            keyExtractor={(item) => '_' + item.id}
            data={currentProducts}
            renderItem={renderItem}
            numColumns={productsPerPage}
          />
        ) : (
          <FlatList
            key={'#'}
            keyExtractor={(item) => '#' + item.id}
            data={currentProducts}
            renderItem={renderItem}
            numColumns={productsPerPage}
          />
        )}
      </View>

    </View>
  )

};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
    maxWidth: '100%'
  },
  portrait: {
    minWidth: '100%',
    height: '99%',
    margin: 'auto',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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