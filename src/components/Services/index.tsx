import Image from "next/image"

interface IServiceProps {
  values: {
    title: string
    icon: string
    href: string
  }[]
}

const Services = ({ values }: IServiceProps) => {
  return (
    <section className="mx-auto container p-4">
      <ul className="flex flex-wrap gap-4 relative -mt-10 z-10">
        {values.map((val, i) => (
          <li key={i} className="flex flex-col justify-around rounded sm:flex-row items-center bg-white-50 w-36 md:w-80 md:h-fit flex-grow px-2 py-4 md:p-4 shadow">
            <div className="relative">
              <Image src={val.icon} width={30} height={30} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black font-semibold text-center">{val.title}</p>
              <p className="text-[#B5B5B5] text-center">Solicitar agora</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Services