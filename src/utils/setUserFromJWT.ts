import { jwtDecode } from "jwt-decode";
import type { Dispatch, SetStateAction } from "react";
import type { AdminWithClientDto } from "~/app/api/generated/model";

interface SetUserFromJWTArgs {
  jwt: string;
  setUser: Dispatch<SetStateAction<AdminWithClientDto | null>>;
}

export default function setUserFromJWT(args: SetUserFromJWTArgs) {
  const { jwt, setUser } = args;

  const decodedJwt: AdminWithClientDto = jwtDecode(jwt);
  setUser(decodedJwt ?? null);
}
