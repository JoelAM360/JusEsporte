import { Api } from "../ApiConfig";
export interface ITorneio {
  id: number;
  categoria_id: number; // Relacionamento com a categoria
  nome: string;
  jornadas: number;
  quantidade_times: number;
  img_icon: string;
  data_inicio: string;
  data_termino: string;
}

interface ITorneioResponse {
  torneio: ITorneio;
  message: string;
}

// Função de criação de torneio
const Create = async (
  dataToCreate: Omit<ITorneio, "id">
): Promise<ITorneioResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }
  console.log(dataToCreate);

  const { data } = await Api().post(`/torneio`, dataToCreate, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// Função de atualização de torneio
const Update = async (
  dataToUpdate: ITorneio,
  id: number
): Promise<ITorneioResponse> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  const { data } = await Api().put(`/torneio/${id}`, dataToUpdate, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

// Função para deletar torneio
const Delete = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  await Api().delete(`/torneio/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// Função para obter todos os torneios
const getAll = async (): Promise<ITorneio[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  const { data } = await Api().get("/torneio", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data ?? [];
};

export const TorneioService = {
  Create,
  Update,
  Delete,
  getAll,
};
