import './Tarefa.css';
import React from 'react';

function Tarefa({ texto, aoDeletar, concluida, alternarConcluida }) {
  const textoFinal = typeof texto === 'string'
    ? texto
    : typeof texto === 'object' && texto.texto
      ? texto.texto
      : String(texto);

  return (
    <li className="tarefa-item">
      <input
        type="checkbox"
        checked={!!concluida}
        onChange={alternarConcluida}
      />
      <span className={concluida ? 'concluida' : ''}>{textoFinal}</span>
      <button onClick={aoDeletar}>Remover</button>
    </li>
  );
}

export default React.memo(Tarefa);
