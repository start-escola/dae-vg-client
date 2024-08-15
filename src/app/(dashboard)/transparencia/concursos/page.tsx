import { getPage } from "./action";
import Filter from "./filter";
import List from "./list";

export const metadata = {
  title: "Concursos - DAE",
  description: "Confira nossa lista de concursos abertos"
}

export type SearchParams = {
  publishedAt?: string,
  status?: string
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { data, total } = await getPage(0, searchParams)

  return (
    <>
      <section className="text-primary-500 border-b-2 border-primary-500 pb-5">
        <h1 className="font-semibold text-3xl mb-1">Concursos</h1>
        <p className="text-lg">Confira nossa lista de concursos abertos</p>
      </section>
      <Filter defaultValues={searchParams} />
      <p className="py-8 border-b-2 border-primary-500 text-primary-500"><strong>{data.length}</strong> Resultados encontrados</p>
      <List defaultValues={data} searchParams={searchParams} />
    </>
  );
}
