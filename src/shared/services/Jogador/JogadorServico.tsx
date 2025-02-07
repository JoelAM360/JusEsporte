import { Api } from "../ApiConfig";
import { ITime } from "../Time/TimeService";

export interface IJogador {
  id: number;
  nome: string;
  advogado_id: number; // Relacionamento com advogado
  time_id?: number; // Relacionamento com time (opcional)
  img_perfil: string;
  posicao: "goleiro" | "defensor" | "meio-campo" | "atacante";
  dorsal: number;
  isCapitao: boolean;
  time: ITime;
}

interface IJogadorResponse {
  Jogador: IJogador;
  message: string;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Criar jogador
const Create = async (
  dataToCreate: Omit<IJogador, "id" | "time">
): Promise<IJogadorResponse> => {
  const headers = await getAuthHeaders();
  const { data } = await Api().post("/jogador", dataToCreate, { headers });
  return data;
};

// Atualizar jogador
const Update = async (
  dataToUpdate: Omit<IJogador, "id" | "time">,
  id: number
): Promise<IJogadorResponse> => {
  const headers = await getAuthHeaders();
  const { data } = await Api().put(`/jogador/${id}`, dataToUpdate, { headers });
  return data;
};

// Deletar jogador
const Delete = async (id: number): Promise<void> => {
  const headers = await getAuthHeaders();
  await Api().delete(`/jogador/${id}`, { headers });
};

// Obter todos os jogadores
const getAll = async (): Promise<IJogador[]> => {
  const headers = await getAuthHeaders();
  const { data } = await Api().get("/jogador", { headers });
  return data ?? [];
};

export const JogadorService = {
  Create,
  Update,
  Delete,
  getAll,
};
