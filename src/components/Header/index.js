import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'native-base'

import Sidebar from '../Sidebar/Sidebar'

const Header = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false)

  const showMenuHandler = () => {
    setShowMenu(true)
  }

  if (showMenu) {
    return <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} navigation={navigation} />
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={showMenuHandler}>
        <Icon name='menu' style={styles.icon} />
      </TouchableOpacity>

      <View style={{ width: '80%', margin: 'auto' }}>
        <Text style={styles.headerText}>Digital Menu</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 0
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
})

export default Header