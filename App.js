import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CartContext from './src/context/CartContext'
import AuthContext from './src/context/AuthContext'
import OrientationContext from './src/context/OrientationContext'

import HomeScreen from './src/screens/HomeScreen'
import AdminScreen from './src/screens/AdminScreen'
import BasketScreen from './src/screens/BasketScreen'
import LoginScreen from './src/screens/Login'
import AddProductScreen from './src/screens/AddProductScreen'
import EditProductScreen from './src/screens/EditProductScreen'
import ProductsScreen from './src/screens/ProductsScreen'
import SignUp from './src/screens/SignUp'
import AddCategoryScreen from './src/screens/AddCategoryScreen'
import CategoriesScreen from './src/screens/CategoriesScreen'
import EditCategoryScreen from './src/screens/EditCategoryScreen'
import LanguageContext from './src/context/LanguageContext'

const Stack = createNativeStackNavigator();

function App() {
  const [products, setProducts] = useState([])
  const [isAuth, loggedIn] = useState(false)
  const [orientation, setOrientation] = useState('')
  const [lang, setLang] = useState("bg");

  return (
    <CartContext.Provider value={{ products, setProducts }}>
      <AuthContext.Provider value={{ isAuth, loggedIn }}>
        <OrientationContext.Provider value={{ orientation, setOrientation }}>
          <LanguageContext.Provider value={{ lang, setLang }}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Admin" component={AdminScreen} />
                <Stack.Screen name="Basket" component={BasketScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="AddProduct" component={AddProductScreen} />
                <Stack.Screen name="Products" component={ProductsScreen} />
                <Stack.Screen name="EditProduct" component={EditProductScreen} />
                <Stack.Screen name="DeleteProduct" component={AddProductScreen} />
                <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
                <Stack.Screen name="Categories" component={CategoriesScreen} />
                <Stack.Screen name="EditCategory" component={EditCategoryScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </LanguageContext.Provider>
        </OrientationContext.Provider>
      </AuthContext.Provider>
    </CartContext.Provider>
  );
}

export default App;