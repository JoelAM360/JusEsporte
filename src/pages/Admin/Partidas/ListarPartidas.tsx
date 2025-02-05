import { Link } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";

interface Partida {
  id: number;
  categoria_id: number;
  torneio_id: number;
  time_id_casa: string;
  time_id_fora: string;
  resultado: "casa" | "fora" | "empate" | null;
  local: string;
  gol_casa: number | null;
  gol_fora: number | null;
  data_marcada: string;
  status: "pendente" | "jogando" | "terminada" | "cancelada";
}

interface ListPartidasProps {
  partidas: Partida[];
}

export const ListPartidas: React.FC<ListPartidasProps> = ({ partidas }) => {
  return (
    <LayoutDashboard>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Lista de Partidas</h2>
        <Link
          to="/partidas/criar"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 inline-block">
          Cadastrar Nova Partida
        </Link>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Times</th>
                <th className="p-3 border">Placar</th>
                <th className="p-3 border">Local</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Ações</th>
              </tr>
            </thead>
            <tbody>
              {partidas.map((partida) => (
                <tr key={partida.id} className="border-b">
                  <td className="p-3 border">
                    {partida.time_id_casa} vs {partida.time_id_fora}
                  </td>
                  <td className="p-3 border">
                    {partida.gol_casa} - {partida.gol_fora}
                  </td>
                  <td className="p-3 border">{partida.local}</td>
                  <td className="p-3 border capitalize">{partida.status}</td>
                  <td className="p-3 border">
                    <Link
                      to={`/partidas/edit/${partida.id}`}
                      className="text-blue-500">
                      Editar
                    </Link>
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
