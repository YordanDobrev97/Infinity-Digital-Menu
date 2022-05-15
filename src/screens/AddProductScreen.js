import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firestore, storage } from '../firebase/config'
import SelectDropdown from 'react-native-select-dropdown'

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.0)
  const [photo, setPhoto] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)
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
        console.log(res)
        setCategories(res)
        setLoading(false)
      })
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log('Image Uri = ', result.uri)
      setPhoto(result.uri)
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", photo, true);
      xhr.send(null);
    });

    const lastIndex = photo.lastIndexOf('/') + 1
    const fileName = photo.substring(lastIndex)
    const ref = storage().ref().child(fileName);

    const task = ref.put(blob, { contentType: 'image/jpeg' });
    let url = ''
    task.on('state_changed',
      (snapshot) => {
        console.log(snapshot.totalBytes)
      },
      (err) => {
        console.log(err)
      },
      () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
          add(downloadURL)
          return downloadURL
        });
      })
    return url
  }

  const onAddProduct = async () => {
    await uploadImage()
    setUploading(true)
  }

  const add = (photoUrl) => {
    firestore.collection('products')
      .add({
        name,
        price,
        photoUrl,
        description,
        category
      }).then(() => {
        try {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
          })
        } catch (error) {
          console.log(error)
        }
      })
  }

  const onBackAdmin = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Admin'}]
    })
  }

  if (uploading) {
    return (
      <View style={{marginTop: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#444341', width: '100%', height: '100%'}}>
      <Text style={{color: 'white', textAlign: 'center'}}>Добавяне...</Text>
      <ActivityIndicator color={'white'}/>
    </View>
    )
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={"black"} />
      </View>
    )
  }
  return (
    <View style={styles.boxContainer}>
      <Button onPress={onBackAdmin} title='Назад' style={{marginTop: 30}}/>
      <View style={styles.boxContainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder='Име на продукта'
            placeholderTextColor={'white'}
            onChangeText={value => setName(value)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder='Цена на продукта'
            placeholderTextColor={'white'}
            onChangeText={value => setPrice(value)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            placeholder='Описание на продукта'
            placeholderTextColor={'white'}
            onChangeText={value => setDescription(value)}
          />
        </View>

        <View style={styles.inputView}>
          <SelectDropdown
            data={categories}
            defaultButtonText='Категория'
            onSelect={(selectedItem, index) => {
              setCategory(selectedItem.name)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name
            }}
            rowTextForSelection={(item, index) => {
              return item.name
            }}
          />
          </View>

        <View>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={pickImage}>
            <Text style={styles.uploadButtonText}>Избери снимка</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            style={styles.button} title='Добави'
            onPress={onAddProduct}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: '#444341',
    width: '100%',
    height: '100%',
    flex: 1,
    marginTop: 28,
  },
  button: {
    backgroundColor: '#33B5FF',
    color: 'white'
  },
  inputView: {
    backgroundColor: "#393B38",
    borderRadius: 30,
    width: "80%",
    height: 50,
    marginLeft: 40,
    marginBottom: 5,
    alignItems: "center",
  },
  input: {
    height: 50,
    flex: 1,
    padding: 10,
    margin: 5,
    color: 'white'
  },
  smallText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    marginTop: 18,
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 5,
    padding: 10,
    backgroundColor: '#fe5b29',
    width: Dimensions.get('window').width - 60,
    alignItems: 'center'
  },
  uploadButtonText: {
    color: '#f6f5f8',
    fontSize: 20,
    fontFamily: 'Roboto'
  },
  imageContainer: {
    height: Dimensions.get('window').height
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
})

export default AddProductScreen