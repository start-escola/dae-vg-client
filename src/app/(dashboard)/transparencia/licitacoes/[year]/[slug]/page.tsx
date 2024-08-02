import InfoComponent from "@/components/InfoComponent";
import api from "@/utils/api"
import Image from "next/image";
import Link from "next/link";
import { normalizeFileUrl } from "@/utils/normalize"

async function getPage(year: string, tender_type: string) {
  "use server"

  const { data: page } = await api.get<{
    data: {
      id: number,
      attributes: {
        title: string, opening_date: string, description: string, closing_date: string, process_number: string, files: { data: { id: number, attributes: { name: string, url: string } }[] },
        status: {
          id: number,
          date: string,
          name: string,
        }[],
        tender_type: {
          data: {
            attributes: {
              name: string
            }
          }
        }
      }
    }[]
  }>(
    `/tenders?filters[$and][0][opening_date][$gte]=${year}-01-01&filters[$and][1][opening_date][$lte]=${year}-12-31&filters[$and][2][tender_type][slug][$eq]=${tender_type}&populate=*`
  )

  return page.data.map(({ id, attributes: { title, opening_date, description, closing_date, process_number, files, status, tender_type: { data: { attributes: { name } } } } }) => ({
    id,
    title,
    opening_date,
    description,
    closing_date,
    process_number,
    tender_type: name,
    files: files.data.map(({ id, attributes: { name, url } }) => ({
      id,
      name,
      file: normalizeFileUrl(url)
    })),
    last_update: status.reduce((latest, status) => {
      return new Date(status.date) > new Date(latest.date) ? status : latest;
    })
  }))
}

export default async function Page({ params }: { params: { year: string, slug: string } }) {
  const data = await getPage(params.year, params.slug)

  console.log(data)

  return (
    <section className="py-10 text-primary-500">
      <section className="text-primary-500 border-b-2 border-primary-500 pb-5">
        <h1 className="font-semibold text-3xl mb-1">Licitações</h1>
        <p className="text-lg">{params.year}</p>
        <p className="text-lg">{params.slug}</p>
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
        <p className="py-8 border-b-2 border-primary-500"><strong></strong> Resultados encontrados</p>
        <ul className="py-5">
          {data.map(({ id, ...rest }) => (
            <li key={id}>
              <InfoComponent {...rest} />
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}