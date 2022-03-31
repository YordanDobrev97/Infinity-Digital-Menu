import React, { useState, useContext, useEffect } from 'react'
import {
  Text,
  Image,
  Modal,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  Pressable
} from 'react-native'
import CartContext from '../../context/CartContext'

const { width, height } = Dimensions.get("screen")

const Product = ({ id, name, price, image, description, orientation }) => {
  const [flag, setFlag] = useState(false)
  const [count, setCount] = useState(1)
  const [showDetails, setShowDetails] = useState(false)

  const context = useContext(CartContext)
  useEffect(() => {
  }, [])

  const onAddProduct = () => {
    context.setProducts((oldValue) => {
      return [...oldValue, { id, name, price, image, count }]
    })
    setFlag(true)
  }

  const onRemoveProduct = () => {
    const latestProducts = context.products.filter((i) => {
      return i.id !== id
    })
    context.setProducts(latestProducts)
    setFlag(false)
  }

  return (
    <View key={id} style={{
      width: orientation === 'landscape' ? '30%' : '45%',
      height: orientation === 'landscape' ? '70%' : '40%',
      marginBottom: 10, marginRight: 10,
      backgroundColor: '#444341'
    }}>
      <Pressable style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: '100%', height: 130 }}
          source={{ uri: image }} />
      </Pressable>

      <View>
        <Text style={{ color: 'white', textAlign: 'center' }}>{name}</Text>
        <Text style={{ color: 'orange', textAlign: 'center' }}>Цена: {price} лв.</Text>
      </View>

      <View style={{
        width: '40%', backgroundColor: 'orange',
        position: 'relative',
        left: '30%',
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
        {flag ? (
          <TouchableOpacity onPress={onRemoveProduct}>
            <Text style={{ textAlign: 'center', fontSize: 18, }}>-</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onAddProduct}>
            <Text style={{ textAlign: 'center', fontSize: 18, }}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 8,
    borderRadius: 15,
    backgroundColor: '#444341',
  },
  productCount: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    margin: 'auto'
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: 17,
  },
  productName: {
    color: '#ffff',
    fontSize: 14,
    maxWidth: 120,
    textAlign: 'center'
  },
  productPrice: {
    color: 'orange',
    fontSize: 16
  },
  buttonToCart: {
    backgroundColor: '#C79038',
    color: '#ffff'
  }
});

export default Product