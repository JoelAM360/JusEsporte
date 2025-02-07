import axios from "axios";

export const Api = () => {
  return axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
  });
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject(new Error("Usuário não autenticado"));
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
