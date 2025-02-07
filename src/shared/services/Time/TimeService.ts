import { Api, getAuthHeaders } from "../ApiConfig";
import { ICategoria } from "../Categoria/CategoriaService";
import { ITorneio } from "../Torneio/TorneioService";
export interface ITime {
  id: number;
  categoria_id: number; // Relacionamento com a categoria
  advogado_id: number; //Relacionamento com advogado
  nome: string;
  categoria: ICategoria;
  torneios?: ITorneio;
  status: "pendente" | "ativo" | "desativado";
}

interface ITimeResponse {
  Time: ITime;
  message: string;
}

// Função de criação de Time
const Create = async (
  dataToCreate: Omit<ITime, "id" | "categoria">
): Promise<ITimeResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  const { data } = await Api().post(`/time`, dataToCreate, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// Função de atualização de Time
const Update = async (
  dataToUpdate: Omit<ITime, "categoria">,
  id: number
): Promise<ITimeResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  const { data } = await Api().put(`/time/${id}`, dataToUpdate, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// Função para deletar Time
const Delete = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  await Api().delete(`/time/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Função para obter todos os Times
const getAll = async (): Promise<ITime[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  const { data } = await Api().get("/time", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data ?? [];
};

const getTimeByIdWithTorneios = async (id: number): Promise<ITime[]> => {
  const headers = await getAuthHeaders();
  const { data } = await Api().get(`/time/${id}`, { headers });
  return data ?? [];
};

export const TimeService = {
  Create,
  Update,
  Delete,
  getAll,
  getTimeByIdWithTorneios,
};
