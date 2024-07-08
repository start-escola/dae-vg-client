import PageTitle from "@/components/PageTitle";
import Image from "next/image";

export const metadata = {
  title: "Quem Somos - DAE",
  description: ""
}

export default function Page() {
  return (
    <section className="p-4">
      <section className="my-14 mx-auto container p-4">
        <div className="relative">
          <Image src="/pessoa.png" height={400} width={400} className="hidden md:flex absolute left-[66%] -translate-x-1/2 bottom-0 z-10" alt="pessoa" />
          <div className="flex relative rounded overflow-hidden">
            <div className="flex flex-col gap-6 h-fit bg-primary-500 w-10/12 md:w-8/12 px-24 py-10">
              <h1 className="text-3xl font-bold">Somos o <strong className="font-extrabold">DAE</strong></h1>
              <p className="font-light text-base max-w-96">
                O Departamento de Água e Esgoto de Várzea Grande (DAE-VG) foi criado em 5 de junho de 1997.
              </p>
              <div className="w-full flex flex-col justify-center items-center gap-4 md:w-fit">
                <Image src="/brasao.png" width={100} height={100} alt="logo" />
                <div className="flex flex-col gap-2">
                  <p className="font-light text-lg text-center">Prefeitura Municipal de</p>
                  <p className="text-white-0 font-bold text-2xl text-center whitespace-nowrap">VÁRZEA GRANDE</p>
                </div>
              </div>
            </div>
            <div className="relative w-4/12">
              <Image src="/banner-about-us.png" fill alt="background" className="-z-10 object-cover" />
            </div>
          </div>
        </div>
      </section>
      <div className="text-primary-500">
        <p>
          Conforme Lei Municipal nº 1.733 e alterado em 08 de abril de 1998, conforme Lei Municipal nº 1.866 para atender à comunidade em saneamento básico de qualidade. É uma autarquia municipal, com autonomia administrativa. Criado a partir da extinta Companhia de Saneamento do Estado de Mato Grosso (Sanemat), o DAE-VG iniciou os trabalhos em sua sede, na avenida Júlio Campos, com aproximadamente 100 funcionários.
        </p>
        <p>
          Hoje a autarquia possui mais de 300 colaboradores trabalhando com a finalidade de produzir, distribuir e entregar água no volume e na qualidade que a população de Várzea Grande precisa.
        </p>
      </div>
      <PageTitle
        title="Missão"
        description="Universalizar o abastecimento de água potável e o esgotamento sanitário de forma sustentável, contribuindo com a melhoria da qualidade de vida no município de Várzea Grande."
      />
      <PageTitle
        title="Visão"
        description="Ser reconhecida como autarquia referência no abastecimento de água e esgotamento sanitário no estado de Mato Grosso."
      />
      <div className="text-primary-500 mb-20">
        <h2 className="text-3xl py-5 border-b-2 border-primary-500 font-semibold mb-4">Valores</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-black font-semibold">
          <li className="shadow bg-white-0 flex gap-4 py-6 px-4">
            <Image src="/hammer.svg" width={35} height={35} alt="" />
            <p className="w-full text-center">Legalidade</p>
          </li>
          <li className="shadow bg-white-0 flex gap-4 py-6 px-4">
            <Image src="/hammer.svg" width={35} height={35} alt="" />
            <p className="w-full text-center">Legalidade</p>
          </li>
          <li className="shadow bg-white-0 flex gap-4 py-6 px-4">
            <Image src="/hammer.svg" width={35} height={35} alt="" />
            <p className="w-full text-center">Legalidade</p>
          </li>
          <li className="shadow bg-white-0 flex gap-4 py-6 px-4">
            <Image src="/hammer.svg" width={35} height={35} alt="" />
            <p className="w-full text-center">Legalidade</p>
          </li>
          <li className="shadow bg-white-0 flex gap-4 py-6 px-4">
            <Image src="/hammer.svg" width={35} height={35} alt="" />
            <p className="w-full text-center">Legalidade</p>
          </li>
          <li className="shadow bg-white-0 flex gap-4 py-6 px-4">
            <Image src="/hammer.svg" width={35} height={35} alt="" />
            <p className="w-full text-center">Legalidade</p>
          </li>
          <li className="shadow bg-white-0 flex gap-4 py-6 px-4">
            <Image src="/hammer.svg" width={35} height={35} alt="" />
            <p className="w-full text-center">Legalidade</p>
          </li>
          <li className="shadow bg-white-0 flex gap-4 py-6 px-4">
            <Image src="/hammer.svg" width={35} height={35} alt="" />
            <p className="w-full text-center">Legalidade</p>
          </li>
        </ul>
      </div>
    </section>
  )
}