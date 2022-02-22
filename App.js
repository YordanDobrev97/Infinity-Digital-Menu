import { createAppContainer, createNavigationContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer'
import HomeStack from "./src/screens/HomeScreen";
import Header from './src/components/Header/index'
import Login from './src/screens/Login'
import {View , Text} from 'react-native'

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
    }
  },
  
);

export default createAppContainer(navigator);