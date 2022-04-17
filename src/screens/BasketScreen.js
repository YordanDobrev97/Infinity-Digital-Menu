import React, { useState, useEffect, useContext } from 'react'

import { FlatList } from 'react-native'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet,
    SafeAreaView
} from 'react-native'
import { FlatGrid } from 'react-native-super-grid'
import Icon from 'react-native-vector-icons/FontAwesome'
import CartContext from '../context/CartContext'

const { width } = Dimensions.get("window")

const BasketScreen = ({ navigation }) => {
    const context = useContext(CartContext)
    const [products, setProducts] = useState(context.products)
    const [totalPrice, setTotalPrice] = useState(0)
    const [successOrder, setSuccessOrder] = useState(false)
    const [currentHeight, setHeight] = useState(Dimensions.get('screen').height)
    const [currentWidth, setWidth] = useState(Dimensions.get('screen').width)

    useEffect(() => {
        updateTotalPrice(products)
    }, [])

    useEffect(() => {
        if (!isPortrait()) {
            setWidth('30%')
            setHeight(width / 4)
        } else {
            setWidth('40%')
            setHeight(width / 3)
        }
    }, [currentHeight, currentWidth])

    const onBack = async () => {
        if (successOrder) {
            context.setProducts([])
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }

    const removeProduct = async (id) => {
        const currentProducts = [...products]
        const filteredProducts = currentProducts.filter((p) => p.id !== id);
        await updateTotalPrice(filteredProducts)
            .then(() => {
                setProducts(filteredProducts)
                context.setProducts(filteredProducts)
            })

    }
    const onSendToEmail = async () => {
        const productsRes = products.map((product) => {
            return `
            Продукт: ${product.name}
            Единична цена - ${product.price}лв
            Количество: ${product.count}
            `
        })

        fetch('https://digitalmenu-api.herokuapp.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'Nikoletaairbnb1@gmail.com',
                subject: 'Нова поръчка',
                text: `
                    Поръчани продукти:
                    ${productsRes.join('\n')}
                    Крайна цена: ${totalPrice.toFixed(2)} лв.
                `
            })
        }).then((res) => {
            if (res) {
                setSuccessOrder(true)
            }
        })
    }

    Dimensions.addEventListener('change', () => {
        setHeight(Dimensions.get('screen').height)
        setWidth(Dimensions.get('screen').width)
    })

    const isPortrait = () => {
        const dim = Dimensions.get('screen')
        return dim.height >= dim.width
    }

    const onIncreaseQuantity = async (id) => {
        const shadowProducts = [...products]
        const product = shadowProducts.find((p) => p.id === id)
        product.count++;
        updateTotalPrice(shadowProducts)
            .then((res) => {
                setProducts(shadowProducts)
            })

    }

    const onDecreaseQuantity = async (id) => {
        const shadowProducts = [...products]
        const product = shadowProducts.find((p) => p.id === id)
        if (product.count > 1) {
            product.count--;
            updateTotalPrice(shadowProducts)
                .then(() => {
                    setProducts(shadowProducts)
                })
        }
    }

    const updateTotalPrice = async (products) => {
        let totalPrice = 0
        products.forEach((product) => {
            totalPrice += product.count * Number(product.price)
        })
        setTotalPrice(totalPrice)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{
                flex: 1,
                width: '100%',
                height: '10%'
            }}>
                <View style={{ width: '100%', backgroundColor: '#85661e', flexDirection: 'row', borderBottomWidth: 2, borderColor: "#cccccc", paddingBottom: 10 }}>
                    <Image
                        resizeMode={"contain"}
                        style={{
                            width: '40%',
                            height: '40%',
                            padding: 20,
                            justifyContent: 'center',
                            alignSelf: 'center'
                        }}
                        source={{ uri: item.image }} />
                    <View
                        style={{ flex: 1, backgroundColor: 'transparent', padding: 10, justifyContent: "space-between" }}>
                        <View>
                            <Text style={{ fontWeight: "bold", color: 'white', fontSize: 17 }}>{item.name}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', color: "#9fd236", fontSize: 17 }}>
                                {item.count}бр x {Number(item.price).toFixed(2)}лв
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => onIncreaseQuantity(item.id)} style={{
                                width: 40,
                                height: 30,
                                margin: 6,
                                backgroundColor: '#FE9A28'
                            }}>
                                <Text style={{ fontWeight: 'bold', color: "#ffff", textAlign: 'center', fontSize: 20 }}>
                                    +
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => onDecreaseQuantity(item.id)}
                                style={{
                                    width: 40,
                                    height: 30,
                                    margin: 6,
                                    backgroundColor: '#FE9A28'
                                }}>
                                <Text style={{ fontWeight: 'bold', color: "#ffff", textAlign: 'center', fontSize: 20 }}>
                                    -
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => removeProduct(item.id)} style={{ backgroundColor: '#dae2e4', padding: 8, borderRadius: 12 }}>
                                <Text>Премахни</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    if (successOrder) {
        return (
            <View style={{
                backgroundColor: '#23212E',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Вашата поръчка беше изпратена успешно!</Text>
                <TouchableOpacity
                    onPress={onBack}
                    style={{
                        backgroundColor: 'orange',
                        width: '40%',
                        padding: 10,
                        margin: 8,
                        borderRadius: 24,
                    }}>
                    <Text style={{ textAlign: 'center', color: 'black' }}>Към начална страница</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Icon.Button
                style={{ marginTop: 18 }}
                onPress={onBack}
                name="arrow-left"
                backgroundColor="#AC7F24">
                <Text style={{ fontSize: 15, color: '#ffff', textAlign: 'center' }}>
                    Назад
                </Text>
            </Icon.Button>

            <View style={styles.summary}>
                {products && (
                    <FlatGrid
                        itemDimension={200}
                        keyExtractor={(item) => item.id}
                        data={products}
                        renderItem={renderItem}
                    />
                )}
            </View>

            <View>
                <Text style={{ color: '#ffff' }}>Крайна цена: {totalPrice.toFixed(2)} лв</Text>
            </View>
            <TouchableOpacity style={{
                backgroundColor: "#AC7F24",
                width: '100%',
                alignItems: 'center',
                padding: 10,
                borderRadius: 5
            }}
                onPress={onSendToEmail}>
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
    screen: {
        //margin: 20,
        backgroundColor: '#444341',
        color: '#C6C5CB',
        height: '100%',
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        minHeight: '60%',
        flex: 1
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: 'blue'
    }
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingTop: 30,
//         backgroundColor: '#0d0f10',
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     item: {
//         borderBottomWidth: 1,
//         borderBottomColor: "lightgrey",
//     },
//     footer: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginVertical: 0.5,
//         paddingVertical: 28,
//         paddingHorizontal: 16,
//     },
//     checkoutButton: {
//         marginHorizontal: 16,
//         marginVertical: 24,
//     },
// })

export default BasketScreen