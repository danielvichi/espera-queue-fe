import type { AdminWithClientDto } from '~/app/api/generated/model';

interface OwnerDataSection {
  adminData: AdminWithClientDto;
}

export default function OwnerDataSection(props: OwnerDataSection) {
  const { adminData } = props;

  return (
    <div>
      <h2>Owner: {adminData.name}</h2>
      <p>Email: {adminData.email ?? '-'}</p>

      {/* TODO */}
      {/* Change password */}
    </div>
  );
}
