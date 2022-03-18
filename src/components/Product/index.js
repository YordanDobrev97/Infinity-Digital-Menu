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

const { width } = Dimensions.get("window")

const Product = ({ id, name, price, image, description }) => {
  const [flag, setFlag] = useState(false)
  const [count, setCount] = useState(0)
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
      return i !== id
    })
    setFlag(false)
    context.setProducts(latestProducts)
  }

  const decrementQuantity = () => {
    if (count > 0) {
      setCount((prevValue) => prevValue - 1)
    }
  }

  return (
    <View style={styles.product}>
      <View style={styles.container}>
        <View>
          <Pressable onPress={() => setShowDetails(true)}>
            <Image
              resizeMode={"contain"}
              style={{ width: width / 3, height: width / 3 }}
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

        <View>
          {flag ? (
            <Button title='Премахни' onPress={onRemoveProduct} />
          ) : (
            <Button title='Добави в кошницата' onPress={onAddProduct} />
          )}
        </View>
        <View style={styles.productCount}>
          <TouchableOpacity style={styles.button} onPress={decrementQuantity}>
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
    height: '30%',
    margin: 3,
    padding: 8,
    // backgroundColor: '#0C2035',
  },
  productName: {
    color: '#ffff',
    fontSize: 20,
  },
  productImage: {
    width: '60%',
    height: 90
  },
  productPrice: {
    color: 'orange',
    fontSize: 16
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: '#FE5F4A'
  },
  container: {
    width: '100%',
    //backgroundColor: '#176268',
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
  },
  description: {
    color: '#e6ba45'
  },
  descriptionText: {
    color: '#d5b60a'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0
  },
  modalView: {
    margin: 0,
    backgroundColor: "#29304e",
    borderRadius: 20,
    padding: 110,
    alignItems: "center",
  },
  close: {
    backgroundColor: "orange",
    marginTop: 15,
    padding: 5,
    maxWidth: '60%',
    borderRadius: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 5,
    textAlign: "center"
  }
});

export default Product