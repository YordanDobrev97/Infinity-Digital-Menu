import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SectionList
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import Header from '../components/Header/index'
import Product from '../components/Product/index'

import { firestore } from '../firebase/config'

const HomeScreen = (props) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([
    {
      name: 'Напитки'
    },
    {
      name: 'Салати'
    },
    {
      name: 'Сандвичи'
    },
    {
      name: 'Безакохолни'
    },
    {
      name: 'Вино'
    },
    {
      name: 'Вода'
    }
  ])

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
      <View style={{ backgroundColor: 'black', flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"white"} />
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

  const RenderCategory = ({item}) => {
    return (
      <View style={{
        width: 200, borderWidth: 2, borderColor: '#ffff',
        padding: 8, margin: 4, borderRadius: 15
      }}>
        <Text style={{ color: '#ffff', textAlign: 'center' }}>{item.name}</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000d1a' }}>
      <Header navigation={props.navigation} />

      <View style={{ margin: 10 }}>
        <Text style={{ color: '#ffff', textAlign: 'center' }}>Категории</Text>

          <View style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center',
            marginTop: 8, marginBottom: 8, Width: '100%',
            borderBottomWidth: 1, borderBottomColor: '#ffff'
          }}>
             <FlatList
                  horizontal
                  data={categories}
                  renderItem={({ item }) => <RenderCategory item={item} />}
                  showsHorizontalScrollIndicator={false}
                />
          </View>
      </View>
      
      <Text style={{ color: '#ffff', textAlign: 'center' }}>Продукти</Text>
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