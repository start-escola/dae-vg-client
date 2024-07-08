'use client'
import clsx from "clsx"
import Image from "next/image"
import { useState } from "react";
import Link from "next/link";

type IOption = {
  label: string
  href?: string
  options: {
    label: string
    href: string
  }[]
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  const handleOpen = () => setOpen((old) => !old);

  const links: IOption[] = [
    {
      label: "DAE",
      options: [
        {
          label: "Quem somos",
          href: "/dae/quem-somos"
        },
        {
          label: "Diretoria",
          href: "/dae/diretoria"
        },
        {
          label: "Água",
          href: "/dae/agua"
        },
        {
          label: "Esgoto",
          href: "/dae/esgoto"
        }
      ]
    },
    {
      label: "ATENDIMENTO",
      options: [
        {
          label: "Abastecimento",
          href: "/",
        },
        {
          label: "Agência Virtual",
          href: "/"
        },
        {
          label: "Quadro de Serviços",
          href: "/"
        }
      ]
    },
    {
      label: "TRANSPARÊNCIA",
      options: [
        {
          label: "Concursos",
          href: "/"
        },
        {
          label: "Controle Interno",
          href: "/"
        },
        {
          label: "Licitações",
          href: "/transparencia/licitacoes"
        },
        {
          label: "Portal da Transparência",
          href: "/"
        }
      ]
    },
    {
      label: "CARTA DE SERVIÇOS",
      href: "/",
      options: []
    },
    {
      label: "COMUNICAÇÃO",
      options: [
        {
          label: "Noticias e Eventos",
          href: "/",
        },
        {
          label: "Galerias",
          href: "/"
        }
      ]
    },
    {
      label: "OUVIDORIA",
      options: [
        {
          label: "Manifestação Anônima",
          href: "/"
        },
        {
          label: "Manifestação Identificada",
          href: "/"
        },
        {
          label: "Consulta Manifestação",
          href: "/"
        }
      ]
    }
  ];

  const handleMouseEnter = (label: IOption) => {
    if (selectedOption?.label === label.label) {
      setSelectedOption(null)
      return
    }
    setSelectedOption(label);
  };

  const handleMouseLeave = () => {
    setSelectedOption(null);
  };

  console.log(selectedOption)

  return (
    <header className="bg-white-50 fixed w-screen top-0 z-20" onMouseLeave={handleMouseLeave}
    >
      <section className="container flex items-center justify-between m-auto p-4 h-20 relative">
        <Link href="/" className="relative h-full z-20 min-w-40 md:min-w-48 cursor-pointer">
          <Image src="/logo.png" fill alt="logo" className="object-contain object-left" />
        </Link>
        <button className={clsx("flex flex-col justify-between w-8 h-6 relative z-20", "md:hidden")} onClick={handleOpen}>
          <div className={clsx("bg-black w-8 h-[2px] transition-all", open && "rotate-45 absolute left-0 bottom-1/2")} />
          <div className={clsx("bg-black w-8 h-[2px] transition-all", open && "rotate-45 absolute left-0 bottom-1/2")} />
          <div className={clsx("bg-black w-8 h-[2px] transition-all", open && "-rotate-45 absolute left-0 bottom-1/2")} />
        </button>

        <ul
          className={
            clsx(
              "flex flex-col gap-4 justify-center items-center h-[calc(100dvh-80px)] md:justify-center h-[calc(100vh - 80px)] absolute transition-all duration-500 translate-y-0 bottom-0 left-0 bg-white-50 w-full text-black text-2xl md:z-10",
              "md:flex-row md:h-fit md:sticky md:transparent md:gap-2 lg:gap-4 lg:w-fit lg:text-sm",
              "*:text-nowrap *:md:text-sm *:w-fit *:md:font-medium *:font-semibold",
              open && "translate-y-full"
            )
          }
        >
          {links.map((link) => (
            <li key={link.label} onClick={() => handleMouseEnter(link)}>
              <Link href={link?.href || "#"} className={clsx("flex gap-2 md:text-xs md:font-light xl:text-base hover:font-bold items-center text-primary-500 cursor-pointer", selectedOption?.label === link.label ? "font-bold" : "font-normal")}>
                <p className="w-full justify-center flex gap-2 items-center text-center">
                  {link.label}
                  {link?.options.length > 0 && <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.92906 7.11275L0.474905 1.65859C0.398541 1.58231 0.346526 1.48509 0.325446 1.37923C0.304365 1.27338 0.315167 1.16364 0.356484 1.06393C0.3978 0.964216 0.467773 0.879002 0.557546 0.819077C0.647318 0.759152 0.752851 0.72721 0.860787 0.727295L11.7691 0.727295C11.877 0.72721 11.9826 0.759152 12.0723 0.819077C12.1621 0.879003 12.2321 0.964216 12.2734 1.06393C12.3147 1.16365 12.3255 1.27338 12.3044 1.37923C12.2834 1.48509 12.2313 1.58231 12.155 1.65859L6.70082 7.11275C6.65017 7.16346 6.59002 7.20369 6.5238 7.23114C6.45759 7.25858 6.38662 7.27271 6.31494 7.27271C6.24327 7.27271 6.17229 7.25858 6.10608 7.23114C6.03987 7.20369 5.97971 7.16346 5.92906 7.11275Z" fill="#238F4F" />
                  </svg>
                  }
                </p>
              </Link>
              <ul
                className={clsx(
                  selectedOption?.label === link.label ? 'max-h-screen' : 'max-h-0',
                  'overflow-hidden transition-max-height duration-1000',
                  'flex flex-col gap-2',
                  'md:hidden'
                )}
              >
                {link.options.map((subopt) => (
                  <li key={subopt.label} className="text-center text-xl text-[#919191]">
                    <Link href={subopt.href}>
                      {subopt.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <a href="" className="md:hidden whitespace-nowrap flex relative z-10 text-white py-2 px-4 bg-primary-500 font-medium gap-2 rounded text-white-0 mt-14">
            <Image src="/user.svg" width={20} height={20} alt="Acesso ao servidor" className="object-cover" />
            ACESSO SERVIDOR
          </a>
        </ul>
        <a href="" className="hidden whitespace-nowrap md:flex relative z-10 text-white py-2 px-4 bg-primary-500 font-medium gap-2 rounded md:text-sm">
          <Image src="/user.svg" width={20} height={20} alt="Acesso ao servidor" className="object-cover" />
          ACESSO SERVIDOR
        </a>
      </section>
      <section className={clsx("flex justify-center items-center gap-8 w-full absolute bottom-0 h-12 bg-primary-500 text-white-0 -z-10 duration-500", selectedOption?.options.length && "translate-y-full")}>
        {selectedOption?.options.map((subOption, index) => (
          <a key={index} href={subOption.href} className="text-white hover:font-bold">
            {subOption.label}
          </a>
        ))}
      </section>
      <div className="left-0 top-0 absolute w-full h-full bg-white-50 md:z-0" />
    </header>
  );
};

export default Header;
