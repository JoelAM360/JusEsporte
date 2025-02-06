import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { FormCreatEdit } from "./components/FormCreatEdit";
import { CategoriaService } from "../../../shared/services/Categoria/CategoriaService";
import { toast } from "react-toastify";
import { useState } from "react";

export const CreateCategoria = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleCategoriaSubmit = async (novaCategoria: string) => {
    try {
      setLoading(true);
      await CategoriaService.Create({
        titulo_categoria: novaCategoria,
      });

      toast.success("Categoria criada com sucesso!");
      navigate("/categorias");
    } catch (error: any) {
      if (error.response) {
        // Erro vindo do backend Laravel (validação ou outros erros)
        const { message, errors } = error.response.data;
        console.log(errors);

        // Exibir os erros específicos, se houver
        if (errors) {
          Object.values(errors).forEach((errorMessages: any) => {
            errorMessages.forEach((msg: string) => toast.error(msg));
          });
        }
      } else if (error.request) {
        // Erro de rede (backend não respondeu)
        toast.error(
          "Erro de conexão. Verifique sua internet ou tente novamente."
        );
      } else {
        // Erro desconhecido
        toast.error("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

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
            Criar Categoria Para Os Torneios
          </h2>
          <FormCreatEdit
            value=""
            onSubmit={handleCategoriaSubmit}
            loading={loading}
          />
        </div>
      </div>
    </LayoutDashboard>
  );
};
