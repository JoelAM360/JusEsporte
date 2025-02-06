import { createContext, useCallback, useEffect, useState } from "react";
import { AuthService, IUser } from "../services/Auth/AuthServices";
import { useNavigate } from "react-router-dom";

interface IUsuarioLogadoContextData {
  user: IUser | null;
  login: (token: string) => void;
  logout: () => void;
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>(
  {} as IUsuarioLogadoContextData
);

interface IUsuarioLogadoProps {
  children: React.ReactNode;
}

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProps> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate()
  // Recuperar usuário do localStorage ao carregar a página
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");


    if (storedUser && storedToken) {
      try {
        const userData: IUser = JSON.parse(storedUser);
        if (userData.tipo_de_user !== "admin") {
          navigate("/dashboard");
        }

        setUser(userData);
      } catch (error) {
        console.error("Erro ao parsear o user:", error);
      }
    }
  }, []);


  // Função de login: salva o usuário e o token
  const handleLogin = useCallback(
  async (token: string) => {
    const user = await AuthService.Me(token);
   
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user as IUser);
  },[]);


  // Função de logout: remove dados do usuário
  const handleLogout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  }, []);

  return (
    <UsuarioLogadoContext.Provider
      value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </UsuarioLogadoContext.Provider>
  );
};
