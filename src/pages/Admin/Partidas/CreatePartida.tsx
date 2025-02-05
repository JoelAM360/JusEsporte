import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard } from "../Layout.Dashboard";

export const FormCreatePartida = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    time_id_casa: "",
    time_id_fora: "",
    local: "",
    gol_casa: 0,
    gol_fora: 0,
    data_marcada: "",
    status: "pendente",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nova partida cadastrada:", form);
    navigate("/partidas"); // Redireciona após salvar
  };

  return (
    <LayoutDashboard>
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Cadastrar Nova Partida</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 shadow-md rounded-lg">
          <div>
            <label className="block text-gray-700">Time Casa:</label>
            <input
              type="text"
              name="time_id_casa"
              value={form.time_id_casa}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Time Fora:</label>
            <input
              type="text"
              name="time_id_fora"
              value={form.time_id_fora}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Local:</label>
            <input
              type="text"
              name="local"
              value={form.local}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-700">Gols Casa:</label>
              <input
                type="number"
                name="gol_casa"
                value={form.gol_casa}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">Gols Fora:</label>
              <input
                type="number"
                name="gol_fora"
                value={form.gol_fora}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Data Marcada:</label>
            <input
              type="datetime-local"
              name="data_marcada"
              value={form.data_marcada}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Status:</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-md">
              <option value="pendente">Pendente</option>
              <option value="jogando">Jogando</option>
              <option value="terminada">Terminada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Salvar Partida
          </button>
        </form>
      </div>
    </LayoutDashboard>
  );
};
