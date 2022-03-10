import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Modal,
  Image,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'native-base'
import Header from '../components/Header/index'
import { Card } from '../components/Card/Card'
import Sidebar from '../components/Sidebar/Sidebar'

import AuthContext from '../context/AuthContext'

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#7393B3',
    marginHorizontal: 10,
  },
  safeView: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffff',
    letterSpacing: 2,
  },
  iconContainer: {
    position: 'absolute',
    left: 0,
    fontSize: 39,
    marginTop: 3,
  },
  icon: {
    color: '#ffff',
    fontSize: 40,
  },
  headerTitle: {
    flexDirection: 'row'
  },
});

const HomeScreen = (props) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'Hamburger',
      price: 2,
      imageUrl: 'https://www.popsci.com/uploads/2019/11/07/QDAYJRT4D5BFNNI72QBPU73BDQ.jpg?auto=webp'
    },
    {
      id: 2,
      title: 'Coca Cola',
      price: 1,
      imageUrl: 'https://daily.jstor.org/wp-content/uploads/2015/04/Coke_Branding_1050x700.jpg'
    },
    {
      id: 3,
      title: 'Rufless',
      price: 1,
      imageUrl: 'https://www.ebag.bg/products/images/86445/800'
    },
    {
      id: 4,
      title: 'Sprite',
      price: 1,
      imageUrl: 'https://m.media-amazon.com/images/I/61bkEued9fL._SL1500_.jpg'
    }
  ])
  const [showMenu, setShowMenu] = useState(false)
  const [isAuth, setAuth] = useState(false)
 
  const showMenuHandler = () => {
    setShowMenu(true)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <AuthContext.Provider value={{isAuth, setAuth}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={showMenuHandler}>
            <Icon name='menu' style={styles.icon} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Digital Menu</Text>
        </View>

        <View>
          <FlatList
            keyExtractor={product => product.id}
            data={products}
            renderItem={({ item }) => {
              return (
                <Card
                  imageUrl={item.imageUrl}
                  title={item.title}
                  price={item.price} />
              )
            }} />
        </View>
        <Sidebar
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          navigation={props.navigation} />
      </AuthContext.Provider>
    </SafeAreaView>
  )
};

export default HomeScreen;
