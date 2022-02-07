import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        height: 200,
        alignItems: 'baseline'
    },
    cardImage: {
        width: '50%',
        height: '65%',
        margin: 30,
    },
    cardTitle: {
        fontSize: 28,
    }

});

export const Card = () => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.cardImage}
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg',
                }}
            />
            <Text style={styles.cardTitle}>Slides</Text>
        </View>
    )
}