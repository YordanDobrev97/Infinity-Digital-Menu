import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CartContext from './src/context/CartContext'
import AuthContext from './src/context/AuthContext'
import HomeScreen from './src/screens/HomeScreen'
import AdminScreen from './src/screens/AdminScreen'
import BasketScreen from './src/screens/BasketScreen'
import Siderbar from './src/components/Sidebar/Sidebar'

const Stack = createNativeStackNavigator();

function App() {
  const [products, setProducts] = useState([])
  const [isAuth, loggedIn] = useState(false)

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      <AuthContext.Provider value={{isAuth, loggedIn}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Admin" component={AdminScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </AuthContext.Provider>
    </CartContext.Provider>
  );
}

export default App;