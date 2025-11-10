"use client";
import { useClientControllerCreateClientAndSignin } from "../api/generated/client";
import { useClientControllerGetClientById } from "../api/generated/client/client";

export function Clients() {
  const { data, trigger } = useClientControllerCreateClientAndSignin();

  const { data: queueData } = useClientControllerGetClientById({
    clientId: "id",
  });

  async function getClientId() {
    return await trigger({
      name: "",
      ownerId: "",
      address: "",
      cnpj: "",
      phone: "",
    });
  }

  void getClientId();

  return (
    <div className="w-full max-w-xs">
      <h1> CLIENTS </h1>
      {queueData?.data.name}
    </div>
  );
}
