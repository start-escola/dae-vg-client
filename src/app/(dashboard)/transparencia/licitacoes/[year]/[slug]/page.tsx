import Link from "next/link";
import { getPage } from "./action";
import List from "./list";
import Filter from "./filter";

export default async function Page({ params }: { params: { year: string, slug: string }}) {
  const { data, pageTitle, resultsFound } = await getPage(params.year, params.slug, 0)

  return (
    <section className="text-primary-500">
      <section className="text-primary-500 border-b-2 border-primary-500 pb-5">
        <h1 className="font-semibold text-3xl mb-1">Licitações</h1>
        <div className="flex gap-[0.5ch]">
          <Link href={`/transparencia/licitacoes/${params.year}`} className="text-lg">{params.year}</Link>
          <p>/</p>
          <p className="text-lg">{pageTitle}</p>
        </div>
      </section>
      <section className="mt-12">
        <Filter defaultValues={params} />
        <p className="py-8 border-b-2 border-primary-500"><strong>{resultsFound}</strong> Resultados encontrados</p>
        <List defaultValues={data} searchParams={{ year: params.year, tender_type: params.slug }} />
      </section>
    </section>
  )
}