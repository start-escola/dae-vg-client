'use client'
import { useSession } from "@/app/session-provider"
import Image from "next/image"

interface IServiceProps {
  values: {
    title: string
    icon: string
    href: string
  }[]
}

const Services = ({ values }: IServiceProps) => {
  const session = useSession();

  return (
    <section className="mx-auto container p-4">
      <ul className="flex flex-wrap gap-4 relative -mt-10 z-10">
        {values.map((val, i) => (
          <li key={i} className="rounded overflow-hidden bg-white-50 w-36 md:w-80 md:h-fit flex-grow shadow">
            <a href={session.status === "authenticated" ? val.href : `/acesso?callbackUrl=${val.href}`} target={session.status === "authenticated" ? "_blank" : "_self"} rel="noopener noreferrer" className="flex flex-col items-center gap-2 justify-around sm:flex-row px-2 py-4 md:p-4">
              <div className="relative">
                <Image src={val.icon} width={30} height={30} alt="" />
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-black font-semibold text-center">{val.title}</p>
                <p className="text-[#B5B5B5] text-center">Solicitar agora</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Services