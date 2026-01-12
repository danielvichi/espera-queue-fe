'use client';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import ClientDataSection from './components/client-data-section';
import OwnerDataSection from './components/owner-data-section';
import { useClientDataContext } from '~/app/_contexts/client-data-provider';
import { AdminWithClientDtoRole } from '~/app/api/generated/model';

export default function AdminDashboard() {
  const { user } = useAdminAuthenticationContext();
  const { client, unitiesData } = useClientDataContext();

  if (!user || !client) {
    return <div>Loading...</div>;
  }

  const isOwner = user.role === AdminWithClientDtoRole.CLIENT_OWNER;

  return (
    <div className="flex flex-col gap-8">
      <h1>Dashboard</h1>
      <ClientDataSection clientData={client} />

      {isOwner && <OwnerDataSection adminData={user} />}
    </div>
  );
}
