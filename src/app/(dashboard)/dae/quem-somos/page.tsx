import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import api from "@/utils/api"
import { normalizeFileUrl } from "@/utils/normalize";
import Text from "@/components/Text";

export const metadata = {
  title: "Quem Somos - DAE",
  description: ""
}

async function getPage() {
  "use server"

  const { data: page } = await api.get("/about-us?populate[valores][populate][icon]=*")

  return {
    description: page.data.attributes.description as string,
    short_description: page.data.attributes.short_description as string,
    mission: page.data.attributes.mission as string,
    vision: page.data.attributes.vision as string,
    valores: page.data.attributes.valores.map(({ id, name, icon }: { id: number, name: string, icon: { data: { attributes: { url: string } } } }) => ({
      id,
      name,
      icon: icon.data?.attributes.url ? normalizeFileUrl(icon.data?.attributes.url) : null
    })) as { id: number, name: string, icon: string }[]
  }
}

export default async function Page() {
  const { description, short_description, vision, mission, valores } = await getPage()

  return (
    <section className="p-4">
      <section className="my-4 mx-auto container">
        <div className="relative">
          <Image src="/pessoa.png" height={400} width={400} className="hidden md:flex absolute left-[66%] -translate-x-1/2 bottom-0 z-10" alt="pessoa" />
          <div className="flex relative rounded overflow-hidden text-white-0">
            <div className="flex flex-col gap-6 h-fit bg-primary-500 dark:bg-[#0D0D0D] w-10/12 md:w-8/12 px-4 md:px-24 py-10">
              <Text as="h1" className="text-3xl font-bold">Somos o <strong className="font-extrabold">DAE</strong></Text>
              <Text className="font-light text-base max-w-96">
                {short_description}
              </Text>
              <div className="w-full flex flex-col justify-center items-center gap-4 md:w-fit">
                <Image src="/brasao.png" width={100} height={100} alt="logo" />
                <div className="flex flex-col gap-2">
                  <Text className="font-light text-lg text-center">Prefeitura Municipal de</Text>
                  <Text className="text-white-0 dark:text-white-0 font-bold text-2xl text-center whitespace-nowrap">VÁRZEA GRANDE</Text>
                </div>
              </div>
            </div>
            <div className="relative w-4/12">
              <img src="/banner-about-us.png" alt="background" className="w-full h-full absolute -z-10 object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section>
      </section>
      <div className="text-primary-500 dark:text-white-0" dangerouslySetInnerHTML={{ __html: description }} />
      {
        mission && (
          <div className="my-10 lg:my-20">
            <PageTitle
              title="Missão"
              description={mission}
            />
          </div>
        )
      }
      {
        vision && (
          <div className="my-10 lg:my-20">
            <PageTitle
              title="Visão"
              description={vision}
            />
          </div>
        )
      }
      {
        valores.length > 0 && (
          <div className="text-primary-500 mb-20 dark:text-white-0">
            <Text as="h2" className="text-3xl py-5 border-b-2 border-primary-500 dark:border-white-0 font-semibold mb-4">Valores</Text>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-black dark:text-white-0 font-semibold">
              {
                valores.map(({ id, icon, name }) => (
                  <li key={id} className="shadow bg-white-0 dark:bg-black flex gap-4 py-6 px-4">
                    {
                      icon && (
                        <Image src={icon} width={35} height={35} alt="" />
                      )
                    }
                    <Text className="w-full text-center font-semibold text-lg">{name}</Text>
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </section>
  )
}