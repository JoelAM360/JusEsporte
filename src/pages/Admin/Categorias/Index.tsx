import React, { useState, useEffect } from "react";
import { LayoutDashboard } from "../Layout.Dashboard";
import Modal from "../../../shared/components/ModalElement";
import { Link } from "react-router-dom";

const TabelaCategorias = () => {
  // Estado para armazenar as categorias
    const [categorias, setCategorias] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

  // Simulando a recuperação dos dados
  useEffect(() => {
    // Simulação de dados
    const categoriasMock = [
      {
        id: 1,
        nome: "Brasilia",
      },
      { id: 2, nome: "São Paulo" },
      { id: 3, nome: "Rio de Janeiro" },
    ];

    setCategorias(categoriasMock);
  }, []);

    return (
      <LayoutDashboard>
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          title="Modal de Exemplo">
          <p>Este é um exemplo de modal reutilizável.</p>
          <button
            onClick={toggleModal}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
            Fechar
          </button>
        </Modal>
        <div className="container mx-auto p-6">
          <Link
            to={"/categorias/create"}
            className="bg-indigo-500 text-white py-2 mb-4 px-4 rounded-md hover:bg-indigo-600">
            Criar Categoria
          </Link>
          <h2 className="text-2xl font-semibold mt-5 text-gray-700 mb-4">
            Lista de Categorias
          </h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Nome
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id} className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {categoria.nome}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      <Link
                        to={"/categorias/edit"}
                        className="bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600 focus:outline-none">
                        Editar
                      </Link>
                      <button
                        onClick={toggleModal}
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

export default TabelaCategorias;
