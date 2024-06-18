import Image from "next/image"

const AboutUs = () => {
  return (
    <section className="my-14 mx-auto container p-4">
      <div className="relative">
        <Image src="/pessoa.png" height={400} width={400} className="hidden md:flex absolute left-2/4 bottom-0 z-10" alt="pessoa" />
        <div className="relative rounded overflow-hidden">
          <div className="flex flex-col gap-6 px-4 py-8 h-fit bg-primary-500 w-10/12 md:w-8/12 md:pl-14 md:pr-44 md:py-28">
            <h1 className="text-3xl font-bold">Conheça o <strong className="font-extrabold">DAE</strong></h1>
            <p className="font-light text-base">
              O Departamento de Água e Esgoto de Várzea Grande (DAE-VG) foi criado em 5 de junho de 1997, conforme Lei Municipal nº 1.733 e alterado em 08 de abril de 1998, conforme Lei Municipal nº 1.866 para atender à comunidade em saneamento básico de qualidade. É uma autarquia municipal, com autonomia administrativa.
              Criado a partir da extinta Companhia de Saneamento do Estado de Mato Grosso (Sanemat), o DAE-VG iniciou os trabalhos em sua sede, na avenida Júlio Campos, com aproximadamente 100 funcionários. Hoje a autarquia possui mais de 300 colaboradores trabalhando com a finalidade de produzir, distribuir e entregar água no volume e na qualidade que a população de Várzea Grande precisa.
            </p>
            <button className="shadow-lg bg-white-50 text-primary-500 w-fit h-fit Frounded px-5 py-2 font-semibold rounded">Saber mais</button>
          </div>
          <Image src="/banner-about-us.png" layout="fill" alt="background" objectFit="cover" className="-z-10" />
        </div>
      </div>
    </section>
  )
}

export default AboutUs