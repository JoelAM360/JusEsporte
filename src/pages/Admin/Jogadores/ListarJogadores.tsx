import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { Trophy } from "lucide-react";
import { toast } from "react-toastify";
import {
  IJogador,
  JogadorService,
} from "../../../shared/services/Jogador/JogadorServico";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useUsuarioLogado } from "../../../shared/hooks";
import Modal from "../../../shared/components/ModalElement";

export const ListaDeJogadores = () => {
  const [jogadores, setJogadores] = useState<IJogador[]>([]);
  const [loading, setLoading] = useState(false);
  const { logout } = useUsuarioLogado();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jogadorExcluir, setJogadorExcluir] = useState<IJogador | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchAllJogadores = async () => {
    try {
      setLoading(true);
      const jogadoresMock = await JogadorService.getAll();

      setJogadores(jogadoresMock);
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;

        if (status === 401) {
          toast.error("Sessão expirada. Faça login novamente.");
          logout();
          navigate("/login");
          return;
        }

        toast.error("Erro ao carregar jogadores. Verifique sua conexão.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJogadores();
  }, [logout, navigate, JogadorService]);

  if (loading) {
    return (
      <LayoutDashboard>
        <p>Carregando...</p>
      </LayoutDashboard>
    );
  }
  const handleExcluir = (jogador: IJogador) => {
    setJogadorExcluir(jogador);
    toggleModal();
  };

  const confirmarExcluir = async () => {
    if (jogadorExcluir) {
      try {
        // Chama o serviço de exclusão da API
        await JogadorService.Delete(jogadorExcluir.id);
        setJogadores(
          jogadores.filter((jogador) => jogador.id !== jogadorExcluir.id)
        ); // Atualiza o estado após a exclusão
        setJogadorExcluir(null);
        toggleModal();

        toast.warning("Torneio Excluido com sucesso");
      } catch (error) {
        console.error("Erro ao excluir torneio", error);
        // Aqui você pode mostrar uma mensagem de erro para o usuário
      }
    }
  };
  return (
    <LayoutDashboard>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Confirmar Exclusão">
        <p>
          Você tem certeza que deseja excluir o torneio "{jogadorExcluir?.nome}
          "?
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={toggleModal}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
            Cancelar
          </button>
          <button
            onClick={confirmarExcluir}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Confirmar
          </button>
        </div>
      </Modal>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Trophy className="h-8 w-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            Todos os Jogadores
          </h2>
        </div>

        <Link
          to="/jogadores/create"
          className="bg-indigo-500 text-white py-2 mb-4 px-4 rounded-md hover:bg-indigo-600">
          Adicionar Jogador
        </Link>

        {jogadores.length === 0 ? (
          <p className="mt-5">Nenhum jogador encontrado</p>
        ) : (
          <div className="bg-white rounded-lg mt-5 shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Dorsal/Posição
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Time
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                      Ação
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jogadores.map((jogador) => (
                    <tr key={jogador.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {jogador.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {jogador.dorsal} - {jogador.posicao.toLocaleUpperCase()}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {jogador.time.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-bold">
                        <Link
                          to={`/jogadores/edit/${jogador.id}`}
                          className="bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600">
                          Editar
                        </Link>
                        <Link
                          to={`/jogadores/detalhes/${jogador.id}`}
                          className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">
                          Ver Detalhes
                        </Link>
                        <button
                          onClick={() => handleExcluir(jogador)}
                          className="ml-2 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </LayoutDashboard>
  );
};
