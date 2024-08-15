import api from "@/utils/api"
import Image from "next/image";
import Link from "next/link";
import Filter from "./filter";

export const metadata = {
  title: "Licitações - DAE",
  description: "Acompanhe histórico de solicitações"
}
export type SearchParams = {
  year?: string,
  status?: string,
  tender_type?: string,
  text?: string
}

async function getPage(searchParams: SearchParams) {
  "use server"

  const params: { [key: string]: string | number } = {
    "fields[0]": "opening_date",
    "fields[1]": "realization",
    "pagination[limit]": "100"
  }

  if (searchParams.tender_type) {
    params["filters[tender_type][id]"] = searchParams.tender_type
  }

  if (searchParams.text) {
    params["filters[$or][0][title][$containsi]"] = searchParams.text
    params["filters[$or][1][process_number][$containsi]"] = searchParams.text
  }

  if (searchParams.year) {
    params["filters[$and][0][opening_date][$gte]"] = `${searchParams.year}-01-01`
    params["filters[$and][1][opening_date][$lte]"] = `${searchParams.year}-12-31`
  }

  if (searchParams.status) {
    params["filters[$and][2][last_status][name][$eq]"] = searchParams.status
  }

  let total = 1;
  let pageNum = 0;
  let filteredData: {
    id: number,
    attributes: {
      realization: string;
      opening_date: string
    }
  }[] = [];

  while (filteredData.length < total) {
    params["pagination[start]"] = pageNum * 100

    const { data: page } = await api.get<{
      data: {
        id: number,
        attributes: {
          opening_date: string
          realization: string
        }
      }[],
      meta: {
        pagination: {
          start: number,
          limit: number,
          total: number
        }
      }
    }>("/tenders", {
      params,
    })

    filteredData = [...filteredData, ...page.data]
    total = page.meta.pagination.total
    pageNum = pageNum + 1
  }

  const yearTracker: { [key: string]: boolean } = {};
  const uniqueYears: string[] = [];

  filteredData.forEach(item => {
    const year = item.attributes.opening_date?.split('-')[0] || item.attributes.realization.split("-")[0];
    if (!yearTracker[year]) {
      yearTracker[year] = true;
      if (!!year) {
        uniqueYears.push(year);
      }
    }
  });

  return { uniqueYears }
}

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { uniqueYears } = await getPage(searchParams)

  return (
    <>
      <section className="text-primary-500 border-b-2 border-primary-500 pb-5">
        <h1 className="font-semibold text-3xl mb-1">Licitações</h1>
        <p className="text-lg">Acompanhe histórico de solicitações</p>
      </section>
      <section className="mt-12">
        <Filter defaultValues={searchParams} />
        <ul className="flex gap-4 py-16">
          {uniqueYears.map((year) => (
            <li className="text-primary-500 shadow-md p-8 w-fit rounded" key={year}>
              <Link href={`licitacoes/${year}`
              } className="flex flex-col gap-2 items-center" >
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