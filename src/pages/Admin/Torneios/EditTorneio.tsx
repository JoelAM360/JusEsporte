import { Link, useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { FormCreateEditTorneio } from "./components/FormCreatEdit";
import {
  ITorneio,
  TorneioService,
} from "../../../shared/services/Torneio/TorneioService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const EditTorneio = () => {
  const [torneio, setToneio] = useState<ITorneio | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(id);

    const getAllTorneios = async () => {
      try {
        setLoading(true);
        const torneiosMock = await TorneioService.getAll();
        const torneioEncontrado = torneiosMock.find(
          (torneio) => torneio.id == Number(id)
        );

        console.log(torneioEncontrado);

        if (!torneioEncontrado) {
          toast.error("Torneio não encontrado");
          navigate("/torneios");
          return;
        }

        setToneio(torneioEncontrado);
      } catch (error) {
        toast.error("Alguma coisa correu mal");
      } finally {
        setLoading(false);
      }
    };

    getAllTorneios();
  }, [navigate, id]);

  // Função para lidar com o envio do formulário
  const handleFormSubmit = async (data: any) => {
    console.log("Dados do Torneio Enviados:", data);
    if (!torneio) return;

    try {
      setLoading(true);
      await TorneioService.Update(data, Number(id));
      toast.success("Torneio editado com sucesso!");
      navigate("/torneios");
    } catch (error) {
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

  if (!torneio) {
    return <p>Categoria não encontrada.</p>;
  }
  return (
    <LayoutDashboard>
      <div className="flex bg-gray-100">
        <div className="w-full p-8 bg-white shadow-md rounded-lg">
          <Link
            to={"/torneios/"}
            className="bg-indigo-500 text-white py-2 mb-8 px-4 rounded-md hover:bg-indigo-600">
            Voltar
          </Link>
          <h2 className="text-2xl font-semibold mt-5 text-gray-700 mb-6">
            Editar Torneio
          </h2>
          <FormCreateEditTorneio
            nomeTorneio={torneio.nome}
            jornadas={torneio.jornadas}
            quantidadeTimes={torneio.quantidade_times}
            dataInicio={torneio.data_inicio}
            dataTermino={torneio.data_termino}
            onSubmit={handleFormSubmit} // Passando a função de envio
          />
        </div>
      </div>
    </LayoutDashboard>
  );
};
