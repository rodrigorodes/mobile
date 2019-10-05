import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Image, Platform, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';

import api from '../services/api';



export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user_id').then(user => {
            if (false) {
                navigation.navigate('List');
            }
        });

    }, []);

    async function handleSubmit() {

        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        await AsyncStorage.setItem('user_id', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView behavior="padding" enabled={Platform.OS === 'ios' || true} style={styles.container}>
            <Image source={logo}></Image>
            <View style={styles.form}>
                <Text style={styles.label}>MEU E-MAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                >
                </TextInput>
                <Text style={styles.label}>Tecnologias</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                >
                </TextInput>
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        paddingTop: 30,

    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    }
});


