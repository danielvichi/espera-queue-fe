'use client';
import { useAdminAuthenticationContext } from '~/app/_contexts/admin-authentication-provider';
import ClientDataSection from './components/client-data-section';
import OwnerDataSection from './components/owner-data-section';
import { AdminWithClientDtoRole } from '~/app/api/generated/model';
import UnityList from './components/unity-list';
import { useUnitiesDataContext } from '~/app/_contexts/unity-data-provider';

export default function AdminDashboard() {
  const { user } = useAdminAuthenticationContext();

  const { unitiesData } = useUnitiesDataContext();

  if (!user || !unitiesData) {
    return <div>Loading...</div>;
  }

  const isOwner = user.role === AdminWithClientDtoRole.CLIENT_OWNER;

  return (
    <div className="flex flex-col gap-8">
      <h1>Dashboard</h1>
      <ClientDataSection clientData={user.client} />

      {isOwner && <OwnerDataSection adminData={user} />}

      <UnityList unityList={unitiesData} />
    </div>
  );
}
