import React, { useState } from "react";
import { InputElement } from "../../components/InputElement";

interface ITorneioFormProps {
  nomeTorneio: string;
  jornadas: number;
  quantidadeTimes: number;
  dataInicio: string;
  dataTermino: string;
  onSubmit: (data: any) => void;
}

export const FormCreateEditTorneio: React.FC<ITorneioFormProps> = ({
  nomeTorneio,
  jornadas,
  quantidadeTimes,
  dataInicio,
  dataTermino,
  onSubmit,
}: ITorneioFormProps) => {
  const [nome, setNome] = useState(nomeTorneio);
  const [jornadasCount, setJornadasCount] = useState(jornadas);
  const [quantidadeDeTimes, setQuantidadeDeTimes] = useState(quantidadeTimes);
  const [inicio, setInicio] = useState(dataInicio);
  const [termino, setTermino] = useState(dataTermino);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const torneioData = {
      categoria_id: 2,
      nome,
      jornadas: jornadasCount,
      quantidade_times: quantidadeDeTimes,
      data_inicio: inicio,
      data_termino: termino,
      status: "ativo",
    };
    onSubmit(torneioData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
      <InputElement
        placeholder="Digite o Nome do Torneio"
        value={nome}
        onChange={(newValue) => setNome(newValue)}
        label="Nome do Torneio"
        withLabel={true}
      />

      <InputElement
        placeholder="Digite o Número de Jornadas"
        value={String(jornadasCount)}
        onChange={(newValue) => setJornadasCount(Number(newValue))}
        label="Número de Jornadas"
        withLabel={true}
        type="number"
      />

      <InputElement
        placeholder="Digite a Quantidade de Times"
        value={String(quantidadeDeTimes)}
        onChange={(newValue) => setQuantidadeDeTimes(Number(newValue))}
        label="Quantidade de Times"
        withLabel={true}
        type="number"
      />

      <InputElement
        placeholder="Data de Início"
        value={inicio}
        onChange={(newValue) => setInicio(newValue)}
        label="Data de Início"
        withLabel={true}
        type="date"
      />

      <InputElement
        placeholder="Data de Término"
        value={termino}
        onChange={(newValue) => setTermino(newValue)}
        label="Data de Término"
        withLabel={true}
        type="date"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 col-span-3 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
        Cadastrar Torneio
      </button>
    </form>
  );
};
