import { Trophy } from 'lucide-react';
import React from 'react'
import { LayoutDashboard } from '../Layout.Dashboard';
import { Link } from 'react-router-dom';

export const ListaDeTimes = () => {
const teams = [
  {
    position: 1,
    name: "Direito Civil FC",
    points: 25,
    games: 10,
    wins: 8,
    draws: 1,
    losses: 1,
    goalsFor: 24,
    goalsAgainst: 10,
  },
  {
    position: 2,
    name: "Penal United",
    points: 22,
    games: 10,
    wins: 7,
    draws: 1,
    losses: 2,
    goalsFor: 20,
    goalsAgainst: 12,
  },
  {
    position: 3,
    name: "Trabalhista City",
    points: 18,
    games: 10,
    wins: 5,
    draws: 3,
    losses: 2,
    goalsFor: 18,
    goalsAgainst: 15,
  },
  {
    position: 4,
    name: "Tributário Rangers",
    points: 15,
    games: 10,
    wins: 4,
    draws: 3,
    losses: 3,
    goalsFor: 16,
    goalsAgainst: 18,
  },
];

  return (
    <LayoutDashboard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Trophy className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Todos os Times</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pos
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teams.map((team) => (
                  <tr key={team.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {team.position}º
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {team.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-bold">
                      <Link
                        to={`/times/edit/${team.name}`}
                        className="bg-indigo-500 text-white px-4 py-1 rounded-md hover:bg-indigo-600 focus:outline-none">
                        Jogadores
                      </Link>
                      <Link
                        to={`/torneios/classificacao/${team.name}`}
                        className="bg-blue-500 text-white px-4 py-1 m-2 rounded-md hover:bg-blue-600 focus:outline-none">
                        Ver Detalhes
                      </Link>
                      <button
                        onClick={() => alert("")}
                        className="ml-2 bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 focus:outline-none">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </LayoutDashboard>
  );
}
