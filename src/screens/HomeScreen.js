import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar
} from 'react-native'

import { Card } from '../components/Card/Card'

const styles = StyleSheet.create({
  scrollView: {
      backgroundColor: '#7393B3',
      marginHorizontal: 10,
  },
  safeView: {
      flexGrow: 1,
      paddingTop: StatusBar.currentHeight,
  }
});

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Card 
          imageUrl={'https://cdncloudcart.com/16398/products/images/39404/gazirana-napitka-coca-cola-ken-330-ml-image_5ea2cc6235fb6_800x800.png?1587731937'}
          title='Кока'
          price={1}/>

          <Card imageUrl={'https://cdncloudcart.com/16372/products/images/33235/cips-chio-s-luk-i-smetana-140-g-image_5e836a664eafb_800x800.jpeg?1585695636'}
          title='Чипс'
          price={2}/>
 
          <Card imageUrl={'https://vida.bg/wp-content/uploads/2020/09/%D0%9C%D0%B8%D0%BA%D1%81-%D1%8F%D0%B4%D0%BA%D0%B8-Coctail-400-%D0%B3%D1%80.-XXL.png'}
          title='Cocktail'
          price={2}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

export default HomeScreen;
