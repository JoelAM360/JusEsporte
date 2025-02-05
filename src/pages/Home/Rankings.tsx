import { Trophy } from 'lucide-react';

export function Rankings() {
  const teams = [
    { position: 1, name: 'Direito Civil FC', points: 25, games: 10, wins: 8, draws: 1, losses: 1, goalsFor: 24, goalsAgainst: 10 },
    { position: 2, name: 'Penal United', points: 22, games: 10, wins: 7, draws: 1, losses: 2, goalsFor: 20, goalsAgainst: 12 },
    { position: 3, name: 'Trabalhista City', points: 18, games: 10, wins: 5, draws: 3, losses: 2, goalsFor: 18, goalsAgainst: 15 },
    { position: 4, name: 'Tributário Rangers', points: 15, games: 10, wins: 4, draws: 3, losses: 3, goalsFor: 16, goalsAgainst: 18 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Trophy className="h-8 w-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-900">Classificação</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pos
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  J
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  V
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  D
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GP
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GC
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SG
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
                    {team.points}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {team.games}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {team.wins}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {team.draws}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {team.losses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {team.goalsFor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {team.goalsAgainst}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {team.goalsFor - team.goalsAgainst}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Artilheiros</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-lg font-medium">1.</span>
                <span className="ml-4">João Silva</span>
                <span className="ml-2 text-gray-500">(Direito Civil FC)</span>
              </div>
              <span className="font-bold">12 gols</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-lg font-medium">2.</span>
                <span className="ml-4">Maria Santos</span>
                <span className="ml-2 text-gray-500">(Penal United)</span>
              </div>
              <span className="font-bold">10 gols</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-lg font-medium">3.</span>
                <span className="ml-4">Pedro Costa</span>
                <span className="ml-2 text-gray-500">(Trabalhista City)</span>
              </div>
              <span className="font-bold">8 gols</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Legenda</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>P</strong> - Pontos</p>
              <p><strong>J</strong> - Jogos</p>
              <p><strong>V</strong> - Vitórias</p>
              <p><strong>E</strong> - Empates</p>
              <p><strong>D</strong> - Derrotas</p>
            </div>
            <div>
              <p><strong>GP</strong> - Gols Pró</p>
              <p><strong>GC</strong> - Gols Contra</p>
              <p><strong>SG</strong> - Saldo de Gols</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}