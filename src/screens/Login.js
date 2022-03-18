import React, { useState, useContext } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native'

import { auth } from '../firebase/config'
import AuthContext from '../context/AuthContext'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: "#001f24",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: 'white'
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#001f24",
    },
    loginText: {
        color: 'white'
    },
    error: {
        backgroundColor: 'red',
        color: 'white',
        fontSize: 19,
        margin: 5,
        padding: 10,
        borderRadius: 4,
    }
})

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const context = useContext(AuthContext)

    const loginHandler = () => {
        if (email && password) {
            auth
                .signInWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    context.loggedIn(true)
                    props.navigation.navigate('Admin')
                })
                .catch(error => setMessage(error.message))
        }
    }

    return (
        <View style={styles.container}>
            {message ? (
                <Text style={styles.error}>{message}</Text>
            ) : (
                <Text></Text>
            )}

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="white"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity onPress={loginHandler} style={styles.loginBtn}>
                <Text style={styles.loginText}>Вход</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login