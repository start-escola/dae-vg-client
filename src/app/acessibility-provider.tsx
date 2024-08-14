"use client";

import { createContext, useContext } from "react";

export const AcessibilityContext = createContext({
  modifier: 0,
});

export default function AcessibilityProvider({
  children,
  provider,
}: {
  children: React.ReactNode;
  provider: {
    modifier: number;
  };
}) {
  return (
    <AcessibilityContext.Provider value={provider}>
      {children}
    </AcessibilityContext.Provider>
  );
}

export const useAcessibility = () => useContext(AcessibilityContext);
