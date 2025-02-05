import { Api } from "../ApiConfig";
import { ApiException } from "../ApiExceptions";

export interface IUser {
  id: number;
  nome: string;
  email: string;
  password: string;
  tipo_de_user: string;

}

interface ILoginResponse {
  user: IUser;
  token: string;
  message: string;
}


const Login = async (
  dataToLogin: Omit<IUser, "id" | "tipo_de_user" | "nome">
): Promise<ILoginResponse> => {
  const { data } = await Api().post(`/auth/login`, dataToLogin);

  return data;
};

const ConfirmaCode = async (code:string, email:string): Promise<ILoginResponse> => {
  const { data } = await Api().post(`/confirme_code`, {code, email});

  return data;
};

const Logout = async (): Promise<void | ApiException> => {
  const token = JSON.parse(localStorage.getItem("token") || '""'); 

  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }

  await Api().post(
    `/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );

  localStorage.removeItem("token"); 
};

const Me = async (token: string): Promise<IUser> => {
  const { data } = await Api().post(
    `/auth/me`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

const Refresh = async (token: string): Promise<IUser> => {
  const { data } = await Api().post(
    `/auth/refresh`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};


const create = async (
  dataToCreate: Omit<IUser, "id" | "message">
): Promise<ILoginResponse> => {
  const { data } = await Api().post("/user", dataToCreate);

  return data;
};

const createAdvogado = async (user_id: number, numero_inscricao:string, token:string) => {
  const { data } = await Api().post(
    "/advogado",
    {
      user_id,
      numero_inscricao,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};


export const AuthService = {
  Login,
  Logout,
  Me,
  Refresh,
  ConfirmaCode,
  create,
  createAdvogado,
};
