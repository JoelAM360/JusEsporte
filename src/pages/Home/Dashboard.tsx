import { Calendar, Users, Trophy } from 'lucide-react';

export function Dashboard() {
  const nextGames = [
    { id: 1, date: '2024-03-20', homeTeam: 'Direito Civil FC', awayTeam: 'Penal United', time: '19:00' },
    { id: 2, date: '2024-03-22', homeTeam: 'Trabalhista City', awayTeam: 'Tributário Rangers', time: '20:30' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bem-vindo ao JusEsporte</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Próximos Jogos</h2>
            <Calendar className="text-indigo-600" />
          </div>
          <div className="space-y-4">
            {nextGames.map(game => (
              <div key={game.id} className="border-l-4 border-indigo-500 pl-4">
                <p className="font-medium">{game.homeTeam} vs {game.awayTeam}</p>
                <p className="text-sm text-gray-600">{game.date} - {game.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Artilheiros</h2>
            <Trophy className="text-indigo-600" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>João Silva</span>
              <span className="font-bold">12 gols</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Maria Santos</span>
              <span className="font-bold">10 gols</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pedro Costa</span>
              <span className="font-bold">8 gols</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Meu Time</h2>
            <Users className="text-indigo-600" />
          </div>
          <div className="space-y-2">
            <p className="font-medium">Direito Civil FC</p>
            <p className="text-sm text-gray-600">Próximo jogo: 20/03 - 19:00</p>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-600">Posição atual</p>
              <p className="text-2xl font-bold text-indigo-600">3º lugar</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Últimos Resultados</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1 text-right">Direito Civil FC</div>
            <div className="px-4 font-bold">2 - 1</div>
            <div className="flex-1">Penal United</div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1 text-right">Trabalhista City</div>
            <div className="px-4 font-bold">0 - 0</div>
            <div className="flex-1">Tributário Rangers</div>
          </div>
        </div>
      </div>
    </div>
  );
}