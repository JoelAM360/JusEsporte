import { Api, getAuthHeaders } from "../ApiConfig";
import { ITime } from "../Time/TimeService";
import { ITorneio } from "../Torneio/TorneioService";

interface ITimeDeTorneioResponse {
  torneio: ITorneio;
  time: ITime;
  message: string;
}

// Função de criação de torneio
const Create = async (
  time_id: number,
  torneio_id: number
): Promise<ITimeDeTorneioResponse> => {
  const headers = await getAuthHeaders();

  const { data } = await Api().post(
    `/torneiotimes`,
    { time_id, torneio_id, status: "pendente" },
    { headers }
  );

  return data;
};

// Função de atualização de torneio
const Update = async (
  time_id: number,
  toneio_id: number,
  id: number
): Promise<ITimeDeTorneioResponse> => {
  const headers = await getAuthHeaders();

  const { data } = await Api().put(
    `/torneiotimes/${id}`,
    {
      time_id,
      toneio_id,
      id,
    },
    { headers }
  );

  return data;
};

// Função para deletar torneio
const Delete = async (id: number): Promise<void> => {
  const headers = await getAuthHeaders();
  await Api().delete(`/torneiotimes/${id}`, { headers });
};

// Função para obter todos os torneios
const getAll = async (): Promise<ITimeDeTorneioResponse[]> => {
  const headers = await getAuthHeaders();
  const { data } = await Api().get("/torneiotimes", { headers });
  return data ?? [];
};

const getByIdWithTimes = async (
  id: number
): Promise<ITimeDeTorneioResponse[]> => {
  const headers = await getAuthHeaders();
  const { data } = await Api().get(`/torneiotimes/${id}`, { headers });
  return data ?? [];
};

export const TimesDeTorneioService = {
  Create,
  Update,
  Delete,
  getAll,
  getByIdWithTimes,
};
