import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Button,
    StatusBar
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        height: 150,
        alignItems: 'flex-start',
    },
    cardImage: {
        width: 100,
        height: '65%',

    },
    cardTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardContainer: {
        margin: 9
    },
    product: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        marginBottom: 30,
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 20,
    },
    safeView: {
        flexGrow: 1,
        paddingTop: StatusBar.currentHeight,
    }
});

export const Card = ({ imageUrl, title, price }) => {
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
                <Button title="Добави в кошницата" />
            </View>
        </View>
    )
}