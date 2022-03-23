import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Icon,
  Button,
  Right,
} from 'native-base'

import Sidebar from '../Sidebar/Sidebar'

const CustomHeader = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false)

  const showMenuHandler = () => {
    setShowMenu(true)
  }

  if (showMenu) {
    return <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} navigation={navigation} />
  }

  return (
    <View style={styles.header}>
      <View>
        <Icon name='menu' style={{ fontSize: 32 }} />
      </View>
      <View style={{ display: 'flex', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', color: '#ffff', fontSize: 20 }}>Inifinity Digital Menu</Text>
      </View>
      <View>
        <Icon name='cart' style={{ fontSize: 32 }} />
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
})

export default CustomHeader