import { ocorrenciasIniciais } from '../data/ocorrencias-iniciais';

const CHAVE_ARMAZENAMENTO = 'azullink_ocorrencias';

// carrega ocorrências salvas no navegador
export function obterOcorrencias() {
  try {
    const dados = localStorage.getItem(CHAVE_ARMAZENAMENTO);

    if (dados) {
      const ocorrencias = JSON.parse(dados);

      if (Array.isArray(ocorrencias)) {
        return ocorrencias;
      }
    }
  } catch (erro) {
    console.error('erro ao carregar ocorrências:', erro);
  }

  salvarOcorrencias(ocorrenciasIniciais);

  return ocorrenciasIniciais;
}

// grava ocorrências na memória local
export function salvarOcorrencias(ocorrencias) {
  localStorage.setItem(
    CHAVE_ARMAZENAMENTO,
    JSON.stringify(ocorrencias)
  );
}

// insere registro inédito e atualiza memória
export function adicionarOcorrencia(novaOcorrencia) {
  const ocorrencias = obterOcorrencias();

  ocorrencias.unshift(novaOcorrencia);

  salvarOcorrencias(ocorrencias);
}

// localiza registro específico pelo identificador
export function buscarOcorrenciaPorId(id) {
  const ocorrencias = obterOcorrencias();

  return ocorrencias.find(
    ocorrencia => ocorrencia.id === id
  );
}

// encerra ocorrência e atualiza registro
export function encerrarOcorrencia(id) {
  const ocorrencias = obterOcorrencias();
  const atualizadoEm = new Date().toISOString();

  let ocorrenciaAtualizada = null;

  const ocorrenciasAtualizadas = ocorrencias.map(ocorrencia => {
    if (ocorrencia.id !== id) {
      return ocorrencia;
    }

    ocorrenciaAtualizada = {
      ...ocorrencia,
      status: 'Resolvido',
      atualizadoEm
    };

    return ocorrenciaAtualizada;
  });

  salvarOcorrencias(ocorrenciasAtualizadas);

  return ocorrenciaAtualizada;
}