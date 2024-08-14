import PageTitle from "@/components/PageTitle"
import { SubMenuResponse } from "@/interfaces/request"
import api from "@/utils/api"
import Link from "next/link"

export const metadata = {
  title: "DAE - Portal da Transparência",
}

async function getPage() {
  "use server"

  const { data: page } = await api.get<SubMenuResponse>("/portal-da-transparencia?populate[link]=*")

  const { attributes } = page.data

  return { link: attributes.link, resume: attributes.resume }
}

export async function Page() {
  const { link, resume } = await getPage()

  return (
    <section className="text-primary-500 my-10">
      <PageTitle
        title="Portal da Transparência"
        description={resume}
      />
      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {
          link.map(({ title, route, id }) => (
            <li key={id}>
              <Link
                className="flex-col gap-4 flex items-center justify-center shadow-lg p-6"
                href={`/transparencia/portal-da-transparencia/${route}`}
              >
                <p className="font-semibold">{title}</p>
                <button className="text-white-0 bg-primary-500 px-4 py-2">Acessar</button>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default Page