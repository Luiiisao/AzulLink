import { ArrowRight, Clock, MapPin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import BadgeStatus from './badge-status';
import { formatarDataHora } from '../utils/formatadores';
import '../styles/dashboard.css';

// exibe resumo rápido do voo monitorado
export default function CartaoOcorrencia({ ocorrencia }) {
  return (
    <div className="cartao-ocorrencia">
      <div className="cartao-topo">
        <div>
          <div className="cartao-voo">{ocorrencia.voo}</div>
          <div className="cartao-rota">
            <MapPin size={14} />
            {ocorrencia.origem} <ArrowRight size={14} /> {ocorrencia.destino}
          </div>
        </div>
        <BadgeStatus status={ocorrencia.status} />
      </div>

      <div className="cartao-detalhes">
        <div className="cartao-linha">
          <AlertCircle size={16} className="icone-info" />
          <span>{ocorrencia.tipo} ({ocorrencia.area})</span>
        </div>
        <div className="cartao-linha">
          <Clock size={16} className="icone-info" />
          <span>Impacto: {ocorrencia.impacto}</span>
        </div>
        <div className="cartao-linha">
          <Clock size={16} className="icone-info" />
          <span>Atualizado: {formatarDataHora(ocorrencia.atualizadoEm)}</span>
        </div>
      </div>

      <Link to={`/ocorrencias/${ocorrencia.id}`} className="btn-secundario" style={{ textAlign: 'center' }}>
        Ver detalhes
      </Link>
    </div>
  );
}