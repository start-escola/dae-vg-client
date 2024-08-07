import BackBtn from "./back-btn";

export const metadata = {
  title: "Licitações - DAE"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <section className="my-10">
      {children}
    </section>
  );
}
