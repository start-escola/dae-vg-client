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

export default async function Page() {
  const { link, resume } = await getPage()

  return (
    <section className="text-primary-500 my-10">
      <PageTitle
        title="Portal da Transparência"
        description={resume}
      />
      <ul className="my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {
          link.map(({ title, route, id }) => (
            <li key={id}>
              <Link
                className="flex-col gap-4 flex items-center justify-between shadow-lg px-6 py-4 aspect-square dark:bg-black"
                href={`/transparencia/portal-da-transparencia/${route}`}
              >
                <p className="font-semibold dark:text-white-0 text-center">{title}</p>
                <button className="text-white-0 bg-primary-500 dark:text-black dark:bg-white-0 px-4 py-2">Acessar</button>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}