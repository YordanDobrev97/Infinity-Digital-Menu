import React, { useState, useContext } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Sidebar from '../Sidebar/Sidebar'
import CartContext from '../../context/CartContext'

const CustomHeader = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false)

  const context = useContext(CartContext)
  console.log(context.products.length)

  const showMenuHandler = () => {
    setShowMenu(true)
  }

  if (showMenu) {
    return <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} navigation={navigation} />
  }

  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity onPress={showMenuHandler}>
          <Icon name='bars' style={{ fontSize: 32 }} />
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', color: '#ffff', fontSize: 20 }}>Inifinity Digital Menu</Text>
      </View>
      <View>
        <Icon name='shopping-cart' style={{ fontSize: 32 }} />
        <View style={styles.iconCart}>
          <Text style={styles.countCart}>{context.products.length}</Text>
        </View>
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
    backgroundColor: '#AC7F24',
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
    width: 15,
    height: 15,
    borderRadius: 200,
    fontSize: 16
  },
  countCart: {
    textAlign: 'center',
    color: '#FFFF',
    fontSize: 12
  }
})

export default CustomHeader