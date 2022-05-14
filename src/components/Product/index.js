import React, { useState, useContext } from 'react'
import {
  Text,
  Image,
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable
} from 'react-native'
import CartContext from '../../context/CartContext'

const Product = ({ id, name, price, image, description }) => {
  const [flag, setFlag] = useState(false)
  const [count, setCount] = useState(1)
  const [showDetails, setShowDetails] = useState(false)

  const context = useContext(CartContext)
  console.log(context.products)

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
    <View key={id} style={[styles.itemContainer,
    { height: 260 }]}>
      <View style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "baseline",
        flexDirection: "row"
      }}>
        <View style={{ flex: 1 }}>
          <Pressable style={{justifyContent: "center",
        alignItems: "center"}} onPress={() => setShowDetails(true)}>
            <Image
              style={{ width: '100%', height: '80%' }}
              source={{ uri: image }}
            />
          </Pressable>
        </View>
      </View>

      <Modal
          animationType="slide"
          transparent={true}
          visible={showDetails}
          onRequestClose={() => {
            showDetails(!showDetails);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{description}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowDetails(!showDetails)}
              >
                <Text style={styles.textStyle}>Затвори</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{Number(price).toFixed(2)} лв</Text>

      {context.products.filter(x => x.id === id).length > 0 || flag ? (
        <TouchableOpacity style={styles.buttonToCart} onPress={onRemoveProduct}>
          <Text style={{ textAlign: 'center', fontSize: 18, }}>-</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonToCart} onPress={onAddProduct}>
          <Text style={{ textAlign: 'center', fontSize: 18, }}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#303650',
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 20,
    margin: 0,
    width: '100%',
    height: 220,
  },
  itemName: {
    fontSize: 16,
    minWidth: 100,
    color: '#fff',
    fontWeight: '600',
  },
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
    fontSize: 16,
    textAlign: 'center'
  },
  buttonToCart: {
    backgroundColor: '#C79038',
    color: '#ffff'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    
    textAlign: "center"
  }
});

export default Product