export default function Page() {
  return (
    <>
      <section className="text-primary-500 border-b-2 border-primary-500 pb-5">
        <h1 className="font-semibold text-3xl mb-1">Licitações</h1>
        <p className="text-lg">Acompanhe histórico de solicitações</p>
      </section>
      <section className="mt-12">
        <div className="relative p-5 border-[#B5B5B5] border rounded">
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
        <ul className="py-16">

        </ul>
      </section>
    </>
  )
}