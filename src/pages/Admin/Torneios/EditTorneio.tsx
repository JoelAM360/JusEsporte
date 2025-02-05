import { Link } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { FormCreateEditTorneio } from "./components/FormCreatEdit";

export const EditTorneio = () => {
  // Função para lidar com o envio do formulário
  const handleFormSubmit = (data: any) => {
    console.log("Dados do Torneio Enviados:", data);
    // Aqui você pode adicionar a lógica para salvar o torneio, por exemplo, chamando uma API ou atualizando o estado
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
            icon=""
            onSubmit={handleFormSubmit} // Passando a função de envio
          />
        </div>
      </div>
    </LayoutDashboard>
  );
};
