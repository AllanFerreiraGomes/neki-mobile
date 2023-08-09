import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Snackbar } from 'react-native';
import { registerUser } from '../../services/RegisterService';

const Cadastro = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleInputChange = (name, value) => {
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    if (registerData.password === registerData.confirmPassword) {
      setPasswordsMatch(true);

      try {
        const response = await registerUser(registerData.name, registerData.username, registerData.password);

        if (response) {
          setRegistrationSuccess(true);
          setShowErrorMessage(false);
          console.log('Cadastro realizado com sucesso!');
          // Aqui você pode adicionar lógica para redirecionar para a tela de login
          // ...

        } else {
          setShowErrorMessage(true);
          console.log('Erro ao fazer a solicitação de cadastro:', response.status);
        }
      } catch (error) {
        setShowErrorMessage(true);
        console.error('Erro ao fazer a solicitação de cadastro:', error);
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar-se</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={registerData.name}
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={registerData.username}
        onChangeText={(value) => handleInputChange('username', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={registerData.password}
        onChangeText={(value) => handleInputChange('password', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry={true}
        value={registerData.confirmPassword}
        onChangeText={(value) => handleInputChange('confirmPassword', value)}
      />
      <Button title="Salvar" onPress={handleRegister} />
      <Snackbar
        visible={showErrorMessage}
        onDismiss={() => setShowErrorMessage(false)}
        duration={5000}
      >
        <Text style={styles.errorMessage}>Login Inválido, Digite Outro</Text>
      </Snackbar>
      {registrationSuccess && (
        <Text style={styles.successMessage}>Cadastro realizado com sucesso!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 8,
  },
  errorMessage: {
    color: 'red',
  },
  successMessage: {
    color: 'green',
  },
});

export default Cadastro;
