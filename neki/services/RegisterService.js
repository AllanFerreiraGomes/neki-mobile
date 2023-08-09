import { RequestAPI } from './api';

const registerUser = async (name, login, password) => {
  try {
    const userData = {
      id: "7000",
      name: name,
      login: login,
      password: password,
      role: ["ROLE_ADM"]
    };

    const response = await RequestAPI.post('/auth/signup', userData);

     const responseData = response.data;

    if (responseData.message === "Usuário registrado com sucesso!") {
      return responseData.message;
    } else if (responseData.message === "Erro: Username já utilizado!") {
      return responseData.message;
    } else {
      throw new Error('Erro ao fazer a solicitação de cadastro Linha 20 registerUser');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação de cadastro  Linha 23 registerUser:', error);
    throw error;
  }
};

export { registerUser };
