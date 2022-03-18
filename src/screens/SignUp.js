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
    textInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
        color: 'white'
    },
    button: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#001f24",
    },
    text: {
        color: 'white'
    }
})

const SignUp = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('')

    const context = useContext(AuthContext)

    const onSignUpHandler = async () => {
        await auth.createUserWithEmailAndPassword(email, password)
        context.loggedIn(true)
        props.navigation.navigate('Admin')
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="white"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="white"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity onPress={onSignUpHandler} style={styles.button}>
                <Text style={styles.text}>Регистрация</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUp