import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Info } from 'lucide-react';
import BadgeStatus from '../components/badge-status';
import { buscarOcorrenciaPorId, encerrarOcorrencia } from '../utils/armazenamento';
import { gerarComunicacoes, gerarAtualizacoesResolucao } from '../utils/gerar-comunicacoes';
import { formatarDataHora } from '../utils/formatadores';
import '../styles/detalhes.css';

// estrutura visual das comunicações por setor
export default function DetalhesOcorrencia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ocorrencia, setOcorrencia] = useState( () => buscarOcorrenciaPorId(id) );

  const comunicacoes = ocorrencia
  ? gerarComunicacoes(ocorrencia)
  : {};

  const atualizacoesResolucao = ocorrencia?.status === 'Resolvido'
  ? gerarAtualizacoesResolucao(ocorrencia)
  : {};

const [abaAtiva, setAbaAtiva] = useState('cco');

// confirma encerramento da ocorrência atual
const handleEncerrarOcorrencia = () => {
  const confirmar = window.confirm(
    'Deseja realmente encerrar esta ocorrência?'
  );

  if (!confirmar) {
    return;
  }

  const ocorrenciaAtualizada = encerrarOcorrencia(id);

  if (ocorrenciaAtualizada) {
    setOcorrencia(ocorrenciaAtualizada);
  }
};

  if (!ocorrencia) {
    return (
      <div className="container-padrao" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Ocorrência não encontrada</h2>
        <p style={{ color: '#667085', margin: '1rem 0' }}>A ocorrência solicitada não existe ou foi removida.</p>
        <button className="btn-primario" onClick={() => navigate('/')}>Voltar ao painel</button>
      </div>
    );
  }

  const abas = [
    { id: 'cco', label: 'CCO' },
    { id: 'manutencao', label: 'Manutenção' },
    { id: 'handling', label: 'Handling' },
    { id: 'comercial', label: 'Comercial' },
    { id: 'atendimento', label: 'Atendimento' },
    { id: 'passageiro', label: 'Passageiro' }
  ];

  return (
    <div className="container-padrao">
      <button className="btn-voltar" onClick={() => navigate('/')}>
        <ArrowLeft size={20} /> Voltar
      </button>

  <div className="detalhes-header">
    <div className="detalhes-topo-info">
        <div>
          <h1 className="detalhes-voo">{ocorrencia.voo}</h1>

            <div className="detalhes-rota">
             {ocorrencia.origem}
             <ArrowRight size={20} />
             {ocorrencia.destino}
           </div>
        </div>

        <div className="detalhes-acoes">
          <BadgeStatus status={ocorrencia.status} />

          {ocorrencia.status !== 'Resolvido' && (
             <button
              className="btn-encerrar"
              onClick={handleEncerrarOcorrencia}
            >
              <CheckCircle size={18} />
              Encerrar ocorrência
            </button>
        )}
    </div>
  </div>
</div>

      <div className="detalhes-resumo-grid">
        <div className="resumo-item">
          <div className="resumo-label">Área responsável</div>
          <div className="resumo-valor">{ocorrencia.area}</div>
        </div>
        <div className="resumo-item">
          <div className="resumo-label">Tipo</div>
          <div className="resumo-valor">{ocorrencia.tipo}</div>
        </div>
        <div className="resumo-item">
          <div className="resumo-label">Impacto estimado</div>
          <div className="resumo-valor">{ocorrencia.impacto}</div>
        </div>
        <div className="resumo-item">
          <div className="resumo-label">Última atualização</div>
          <div className="resumo-valor">{formatarDataHora(ocorrencia.atualizadoEm)}</div>
        </div>
      </div>

      <div className="resumo-item" style={{ marginBottom: '2rem' }}>
        <div className="resumo-label">Descrição original</div>
        <div className="resumo-valor" style={{ fontWeight: 400, marginTop: '0.5rem' }}>
          {ocorrencia.descricao}
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem', color: '#041E42' }}>Comunicação por área</h3>
      
      <div className="secao-comunicacao">
        <div className="abas-container">
          {abas.map(aba => (
            <button
              key={aba.id}
              className={`aba-btn ${abaAtiva === aba.id ? 'ativa' : ''} ${aba.id === 'passageiro' ? 'destaque' : ''}`}
              onClick={() => setAbaAtiva(aba.id)}
            >
              {aba.label}
            </button>
          ))}
        </div>
        <div className="conteudo-comunicacao">
          <div className="aviso-direcionamento">
            <Info size={16} /> Visão destinada a: {abas.find(a => a.id === abaAtiva)?.label}
          </div>
          <div className="mensagem-contextualizada">
            {comunicacoes[abaAtiva]}
          </div>
          {ocorrencia.status === 'Resolvido' && (
            <div className="atualizacao-resolvida">
             <CheckCircle size={20} />

           <div>
           <strong>Ocorrência resolvida</strong>

        <p>
        {atualizacoesResolucao[abaAtiva]}
        </p>
    </div>
  </div>
)}
          <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: '#667085', textAlign: 'right' }}>
            Informações centralizadas, contextos adequados.
          </p>
        </div>
      </div>
    </div>
  );
}