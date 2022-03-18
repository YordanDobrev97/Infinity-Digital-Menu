import React, { useState, useContext, useEffect } from 'react'
import {
  Text,
  Image,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import CartContext from '../../context/CartContext'

const { width } = Dimensions.get("window")

const Product = ({ id, name, price, image }) => {
  const [flag, setFlag] = useState(false)
  const [count, setCount] = useState(0)
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
      return i !== id
    })
    setFlag(false)
    context.setProducts(latestProducts)
  }

  return (
    <View style={styles.product}>
      <View style={styles.container}>
        <Image
          resizeMode={"contain"}
          style={{ width: width / 3, height: width / 3 }}
          source={{ uri: image }} />

        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>Цена: {price} лв.</Text>
        {flag ? (
          <Button title='Премахни' onPress={onRemoveProduct} />
        ) : (
          <Button title='Добави в кошницата' onPress={onAddProduct} />
        )}
        <View style={styles.productCount}>
          <TouchableOpacity style={styles.button} onPress={() => setCount((prevValue) => prevValue - 1)}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.buttonText}>{count}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setCount((prevValue) => prevValue + 1)}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.line} />
    </View>

  );
}
const styles = StyleSheet.create({
  product: {
    width: '100%',
    height: '33%',
    margin: 0,
    padding: 8,
    backgroundColor: '#0C2035',
  },
  productName: {
    color: '#ffff',
    fontSize: 27,
  },
  productImage: {
    width: '60%',
    height: 90
  },
  productPrice: {
    color: 'orange',
    fontSize: 18
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#FE5F4A'
  },
  container: {
    width: '90%',
    minHeight: '20%',
    backgroundColor: '#176268',
    borderRadius: 20,
    margin: 0,
    padding: 1,
    display: 'flex',
    alignItems: 'center',
  },
  productCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: 'grey',
    width: '40%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: 20,
  },
  button: {
    width: 40,
    height: 30,
    margin: 6,
    backgroundColor: '#FE9A28'
  }
});

export default Product