import Header from "./header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="relative p-5 border-[#B5B5B5] border rounded mt-10">
        <p className="text-primary-500 text-xl font-bold absolute top-0 -translate-y-1/2 bg-white-0 px-2">Filtrar por</p>
        <ul className="flex flex-wrap gap-12">
          <li>
            <p className="text-base mb-2 text-primary-500">Ano</p>
            <div className="w-36 h-10 rounded bg-white-0 shadow" />
          </li>
          <li>
            <p className="text-base mb-2 text-primary-500">Status</p>
            <div className="w-36 h-10 rounded bg-white-0 shadow" />
          </li>
          <li>
            <p className="text-base mb-2 text-primary-500">Modalidade</p>
            <div className="w-36 h-10 rounded bg-white-0 shadow" />
          </li>
          <li>
            <p className="text-base mb-2 text-primary-500">Pesquisar</p>
            <div className="w-36 h-10 rounded bg-white-0 shadow" />
          </li>
        </ul>
      </div>
      <section className="mt-12">
        {children}
      </section>
    </>
  );
}
