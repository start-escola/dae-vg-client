"use client";

import { createContext, useContext } from "react";

export interface ISessionContextLoading {
  status: "loading";
  user: null;
  jwt: null;
}

export interface ISessionContextAuthenticated {
  status: "authenticated";
  user: {
    id: number,
    username: string,
    email: string,
    provider: 'local',
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string,
    cpf: string
  };
  jwt: string;
}

export interface ISessionContextUnauthenticated {
  status: "unauthenticated";
  user: null;
  jwt: null;
}

export const SessionContext = createContext(
  {} as
  | ISessionContextAuthenticated
  | ISessionContextLoading
  | ISessionContextUnauthenticated
);

export default function SessionProvider({
  children,
  provider,
}: {
  children: React.ReactNode;
  provider:
  | ISessionContextAuthenticated
  | ISessionContextLoading
  | ISessionContextUnauthenticated;
}) {
  return (
    <SessionContext.Provider value={provider}>{children}</SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);