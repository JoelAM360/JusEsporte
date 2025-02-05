import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale } from 'lucide-react';
import { InputElementBottom, InputElementTop,InputElement } from "../../shared/components/";
import { useUsuarioLogado } from "./../../shared/hooks/";
import { AuthService } from '../../shared/services/Auth/AuthServices';
import { toast } from "react-toastify";

export function Register() {
  const [oab, setOab] = useState('');
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useUsuarioLogado();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const user = {nome, email, password , tipo_de_user: 'advogado'}
 
    try {
      const result = await AuthService.create(user);
      
      await AuthService.createAdvogado(
        result.user.id,
        oab,
        result.token
      );

      login(result.token); // Chama a função login do contexto
      toast.success("Cadastro Realizado. Verfique seu email para confirmar os dados.");
      navigate("/confirmarcodigo");
     } catch (error) {
       console.error("Erro ao logar:", error);
     } finally {
       setIsLoading(false);
     }
       
  };

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
            Criar nova conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema Esportivo para Advogados
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <InputElementTop
              placeholder="Nome Completo"
              type="text"
              value={nome}
              onChange={(nome) => setNome(nome)}
            />

            <InputElement
              placeholder="Email"
              onChange={(email) => setEmail(email)}
              value={email}
            />

            <InputElement
              placeholder="Número da OAB"
              onChange={(oab) => setOab(oab)}
              value={oab}
            />

            <InputElementBottom
              placeholder="Senha"
              onChange={(senha) => setPassword(senha)}
              value={password}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cadastrar
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500">
              Já tem uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}