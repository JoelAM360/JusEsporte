import React, { useState } from 'react'
import { InputElement } from '../../components/InputElement';

interface IFormProps {
  value: string;
  onSubmit: (categoria: string) => void;
  loading: boolean;
}

export const FormCreatEdit: React.FC<IFormProps> = ({
  value,
  onSubmit,
  loading,
}: IFormProps) => {
  const [categoria, setCategoria] = useState(value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(categoria);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputElement
          placeholder="Digite o Nome da Categoria"
          value={categoria}
          onChange={(newValue: string) => setCategoria(newValue)}
          label="Nome da Categoria"
          withLabel={true}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md focus:outline-none ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}>
          {loading ? "Enviando..." : "Cadastrar Categoria"}
        </button>
      </form>
    </>
  );
};
