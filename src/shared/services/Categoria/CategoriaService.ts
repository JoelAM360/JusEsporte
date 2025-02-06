import { Api } from "../ApiConfig";

export interface ICategoria {
  id: number;
  titulo_categoria: string;
}

interface ICategoriaResponse {
  categoria: ICategoria;
  message: string;
}

const Create = async (
  dataToCreate: Omit<ICategoria, "id">
): Promise<ICategoriaResponse> => {
  const token = localStorage.getItem("token");
  console.log(token);
  console.log(dataToCreate);

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  const { data } = await Api().post(`/categoria`, dataToCreate, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const Update = async (
  dataToUpadet: ICategoria,
  id: number
): Promise<ICategoriaResponse> => {
  const token = localStorage.getItem("token");

  const { data } = await Api().put(`/categoria/${id}`, dataToUpadet, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

const Delete = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token");
  await Api().delete(`/categoria/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAll = async (): Promise<ICategoria[]> => {
  const token = localStorage.getItem("token");

  const { data } = await Api().get("/categoria", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return data ?? [];
};

export const CategoriaService = {
  Create,
  Update,
  Delete,
  getAll,
};
