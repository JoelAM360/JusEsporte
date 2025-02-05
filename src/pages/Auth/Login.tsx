import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { Scale } from "lucide-react";
import { InputElementBottom, InputElementTop } from "../../shared/components/";
import { AuthService } from "../../shared/services/Auth/AuthServices";
import { toast } from "react-toastify";
import { useUsuarioLogado } from './../../shared/hooks/';

export function Login() {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const { user, login } = useUsuarioLogado();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await AuthService.Login({ email, password });
      
      login(result.token); // Chama a função login do contexto
      toast.success(result.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao logar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Se já estiver logado, redireciona para dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Scale className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            JusEsporte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema Esportivo para Advogados
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <InputElementTop
              placeholder="Email"
              type="email"
              value={email}
              onChange={(newValue) => setEmail(newValue)}
            />

            <InputElementBottom
              placeholder="Senha"
              type="Password"
              value={password}
              onChange={(newValue) => setPassword(newValue)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Entrar
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
