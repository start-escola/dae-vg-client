"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

type IOption = {
  label: string;
  href?: string;
  options: {
    label: string;
    href: string;
  }[];
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<IOption | null>(null);

  const handleOpen = (open: boolean) => {
    setOpen(open);
  }

  const links: IOption[] = [
    {
      label: "DAE",
      options: [
        {
          label: "Quem somos",
          href: "/dae/quem-somos",
        },
        {
          label: "Diretoria",
          href: "/dae/diretoria",
        },
        {
          label: "Água e Esgoto",
          href: "/dae/agua-e-esgoto",
        },
      ],
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
          href: "/",
        },
        {
          label: "Quadro de Serviços",
          href: "/",
        },
      ],
    },
    {
      label: "TRANSPARÊNCIA",
      options: [
        {
          label: "Concursos",
          href: "/transparencia/concursos",
        },
        {
          label: "Controle Interno",
          href: "/transparencia/controle-interno",
        },
        {
          label: "Licitações",
          href: "/transparencia/licitacoes",
        },
        {
          label: "Portal da Transparência",
          href: "https://e-gov.betha.com.br/transparencia/01037-167/recursos.faces",
        },
      ],
    },
    {
      label: "CARTA DE SERVIÇOS",
      href: "/",
      options: [],
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
          href: "/",
        },
      ],
    },
    {
      label: "OUVIDORIA",
      href: "https://falabr.cgu.gov.br/web/home",
      options: []
    },
  ]

  links.forEach((link) => {
    if (link.href === "/") {
      console.log(link.label, link.href)
    }

    link.options.forEach((subopt) => {
      if (subopt.href === "/") {
        console.log(subopt.label, subopt.href)
      }
    })
  })

  const handleMouseEnter = (label: IOption) => {
    if (selectedOption?.label === label.label) {
      setSelectedOption(null);
      return;
    }
    setSelectedOption(label);
  };

  const handleMouseLeave = () => {
    setSelectedOption(null);
  };

  return (
    <header className="bg-white-50 fixed w-screen top-0 z-20 text-white-0" onMouseLeave={handleMouseLeave}>
      <div className="flex gap-4 items-center justify-center h-12 relative z-20 bg-[#911414] text-md  md:text-2xl font-semibold">
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.0015 8.99902C26.003 10.4958 25.6312 11.9693 24.9197 13.2862C24.2082 14.603 23.1795 15.7216 21.9268 16.5407C20.674 17.3599 19.2368 17.8536 17.7451 17.9773C16.2535 18.1009 14.7545 17.8506 13.384 17.249L6.87649 24.7765C6.86149 24.794 6.84399 24.8128 6.82774 24.829C6.07751 25.5793 5.05998 26.0007 3.99899 26.0007C2.938 26.0007 1.92047 25.5793 1.17024 24.829C0.42001 24.0788 -0.00146484 23.0613 -0.00146484 22.0003C-0.00146484 20.9393 0.42001 19.9218 1.17024 19.1715C1.18774 19.1553 1.20524 19.1378 1.22399 19.1228L8.75149 12.6165C8.07707 11.0738 7.84849 9.37291 8.09167 7.70686C8.33486 6.0408 9.04007 4.47623 10.1273 3.19063C11.2146 1.90504 12.6404 0.949858 14.2429 0.433453C15.8455 -0.0829528 17.5607 -0.139918 19.194 0.269019C19.3624 0.311218 19.5168 0.396517 19.6423 0.516525C19.7677 0.636533 19.8597 0.787118 19.9092 0.953468C19.9588 1.11982 19.9642 1.29621 19.9249 1.46528C19.8857 1.63436 19.8031 1.7903 19.6852 1.91777L15.0015 6.99902L15.709 10.2928L19.0015 10.999L24.0827 6.30902C24.2102 6.1912 24.3662 6.10859 24.5352 6.06932C24.7043 6.03005 24.8807 6.03546 25.047 6.08502C25.2134 6.13459 25.364 6.2266 25.484 6.35201C25.604 6.47741 25.6893 6.6319 25.7315 6.80027C25.9109 7.51941 26.0016 8.25783 26.0015 8.99902Z"
            fill="#FAFAFA"
          />
        </svg>
        Nosso site está passando por mudanças!
      </div>
      <section className="container flex items-center justify-between m-auto p-4 h-20 relative">
        <Link
          href="/"
          className="relative h-full z-20 min-w-40 md:min-w-48 cursor-pointer"
        >
          <Image
            src="/logo.png"
            fill
            alt="logo"
            className="object-contain object-left"
          />
        </Link>
        <button
          className={clsx(
            "flex flex-col justify-between w-8 h-6 relative z-20",
            "md:hidden"
          )}
        >
          <div
            className={clsx(
              "bg-black w-8 h-[2px] transition-all",
              open && "rotate-45 absolute left-0 bottom-1/2"
            )}
          />
          <div
            className={clsx(
              "bg-black w-8 h-[2px] transition-all",
              open && "rotate-45 absolute left-0 bottom-1/2"
            )}
          />
          <div
            className={clsx(
              "bg-black w-8 h-[2px] transition-all",
              open && "-rotate-45 absolute left-0 bottom-1/2"
            )}
          />
        </button>

        <ul
          className={clsx(
            "flex flex-col gap-4 justify-center items-center h-[calc(100dvh-80px)] md:justify-center h-[calc(100vh - 80px)] absolute transition-all duration-500 translate-y-0 bottom-0 left-0 bg-white-50 w-full text-black text-2xl md:z-10",
            "md:flex-row md:h-fit md:sticky md:transparent md:gap-2 lg:gap-4 lg:w-fit lg:text-sm",
            "*:text-nowrap *:md:text-sm *:w-fit *:md:font-medium *:font-semibold",
            open && "translate-y-full"
          )}
        >
          {links.map((link) => (
            <li key={link.label} onClick={() => handleMouseEnter(link)}>
              {link.href ? (
                <Link
                  href={link?.href || "#"}
                  className={clsx(
                    "flex gap-2 md:text-xs md:font-light xl:text-base hover:font-light items-center text-primary-500 cursor-pointer",
                    selectedOption?.label === link.label
                      ? "font-normal"
                      : "font-normal"
                  )}
                >
                  <p className="w-full justify-center flex gap-2 items-center text-center">
                    {link.label}
                    {link?.options.length > 0 && (
                      <svg
                        width="13"
                        height="8"
                        viewBox="0 0 13 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92906 7.11275L0.474905 1.65859C0.398541 1.58231 0.346526 1.48509 0.325446 1.37923C0.304365 1.27338 0.315167 1.16364 0.356484 1.06393C0.3978 0.964216 0.467773 0.879002 0.557546 0.819077C0.647318 0.759152 0.752851 0.72721 0.860787 0.727295L11.7691 0.727295C11.877 0.72721 11.9826 0.759152 12.0723 0.819077C12.1621 0.879003 12.2321 0.964216 12.2734 1.06393C12.3147 1.16365 12.3255 1.27338 12.3044 1.37923C12.2834 1.48509 12.2313 1.58231 12.155 1.65859L6.70082 7.11275C6.65017 7.16346 6.59002 7.20369 6.5238 7.23114C6.45759 7.25858 6.38662 7.27271 6.31494 7.27271C6.24327 7.27271 6.17229 7.25858 6.10608 7.23114C6.03987 7.20369 5.97971 7.16346 5.92906 7.11275Z"
                          fill="#238F4F"
                        />
                      </svg>
                    )}
                  </p>
                </Link>
              ) : (
                <div
                  className={clsx(
                    "flex gap-2 md:text-xs md:font-light xl:text-base hover:font-light items-center text-primary-500 cursor-pointer",
                    selectedOption?.label === link.label
                      ? "font-normal"
                      : "font-normal"
                  )}
                >
                  <p className="w-full justify-center flex gap-2 items-center text-center">
                    {link.label}
                    {link?.options.length > 0 && (
                      <svg
                        width="13"
                        height="8"
                        viewBox="0 0 13 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92906 7.11275L0.474905 1.65859C0.398541 1.58231 0.346526 1.48509 0.325446 1.37923C0.304365 1.27338 0.315167 1.16364 0.356484 1.06393C0.3978 0.964216 0.467773 0.879002 0.557546 0.819077C0.647318 0.759152 0.752851 0.72721 0.860787 0.727295L11.7691 0.727295C11.877 0.72721 11.9826 0.759152 12.0723 0.819077C12.1621 0.879003 12.2321 0.964216 12.2734 1.06393C12.3147 1.16365 12.3255 1.27338 12.3044 1.37923C12.2834 1.48509 12.2313 1.58231 12.155 1.65859L6.70082 7.11275C6.65017 7.16346 6.59002 7.20369 6.5238 7.23114C6.45759 7.25858 6.38662 7.27271 6.31494 7.27271C6.24327 7.27271 6.17229 7.25858 6.10608 7.23114C6.03987 7.20369 5.97971 7.16346 5.92906 7.11275Z"
                          fill="#238F4F"
                        />
                      </svg>
                    )}
                  </p>
                </div>
              )}
              <ul
                className={clsx(
                  selectedOption?.label === link.label
                    ? "max-h-screen"
                    : "max-h-0",
                  "overflow-hidden transition-max-height duration-1000",
                  "flex flex-col gap-2",
                  "md:hidden"
                )}
              >
                {link.options.map((subopt) => (
                  <li
                    key={subopt.label}
                    className="text-center text-xl text-[#919191]"
                  >
                    <Link href={subopt.href} onClick={() => handleOpen(false)}>{subopt.label}</Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <Link href="/cms/admin/auth/login" className="md:hidden whitespace-nowrap flex relative z-10 text-white py-2 px-4 bg-primary-500 font-medium gap-2 rounded text-white-0 mt-14">
            <Image src="/user.svg" width={20} height={20} alt="Acesso ao servidor" className="object-cover" />
            ACESSO SERVIDOR
          </Link>
        </ul>
        <Link href="/cms/admin/auth/login" className="hidden whitespace-nowrap md:flex relative z-10 text-white py-2 px-4 bg-primary-500 font-medium gap-2 rounded md:text-sm">
          <Image src="/user.svg" width={20} height={20} alt="Acesso ao servidor" className="object-cover" />
          ACESSO SERVIDOR
        </Link>
      </section>
      <section
        className={clsx(
          "flex justify-center items-center gap-8 w-full absolute bottom-0 h-12 bg-primary-500 text-white-0 -z-10 duration-500",
          selectedOption?.options.length && "translate-y-full"
        )}
      >
        {selectedOption?.options.map((subOption, index) => (
          <Link href={subOption.href} key={index} className="text-white hover:font-normal">
            {subOption.label}
          </Link>
        ))}
      </section>
      <div className="left-0 top-0 absolute w-full h-full bg-white-50 md:z-0" />
    </header>
  );
};

export default Header;
