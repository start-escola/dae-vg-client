import Filter from "./filter";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="text-primary-500 pb-5">
      <div className="mb-8 border-b-2 border-primary-500 pb-5">
        <h1 className="font-semibold text-3xl mb-1">Controle Interno</h1>
        <p className="text-lg">Acesso rápido a todos os nossos documentos</p>
      </div>
      <div>
        {children}
      </div>
    </section>
  );
}
