// cria mensagens personalizadas por área
export function gerarComunicacoes(ocorrencia) {
  const base = {
    cco: `Voo ${ocorrencia.voo} (${ocorrencia.origem}-${ocorrencia.destino}): Ocorrência de ${ocorrencia.tipo} reportada pela área de ${ocorrencia.area}. Impacto estimado na malha é de ${ocorrencia.impacto}.`,

    manutencao: `Atenção técnica para o voo ${ocorrencia.voo}. Status atual: ${ocorrencia.status}. Por favor, avaliem o impacto de ${ocorrencia.impacto} e atualizem o sistema.`,

    handling: `Aguardem orientações para o voo ${ocorrencia.voo}. Ocorrência de ${ocorrencia.tipo} pode gerar desvio de ${ocorrencia.impacto} no cronograma de solo.`,

    comercial: `O voo ${ocorrencia.voo} apresenta um possível impacto operacional de ${ocorrencia.impacto}. Acompanhar possíveis conexões afetadas.`,

    atendimento: `O voo ${ocorrencia.voo} pode apresentar alteração de ${ocorrencia.impacto}. Mantenham a calma e orientem os passageiros sobre atualizações iminentes.`,

    passageiro: `Seu voo está passando por uma verificação de rotina. Uma nova atualização será disponibilizada assim que possível. Pedimos desculpas pelo impacto de aproximadamente ${ocorrencia.impacto}.`
  };

  switch (ocorrencia.tipo) {
    case 'Manutenção':
      base.manutencao = `Inspeção preventiva registrada no voo ${ocorrencia.voo}. A equipe responsável deve atualizar o status após conclusão da avaliação técnica.`;

      base.passageiro = `Nosso time está realizando uma checagem técnica rápida na aeronave. O conforto e a segurança são nossas prioridades. Nova previsão em breve.`;
      break;

    case 'Clima':
      base.cco = `Voo ${ocorrencia.voo} enfrentando restrições climáticas. Impacto previsto: ${ocorrencia.impacto}. Monitorar evolução meteorológica continuamente.`;

      base.passageiro = `Devido às condições climáticas atuais, estamos ajustando nosso horário de forma preventiva para garantir uma viagem segura.`;
      break;

    case 'Embarque':
      base.atendimento = `Atenção portões do voo ${ocorrencia.voo}: segurem o fluxo de passageiros. Ajuste de ${ocorrencia.impacto} necessário antes da liberação.`;

      base.passageiro = `Estamos finalizando os preparativos para o seu embarque. Em instantes iniciaremos a chamada por zonas.`;
      break;

    default:
      break;
  }

  return base;
}

// cria atualizações após resolução
export function gerarAtualizacoesResolucao(ocorrencia) {
  return {
    cco: `A ocorrência do voo ${ocorrencia.voo} foi resolvida. O registro permanece disponível para consulta e acompanhamento histórico.`,

    manutencao: `A ocorrência do voo ${ocorrencia.voo} foi resolvida. Não há novas ações técnicas pendentes relacionadas a este registro.`,

    handling: `A ocorrência do voo ${ocorrencia.voo} foi resolvida. As operações de solo podem seguir conforme as orientações atualizadas.`,

    comercial: `A ocorrência do voo ${ocorrencia.voo} foi resolvida. Considere a situação normalizada para os acompanhamentos comerciais relacionados.`,

    atendimento: `A ocorrência do voo ${ocorrencia.voo} foi resolvida. Utilize esta atualização como referência nas orientações aos passageiros.`,

    passageiro: `A situação relacionada ao seu voo foi resolvida. Agradecemos pela compreensão.`
  };
}