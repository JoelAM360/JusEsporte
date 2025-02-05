import { Link } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard"
import { FormCreatEdit } from "./components/FormCreatEdit";

export const EditCategoria = () => {
  
  return (
    <LayoutDashboard>
      <div className="flex bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <Link
            to={"/categorias/"}
            className="bg-indigo-500 text-white py-2 mb-8 px-4 rounded-md hover:bg-indigo-600">
            Voltar
          </Link>
          <h2 className="text-2xl font-semibold mt-5 text-gray-700 mb-6">
            Editar Categoria Para Os Torneios
          </h2>
          <FormCreatEdit value="Teste" />
        </div>
      </div>
    </LayoutDashboard>
  );
}
