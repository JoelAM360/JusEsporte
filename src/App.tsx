
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {RouteNavegation} from './routes';
import {Navbar} from './shared/components/';
import { UsuarioLogadoProvider } from "./shared/context/";


function App() {

  return (
    <UsuarioLogadoProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ToastContainer autoClose={3000} />
        <RouteNavegation />
      </div>
    </UsuarioLogadoProvider>
  );
}

export default App;