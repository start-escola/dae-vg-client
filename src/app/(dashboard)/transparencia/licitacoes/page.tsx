import InfoComponent from "@/components/InfoComponent";
import api from "@/utils/api"
import Image from "next/image";
import Link from "next/link";

async function getPage() {
  "use server"

  const { data: page } = await api.get<{
    data: {
      id: number,
      attributes: {
        opening_date: string
      }
    }[]
  }>("/tenders?fields[0]=opening_date")

  const yearTracker: { [key: string]: boolean } = {};
  const uniqueYears: string[] = [];

  page.data.forEach(item => {
    const year = item.attributes.opening_date.split('-')[0];
    if (!yearTracker[year]) {
      yearTracker[year] = true;
      uniqueYears.push(year);
    }
  });

  return uniqueYears
}

export default async function Page() {
  const data = await getPage()

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
          {data.map((year) => (
            <li className="text-primary-500 shadow-md p-8 w-fit rounded" key={year}>
              <Link href={`licitacoes/${year}`} className="flex flex-col gap-2 items-center">
                <Image src="/calendar.svg" alt="calendario" width={32} height={32} />
                <div className="text-center">
                  <p>Ano</p>
                  <p className="font-bold">{year}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}