import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DAE",
  description: "O Departamento de Água e Esgoto de Várzea Grande (DAE-VG) foi criado em 5 de junho de 1997, conforme Lei Municipal nº 1.733 e alterado em 08 de abril de 1998, conforme Lei Municipal nº 1.866 para atender à comunidade em saneamento básico de qualidade.",
};

import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import SessionProvider from "./session-provider";
import { getSession } from "@/utils/session";
import api from "@/utils/api"

SwiperCore.use([Navigation])

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()

  api.defaults.headers.common.Authorization = session && `Bearer ${session.jwt}`

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider provider={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
