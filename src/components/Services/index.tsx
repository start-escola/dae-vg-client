import Image from "next/image"

const Services = () => {
  return (
    <section className="mx-auto container p-4">
      <ul className="flex flex-wrap gap-4 relative -mt-10 z-10">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((val, i) => (
          <li key={i} className="flex flex-col justify-around rounded sm:flex-row items-center bg-white-50 w-36 md:w-80 md:h-fit flex-grow px-2 py-4 md:p-4 shadow">
            <div className="relative">
              <Image src="/water.svg" width={30} height={30} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-black font-semibold text-center">Pedido de nova ligação</p>
              <p className="text-[#B5B5B5] text-center">Solicitar agora</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Services