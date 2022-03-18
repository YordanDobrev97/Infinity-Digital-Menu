import React, { useContext, useEffect } from 'react'
import { FlatList } from 'react-native'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CartContext from '../context/CartContext'

import { firestore } from '../firebase/config'
const { width } = Dimensions.get("window")

const BasketScreen = ({ navigation }) => {
    const context = useContext(CartContext)

    const onBack = () => {
        context.setProducts([])
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, height: '30%' }}>
                <View style={{ width: width - 20, margin: 10, backgroundColor: '#0b466e', flexDirection: 'row', borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10 }}>
                    <Image
                        resizeMode={"contain"}
                        style={{ width: width / 3, height: width / 3 }}
                        source={{ uri: item.image }} />
                    <View
                        style={{ flex: 1, backgroundColor: 'transparent', padding: 10, justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontWeight: "bold", color: 'white', fontSize: 20 }}>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', color: "#9fd236", fontSize: 20 }}>
                                {item.count} x {item.price}
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: '#dae2e4', padding: 8, borderRadius: 12 }}>
                                    <Text>Премахни</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Icon.Button onPress={onBack} name="arrow-left" backgroundColor="#3b5998">
                <Text style={{ fontSize: 15 }}>
                    Назад
                </Text>
            </Icon.Button>
            <View style={{ height: 10 }} />

            <View style={{ flex: 2, width: '100%', maxHeight: '70%' }}>
                {context.products && (
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={context.products}
                        renderItem={renderItem}
                    />
                )}
            </View>

            <View style={{ height: 20 }} />

            <TouchableOpacity style={{
                backgroundColor: "#9fd236",
                width: width - 40,
                alignItems: 'center',
                padding: 10,
                borderRadius: 5
            }}>
                <Text style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: 'white'
                }}>
                    Поръчай
                </Text>
            </TouchableOpacity>
            <View style={{ height: 20 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#0d0f10',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 0.5,
        paddingVertical: 28,
        paddingHorizontal: 16,
    },
    checkoutButton: {
        marginHorizontal: 16,
        marginVertical: 24,
    },
})

export default BasketScreen