import { useState, useEffect } from 'react'
import{
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { FlatGrid } from 'react-native-super-grid'
import { firestore } from '../firebase/config'

const ProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([])
  
  useEffect(() => {
    const fetchProducts = async () => {
      const dbProducts = await (await firestore.collection('products').get()).docs.map((product => {
        return { id: product.id, ...product.data() }
      }))
      return dbProducts
    }

    fetchProducts()
      .then(res => {
        setProducts(res)
        //setLoading(false)
      })
  }, [])

  const addProduct = () => {
    navigation.navigate('AddProduct')
  }

  const backToAdmin = () => {
    navigation.navigate('Admin')
  }

  const onEditScreen = (id) => {
    navigation.navigate('EditProduct', {
      id: id
    })
  }

  const onDeleteProduct = async (id) => {
    firestore.collection('products').doc(id).delete()
    .then((res) => {
      const filtered = products.filter(x => x.id !== id)
      setProducts(filtered)
    })
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.nav}>
        <TouchableOpacity onPress={backToAdmin}>
          <Icon name="arrow-left" style={{color: 'white', fontSize: 22}}/>
        </TouchableOpacity>
        <Text style={styles.title}>Продукти</Text>
      </View>

      <View style={{margin: 5}}>
        <TouchableOpacity onPress={addProduct}>
        <Icon name='plus' style={{ textAlign: 'center', color: 'white', fontSize: 23 }} />
        </TouchableOpacity>
      </View>

      <View>
      <View style={{ maxHeight: '90%' }}>
        <FlatGrid
          itemDimension={280}
          data={products}

          renderItem={({ item, index }) => (
            <View style={styles.product}>
              <Image
                style={styles.productImage}
                source={{ uri: item.photoUrl }}/>

              <View>
                <Text style={styles.productName}>{item.name}</Text>

                <View style={styles.action}>
                  <TouchableOpacity style={styles.actionBtn} onPress={() => onEditScreen(item.id)}>
                    <Icon name='edit' style={{ color: 'white', fontSize: 23 }} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.actionBtn} onPress={() => onDeleteProduct(item.id)}>
                    <Icon name='trash' style={{ color: 'white', fontSize: 23 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: "black"
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: 25,
    width: '100%',
    padding: 14,
    backgroundColor: '#161922',
    border: 1,
    borderRadius: 8
  },
  title: {
    color: 'white',
    textAlign: 'center',
    marginLeft: 10
  },
  product: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 150,
    backgroundColor: '#4D4D4D',
    border: 1,
    borderRadius: 30,
    padding: 8,
  },
  productImage: {
    width: 130,
    height: 100,
    borderRadius: 30
  },
  productName: {
    color: 'white',
    width: 130,
    marginLeft: 10
  },
  action: {
    display: 'flex',
    flexDirection: 'row'
  },
  actionBtn: {
    marginTop: 30,
    marginLeft: 10
  }
})

export default ProductsScreen