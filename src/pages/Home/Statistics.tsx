import { BarChart2, TrendingUp, Users } from 'lucide-react';

export function Statistics() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Estatísticas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Artilharia</h2>
            <TrendingUp className="text-indigo-600" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>1. João Silva</span>
              <span className="font-bold">12 gols</span>
            </div>
            <div className="flex justify-between items-center">
              <span>2. Maria Santos</span>
              <span className="font-bold">10 gols</span>
            </div>
            <div className="flex justify-between items-center">
              <span>3. Pedro Costa</span>
              <span className="font-bold">8 gols</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Média de Gols</h2>
            <BarChart2 className="text-indigo-600" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Direito Civil FC</span>
              <span className="font-bold">2.5</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Penal United</span>
              <span className="font-bold">2.1</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Trabalhista City</span>
              <span className="font-bold">1.8</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Jogadores</h2>
            <Users className="text-indigo-600" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Total de Jogadores</span>
              <span className="font-bold">120</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Times</span>
              <span className="font-bold">8</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Média por Time</span>
              <span className="font-bold">15</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Desempenho por Time</h2>
          <div className="space-y-4">
            {['Direito Civil FC', 'Penal United', 'Trabalhista City', 'Tributário Rangers'].map((team) => (
              <div key={team} className="space-y-2">
                <div className="flex justify-between">
                  <span>{team}</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Últimas Partidas</h2>
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
    </div>
  );
}