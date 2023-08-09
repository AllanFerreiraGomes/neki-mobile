import { createContext, useState } from 'react';

export const IdFuncionarioContext = createContext();

export const IdFuncionarioProvider = ({ children }) => {
  const [userId, setUserId] = useState({});
  
  const setLoggedInUserId = (id) => {
    setUserId(id);
  };

  return (
    <IdFuncionarioContext.Provider value={{ userId, setUserId}}>
      {children}
    </IdFuncionarioContext.Provider>
  );
};
