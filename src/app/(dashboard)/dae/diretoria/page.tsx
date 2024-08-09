import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import api from "@/utils/api"

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
      <ul className="flex flex-wrap gap-4 my-32 justify-center sm:justify-start">
        {
          members.map(({ id, name, position }) => (
            <li className="relative w-80 h-[420px] shadow-md" key={id}>
              <img src={picture ? "picture" : "/nopicture.png"} className="absolute object-cover" alt={""} />
              <div className="w-full absolute bottom-4 p-4 bg-white-50 backdrop-blur-m  d bg-opacity-80 text-center text-black">
                <p className="text-lg font-light">{name}</p>
                <p className="text-sm font-semibold">{position}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </>
  )
}