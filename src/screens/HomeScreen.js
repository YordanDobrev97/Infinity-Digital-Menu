import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import Header from '../components/Header/index'
import Product from '../components/Product/index'

import { firestore } from '../firebase/config'

const HomeScreen = (props) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const dbProducts = await (await firestore.collection('products').get()).docs.map((product => {
        return { id: product.id, ...product.data() }
      }))
      return dbProducts
    }

    fetchProducts()
      .then((res) => {
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

  const ListGrid = () => {
    return (
      <FlatGrid
          itemDimension={140}
          data={items}
          style={styles.gridView}
          renderItem={({ item, index }) => (
            <Product 
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.photoUrl}
            />
          )}
        />
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: '#000d1a'}}>
      <Header navigation={props.navigation}/>

      <ListGrid />
      
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'justify-between',
    borderRadius: 5,
    padding: 5,
    height: 100,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});