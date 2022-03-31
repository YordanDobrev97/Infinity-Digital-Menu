import React, { useState, useEffect, useContext } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
  Modal,
} from 'react-native'

import Header from '../components/Header/index'
import Product from '../components/Product/index'
import { firestore } from '../firebase/config'

import OrientationContext from '../context/OrientationContext'

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [orientation, setOrientation] = useState('portrait')
  const [isLoading, setLoading] = useState(true)
  const [currentHeight, setHeight] = useState(Dimensions.get('screen').height)
  const [currentWidth, setWidth] = useState(Dimensions.get('screen').width)
  const [currentCount, setCurrentCount] = useState(0)
  const [maxCount, setMaxCount] = useState(10)
  const [productsPerPage, setProductsPerPage] = useState(2)

  const orientationContext = useContext(OrientationContext)

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
      orientationContext.setOrientation('landscape')
    } else {
      setOrientation('portrait')
      orientationContext.setOrientation('portrait')
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

  const currentProducts = products;

  return (
    <View style={styles.wrapper}>
      <Header navigation={navigation} />

      {/* <View style={styles.portrait}>
        <FlatList
          key={'_'}
          keyExtractor={(item) => '_' + item.id}
          data={currentProducts}
          renderItem={renderItem}
        // numColumns={productsPerPage}
        />
      </View> */}
      <ScrollView>
        <View style={{
          maxWidth: '100%', maxHeight: '100%', flexDirection: 'row',
          justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', height: '90%'
        }}>

          {products && products.map((item) => {
            return (
              <Product
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.photoUrl}
                description={item.description}
                orientation={orientation}
                price={item.price}
              />
            )
          })}
        </View>
      </ScrollView>

    </View>
  )

};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'black',
  },
  portrait: {
    backgroundColor: 'black',
    flex: 1,
    maxHeight: '90%',
    flexDirection: 'row',
    //justifyContent: 'center',
    margin: 5,
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