import { createContext, useEffect, useState  } from "react";
import axios from "axios";

interface ContextTypes{
    tarefas: TarefasTypes[];
    status: number;
    AddTarefa: (titulo: string) => void;
    EditTarefa: (titulo: string, cor: string, id: number) => void;
    DeletarTarefa: (id: number) => void;
    DeletarTudo: () => void;
    MudarEstadoTarefa: (status: string, id: number) => void;
    AddToFavoritos: (favorito: number, id: number) => void;
}

interface TarefasTypes{
    id: number;
    titulo: string;
    status: string;
    favorito: number;
    cor:string;
}

interface DefaultTypes{
    children: JSX.Element
}

export const context = createContext({} as ContextTypes);

const api = "http://127.0.0.1:8000/api";

export default function Context({children}: DefaultTypes){
    
    const [tarefas, setTarefas] = useState<TarefasTypes[]>([]);
    const [status, setStatus] = useState(Number);

    const DeletarTudo = () => {
        axios.delete(`${api}/DeletarTudo`)
        .then(() => console.log('Tudo Limpo'))
        .catch((error) => console.log(error))
    }
    
    const DeletarTarefa = async (id: number) => {
        await axios.delete(`${api}/tarefas/${id}`)
        .catch((error) => console.log(error))
    }
   
    const EditTarefa = async (titulo: string, cor: string, id: number) => {
        await axios.put(`${api}/tarefas/${id}`, {
            titulo: titulo,
            cor: cor
        })
        .catch((error) => console.log(error))
    }

    const MudarEstadoTarefa = async (status: string, id: number) => {
        await axios.put(`${api}/tarefas/${id}`, {
            status: status
        })
        .catch((error) => console.log(error))
    }   

    const AddTarefa = async (titulo: string) => {
        await axios.post(`${api}/tarefas`, {
          titulo: titulo,
          status: "PENDENTE",
          favorito: 0,
          cor: '#FFFF'
        })
        .catch((error) => console.log(error))
    }

    const AddToFavoritos = async (favorito: number, id: number) => {
        await axios.put(`${api}/tarefas/${id}`, {
            favorito: favorito
        })
        .catch((error) => console.log(error))
    }
    
    useEffect(() => {
        axios.get(`${api}/tarefas`,{
            withCredentials:true,
        })
        .then((response) => {
            setTarefas(response.data);
            setStatus(response.status);
        })
        .catch((error) => console.log(error))
    },[tarefas])

    return(
        <context.Provider value={{tarefas, status, AddTarefa, EditTarefa, DeletarTarefa, DeletarTudo, MudarEstadoTarefa, AddToFavoritos}}>
            {children}
        </context.Provider>
    )
}