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

import ResponsiveImage from "react-native-responsive-image";

const { width, height } = Dimensions.get("screen")

const Product = ({ id, name, price, image, description }) => {
  const [flag, setFlag] = useState(false)
  const [count, setCount] = useState(1)
  const [showDetails, setShowDetails] = useState(false)

  const context = useContext(CartContext)

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
    // <View key={id} style={{
    //   width: orientation === 'landscape' ? '30%' : '45%',
    //   height: orientation === 'landscape' ? '60%' : '40%',
    //   marginBottom: 5, marginRight: 10,
    //   backgroundColor: '#444341'
    // }}>
    //   <Pressable style={{ justifyContent: 'center', alignItems: 'center' }}>
    //     <Image
    //       style={{ width: '100%', height: '60%', margin: 0 }}
    //       source={{ uri: image }} />
    //   </Pressable>

    //   <View>
    //     <Text style={{ color: 'white', textAlign: 'center' }}>{name}</Text>
    //     <Text style={{ color: 'orange', textAlign: 'center' }}>Цена: {price} лв.</Text>
    //   </View>

    //   {flag ? (
    //       <TouchableOpacity onPress={onRemoveProduct} style={{
    //         width: '40%',
    //         backgroundColor: 'orange',
    //         position: 'relative',
    //         left: '30%',
    //         alignItems: 'center',
    //         justifyContent: 'flex-end'
    //       }}>
    //         <Text style={{ textAlign: 'center', fontSize: 18, }}>-</Text>
    //       </TouchableOpacity>
    //     ) : (
    //       <TouchableOpacity onPress={onAddProduct} style={{
    //         width: '40%',
    //         backgroundColor: 'orange',
    //         position: 'relative',
    //         left: '30%',
    //         alignItems: 'center',
    //         justifyContent: 'flex-end'
    //       }}>
    //         <Text style={{ textAlign: 'center', fontSize: 18, }}>+</Text>
    //       </TouchableOpacity>
    //     )}
    // </View>
    <View key={id} style={[styles.itemContainer,
    { backgroundColor: '#444341', height: 260 }]}>
      <View style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "baseline",
        flexDirection: "row"
      }}>
        <ResponsiveImage
          source={{ uri: image }}
          initWidth="160"
          initHeight="130"
        />
      </View>


      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{price}</Text>

      {flag ? (
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
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 22,
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
  }
});

export default Product