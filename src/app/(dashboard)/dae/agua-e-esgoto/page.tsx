import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import api from "@/utils/api"
import { AguaESgotoResponse } from "@/interfaces/request";
import { normalizeFileUrl } from "@/utils/normalize";

export const metadata = {
  title: "Água e Esgoto - DAE",
  description: ""
}

async function getPage() {
  "use server"

  const { data: page } = await api.get<AguaESgotoResponse>("/agua-e-esgoto?populate=*")

  const { attributes } = page.data

  return {
    ...attributes,
    mapa: attributes.mapa.data?.attributes?.url ? normalizeFileUrl(page.data.attributes.mapa.data?.attributes.url) : null,
    relacao_etes: attributes.relacao_etes.data?.attributes?.url ? normalizeFileUrl(attributes.relacao_etes.data.attributes.url) : null
  }
}

export default async function Page() {
  const { agua, esgoto, mapa, relacao_etes } = await getPage()

  return (
    <>
      <section className="">
        <PageTitle
          title="Água"
          description={agua}
        />
        {
          mapa && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mapa} alt="" className="object-contain mx-auto my-20" />
          )
        }
      </section>
      <section>
        <PageTitle
          title="Esgoto"
          description={esgoto}
        />
        {
          relacao_etes && (
            <div className="mt-8">
              <Link href={relacao_etes} className="px-4 py-2 bg-primary-500 text-white-0 rounded">Relação das Etes MP</Link>
            </div>
          )
        }
      </section>
    </>
  )
}