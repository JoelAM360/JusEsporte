import { Link, useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { FormCreateEditJogadores } from "./components/FormCreateEditJogador"; // Alterado para Jogadores
import {
  IJogador,
  JogadorService,
} from "../../../shared/services/Jogador/JogadorServico"; // Altere para o serviço de Jogador
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useUsuarioLogado } from "../../../shared/hooks";
import { useEffect, useState } from "react";

export const EditJogadores = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { logout } = useUsuarioLogado();
  const [jogador, setJogador] = useState<IJogador | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(id);

    const getAllJogadores = async () => {
      try {
        setLoading(true);
        const JogadoresMock = await JogadorService.getAll();
        const JogadorEncontrado = JogadoresMock.find(
          (Jogador) => Jogador.id == Number(id)
        );

        console.log(JogadorEncontrado);

        if (!JogadorEncontrado) {
          toast.error("Jogador não encontrado");
          navigate("/jogadores"); // Alterado para a rota de jogadores
          return;
        }

        setJogador(JogadorEncontrado);
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status;

          if (status === 401) {
            toast.error("Sessão expirada. Faça login novamente.");
            logout();
            navigate("/login");
            return;
          }

          toast.error(
            "Alguma coisa correu mal. Verifique a sua conexão à internet"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    getAllJogadores();
  }, [navigate, id, logout]);

  const handleFormSubmit = async (data: IJogador) => {
    try {
      const result = await JogadorService.Update(data, Number(id)); // Usando o serviço de Jogador
      toast.success(result.message || "Jogador editado com sucesso");
      navigate("/jogadores"); // Alterado para rota de jogadores
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          const status = error.response.status;
          const {
            message,
            errors,
          }: { message?: string; errors?: Record<string, string[]> } =
            error.response.data;

          if (errors) {
            Object.values(errors).forEach((errorMessages) => {
              errorMessages.forEach((msg: string) => toast.error(msg));
            });
          }

          if (status === 401) {
            toast.error("Sessão expirada. Faça login novamente.");
            logout();
            navigate("/login");
            return;
          }

          toast.error(message || "Erro na requisição");
        } else if (error.request) {
          toast.error(
            "Erro de conexão. Verifique sua internet ou tente novamente."
          );
        } else {
          toast.error("Ocorreu um erro inesperado.");
        }
      }
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!jogador) {
    return <p>Nenhum jogador encontrado</p>;
  }

  return (
    <LayoutDashboard>
      <div className="flex bg-gray-100">
        <div className="w-full p-8 bg-white shadow-md rounded-lg">
          <Link
            to={"/jogadores/"}
            className="bg-indigo-500 text-white py-2 mb-8 px-4 rounded-md hover:bg-indigo-600">
            Voltar
          </Link>
          <h2 className="text-2xl font-semibold mt-5 text-gray-700 mb-6">
            Editar Jogador
          </h2>
          <FormCreateEditJogadores
            advogado_id={jogador.advogado_id}
            time_id={jogador.time_id} // Alterado para time_id de jogador
            nome={jogador.nome}
            img_perfil={jogador.img_perfil}
            posicao={jogador.posicao}
            dorsal={jogador.dorsal}
            isCapitao={jogador.isCapitao}
            onSubmit={handleFormSubmit} // Passando a função de envio
          />
        </div>
      </div>
    </LayoutDashboard>
  );
};
