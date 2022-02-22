import React from 'react'
import {Text, Button, View} from 'react-native'

const Login = ({ navigation }) => {
    return (
        <View>
            <Text>Login</Text>
            <Button title='Go back' onPress={() => navigation.navigate('Home')}/>
        </View>
    )
}

export default Login