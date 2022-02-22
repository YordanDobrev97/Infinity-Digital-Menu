import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../components/Header/index';
import Home from '../screens/HomeScreen';

const screens = {
  Home: {
    screen: Home,
    // navigationOptions: ({ navigation }) => {
    //   return {
    //     headerTitle: () => <Header title='GameZone' navigation={navigation} />
    //   }
    // },
  }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 }
  }
});

export default HomeStack;