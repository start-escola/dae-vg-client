import Image from "next/image"
import Link from "next/link"

interface IAboutUsProps {
  summary: string
}

const AboutUs = ({ summary }: IAboutUsProps) => {
  return (
    <section className="my-20 mx-auto container p-4">
      <div className="relative">
        <div className="flex relative rounded overflow-hidden">
          <div className="flex flex-col gap-6 px-4 py-8 h-fit bg-primary-500 w-10/12 md:w-8/12 md:pl-14 md:pr-44 md:py-28">
            <h1 className="text-3xl font-bold">Conheça o <strong className="font-extrabold">DAE</strong></h1>
            <p className="font-light text-base">
              {summary}
            </p>
            <Link href="/dae/quem-somos" className="cursor-pointer shadow-lg bg-white-50 text-primary-500 w-fit h-fit px-5 py-2 font-semibold rounded">Saber mais</Link>
          </div>
          <div className="relative w-4/12">
            <Image src="/banner-about-us.png" fill alt="background" className="-z-10 object-cover" />
          </div>
        </div>
        <Image src="/pessoa.png" height={400} width={400} className="hidden md:flex absolute left-[66%] -translate-x-1/2 bottom-0 " alt="pessoa" />
      </div>
    </section>
  )
}

export default AboutUs