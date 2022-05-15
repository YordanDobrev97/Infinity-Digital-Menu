import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firestore, storage } from '../firebase/config'
import SelectDropdown from 'react-native-select-dropdown'

const EditProductScreen = ({ route, navigation }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.0)
  const [photo, setPhoto] = useState(null)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [category, setCategory] = useState(false)
  const [categories, setCategories] = useState([])
  const { id } = route.params

  useEffect(() => {
    const fetchProduct = async () => {
      return await firestore.collection('products').doc(id).get()
    }

    const fetchCategories = async () => {
      const dbCategories = await (await firestore.collection('categories').get())
        .docs.map((category => {
          return { ...category.data() }
        }))
      return dbCategories
    }

    fetchProduct()
      .then(async (res) => {
        const resCategories = await fetchCategories()
        const { name, description, photoUrl, price } = res.data()
        setName(name)
        setDescription(description)
        setPhoto(photoUrl)
        setPrice(Number(price))
        setCategories(resCategories)
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
          update(downloadURL)
          return downloadURL
        });
      })
    return url
  }

  const onAddProduct = async () => {
    await uploadImage()
    setUploading(true)
  }

  const update = (photoUrl) => {
    firestore.collection('products')
      .doc(id).update({
        name,
        photoUrl,
        description,
        price,
        category
      }).then((res) => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Admin' }]
        })
      })
  }

  const onBackAdmin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Admin' }]
    })
  }

  if (uploading) {
    return (
      <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: '#444341', width: '100%', height: '100%' }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Ъпдейтване...</Text>
        <ActivityIndicator color={'white'} />
      </View>
    )
  }
  
  return (
    <View style={styles.boxContainer}>
      <Button onPress={onBackAdmin} title='Назад' style={{ marginTop: 30 }} />
      <>
        <View style={{ flex: 1 }}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder='Име на продукта'
              value={name}
              placeholderTextColor={'white'}
              onChangeText={value => setName(value)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              keyboardType='numeric'
              placeholderTextColor={'white'}
              value={`${price}`}
              onChangeText={value => setPrice(value)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder='Описание на продукта'
              placeholderTextColor={'white'}
              value={description}
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

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              style={{ width: '30%', height: '30%' }}
              source={{ uri: photo }}
            />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={pickImage}>
              <Text style={styles.uploadButtonText}>Избери снимка</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Button
              style={styles.button} title='Запиши'
              onPress={onAddProduct}
            />
          </View>
        </View>
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: '#444341',
    width: '100%',
    height: '100%',
    marginTop: 20
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
    marginTop: 5,
    marginLeft: 40,
    marginBottom: 5,
    alignItems: "center",
  },
  input: {
    height: 30,
    flex: 1,
    padding: 5,
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

export default EditProductScreen