import type { AdminWithClientDto } from '~/app/api/generated/model';

interface ClientDataSection {
  clientData: AdminWithClientDto['client'];
}

export default function ClientDataSection(props: ClientDataSection) {
  const { clientData } = props;

  return (
    <div>
      <h2>{clientData.name}</h2>
      <p>CNPJ: {clientData.cnpj ?? '-'}</p>
      <p>Address: {clientData.address ?? '-'}</p>
      <p>Phone: {clientData.phone ?? '-'}</p>
    </div>
  );
}
