import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import HomeStack from "./src/screens/HomeScreen"
import Login from './src/screens/Login'
import AdminScreen from './src/screens/AdminScreen'
import AddProductScreen from './src/screens/AddProductScreen'

const navigator = createStackNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: ({ navigation }) => {
        return {
         headerShown: false,
        }
      }
    },
    Login: {
      screen: Login,
    },
    Admin: {
      screen: AdminScreen,
      navigationOptions: ({ navigation }) => {
        return {
         headerShown: false,
        }
      }
    },
    AddProduct: {
      screen: AddProductScreen,
      navigationOptions: ({ navigation }) => {
        return {
         headerShown: false,
        }
      }
    }
  }
);

export default createAppContainer(navigator);