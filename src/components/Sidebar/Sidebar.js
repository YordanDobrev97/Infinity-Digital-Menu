import React, { useContext } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Button,
    StyleSheet
} from 'react-native'
import { Icon } from 'native-base'

import AuthContext from '../../context/AuthContext'

const styles = StyleSheet.create({
    sidebarContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#201C1E',
        color: 'white'
    },
    closeIcon: {
        color: '#ffff'
    },
    navItemContainer: {
        margin: 4
    },
    navItem: {
        color: 'white',
        borderBottomWidth: 1,
        margin: 3,
        borderBottomColor: 'white'
    },
    navItemText: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center'
    },
})

const Sidebar = ({ setShowMenu, showMenu, navigation }) => {
    const closeMenu = () => {
        setShowMenu(false)
    }

    const context = useContext(AuthContext)

    return (
        <Modal visible={showMenu}>
            <View style={styles.sidebarContainer}>
                <Image
                    source={{
                        uri: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg'
                    }}
                />
                <TouchableOpacity onPress={closeMenu}>
                    <Icon name='close' style={styles.closeIcon} />
                </TouchableOpacity>
                    <Text style={{color: 'white'}}>{navigation !== null}</Text>
                <View style={styles.navItemContainer}>
                    <View style={styles.navItem}>
                        <Text style={styles.navItemText}>
                            <Icon name='home' style={{ color: 'white' }} />
                            Начало
                        </Text>
                    </View>

                    <View style={styles.navItem}>
                        <Text style={styles.navItemText}>
                            <Icon name='cart' style={{ color: 'white' }} />
                            Кошница
                        </Text>
                    </View>

                    <View style={styles.navItem}>
                        <Text style={styles.navItemText}>
                            <Icon name='menu' style={{ color: 'white' }} />
                            Категории
                        </Text>
                    </View>

                    <View style={styles.navItem}>
                        {context.isAuth ? (
                            <Button title='Вход' onPress={() => {
                                setShowMenu(false)
                                navigation.navigate('Login')
                            }}/>
                        ): (
                            <Button 
                            onPress={() => navigation.navigate('Admin')} 
                            title='Администрация'/>
                        )}
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default Sidebar