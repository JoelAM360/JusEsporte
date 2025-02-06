import { Link } from "react-router-dom";
import {
  BarChart,
  Users,
  ShoppingBag,
  Package,
  Truck,
  Settings,
} from "lucide-react";

import { useUsuarioLogado } from "../../shared/hooks";

interface IProps {
  children: React.ReactNode;
}
export function LayoutDashboard({children} : IProps) {
  const { user } = useUsuarioLogado();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
            <span className="text-gray-400">
              {user?.nome} - {user?.tipo_de_user}
            </span>
          </div>
          <nav className="mt-4">
            <Link
              to="/paineladmin"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <BarChart className="h-5 w-5 mr-2" />
              Visão Geral
            </Link>
            <Link
              to="/jogadores"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Users className="h-5 w-5 mr-2" />
              Jogadores
            </Link>
            <Link
              to="/categorias/"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Categorias
            </Link>
            <Link
              to="/torneios"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Package className="h-5 w-5 mr-2" />
              Torneios
            </Link>
            <Link
              to="/partidas"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Truck className="h-5 w-5 mr-2" />
              Partidas
            </Link>
            <Link
              to="/times"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
              <Settings className="h-5 w-5 mr-2" />
              Times
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}
