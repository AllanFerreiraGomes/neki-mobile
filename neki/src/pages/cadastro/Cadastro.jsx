import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Cadastro = () => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const [loginError, setLoginError] = useState(false);

    const navigation = useNavigation();

    const checkPasswordsMatch = () => {
        if (password === confirmPassword) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    };

    const handleCadastro = async () => {
        checkPasswordsMatch(); // Chama a função para verificar as senhas
        if (password === confirmPassword) {
            try {
                const userData = {
                    id: '99999',
                    name: name,
                    login: login,
                    password: password,
                    role: ['ROLE_ADM']
                };

                const response = await axios.post('http://localhost:8080/api/auth/signup', userData);

                if (response.data.message === "Usuário registrado com sucesso!") {
                    navigation.navigate('Login')
                    return response.data.message;
                } else if (response.data.message === "Erro: Username já utilizado!") {
                    setLoginError(true);
                    return response.data.message;
                } else {
                    throw new Error('Erro ao fazer a solicitação de cadastro Linha 20 registerUser');
                }
            } catch (error) {
                console.error('Erro ao fazer a solicitação de cadastro CATCH:', error);
                setLoginError(true);
                throw error;
            }
        } else {
            console.log("Senhas não coincidem");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={(text) => setName(text)}
            />
            {loginError && <Text style={styles.errorText}>Login já existente</Text>}
            <TextInput
                style={[styles.input, loginError && styles.inputError]}
                placeholder="Login"
                onChangeText={(text) => setLogin(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            <TextInput
                style={[styles.input, !passwordsMatch && styles.inputError]}
                placeholder="Confirmar Senha"
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
            />
            {!passwordsMatch && (
                <Text style={styles.errorText}>As senhas não coincidem</Text>
            )}
            <Button title="Cadastrar" onPress={handleCadastro} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor: 'red',
        animation: 'vibrate 0.3s infinite alternate',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Cadastro;
