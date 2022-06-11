import React, { useState, useEffect, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Sidebar from '../Sidebar/Sidebar'
import CartContext from '../../context/CartContext'

const CustomHeader = ({ navigation }) => {
  const context = useContext(CartContext)

  const [showMenu, setShowMenu] = useState(false)
  const [countProducts, setCountProducts] = useState(context.products.length)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setCountProducts(context.products.length)
  }, [context.products.length])

  const showMenuHandler = () => {
    setShowMenu(true)
  }

  const callAdministrator = () => {
    fetch("https://digitalmenu-api.herokuapp.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "Nikoletaairbnb1@gmail.com",
        subject: "Рецепция - помощ",
        text: `Има изпратено запитване към рецепция`,
      }),
    }).then((res) => {
      if (res) {
        setTimeout(() => {
          setMessage('Вашата заявка към рецепция беше изпратена успешно!')
        }, 1000)
    
        setTimeout(() => {
          setMessage('')
        }, 5000)
      }
    });
  }

  if (showMenu) {
    return <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} navigation={navigation} />
  }

  return (
    <View>
    <View style={styles.header}>
      <View>
        <TouchableOpacity onPress={showMenuHandler}>
          <Icon name='bars' style={{ fontSize: 32, color: 'white' }} />
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', color: '#ffff', fontSize: 20 }}>Infinity Digital Menu</Text>
      </View>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TouchableOpacity onPress={callAdministrator}>
          <Icon name='bell' style={{ fontSize: 32, color: 'white' }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate('Basket') }}>
          <Icon name='shopping-cart' style={{ fontSize: 32, color: 'white' }} />
        </TouchableOpacity>
        {context.products.length > 0 ? (
          <View style={styles.iconCart}>
            <Text style={styles.countCart}>{context.products.length}</Text>
          </View>
        ) : (
          <>
          </>
        )}
      </View>
    </View>
    <View>
        {message.length > 0 && (
          <View style={styles.message}>
            <Text style={{color: '#90ee90'}}>{message}</Text>
        </View>
        )}
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    padding: 12,
    marginTop: 25,
    fontSize: 32
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffff',
    letterSpacing: 2,
    textAlign: 'center'
  },
  iconContainer: {
    position: 'relative',
    left: 0,
    fontSize: 39,
  },
  icon: {
    color: '#ffff',
    fontSize: 40,
  },
  iconCart: {
    backgroundColor: '#ff6600',
    position: 'absolute',
    bottom: 25,
    right: 0,
    width: 25,
    height: 15,
    borderRadius: 200,
    fontSize: 16
  },
  countCart: {
    textAlign: 'center',
    color: '#FFFF',
    fontSize: 12
  },
  message: {
    position: 'relative',
    top: 0,
    backgroundColor: '#303650',
    padding: 15,
    width: '100%' 
  }
})

export default CustomHeader