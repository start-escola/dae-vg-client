import GoBack from "@/components/GoBack"
import PageTitle from "@/components/PageTitle"
import { SubMenuResponse } from "@/interfaces/request"
import api from "@/utils/api"
import { normalizeFileUrl } from "@/utils/normalize"
import Image from "next/image"

export const metadata = {
  title: "DAE - Portal da Transparência",
}
async function getPage(route: string) {
  'use server'

  const { data: page } = await api.get<SubMenuResponse>("/portal-da-transparencia?populate[link][populate][sublink][populate][icon]=*")

  const { attributes } = page.data


  const options = attributes.link.find((link) => link.route === route)

  return {
    ...options,
    sublink: options?.sublink.map(({ href, icon, id, name }) => ({
      id,
      href,
      name,
      icon: {
        ...icon?.data?.attributes,
        url: icon?.data?.attributes?.url && normalizeFileUrl(icon.data?.attributes?.url)
      }
    }))
  }
}

export default async function Page({ params }: { params: { route: string } }) {
  const { title, sublink } = await getPage(params.route)

  return (
    <section className="text-primary-500">
      <GoBack />
      <PageTitle title={title || ""} description="" />
      <ul className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {sublink?.map((link) => (
          <li key={link.id}>
            <a className="flex-col gap-4 flex items-center justify-center shadow-lg p-6" href={link.href || ""} target="_blank">
              {
                link.icon?.url && (
                  <Image src={link.icon.url} width={62} height={62} alt="icone" />
                )
              }
              <p className="font-semibold text-center">{link.name}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}