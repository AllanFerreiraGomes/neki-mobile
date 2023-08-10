import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AccessTokenProvider } from '../neki/context/AccessTokenContext';
import {IdFuncionarioProvider} from '../neki/context/IdFuncionarioContext';
import Login from './src/pages/login/Login'
import Home from '../neki/src/pages/cadastro/Cadastro';
import Cadastro  from '../neki/src/pages/cadastro/Cadastro';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AccessTokenProvider>
      <IdFuncionarioProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
        </Stack.Navigator>
        </NavigationContainer>
      </IdFuncionarioProvider>
    </AccessTokenProvider>
  );
};

export default App;