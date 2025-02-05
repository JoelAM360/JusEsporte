import React, { useState, useEffect } from "react";
import { LayoutDashboard } from "../Layout.Dashboard";
import Modal from "../../../shared/components/ModalElement";
import { Link } from "react-router-dom";

export const TabelaTorneio = () => {
  // Estado para armazenar os torneios
  const [torneios, setTorneios] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [torneioExcluir, setTorneioExcluir] = useState<any | null>(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Simulando a recuperação dos dados
  useEffect(() => {
    // Simulação de dados de torneios
    const torneiosMock = [
      {
        id: 1,
        nome: "Liga Penal",
        jornadas: 10,
        quantidade_times: 20,
        img_icon: "icon-liga-penal.png",
        data_inicio: "2025-02-10",
        data_termino: "2025-06-10",
      },
      {
        id: 2,
        nome: "Liga JusEsporte De São Paulo",
        jornadas: 15,
        quantidade_times: 18,
        img_icon: "icon-liga-jusesporte.png",
        data_inicio: "2025-03-01",
        data_termino: "2025-07-01",
      },
      {
        id: 3,
        nome: "Liga do Rio",
        jornadas: 8,
        quantidade_times: 16,
        img_icon: "icon-liga-rio.png",
        data_inicio: "2025-04-01",
        data_termino: "2025-08-01",
      },
    ];

    setTorneios(torneiosMock);
  }, []);

  const handleExcluir = (torneio: any) => {
    setTorneioExcluir(torneio);
    toggleModal();
  };

  const confirmarExcluir = () => {
    if (torneioExcluir) {
      setTorneios(
        torneios.filter((torneio) => torneio.id !== torneioExcluir.id)
      );
      setTorneioExcluir(null);
    }
    toggleModal();
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
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
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
                  Ícone
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
                    <img
                      src={`/icons/${torneio.img_icon}`}
                      alt={torneio.nome}
                      className="w-8 h-8 rounded-full"
                    />
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
    </LayoutDashboard>
  );
};
