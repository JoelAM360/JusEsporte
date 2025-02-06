import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  AdminDashboard,
  Games,
  Login,
  Rankings,
  Register,
  Statistics,
  ConfirmaCode,
  Classificacao,
  CreateCategoria,
  CreateTimes,
  CreateTorneio,
  EditCategoria,
  EditTimes,
  EditTorneio,
  FormCreatePartida,
  ListPartidas,
  ListaDeJogadores,
  ListaDeTimes,
  TabelaTorneio,
  TabelaCategorias,
} from "../pages/";
import { useUsuarioLogado } from "../shared/hooks";
import { useEffect, useState } from "react";

export function RouteNavegation() {
  const { user } = useUsuarioLogado();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirmarcodigo" element={<ConfirmaCode />} />
      {/* Rotas Protegidas */}
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/rankings" element={<Rankings />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
      <Route path="/paineladmin" element={<AdminDashboard />} />
      <Route path="/categorias/" element={<TabelaCategorias />} />
      <Route path="/categorias/create" element={<CreateCategoria />} />
      <Route path="/categorias/edit/:id" element={<EditCategoria />} />
      <Route path="/torneios/" element={<TabelaTorneio />} />
      <Route path="/torneios/create" element={<CreateTorneio />} />
      <Route path="/torneios/edit/:id" element={<EditTorneio />} />
      <Route path="/torneios/classificacao/:id" element={<Classificacao />} />
      <Route path="/times/" element={<ListaDeTimes />} />
      <Route path="/times/create" element={<CreateTimes />} />
      <Route path="/times/edit/:id" element={<EditTimes />} />
      <Route path="/jogadores/" element={<ListaDeJogadores />} />
      <Route path="/partidas" element={<ListPartidas partidas={[]} />} />
      <Route path="/partidas/criar" element={<FormCreatePartida />} />
    </Routes>
  );
}
