import React from 'react'

interface ICardPropsComponent {
    title: string;
    quantidade: string;
    estatisca: string;
}

export const CardElement = ({estatisca, quantidade, title}: ICardPropsComponent) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold">{quantidade}</p>
        <span className="text-green-500 text-sm">{estatisca}</span>
      </div>
    </>
  );
}
