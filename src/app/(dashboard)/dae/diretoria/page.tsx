import PageTitle from "@/components/PageTitle";
import Image from "next/image";

export const metadata = {
  title: "Diretoria - DAE",
  description: ""
}

export default function Page() {
  return (
    <>
      <PageTitle
        title="Diretoria"
        description="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
      <ul className="flex flex-wrap gap-4 my-32 justify-center">
        <li className="relative w-80 h-[420px]">
          <Image src="/diretoria.jpeg" fill className="object-cover" alt={""} />
          <div className="w-full absolute bottom-4 p-4 bg-white-50 backdrop-blur-md bg-opacity-80 text-center text-black">
            <p className="text-lg font-light">Carlos Alberto Simões de Arsuda</p>
            <p className="text-sm font-semibold">Diretor-presidente</p>
          </div>
        </li>
        <li className="relative w-80 h-[420px]">
          <Image src="/assessor.jpeg" fill className="object-cover" alt={""} />
          <div className="w-full absolute bottom-4 p-4 bg-white-50 backdrop-blur-md bg-opacity-80 text-center text-black">
            <p className="text-lg font-light">Paulo Roberto Ferreira</p>
            <p className="text-sm font-semibold">Assessor de Gestão</p>
          </div>
        </li>
        <li className="relative w-80 h-[420px]">
          <Image src="/diretoria.png" fill className="object-cover" alt={""} />
          <div className="w-full absolute bottom-4 p-4 bg-white-50 backdrop-blur-md bg-opacity-80 text-center text-black">
            <p className="text-lg font-light">Carlos Alberto Simões de Arsuda</p>
            <p className="text-sm font-semibold">Diretor-presidente</p>
          </div>
        </li>
        <li className="relative w-80 h-[420px]">
          <Image src="/diretoria.png" fill className="object-cover" alt={""} />
          <div className="w-full absolute bottom-4 p-4 bg-white-50 backdrop-blur-md bg-opacity-80 text-center text-black">
            <p className="text-lg font-light">Carlos Alberto Simões de Arsuda</p>
            <p className="text-sm font-semibold">Diretor-presidente</p>
          </div>
        </li>
        <li className="relative w-80 h-[420px]">
          <Image src="/diretoria.png" fill className="object-cover" alt={""} />
          <div className="w-full absolute bottom-4 p-4 bg-white-50 backdrop-blur-md bg-opacity-80 text-center text-black">
            <p className="text-lg font-light">Carlos Alberto Simões de Arsuda</p>
            <p className="text-sm font-semibold">Diretor-presidente</p>
          </div>
        </li>
        <li className="relative w-80 h-[420px]">
          <Image src="/diretoria.png" fill className="object-cover" alt={""} />
          <div className="w-full absolute bottom-4 p-4 bg-white-50 backdrop-blur-md bg-opacity-80 text-center text-black">
            <p className="text-lg font-light">Carlos Alberto Simões de Arsuda</p>
            <p className="text-sm font-semibold">Diretor-presidente</p>
          </div>
        </li>
        <li className="relative w-80 h-[420px]">
          <Image src="/diretoria.png" fill className="object-cover" alt={""} />
          <div className="w-full absolute bottom-4 p-4 bg-white-50 backdrop-blur-md bg-opacity-80 text-center text-black">
            <p className="text-lg font-light">Carlos Alberto Simões de Arsuda</p>
            <p className="text-sm font-semibold">Diretor-presidente</p>
          </div>
        </li>
      </ul>
    </>
  )
}