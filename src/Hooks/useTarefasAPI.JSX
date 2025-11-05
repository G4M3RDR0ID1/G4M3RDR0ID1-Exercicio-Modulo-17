import { useEffect } from "react";
import { useTarefas } from "../Context/TarefaContext";

const api_URl = 'https://crudcrud.com/api/f6259de938bd42c79710df11c82ca20f/tarefas';

export function useTarefasAPI(usuario){
    const { tarefas, setTarefas} = useTarefas()

    useEffect(() => {
        fetch(api_URl)
        .then(res => res.json())
        .then(dados => {
            const corrigidas = dados.map(t => ({
                ...t, concluida: t.concluida ?? false
            }));
            setTarefas(corrigidas)
        })
        .catch(erro => console.error('Erro ao buscar Tarefas ', erro))

    }, [setTarefas]);

    const adicionarTarefa = texto => {
        const nova = {
            usuario: usuario.nome,
            texto: texto.trim(),
            concluida: false
        }

        return fetch(api_URl, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(nova)
        })
        .then(res => res.json())
        .then(tarefaCriada => {
            setTarefas([...tarefas, tarefaCriada])
        })
    }

    const excluirTarefa = _id => {
        return fetch(`${api_URl}/${_id}`, {
            method : 'DELETE'
        })
        .then(() => {
            setTarefas(tarefas.filter(t => t._id !== _id))
        })
    }

    const alternarConcluida = (_id, estadoAtual) => {
        const tarefaAtual = tarefas.find(t => t._id ===_id);
        if (!tarefaAtual) return;

        const atualizada = {
            usuario: tarefaAtual.usuario,
            texto: tarefaAtual,
            concluida: !estadoAtual
        }
        
        return fetch(`${api_URl}/${_id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(atualizada)
        })
        .then(() => {
            setTarefas(tarefas.map(t => t._id === _id ? {...t, concluida : !estadoAtual} : t))
        })
    }

    return{
        tarefas,
        adicionarTarefa,
        excluirTarefa,
        alternarConcluida
    }
}