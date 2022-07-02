import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [category, setCategory] = useState("Категории")
  const [productText, setProductText] = useState("Продукти")
  const [appLanguage, setAppLanguage] = useState("Bulgarian")

  useEffect(() => {
    const fetchProducts = async () => {
      const dbProducts = await (await firestore.collection('products').get()).docs.map((product => {
        return { id: product.id, ...product.data() }
      }))
      return dbProducts
    }

    fetchProducts()
      .then(async (res) => {
        //setItems(res)
        translateProducts(res)
        translateCategories()
        //setCategories(resCategories)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const changeLang = async () => {
      languageContext.setLang(lang)
    }

    const updateCategoryLang = async () => {
      const textCategory = await translate(category, {
        tld: "cn",
        to: lang,
      });
      return textCategory;
    }

    const updateAppLang = async () => {
      const textCategory = await translate(appLanguage, {
        tld: "cn",
        to: lang,
      });
      return textCategory;
    }

    const updateProductLang = async () => {
      const textCategory = await translate(productText, {
        tld: "cn",
        to: lang,
      });
      return textCategory;
    }

    changeLang()
      .then(() => {
        translateProducts(filteredItems)
      })
    
    updateCategoryLang()
      .then((res) => {
        setCategory(res)
    })

    updateAppLang()
      .then((r) => {
        setAppLanguage(r[0])
    })

    updateProductLang()
      .then((r) => {
        setProductText(r[0])
    })

    translateCategories(categories);
    
  }, [lang])

  const fetchCategories = async () => {
    const dbCategories = await (await firestore.collection('categories').get())
      .docs.map((category => {

        return { ...category.data() }
      }))
    return dbCategories
  }

  const translateProducts = async (data) => {
    const chache = await AsyncStorage.getItem(`@data-${lang}`, (err, dataRes) => {
      return dataRes
    })

    //get products from chache if have any
    const res = JSON.parse(chache) 
    if (res) {
      setFilteredItems(res)
      setItems(res)
    } else {
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
      const jsonValue = JSON.stringify(results)
      AsyncStorage.setItem(`@data-${lang}`, jsonValue, (err, res) => {
        setFilteredItems(results)
        setItems(results)
      })
    }
  }

  const translateCategories = async () => {
    const chache = await AsyncStorage.getItem(`@categories-${lang}`, (err, dataRes) => {
      return dataRes
    })

    //get categories from chache if have any
    const res = JSON.parse(chache) 
    if (res) {
      setCategories(res)
    } else {
      const resCategories = await fetchCategories()
      var results = await Promise.all(resCategories.map(async (item) => {
        const upadteCategoryName = await translate(item.name, {
          tld: "cn",
          to: lang,
        })
        return { name: upadteCategoryName[0] }
      }));

      const jsonValue = JSON.stringify(results)
      AsyncStorage.setItem(`@categories-${lang}`, jsonValue, (err, res) => {
        setCategories(results)
      })
  }}

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
      const res = items.filter((item) => item.category[0].toLowerCase() === category.toLowerCase());
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
        <Text style={styles.textLang}>{appLanguage === "български" ? "Български" : "English"}</Text>
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
        <Text style={{ color: '#ffff', textAlign: 'center' }}>{category}</Text>

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

      <Text style={{ color: '#ffff', textAlign: 'center' }}>{productText}</Text>
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