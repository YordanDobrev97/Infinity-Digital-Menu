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
  const [count, setCount] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  const context = useContext(CartContext)
  console.log('Products count === ' + context.products.length)
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

  const decrementQuantity = () => {
    if (count > 0) {
      setCount((prevValue) => prevValue - 1)
    }
  }

  return (
    <View style={{
      width: orientation === 'landscape' ? 180 : 168,
      minHeight: 40,
      margin: 5,
      padding: 8,
      borderRadius: 15,
      backgroundColor: '#444341',
    }}>
      <View>
        <Pressable onPress={() => setShowDetails(true)}>
          <Image
            resizeMode={"contain"}
            style={{ width: '100%', height: 130 }}
            source={{ uri: image }} />
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showDetails}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={[styles.buttonClose]}
              >
                <Image
                  resizeMode={"contain"}
                  style={{ width: width / 2, height: width / 3 }}
                  source={{ uri: image }} />

                <Text style={styles.descriptionText}>Описание:</Text>
                <Text style={styles.description}>{description}</Text>

                <TouchableOpacity style={styles.close} onPress={() => setShowDetails(false)}>
                  <Text style={styles.textStyle}>Затвори</Text>
                </TouchableOpacity>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>Цена: {price} лв.</Text>
      </View>

      <View style={styles.productCount}>
        {flag ? (
          <TouchableOpacity style={{
            width: 40,
            height: 30,
            margin: 6,
            backgroundColor: 'red'
          }} onPress={onRemoveProduct}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{
            width: 40,
            height: 30,
            margin: 6,
            backgroundColor: '#C79038'
          }} onPress={onAddProduct}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 168,
    minHeight: 40,
    margin: 5,
    padding: 8,
    borderRadius: 15,
    backgroundColor: '#444341',
  },
  productCount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto'
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: 20,
  },
  productName: {
    color: '#ffff',
    fontSize: 16,
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