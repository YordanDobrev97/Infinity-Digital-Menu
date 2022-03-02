import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import HomeStack from "./src/screens/HomeScreen"
import Login from './src/screens/Login'
import AdminScreen from './src/screens/AdminScreen'

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
      screen: AdminScreen
    }
  },
  
);

export default createAppContainer(navigator);