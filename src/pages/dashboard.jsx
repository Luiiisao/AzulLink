import { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, Radio } from 'lucide-react';
import CartaoOcorrencia from '../components/cartao-ocorrencia';
import EstadoVazio from '../components/estado-vazio';
import { obterOcorrencias } from '../utils/armazenamento';
import '../styles/dashboard.css';

// organiza painel principal de informações operacionais
export default function Dashboard() {
  const [ocorrencias] = useState(() => obterOcorrencias());
  const [filtroArea, setFiltroArea] = useState('Todas');

  const areas = ['Todas', 'CCO', 'Manutenção', 'Handling', 'Comercial', 'Atendimento'];

  const ocorrenciasFiltradas = filtroArea === 'Todas' 
    ? ocorrencias 
    : ocorrencias.filter(o => o.area === filtroArea);

  const ativas = ocorrencias.filter(o => o.status !== 'Resolvido').length;
  const emAnalise = ocorrencias.filter(o => o.status === 'Em análise').length;
  const resolvidas = ocorrencias.filter(o => o.status === 'Resolvido').length;

  return (
    <div className="container-padrao">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-titulo">Operação em tempo real</h1>
          <p className="dashboard-descricao">Acompanhe e centralize ocorrências operacionais.</p>
        </div>
      </div>

      <div className="metricas-grid">
        <div className="metrica-card">
          <div className="metrica-icone-area"><Activity size={24} /></div>
          <div>
            <div className="metrica-valor">{ativas}</div>
            <div className="metrica-label">Ocorrências ativas</div>
          </div>
        </div>
        <div className="metrica-card">
          <div className="metrica-icone-area"><AlertTriangle size={24} /></div>
          <div>
            <div className="metrica-valor">{emAnalise}</div>
            <div className="metrica-label">Em análise</div>
          </div>
        </div>
        <div className="metrica-card">
          <div className="metrica-icone-area"><CheckCircle size={24} /></div>
          <div>
            <div className="metrica-valor">{resolvidas}</div>
            <div className="metrica-label">Resolvidas</div>
          </div>
        </div>
        <div className="metrica-card">
          <div className="metrica-icone-area"><Radio size={24} /></div>
          <div>
            <div className="metrica-valor">{ocorrencias.length}</div>
            <div className="metrica-label">Voos monitorados</div>
          </div>
        </div>
      </div>

      <div className="filtros-area">
        {areas.map(area => (
          <button
            key={area}
            className={`filtro-btn ${filtroArea === area ? 'ativo' : ''}`}
            onClick={() => setFiltroArea(area)}
          >
            {area}
          </button>
        ))}
      </div>

      {ocorrenciasFiltradas.length > 0 ? (
        <div className="ocorrencias-grid">
          {ocorrenciasFiltradas.map(oc => (
            <CartaoOcorrencia key={oc.id} ocorrencia={oc} />
          ))}
        </div>
      ) : (
        <EstadoVazio />
      )}
    </div>
  );
}