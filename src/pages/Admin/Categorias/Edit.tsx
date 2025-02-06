import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { FormCreatEdit } from "./components/FormCreatEdit";
import { toast } from "react-toastify";
import {
  CategoriaService,
  ICategoria,
} from "../../../shared/services/Categoria/CategoriaService";

export const EditCategoria = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<ICategoria | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoria = async () => {
      setLoading(true);
      try {
        const categorias = await CategoriaService.getAll();
        const categoriaEncontrada = categorias.find(
          (cat) => cat.id === Number(id)
        );

        if (!categoriaEncontrada) {
          toast.error("Categoria não encontrada.");
          navigate("/categorias");
          return;
        }

        setCategoria(categoriaEncontrada);
      } catch (error: any) {
        toast.error("Erro ao carregar categoria.");
        navigate("/categorias");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCategoria();
  }, [id, navigate]);

  const handleEditCategoria = async (titulo_categoria: string) => {
    if (!categoria) return;

    setLoading(true);
    try {
      await CategoriaService.Update(
        { id: categoria.id, titulo_categoria },
        categoria.id
      );

      toast.success("Categoria editada com sucesso!");
      navigate("/categorias");
    } catch (error: any) {
      if (error.response) {
        const { message, errors } = error.response.data;
        toast.error(message || "Erro ao editar categoria.");

        if (errors) {
          Object.values(errors).forEach((errorMessages: any) => {
            errorMessages.forEach((msg: string) => toast.error(msg));
          });
        }
      } else if (error.request) {
        toast.error(
          "Erro de conexão. Verifique sua internet ou tente novamente."
        );
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!categoria) {
    return <p>Categoria não encontrada.</p>;
  }

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
          <FormCreatEdit
            value={categoria.titulo_categoria}
            onSubmit={handleEditCategoria}
            loading={loading}
          />
        </div>
      </div>
    </LayoutDashboard>
  );
};
