import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Dashboard from './pages/dashboard';
import NovaOcorrencia from './pages/nova-ocorrencia';
import DetalhesOcorrencia from './pages/detalhes-ocorrencia';

// gerencia rotas principais da aplicação
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nova-ocorrencia" element={<NovaOcorrencia />} />
        <Route path="/ocorrencias/:id" element={<DetalhesOcorrencia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;