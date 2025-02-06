import React, { useState } from "react";
import { ITime } from "../../../../shared/services/Time/TimeService";
import { InputElement } from "../../components/InputElement";

interface IFormTimesProps {
  categoria_id: number;
  advogado_id: number;
  nome: string;
  status: "pendente" | "ativo" | "desativado";
  onSubmit: (data: ITime) => void;
}

export const FormCreateEditTimes: React.FC<IFormTimesProps> = ({
  categoria_id,
  advogado_id,
  nome,
  status,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Omit<ITime, "categoria">>({
    categoria_id,
    advogado_id,
    nome,
    status,
    id: 0,
  });

  const handleChange = (
    field: keyof Omit<ITime, "categoria">,
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
        placeholder="Digite o Nome do Time"
        value={formData.nome}
        onChange={(newValue) => handleChange("nome", newValue)}
        label="Nome do Time"
        withLabel={true}
      />

      <InputElement
        placeholder="Digite o ID da Categoria"
        value={String(formData.categoria_id)}
        onChange={(newValue) => handleChange("categoria_id", Number(newValue))}
        label="ID da Categoria"
        withLabel={true}
        type="number"
      />

      <InputElement
        placeholder="Digite o ID do Advogado"
        value={String(formData.advogado_id)}
        onChange={(newValue) => handleChange("advogado_id", Number(newValue))}
        label="ID do Advogado"
        withLabel={true}
        type="number"
      />

      <div className="col-span-3">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Status
        </label>
        <select
          className="w-full p-2 border rounded"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}>
          <option value="pendente">Pendente</option>
          <option value="ativo">Ativo</option>
          <option value="desativado">Desativado</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 col-span-3 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Cadastrar Time
      </button>
    </form>
  );
};
