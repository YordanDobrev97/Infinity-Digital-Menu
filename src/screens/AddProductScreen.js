import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { firestore, storage } from '../firebase/config'

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: '#1C1F1F',
    width: '100%',
    height: '96.5%'
  },
  button: {
    backgroundColor: '#33B5FF',
    color: 'white'
  },
  inputView: {
    backgroundColor: "#393B38",
    borderRadius: 30,
    width: "70%",
    height: 70,
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

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0.0)
  const [photo, setPhoto] = useState('')
  const [description, setDescription] = useState('')

  const [state, setState] = useState('')

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
  }

  const add = (photoUrl) => {
    firestore.collection('products')
      .add({
        name,
        price,
        photoUrl,
        description
      }).then(() => {
        try {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
          })
          //storageRef.putFile(photo)
        } catch (error) {
          console.log(error)
        }
      })
  }

  return (
    <View style={styles.boxContainer}>
      <Text style={styles.smallText}>Добавяне на нов продукт</Text>
      <Text>{state}</Text>
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

export default AddProductScreen