import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome'
import { firestore } from '../firebase/config'

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const dbCategories = await (await firestore.collection('categories').get())
      .docs.map((category => {
        return { ...category.data() }
      }))
      return dbCategories
    }

    fetchCategories()
      .then(res => {
        setCategories(res)
        setLoading(false)
      })

  }, [])

  if (loading) {
    return (
      <View style={{ backgroundColor: 'black', flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"white"} />
      </View>
    )
  }

  const onNavigateAdmin = () => {
    navigation.navigate('Admin')
  }

  const RowCategory = ({ item }) => {
    return (
      <View key={item.index} style={{margin: 2, padding: 8, minWidth: '100%',
      backgroundColor: "#444340", flexDirection: 'row', flexWrap: 'wrap',
      alignItems: 'center', justifyContent: 'space-around'}}>
        <Text style={{ color: '#ffff', margin: 4 }}>{item.name}</Text>
          <TouchableOpacity>
            <Icon name='edit' style={{fontSize: 20, margin: 4, color: '#ffff'}}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='trash' style={{fontSize: 20,margin: 4, color: '#ffff'}}/>
          </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Текущи категории</Text>

        <TouchableOpacity onPress={onNavigateAdmin}>
          <Text style={styles.titleText}>Към Администрация</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableCategory}>
        <FlatGrid
        itemDimension={180}
          data={categories}
          renderItem={RowCategory}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "#444341"
  },
  header: {
    margin: 25
  },
  titleText: {
    color: '#ffff',
    textAlign: 'center',
    margin: 4,
    fontSize: 20,
  },
  tableCategory: {
    width: '100%',
    height: '70%',
    marginTop: 5,
    borderRadius: 18,
    backgroundColor: '#1F1F21',
    padding: 6
  },
  listCategory: {

  }
})

export default CategoriesScreen