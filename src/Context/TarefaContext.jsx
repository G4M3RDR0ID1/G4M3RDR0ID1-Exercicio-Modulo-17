import { createContext, useContext, useState } from 'react';

export const TarefaContext = createContext();

export function TarefaProvider({ children }) {
  const [tarefas, setTarefas] = useState([]);
  return (
    <TarefaContext.Provider value={{ tarefas, setTarefas }}>
      {children}
    </TarefaContext.Provider>
  );
}

export function useTarefas() {
  return useContext(TarefaContext);
}
