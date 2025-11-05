import { useContext, useState } from 'react';
import { UserContext } from '../Context/context';

function Login() {
  const [nome, setNome] = useState('');
  const { setUsuario } = useContext(UserContext);

  const handleLogin = e => {
    e.preventDefault();
    if (nome.trim() === '') return;
    setUsuario({ nome: nome.trim(), estaLogado: true });
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Digite seu nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
