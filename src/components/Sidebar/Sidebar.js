import React, { useContext } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import AuthContext from '../../context/AuthContext'

const Sidebar = ({ setShowMenu, showMenu, navigation }) => {
    const context = useContext(AuthContext)

    const closeMenu = () => {
        setShowMenu(false)
    }

    const logout = () => {
        context.loggedIn(false)
        navigation.navigate('Home')
    }

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
                <Text style={{ color: 'white' }}>{navigation !== null}</Text>
                <View style={styles.navItemContainer}>
                    <View style={styles.navItem}>
                        <Text style={styles.navItemText}>
                            <Icon name='home' style={{ color: 'white', fontSize: 22 }} />
                            Начало
                        </Text>
                    </View>

                    <View style={styles.navItem}>
                        <TouchableOpacity onPress={() => navigation.navigate('Basket')}>
                            <Text style={styles.navItemText}>
                                <Icon name='shopping-cart' style={{ color: 'white', fontSize: 22 }} />
                                Кошница</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.navItem}>
                        {!context.isAuth ? (
                            <View>
                                <TouchableOpacity onPress={() => {
                                    setShowMenu(false)
                                    navigation.navigate('Login')
                                }}>
                                    <Text style={styles.navItemText}>Вход</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {
                                    setShowMenu(false)
                                    navigation.navigate('SignUp')
                                }}>
                                    <Text style={styles.navItemText}>Регистрация</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
                                    <Text style={styles.navItemText}>Администрация</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={logout}>
                                    <Text style={styles.navItemText}>Изход</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    sidebarContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#AC7F24',
        color: 'white'
    },
    closeIcon: {
        color: '#ffff',
        fontSize: 22
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
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
})

export default Sidebar