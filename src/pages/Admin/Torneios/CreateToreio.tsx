import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { FormCreateEditTorneio } from "./components/FormCreatEdit";
import { TorneioService } from "../../../shared/services/Torneio/TorneioService";
import { toast } from "react-toastify";

export const CreateTorneio = () => {
  const navigate = useNavigate();
  // Função para lidar com o envio do formulário
  const handleFormSubmit = async (data: any) => {
    console.log("Dados do Torneio Enviados:", data);

    try {
      await TorneioService.Create(data);
      toast.success("Tornei criado com sucesso!");

      navigate("/torneios");
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
    }
  };

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
            Criar Torneio
          </h2>
          <FormCreateEditTorneio
            nomeTorneio=""
            jornadas={0}
            quantidadeTimes={0}
            dataInicio=""
            dataTermino=""
            onSubmit={handleFormSubmit} // Passando a função de envio
          />
        </div>
      </div>
    </LayoutDashboard>
  );
};
