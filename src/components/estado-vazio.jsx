import { SearchX } from 'lucide-react';
import '../styles/dashboard.css';

// exibe interface quando não houver dados
export default function EstadoVazio() {
  return (
    <div className="estado-vazio">
      <SearchX size={48} color="#D7E2EF" style={{ marginBottom: '1rem' }} />
      <h3>Nenhuma ocorrência encontrada</h3>
      <p>Tente alterar os filtros selecionados.</p>
    </div>
  );
}