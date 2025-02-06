import React, { useState, useEffect } from "react";
import { LayoutDashboard } from "../Layout.Dashboard";
import Modal from "../../../shared/components/ModalElement";
import { Link } from "react-router-dom";
import {
  ITorneio,
  TorneioService,
} from "../../../shared/services/Torneio/TorneioService";
import { toast } from "react-toastify";

export const TabelaTorneio = () => {
  const [torneios, setTorneios] = useState<ITorneio[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [torneioExcluir, setTorneioExcluir] = useState<ITorneio | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Função para carregar os torneios do backend
  const loadTorneios = async () => {
    try {
      const torneiosData = await TorneioService.getAll(); // Carregar os dados via serviço
      setTorneios(torneiosData);
    } catch (error) {
      console.error("Erro ao carregar torneios", error);
    }
  };

  useEffect(() => {
    loadTorneios(); // Carregar os torneios quando o componente for montado
  }, []);

  const handleExcluir = (torneio: any) => {
    setTorneioExcluir(torneio);
    toggleModal();
  };

  const confirmarExcluir = async () => {
    if (torneioExcluir) {
      try {
        // Chama o serviço de exclusão da API
        await TorneioService.Delete(torneioExcluir.id);
        setTorneios(
          torneios.filter((torneio) => torneio.id !== torneioExcluir.id)
        ); // Atualiza o estado após a exclusão
        setTorneioExcluir(null);
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
          Você tem certeza que deseja excluir o torneio "{torneioExcluir?.nome}
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

      <div className="container mx-auto p-6">
        <Link
          to={"/torneios/create"}
          className="bg-indigo-500 text-white py-2 mb-4 px-4 rounded-md hover:bg-indigo-600">
          Criar Torneio
        </Link>
        <h2 className="text-2xl font-semibold mt-5 text-gray-700 mb-4">
          Lista de Torneios
        </h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Nome
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Jornadas
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Times
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Data Início
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Data Término
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {torneios.map((torneio) => (
                  <tr key={torneio.id} className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {torneio.nome}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {torneio.jornadas}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {torneio.quantidade_times}
                    </td>

                    <td className="px-4 py-2 text-sm text-gray-800">
                      {torneio.data_inicio}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {torneio.data_termino}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      <Link
                        to={`/torneios/edit/${torneio.id}`}
                        className="bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600 focus:outline-none">
                        Editar
                      </Link>
                      <Link
                        to={`/torneios/classificacao/${torneio.id}`}
                        className="bg-blue-500 text-white px-4 py-1 m-2 rounded-md hover:bg-blue-600 focus:outline-none">
                        Classificação
                      </Link>
                      <button
                        onClick={() => handleExcluir(torneio)}
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
