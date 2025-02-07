import React, { useEffect, useState } from "react";
import { ITime, TimeService } from "../../../shared/services/Time/TimeService";
import { useNavigate, useParams } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";
import { Calendar, Trophy, Users } from "lucide-react";
import Modal from "../../../shared/components/ModalElement";
import {
  ITorneio,
  TorneioService,
} from "../../../shared/services/Torneio/TorneioService";
import { TimesDeTorneioService } from "../../../shared/services/TimesDeTorneio/TimesDeTorneioService";
import { toast } from "react-toastify";

export const DetalhesDoTime = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [time, setTime] = useState<ITime | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [torneioId, setTorneioId] = useState("");
  const [torneios, setTorneios] = useState<ITorneio[]>([]);

  useEffect(() => {
    const fetchTimeData = async () => {
      try {
        const result = await TimeService.getTimeByIdWithTorneios(Number(id));
        const torneioMock = await TorneioService.getAll();

        setTorneios(torneioMock);
        if ("original" in result) {
          setTime(result.original as ITime);
        }
      } catch (error) {
        console.error("Erro ao carregar torneios", error);
      }
    };
    fetchTimeData();
  }, [id]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const enviarSolicitacao = async (e: React.FormEvent) => {
    e.preventDefault();
    //Carregando Torneio:
    try {
      await TimesDeTorneioService.Create(Number(id), Number(torneioId));
      console.log("Enviando solicitação para o torneio ID:", torneioId);
      toast.success("Solicatção foi enviado com sucesso. Aguarde a aprovação.");
    } catch (error) {
      console.log(error);
    }

    toggleModal(); // Fecha o modal após enviar
  };

  if (!time) {
    return (
      <LayoutDashboard>
        <p>Nenhum recurso encontrado</p>
      </LayoutDashboard>
    );
  }

  return (
    <LayoutDashboard>
      {/* MODAL COM O FORMULÁRIO */}
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        title="Solicitar Participação">
        <p>Escolha um torneio para solicitar participação:</p>
        <form onSubmit={enviarSolicitacao} className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Selecione o Torneio:
          </label>
          <select
            value={torneioId}
            onChange={(e) => setTorneioId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required>
            <option value="">Selecione...</option>
            {torneios?.map((torneio) => (
              <option key={torneio.id} value={torneio.id}>
                {torneio.nome}
              </option>
            ))}
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={toggleModal}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600">
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              Confirmar
            </button>
          </div>
        </form>
      </Modal>

      {/* BOTÃO QUE ABRE O MODAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={toggleModal} // Agora o botão abre o modal corretamente
          className="bg-indigo-500 text-white px-7 py-2 mb-5 rounded-md hover:bg-indigo-600">
          Solicitar Participação
        </button>

        {/* INFORMAÇÕES DO TIME */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Próximos Jogos</h2>
              <Calendar className="text-indigo-600" />
            </div>
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4">
                <p className="font-medium">Teste FC vs Teste FC 2</p>
                <p className="text-sm text-gray-600">12/12/2025 - 12:34</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Torneios</h2>
              <Trophy className="text-indigo-600" />
            </div>
            <div className="space-y-2">
              {time.torneios && time.torneios.length > 0 ? (
                time.torneios.map((torneio, i) => (
                  <div
                    key={torneio.id}
                    className="flex justify-between items-center">
                    <span>{torneio.nome}</span>
                    {time.torneios_times[i] && (
                      <span
                        className={[
                          "rounded px-1 text-white",
                          time.torneios_times[i].status === "pendente"
                            ? "bg-yellow-500"
                            : time.torneios_times[i].status === "aprovado"
                            ? "bg-green-600"
                            : "bg-red-600",
                        ].join(" ")}>
                        {time.torneios_times[i].status}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex justify-center h-24 items-center">
                  <span>Sem Participações a torneios</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Meu Time</h2>
              <Users className="text-indigo-600" />
            </div>
            <div className="space-y-2">
              <p className="font-medium">{time.nome}</p>
              <p className="text-sm text-gray-600">
                {time.categoria.titulo_categoria}
              </p>
              <p className="text-sm text-gray-600">
                Próximo jogo: 20/03 - 19:00
              </p>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">
                  Posição atual
                </p>
                <p className="text-2xl font-bold text-indigo-600">3º lugar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
};
