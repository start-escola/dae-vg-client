import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import api from "@/utils/api"
import Text from "@/components/Text";

async function getPage() {
  const { data: page } = await api.get("/diretoria?populate=*")

  return {
    resume: page.data.attributes.resume as string,
    members: page.data.attributes.members as { id: number, name: string, position: string }[],
    picture: null,
    mission: page.data.attributes.mission as string,
    vision: page.data.attributes.vision as string
  }
}

export const metadata = {
  title: "Diretoria - DAE",
  description: ""
}

export default async function Page() {
  const { members, resume, picture } = await getPage()

  return (
    <>
      <PageTitle
        title="Diretoria"
        description={resume}
      />
      <ul className="flex flex-col gap-4 text-black dark:text-white-0">
        {
          members.map(({ id, name, position }) => (
            <li className="relative" key={id}>
              <div className="flex gap-2 items-center">
                <Text className="text-lg font-light">{name}</Text>
                <p>-</p>
                <Text className="text-sm font-semibold">{position}</Text>
              </div>
            </li>
          ))
        }
      </ul>
    </>
  )
}