import React, { useState, useContext } from 'react'
import { Text, Image, View, StyleSheet, Button } from 'react-native'
import CartContext from '../../context/CartContext'

const Product = ({ id, name, price, image }) => {
  const [flag, setFlag] = useState(false)
  const context = useContext(CartContext)

  const onAddProduct = () => {
    context.setProducts((oldValue) => {
      return [...oldValue, {id, name, price, image}]
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
        <Image style={styles.productImage} source={{ uri: image }} />

        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>Цена: {price} лв.</Text>
        {flag ? (
          <Button title='Премахни' onPress={onRemoveProduct}/>
        ): (
          <Button title='Добави в кошницата' onPress={onAddProduct}/>
        )}
      </View>

      <View style={styles.line} />
    </View>
  );
}
const styles = StyleSheet.create({
  product: {
    width: '100%',
    maxHeight: '90%',
    marginBottom: 45,
    padding: 18,
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
    backgroundColor: '#176268',
    borderRadius: 20,
    margin: 0,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
  }

  // card: {
  //   backgroundColor: '#0b466e',
  //   borderRadius: 16,
  //   shadowOpacity: 0.2,
  //   shadowRadius: 4,
  //   shadowColor: 'black',
  //   shadowOffset: {
  //     height: 0,
  //     width: 0,
  //   },
  //   elevation: 1,
  //   marginVertical: 20,
  // },
  // thumb: {
  //   height: 260,
  //   borderTopLeftRadius: 16,
  //   borderTopRightRadius: 16,
  //   width: '100%',
  // },
  // infoContainer: {
  //   padding: 16,
  // },
  // name: {
  //   fontSize: 28,
  //   fontWeight: 'bold',
  //   color: '#0ED8FF',
  //   textAlign: 'center'
  // },
  // price: {
  //   fontSize: 20,
  //   fontWeight: '600',
  //   marginBottom: 8,
  //   color: '#FC3400',
  //   textAlign: 'center'
  // },
  // button: {
  //   backgroundColor: '#eb500e',
  //   width: '65%',
  //   borderRadius: 8,
  // },
  // text: {
  //   color: '#ffff',
  //   textAlign: 'center'
  // },
  // toolbar: {
  //   height: '20%',
  //   width: '100%',
  //   flexDirection: 'row',
  //   borderRadius: 3,
  //   marginLeft: '20%'
  // },
});

export default Product