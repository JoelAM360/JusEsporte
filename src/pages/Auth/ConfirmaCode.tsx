import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scale } from "lucide-react";
import { InputElement } from "../../shared/components/";
import { AuthService } from "../../shared/services/Auth/AuthServices";
import { toast } from "react-toastify";
import { useUsuarioLogado } from "./../../shared/hooks/";

export function ConfirmaCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUsuarioLogado();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await AuthService.ConfirmaCode(code, user!.email);
      toast.success(result.message);
      navigate("/dashboard");
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
            JusEsporte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sistema Esportivo para Advogados
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <InputElement
              placeholder="Código de Confirmação"
              type="numeric"
              value={code}
              onChange={(code) => setCode(code)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Confirmar Código
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
