import React, { useState, useContext } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import CartContext from '../../context/CartContext'

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 3,
        borderColor: '#ffff'
    },
    cardImage: {
        width: 100,
        height: '65%',
        margin: 4,
    },
    cardTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#1387d4'
    },
    cardContainer: {
        marginTop: 12,
        marginLeft: 10,
    },
    product: {
        borderBottomWidth: 3,
        marginBottom: 10,
        marginLeft: '5%',
    },
    safeView: {
        flexGrow: 1,
        paddingTop: StatusBar.currentHeight,
    },
    buttonStyle: {
        margin: 3,
        padding: 4,
        borderRadius: 4,
        backgroundColor: '#259399',
    },
    removeButton: {
        margin: 3,
        padding: 4,
        borderRadius: 4,
        backgroundColor: 'red',
    }
});

export const Card = ({ id, imageUrl, title, price }) => {
    const [isAddInCart, setInCart] = useState(false)

    const context = useContext(CartContext)

    const onAddToCart = () => {
        if (!context.cart.includes(id)) {
            context.setCart((oldValue) => [...oldValue, id])
            setInCart(true)
        } else {
            setInCart(false)
        }
    }

    const onRemoveFromCart = () => {
        context.setCart((oldValue) => oldValue.filter((p) => {
            return p.id !== id
        }))
        setInCart(false)
    }

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Image
                    style={styles.cardImage}
                    source={{
                        uri: imageUrl
                    }}
                />
            </View>
            <View style={styles.product}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text>Цена: {price} лв.</Text>
                {!isAddInCart ? (
                    <TouchableOpacity onPress={onAddToCart} style={styles.buttonStyle}>
                        <Text style={{ color: 'white' }}>Добави в кошницата</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={onRemoveFromCart} style={styles.removeButton}>
                        <Text style={{ color: 'white' }}>Премахни от кошницата</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}