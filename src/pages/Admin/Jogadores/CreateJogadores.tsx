import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { FormCreateEditJogadores } from "./components/FormCreateEditJogador"; // Alterado para Jogadores
import {
  IJogador,
  JogadorService,
} from "../../../shared/services/Jogador/JogadorServico"; // Altere conforme seu serviço de Jogador
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useUsuarioLogado } from "../../../shared/hooks";

export const CreateJogadores = () => {
  const navigate = useNavigate();
  const { logout } = useUsuarioLogado();

  const handleFormSubmit = async (data: IJogador) => {
    try {
      const result = await JogadorService.Create(data); // Alterado para JogadorService
      toast.success(result.message || "Jogador cadastrado com sucesso");
      navigate("/jogadores"); // Alterado para rota de jogadores
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          // Erro vindo do backend (validação ou outros erros)
          const status = error.response.status;
          const {
            message,
            errors,
          }: { message?: string; errors?: Record<string, string[]> } =
            error.response.data;
          console.log(errors);

          // Exibir os erros específicos, se houver
          if (errors) {
            Object.values(errors).forEach((errorMessages) => {
              errorMessages.forEach((msg: string) => toast.error(msg));
            });
          }
          if (status === 401) {
            toast.error("Sessão expirada. Faça login novamente.");
            logout(); // Remove o token salvo
            navigate("/login"); // Redireciona para login
            return;
          }

          toast.error(message || "Erro na requisição");
        } else if (error.request) {
          // Erro de rede (backend não respondeu)
          toast.error(
            "Erro de conexão. Verifique sua internet ou tente novamente."
          );
        } else {
          // Erro desconhecido
          toast.error("Ocorreu um erro inesperado.");
        }
      }
    }
  };

  return (
    <LayoutDashboard>
      <div className="flex bg-gray-100">
        <div className="w-full p-8 bg-white shadow-md rounded-lg">
          <Link
            to={"/jogadores/"} // Alterado para rota de jogadores
            className="bg-indigo-500 text-white py-2 mb-8 px-4 rounded-md hover:bg-indigo-600">
            Voltar
          </Link>
          <h2 className="text-2xl font-semibold mt-5 text-gray-700 mb-6">
            Criar Jogador
          </h2>
          <FormCreateEditJogadores
            advogado_id={1}
            time_id={2} // Aqui você ajusta o time_id conforme necessário
            nome=""
            img_perfil=""
            posicao="goleiro"
            dorsal={10}
            isCapitao="nao"
            onSubmit={handleFormSubmit} // Passando a função de envio
          />
        </div>
      </div>
    </LayoutDashboard>
  );
};
