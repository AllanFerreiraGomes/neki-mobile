import { RequestAPI } from './api';
import { useContext } from 'react';
import { IdFuncionarioContext } from '../context/IdFuncionarioContext';

export const loginRequest = async (login, password) => {
  try {
    
       const dataLogin ={
        "login": login,
        "password": password
      }
      console.log("1")
    const response = await RequestAPI.post('/auth/signin',dataLogin ); // Chame a função que faz a requisição da API corretamente
    console.log("2")
    if (response.status === 200) {
      const data = response.data;
      return data; // Retorne o objeto user se as credenciais estiverem corretas
    } else if (response.status === 304) {
      return false; // Retorna false se as credenciais estiverem erradas
    } else {
      throw new Error('Erro ao fazer a solicitação de login Linha 20 loginRequest');
    }
  } catch (error) {
    console.error('Erro ao fazer a solicitação de login Linha 23 loginRequest:', error);
    throw error;
  }
};
