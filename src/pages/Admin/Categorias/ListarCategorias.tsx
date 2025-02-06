import React, { useState, useEffect } from "react";
import { LayoutDashboard } from "../Layout.Dashboard";
import Modal from "../../../shared/components/ModalElement";
import { Link } from "react-router-dom";
import {
  CategoriaService,
  ICategoria,
} from "../../../shared/services/Categoria/CategoriaService";
import { toast } from "react-toastify";

export const TabelaCategorias: React.FC = () => {
  // Estado para armazenar as categorias
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaExcluir, setCategoriaExcluir] = useState<ICategoria | null>(
    null
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const categoriasMock: ICategoria[] = await CategoriaService.getAll();
        setCategorias(categoriasMock);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    getCategorias();
  }, []);

  const handleExcluir = (categoria: ICategoria) => {
    setCategoriaExcluir(categoria);
    toggleModal();
  };

  const confirmarExcluir = async () => {
    try {
      if (categoriaExcluir) {
        await CategoriaService.Delete(categoriaExcluir.id);
        setCategorias(
          categorias.filter((categoria) => categoria.id !== categoriaExcluir.id)
        );
        setCategoriaExcluir(null);
      }
      toast.success("Categoria Excluída Com Sucesso");
    } catch (error: any) {
      toast.error("Erro Tente Novamente.");
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
          Você tem certeza que deseja excluir o categoria " Teste
          {categoriaExcluir?.titulo_categoria}
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
          to={"/categorias/create"}
          className="bg-indigo-500 text-white py-2 mb-4 px-4 rounded-md hover:bg-indigo-600">
          Criar Categoria
        </Link>
        <h2 className="text-2xl font-semibold mt-5 text-gray-700 mb-4">
          Lista de Categorias
        </h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 overflow-hidden">
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
                    Categoria
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categorias.map((categoria) => (
                  <tr key={categoria.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {categoria.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {categoria.titulo_categoria}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-bold">
                      <Link
                        to={`/categorias/edit/${categoria.id}`}
                        className="bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600 focus:outline-none">
                        Editar
                      </Link>
                      <button
                        onClick={() => handleExcluir(categoria)}
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

export default TabelaCategorias;
