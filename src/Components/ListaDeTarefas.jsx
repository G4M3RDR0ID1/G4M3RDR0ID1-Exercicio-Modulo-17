import { useContext, useState, useMemo } from 'react';
import Tarefa from './Tarefa';
import { UserContext } from '../Context/context';
import { useTarefasAPI } from '../Hooks/useTarefasAPI';

function ListaDeTarefas() {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const { usuario } = useContext(UserContext);
  const { tarefas, adicionarTarefa, excluirTarefa, alternarConcluida } = useTarefasAPI(usuario);

  const handleSubmit = e => {
    e.preventDefault();
    if (novaTarefa.trim() === '') return;

    adicionarTarefa(novaTarefa)
      .then(() => setNovaTarefa(''))
      .catch(erro => console.error('Erro ao adicionar tarefa: ', erro));
  };

  const tarefasFiltradas = useMemo(() => {
    return tarefas
      .filter(t => t.usuario === usuario.nome)
      .filter(t => {
        if (filtro === 'concluidas') return t.concluida === true;
        if (filtro === 'pendentes') return t.concluida === false;
        return true;
      });
  }, [tarefas, filtro, usuario.nome]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite uma nova Tarefa"
          value={novaTarefa}
          onChange={e => setNovaTarefa(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <div>
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('concluidas')}>Concluídas</button>
        <button onClick={() => setFiltro('pendentes')}>Pendentes</button>
      </div>

      <ul>
        {tarefasFiltradas.map(t => (
          <Tarefa
            key={t._id}
            texto={t.texto}
            concluida={t.concluida}
            alternarConcluida={() => alternarConcluida(t._id, t.concluida)}
            aoDeletar={() => excluirTarefa(t._id)}
          />
        ))}
      </ul>
    </>
  );
}

export default ListaDeTarefas;
