import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adicionarOcorrencia } from '../utils/armazenamento';
import '../styles/formulario.css';

// controla formulário de criação de registro
export default function NovaOcorrencia() {
  const navigate = useNavigate();
  const [dados, setDados] = useState({
    voo: '', origem: '', destino: '', area: 'CCO',
    tipo: 'Manutenção', impacto: '', status: 'Em análise', descricao: ''
  });

  // atualiza variáveis de estado do formulário
  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  // salva formulário e direciona para detalhes
  const handleSubmit = (e) => {
    e.preventDefault();
    const novaOc = {
      ...dados,
      id: Date.now().toString(),
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    };
    adicionarOcorrencia(novaOc);
    navigate(`/ocorrencias/${novaOc.id}`);
  };

  return (
    <div className="container-padrao">
      <form className="formulario-card" onSubmit={handleSubmit}>
        <h2 className="form-grupo-titulo">Informações do voo</h2>
        <div className="form-linha">
          <div className="form-campo">
            <label className="form-label">Número do voo</label>
            <input required type="text" name="voo" className="form-input" placeholder="Ex: AD4321" value={dados.voo} onChange={handleChange} />
          </div>
          <div className="form-linha" style={{ marginBottom: 0 }}>
            <div className="form-campo">
              <label className="form-label">Origem</label>
              <input required type="text" name="origem" className="form-input" placeholder="Ex: SDU" value={dados.origem} onChange={handleChange} />
            </div>
            <div className="form-campo">
              <label className="form-label">Destino</label>
              <input required type="text" name="destino" className="form-input" placeholder="Ex: VCP" value={dados.destino} onChange={handleChange} />
            </div>
          </div>
        </div>

        <h2 className="form-grupo-titulo">Informações da ocorrência</h2>
        <div className="form-linha">
          <div className="form-campo">
            <label className="form-label">Área responsável</label>
            <select name="area" className="form-select" value={dados.area} onChange={handleChange}>
              <option>CCO</option>
              <option>Manutenção</option>
              <option>Handling</option>
              <option>Comercial</option>
              <option>Atendimento</option>
            </select>
          </div>
          <div className="form-campo">
            <label className="form-label">Tipo da ocorrência</label>
            <select name="tipo" className="form-select" value={dados.tipo} onChange={handleChange}>
              <option>Manutenção</option>
              <option>Clima</option>
              <option>Embarque</option>
              <option>Operacional</option>
              <option>Atendimento</option>
              <option>Outro</option>
            </select>
          </div>
        </div>

        <div className="form-linha">
          <div className="form-campo">
            <label className="form-label" htmlFor="status">
             Status
            </label>

            <select
            id="status"
            name="status"
            className="form-select"
            value={dados.status}
            onChange={handleChange}
            >
               <option>Em análise</option>
               <option>Monitoramento</option>
               <option>Resolvido</option>
            </select>

             {dados.status === 'Resolvido' && (
               <p className="form-ajuda-resolvido">
               Use esta opção para ocorrências já solucionadas que precisam apenas ser registradas.
               </p>
          )}
          </div>
          <div className="form-campo">
            <label className="form-label" htmlFor="impacto">
            Impacto estimado
            </label>

            <input
            required
            id="impacto"
            type="text"
            name="impacto"
            className="form-input"
            placeholder="Ex: 25 minutos"
            value={dados.impacto}
            onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-campo">
          <label className="form-label">Descrição</label>
          <textarea required name="descricao" className="form-textarea" placeholder="Descreva os detalhes iniciais..." value={dados.descricao} onChange={handleChange}></textarea>
        </div>

        <div className="form-acoes">
          <button type="button" className="btn-secundario" onClick={() => navigate('/')}>Cancelar</button>
          <button type="submit" className="btn-primario">Registrar ocorrência</button>
        </div>
      </form>
    </div>
  );
}