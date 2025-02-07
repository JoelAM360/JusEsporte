import React, { useState } from "react";
import { InputElement } from "../../components/InputElement";

interface IFormJogadoresProps {
  advogado_id: number;
  time_id?: number;
  nome: string;
  posicao: "goleiro" | "defensor" | "meio-campo" | "atacante";
  dorsal: number;
  isCapitao: "nao" | "sim";
  onSubmit: (data: any) => void;
}

export const FormCreateEditJogadores: React.FC<IFormJogadoresProps> = ({
  advogado_id,
  time_id,
  nome,
  posicao,
  dorsal,
  isCapitao,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    advogado_id,
    time_id: time_id || null,
    nome,
    posicao,
    dorsal,
    isCapitao,
  });

  const handleChange = (
    field: keyof typeof formData,
    value: number | string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
      <InputElement
        placeholder="Digite o Nome do Jogador"
        value={formData.nome}
        onChange={(newValue) => handleChange("nome", newValue)}
        label="Nome do Jogador"
        withLabel={true}
      />

      <InputElement
        placeholder="Digite o ID do Advogado"
        value={String(formData.advogado_id)}
        onChange={(newValue) => handleChange("advogado_id", Number(newValue))}
        label="ID do Advogado"
        withLabel={true}
        type="number"
      />

      <InputElement
        placeholder="Digite o ID do Time"
        value={String(formData.time_id || "")}
        onChange={(newValue) => handleChange("time_id", Number(newValue))}
        label="ID do Time"
        withLabel={true}
        type="number"
      />

      <InputElement
        placeholder="Número da Camisa (Dorsal)"
        value={String(formData.dorsal)}
        onChange={(newValue) => handleChange("dorsal", Number(newValue))}
        label="Dorsal"
        withLabel={true}
        type="number"
      />

      <div>
        <label className="block text-gray-700 text-sm  font-bold mb-2">
          Posição
        </label>
        <select
          className="w-full p-2 border rounded"
          value={formData.posicao}
          onChange={(e) => handleChange("posicao", e.target.value)}>
          <option value="goleiro">Goleiro</option>
          <option value="defensor">Defensor</option>
          <option value="meio-campo">Meio-Campo</option>
          <option value="atacante">Atacante</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Capitão
        </label>
        <select
          className="w-full p-2 border rounded"
          value={formData.isCapitao}
          onChange={(e) => handleChange("isCapitao", e.target.value)}>
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 col-span-3 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Cadastrar Jogador
      </button>
    </form>
  );
};
