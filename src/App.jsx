import { useState } from 'react';
import ListaDeTarefas from './Components/ListaDeTarefas';
import Login from './Components/Login';
import { UserContext } from './Context/context';
import { TarefaProvider } from './Context/TarefaContext';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState({ nome: null, estaLogado: false });

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      <TarefaProvider>
        <main>
          <h1>Lista de Tarefas</h1>
          {usuario.estaLogado ? <ListaDeTarefas /> : <Login />}
        </main>
      </TarefaProvider>
    </UserContext.Provider>
  );
}

export default App;
