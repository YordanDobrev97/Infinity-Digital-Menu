import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { FlatGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import Header from '../components/Header/index'
import Product from '../components/Product/index'
import translate from 'translate-google-api';

import { firestore } from '../firebase/config'
import LanguageContext from '../context/LanguageContext';

const HomeScreen = (props) => {
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [showMenuLang, setMenuLang] = useState(false)
  const languageContext = useContext(LanguageContext)
  const [lang, setLang] = useState(languageContext.lang)

  useEffect(() => {
    const fetchProducts = async () => {
      const dbProducts = await (await firestore.collection('products').get()).docs.map((product => {
        return { id: product.id, ...product.data() }
      }))
      return dbProducts
    }

    const fetchCategories = async () => {
      const dbCategories = await (await firestore.collection('categories').get())
        .docs.map((category => {

          return { ...category.data() }
        }))
      return dbCategories
    }

    fetchProducts()
      .then(async (res) => {
        console.log(languageContext.lang)
        const resCategories = await fetchCategories()
        setItems(res)
        translateProducts(res)
        setCategories(resCategories)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const changeLang = async () => {
      languageContext.setLang(lang)
    }

    changeLang()
      .then(() => {
        translateProducts(filteredItems)
      })
  }, [lang])

  const translateProducts = async (data) => {
    var results = await Promise.all(data.map(async (item) => {
      const productName = await translate(item.name, {
        tld: "cn",
        to: lang,
      });
      const productDescription = await translate(item.description, {
        tld: "cn",
        to: lang,
      })

      const updateCategory = await translate(item.category, {
        tld: "cn",
        to: lang,
      })
      return { ...item, name: productName[0], description: productDescription, category: updateCategory }
    }));
    setFilteredItems(results)
  }

  if (loading) {
    return (
      <View style={{ backgroundColor: 'black', flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"white"} />
      </View>
    )
  }

  const ListGrid = () => {
    return (
      <FlatGrid
        itemDimension={140}
        data={filteredItems}
        style={styles.gridView}
        renderItem={({ item }) => (
          <Product
            id={item.id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.photoUrl}
          />
        )}
      />
    )
  }

  const switchLang = async () => {
    languageContext.setLang(lang)
  }

  const filterByCategory = (category) => {
    if (category === 'Всички') {
      setFilteredItems(items)
    } else {
      const res = items.filter((item) => item.category === category);
      setFilteredItems(res)
    }
  }

  const RenderCategory = ({ item }) => {
    return (
      <View style={{
        width: 200, borderWidth: 2, borderColor: '#ffff',
        padding: 8, margin: 4, borderRadius: 15
      }}>
        <TouchableOpacity onPress={() => filterByCategory(item.name)}>
          <Text style={{ color: '#ffff', textAlign: 'center' }}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const switchToEn = () => {
    setLang("en")
    setMenuLang(false)
  }

  const switchToBg = async () => {
    setLang("bg")
    setMenuLang(false)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000d1a' }}>
      <Header navigation={props.navigation} />
      <TouchableOpacity style={styles.langBorder} onPress={() => setMenuLang(!showMenuLang)}>
        <Text style={styles.textLang}>{lang === "bg" ? "Български": "Английски"}</Text>
        <Icon name="arrow-down" style={{ color: "white", margin: 5, fontSize: 17 }} />
      </TouchableOpacity>

      {showMenuLang && (
        <View style={{ backgroundColor: "#274472", borderWidth: 3, width: "38%" }}>

          <TouchableOpacity onPress={switchToEn}>
            <Text style={styles.switchLang}>Английски</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={switchToBg}>
            <Text style={styles.switchLang}>Български</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{ marginTop: 15 }}>
        <Text style={{ color: '#ffff', textAlign: 'center' }}>Категории</Text>

        <View style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center',
          marginTop: 8, marginBottom: 8, Width: '100%',
          borderBottomWidth: 1, borderBottomColor: '#ffff'
        }}>
          <FlatList
            horizontal
            data={categories}
            renderItem={({ item }) => <RenderCategory item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <Text style={{ color: '#ffff', textAlign: 'center' }}>Продукти</Text>
      <ListGrid />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  gridView: {
    marginTop: 0,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'justify-between',
    borderRadius: 5,
    padding: 5,
    height: 100,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center'
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  langBorder: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
    width: "38%"
  },
  switchLang: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    margin: 4
  },
  textLang: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    padding: 3
  }
});