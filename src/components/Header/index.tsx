'use client'
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((old) => !old)

  return (
    <header className="bg-white-50 fixed w-screen top-0 z-20">
      <section className="container flex items-center justify-between m-auto p-4 h-20 relative">
        <div className="relative h-full z-20 w-48" >
          <Image src="/logo.png" objectPosition="left" layout="fill" objectFit="contain" alt="logo" />
        </div>
        <button className={clsx("flex flex-col justify-between w-8 h-6 relative z-20", "sm:hidden")} onClick={handleOpen}>
          <div className={clsx("bg-black w-8 h-[2px] transition-all", open && "rotate-45 absolute left-0 bottom-1/2")} />
          <div className={clsx("bg-black w-8 h-[2px] transition-all", open && "rotate-45 absolute left-0 bottom-1/2")} />
          <div className={clsx("bg-black w-8 h-[2px] transition-all", open && "-rotate-45 absolute left-0 bottom-1/2")} />
        </button>
        <div className="left-0 top-0 absolute w-full h-full bg-white-50 z-10 sm:z-0" />
        <ul className={clsx("flex flex-col gap-1 items-center h-[calc(100dvh-80px)] md:justify-center h-[calc(100vh - 80px)] absolute transition-all duration-500 translate-y-0 bottom-0 left-0 bg-white-50 w-full md:w-fit text-black", "sm:flex-row sm:h-fit sm:sticky sm:transparent sm:gap-3 md:gap-6", open && "translate-y-full", "*:text-nowrap *:text-base *:w-fit")}>
          <li><a href="" className="text-primary-500 font-medium">DAE</a></li>
          <li><a href="" className="text-primary-500 font-medium">ATENDIMENTO</a></li>
          <li><a href="" className="text-primary-500 font-medium">TRANSPARÊNCIA</a></li>
          <li><a href="" className="text-primary-500 font-medium">CARTA DE SERVIÇOS</a></li>
          <li><a href="" className="text-primary-500 font-medium">COMUNICAÇÃO</a></li>
          <li><a href="" className="text-primary-500 font-medium">OUVIDORIA</a></li>
        </ul>
        <a href="" className="hidden md:flex relative z-10 text-white py-2 px-4 bg-primary-500 font-medium gap-2 ">
          <Image src="/person.png" width={20} height={20} alt="Acesso ao servidor" objectFit="contain" />
          ACESSO SERVIDOR</a>
      </section>
    </header>
  )
}

export default Header