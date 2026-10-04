import '../styles/dashboard.css';

// formata estado visual da ocorrência
export default function BadgeStatus({ status }) {
  let classeStatus = 'badge-analise';
  
  if (status === 'Monitoramento') classeStatus = 'badge-monitoramento';
  if (status === 'Resolvido') classeStatus = 'badge-resolvido';

  return (
    <span className={`badge ${classeStatus}`}>
      {status}
    </span>
  );
}