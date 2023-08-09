import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Snackbar } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importe os ícones corretos

import { registerUser } from '../../services/RegisterService'; // Verifique se o caminho está correto

const Cadastro = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleInputChange = (name, value) => {
    setRegisterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleShowPasswordToggle = () => {
    setRegisterData((prevData) => ({ ...prevData, showPassword: !prevData.showPassword }));
  };

  const handleShowConfirmPasswordToggle = () => {
    setRegisterData((prevData) => ({ ...prevData, showConfirmPassword: !prevData.showConfirmPassword }));
  };

  const handleSnackbarClose = () => {
    setShowErrorMessage(false);
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
      {/* Adicione outros campos de input conforme necessário */}
      <Button title="Salvar" onPress={handleRegister} />
      <Snackbar
        visible={showErrorMessage}
        onDismiss={handleSnackbarClose}
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
