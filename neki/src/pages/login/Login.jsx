import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { IdFuncionarioContext } from '../../../context/IdFuncionarioContext';
import { AccessTokenContext } from '../../../context/AccessTokenContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const { userId, setUserId } = useContext(IdFuncionarioContext);
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const dataLogin = {
        login: login,
        password: password,
      };

      const response = await axios.post('http://localhost:8080/api/auth/signin', dataLogin);

      if (response.status === 200) {
        setUserId(response.data.id);
        setAccessToken(response.data.token);
        navigation.navigate('Home')
      } else {
        console.log('Erro ao fazer a solicitação de login:', response.status);
        setLoginError(true);
      }
    } catch (error) {
      setLoginError(true);
      console.error('[Entrei no catch]:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, loginError && styles.inputError]}
        placeholder="Login"
        onChangeText={(text) => setLogin(text)}
      />
      <TextInput
        style={[styles.input, loginError && styles.inputError]}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {loginError && <Text style={styles.errorText}>Credenciais inválidas</Text>}
      <Button title="Login" onPress={handleLogin} />
     
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.linkText}>Cadastrar-se</Text>
      </TouchableOpacity>
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
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 10,
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
