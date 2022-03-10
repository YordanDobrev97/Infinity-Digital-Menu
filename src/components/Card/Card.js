import React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import { Button } from 'react-native-elements'


const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        backgroundColor: '#324646',
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
    },
    buttonStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'orange',
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
                <TouchableOpacity style={styles.buttonStyle}>
                    <Text style={{color: 'white'}}>Добави в кошницата</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}