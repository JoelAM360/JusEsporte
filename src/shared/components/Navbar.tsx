import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Calendar, BarChart2, Trophy, LogOut, LogIn } from 'lucide-react';
import { useUsuarioLogado } from '../hooks';


export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); 
  
  const isActive = (path: string) => location.pathname === path;
  const { user, logout } = useUsuarioLogado();

  
  return (
    <nav className="bg-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="font-bold text-xl">
              JusEsporte
            </Link>

            <div className="flex space-x-4">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/dashboard")
                    ? "bg-indigo-800"
                    : "hover:bg-indigo-600"
                }`}>
                <Home size={18} />
                <span>Início</span>
              </Link>

              <Link
                to="/games"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/games") ? "bg-indigo-800" : "hover:bg-indigo-600"
                }`}>
                <Calendar size={18} />
                <span>Jogos</span>
              </Link>

              <Link
                to="/statistics"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/statistics")
                    ? "bg-indigo-800"
                    : "hover:bg-indigo-600"
                }`}>
                <BarChart2 size={18} />
                <span>Estatísticas</span>
              </Link>

              <Link
                to="/rankings"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/rankings")
                    ? "bg-indigo-800"
                    : "hover:bg-indigo-600"
                }`}>
                <Trophy size={18} />
                <span>Classificação</span>
              </Link>

              <Link
                to="/paineladmin"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/paineladmin")
                    ? "bg-indigo-800"
                    : "hover:bg-indigo-600"
                }`}>
                <Trophy size={18} />
                <span>Painel do Admin</span>
              </Link>
            </div>
          </div>

          {user ? (
            <button
              onClick={() => logout()}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600">
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600">
              <LogIn size={18} />
              <span>Entrar</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}