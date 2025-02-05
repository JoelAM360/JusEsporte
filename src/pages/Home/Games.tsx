import { Calendar } from 'lucide-react';

export function Games() {
  const games = [
    {
      id: 1,
      date: '2024-03-20',
      time: '19:00',
      homeTeam: 'Direito Civil FC',
      awayTeam: 'Penal United',
      tournament: 'Liga dos Advogados',
      location: 'Arena Jurídica',
    },
    // Add more games
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendário de Jogos</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Calendar size={20} />
          <span>Filtrar por Data</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-gray-700">
          <div>Data</div>
          <div>Horário</div>
          <div className="col-span-2">Partida</div>
          <div>Torneio</div>
          <div>Local</div>
        </div>

        <div className="divide-y divide-gray-200">
          {games.map((game) => (
            <div key={game.id} className="grid grid-cols-6 gap-4 p-4 hover:bg-gray-50">
              <div className="text-gray-600">{game.date}</div>
              <div className="text-gray-600">{game.time}</div>
              <div className="col-span-2 font-medium">
                {game.homeTeam} vs {game.awayTeam}
              </div>
              <div className="text-gray-600">{game.tournament}</div>
              <div className="text-gray-600">{game.location}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}