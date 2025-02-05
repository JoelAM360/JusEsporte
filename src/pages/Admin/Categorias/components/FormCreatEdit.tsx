import React, { useState } from 'react'
import { InputElement } from '../../components/InputElement';

interface IFormProps {
    value:string
}

export const FormCreatEdit: React.FC<IFormProps> = ({ value }: IFormProps) => {
  const [categoria, setCategoria] = useState(value);
    
  return (
    <>
      <form onSubmit={() => alert()} className="space-y-4">
        <InputElement
          placeholder="Digite o Nome da Categoria"
          value={categoria}
          onChange={(newValue:string) => setCategoria(newValue)}
          label="Nome da Categoria"
          withLabel={true}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Cadastrar Categoria
        </button>
      </form>
    </>
  );
};
