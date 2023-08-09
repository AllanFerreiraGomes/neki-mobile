import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/pages/login/Login'; // Importe seu componente de login aqui
import Cadastro from './src/pages/cadastro/Cadastro'; // Importe seu componente de cadastro aqui

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        {/* Adicione outras telas aqui conforme necessário */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
