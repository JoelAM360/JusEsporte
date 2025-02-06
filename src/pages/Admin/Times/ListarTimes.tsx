import { Trophy } from "lucide-react";

import { LayoutDashboard } from "../Layout.Dashboard";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITime, TimeService } from "../../../shared/services/Time/TimeService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useUsuarioLogado } from "../../../shared/hooks";
import Modal from "../../../shared/components/ModalElement";

export const ListaDeTimes: React.FC = () => {
  const [times, setTimes] = useState<ITime[]>();
  const [timeExcluir, setTimeExcluir] = useState<ITime | null>();
  const { logout } = useUsuarioLogado();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoanding] = useState(false);

  useEffect(() => {
    const fecthAllTimes = async () => {
      try {
        setLoanding(true);
        const timesMock = await TimeService.getAll();
        setTimes(timesMock);
      } catch (error) {
        if (error instanceof AxiosError) {
          // Erro vindo do backend (validação ou outros erros)
          const status = error.response?.status;

          if (status === 401) {
            toast.error("Sessão expirada. Faça login novamente.");
            logout(); // Remove o token salvo
            navigate("/login"); // Redireciona para login
            return;
          }

          toast.error(
            "Alguma coisa correu mal. Verfique a sua conexão a internet"
          );
        }
      } finally {
        setLoanding(false);
      }
    };

    fecthAllTimes();
  }, [logout, navigate]);

  if (loading) {
    return (
      <LayoutDashboard>
        <p>Carregando...</p>
      </LayoutDashboard>
    );
  }

  if (!times) {
    return (
      <LayoutDashboard>
        <p className="mb-6">Nenhum time encontrado</p>
        <Link
          to={"/times/create"}
          className="bg-indigo-500 text-white py-2 mb-4 px-4 rounded-md hover:bg-indigo-600">
          Criar Time
        </Link>
      </LayoutDashboard>
    );
  }
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleExcluir = (time: ITime) => {
    setTimeExcluir(time);
    toggleModal();
  };

  const confirmarExcluir = async () => {
    if (timeExcluir) {
      try {
        // Chama o serviço de exclusão da API
        await TimeService.Delete(timeExcluir.id);
        setTimes(times.filter((time) => time.id !== timeExcluir.id)); // Atualiza o estado após a exclusão
        setTimeExcluir(null);
        toggleModal();

        toast.warning("Time Excluido com sucesso");
      } catch (error) {
        console.error("Erro ao excluir Time", error);
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
          Você tem certeza que deseja excluir o Time "{timeExcluir?.nome}
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
          <h1 className="text-3xl font-bold text-gray-900">Todos os Times</h1>
        </div>
        <Link
          to={"/Times/create"}
          className="bg-indigo-500 text-white py-2 mb-4 px-4 rounded-md hover:bg-indigo-600">
          Criar Time
        </Link>

        <div className="bg-white rounded-lg mt-5 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {times.map((time) => (
                  <tr key={time.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {time.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {time.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {time.categoria.titulo_categoria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {time.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-bold">
                      <Link
                        to={`/times/edit/${time.id}`}
                        className="bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600 focus:outline-none">
                        Editar
                      </Link>
                      <Link
                        to={`/Times/classificacao/${time.id}`}
                        className="bg-blue-500 text-white px-4 py-1 m-2 rounded-md hover:bg-blue-600 focus:outline-none">
                        Ver Detalhes
                      </Link>
                      <button
                        onClick={() => handleExcluir(time)}
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
      </div>
    </LayoutDashboard>
  );
};
