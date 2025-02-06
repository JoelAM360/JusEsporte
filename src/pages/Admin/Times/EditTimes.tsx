import { Link, useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { FormCreateEditTimes } from "./components/FormCreateEditTimes";
import { ITime, TimeService } from "../../../shared/services/Time/TimeService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useUsuarioLogado } from "../../../shared/hooks";
import { useEffect, useState } from "react";

export const EditTimes = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { logout } = useUsuarioLogado();
  const [time, setTime] = useState<ITime | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log(id);

    const getAllTimes = async () => {
      try {
        setLoading(true);
        const TimesMock = await TimeService.getAll();
        const TimeEncontrado = TimesMock.find((Time) => Time.id == Number(id));

        console.log(TimeEncontrado);

        if (!TimeEncontrado) {
          toast.error("Time não encontrado");
          navigate("/Times");
          return;
        }

        setTime(TimeEncontrado);
      } catch (error) {
        if (error instanceof AxiosError) {
          // Erro vindo do backend (validação ou outros erros)
          const status = error.response?.status;

          if (status === 401) {
            toast.error("Sessão expirada. Faça login novamente.");
            logout(); // Remove o token salvo
            navigate("/login"); // Redireciona para login
            return;
          }

          toast.error(
            "Alguma coisa correu mal. Verfique a sua conexão a internet"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    getAllTimes();
  }, [navigate, id]);

  const handleFormSubmit = async (data: ITime) => {
    try {
      const result = await TimeService.Update(data, Number(id));
      toast.success(result.message || "Time editado com sucesso");
      navigate("/times");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          // Erro vindo do backend (validação ou outros erros)
          const status = error.response.status;
          const {
            message,
            errors,
          }: { message?: string; errors?: Record<string, string[]> } =
            error.response.data;
          console.log(errors);

          // Exibir os erros específicos, se houver
          if (errors) {
            Object.values(errors).forEach((errorMessages) => {
              errorMessages.forEach((msg: string) => toast.error(msg));
            });
          }
          if (status === 401) {
            toast.error("Sessão expirada. Faça login novamente.");
            logout(); // Remove o token salvo
            navigate("/login"); // Redireciona para login
            return;
          }

          toast.error(message || "Erro na requisição");
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
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!time) {
    return <p>Nehum time encontrado</p>;
  }

  return (
    <LayoutDashboard>
      <div className="flex bg-gray-100">
        <div className="w-full p-8 bg-white shadow-md rounded-lg">
          <Link
            to={"/times/"}
            className="bg-indigo-500 text-white py-2 mb-8 px-4 rounded-md hover:bg-indigo-600">
            Voltar
          </Link>
          <h2 className="text-2xl font-semibold mt-5 text-gray-700 mb-6">
            Criar Time
          </h2>
          <FormCreateEditTimes
            advogado_id={time.advogado_id}
            categoria_id={time.categoria_id}
            nome={time.nome}
            status={time.status}
            onSubmit={handleFormSubmit} // Passando a função de envio
          />
        </div>
      </div>
    </LayoutDashboard>
  );
};
