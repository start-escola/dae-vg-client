import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import api from "@/utils/api"
import { AguaESgotoResponse } from "@/interfaces/request";
import { normalizeFileUrl } from "@/utils/normalize";
import { getDistricts, getFirstAndLastWSRDate, getTodaySectors } from "@/utils/requests";
import TableWSR from "@/components/TableWSR";

export const metadata = {
  title: "DISTRIBUIÇÃO",
  description: ""
}

async function getPage(date: string) {
  "use server"
  const { data: page } = await api.get<AguaESgotoResponse>("/agua-e-esgoto?populate=*")
  const { attributes } = page.data

  const firstAndLastDate = await getFirstAndLastWSRDate()

  const today = new Date();
  let searchedDate = today.toISOString().split("T")[0];
  const lastWSRDate = new Date(firstAndLastDate.lastWSRDate || firstAndLastDate.firstWSRDate);
  if (lastWSRDate.getTime()) {
    searchedDate = (today < lastWSRDate ? today : lastWSRDate).toISOString().split("T")[0];
  }

  if (date) {
    searchedDate = new Date(date).toISOString().split("T")[0]
  }

  let sectors = await getTodaySectors(searchedDate)

  const districts = await getDistricts()

  return {
    ...attributes,
    mapa: attributes.mapa.data?.attributes?.url ? normalizeFileUrl(page.data.attributes.mapa.data?.attributes.url) : null,
    relacao_etes: attributes.relacao_etes.data?.attributes?.url ? normalizeFileUrl(attributes.relacao_etes.data.attributes.url) : null,
    sectors,
    districts,
    firstAndLastDate,
    searchedDate
  }
}

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const { date, districtId } = await searchParams;
  const { agua, esgoto, mapa, relacao_etes, sectors, districts, firstAndLastDate, searchedDate } = await getPage(date)

  const formmatedTableData = sectors?.map(({ id, last_status, name, turno }) => ({
    id,
    location: name,
    turn: turno,
    status: {
      date: last_status.createdAt,
      situation: last_status.situation
    },
    description: last_status.description ?? ""
  }))

  return (
    <>
      <section className="w-full">
        {
          agua && (
            <PageTitle
              title="Água"
              description={agua}
            />
          )
        }
        {
          formmatedTableData ? (
            // eslint-disable-next-line @next/next/no-img-element
            <>
              <TableWSR
                defaultValues={formmatedTableData}
                select={{ options: districts, defaultValue: districts?.find(({ id }) => id === Number(districtId)) }}
                date={searchedDate}
                firstAndLastDate={firstAndLastDate}
              />
            </>
          ) : (
            <div className="mt-4 text-center text-primary-500">Ainda não há dados disponíveis para esta data.</div>
          )
        }
      </section>
      <section>
        {
          esgoto && (
            <PageTitle
              title="Esgoto"
              description={esgoto}
            />
          )
        }
        {
          relacao_etes && (
            <div className="mt-8">
              <Link href={relacao_etes} className="px-4 py-2 bg-primary-500 text-white-0 dark:bg-[#0D0D0D] dark:text-white-0 rounded">Relação das Etes MP</Link>
            </div>
          )
        }
      </section>
    </>
  )
}