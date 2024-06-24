import Image from "next/image"

const Footer = () => {
  return (
    <footer className="mx-auto bg-primary-500 border-b-8 border-primary-700 md:border-none">
      <section className="flex flex-col md:flex-row gap-20 justify-around mx-auto container px-4 py-20">
        <div className="w-full flex flex-col justify-center items-center gap-4 md:w-fit">
          <Image src="/brasao.svg" width={100} height={100} alt="logo" />
          <div className="flex flex-col gap-2">
            <p className="font-light text-lg text-center">Prefeitura Municipal de</p>
            <p className="text-white-0 font-bold text-2xl text-center whitespace-nowrap">VÁRZEA GRANDE</p>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <li>
            <h3 className="text-2xl font-semibold mb-3">Sede</h3>
            <div className="flex flex-col gap-4">
              <p className="font-light">Av. Julio Campos, 2599 - Jardim dos Estados</p>
            </div>
          </li>
          <li>
            <h3 className="text-2xl font-semibold mb-3">Rede Social</h3>
            <div className="flex flex-col gap-4">
              <p className="font-light">@daevarzeagrande</p>
            </div>
          </li>
          <li>
            <h3 className="text-2xl font-semibold mb-3">Agência Comercial Cristo Rei</h3>
            <div className="flex flex-col gap-4">
              <p className="font-light">Av. Gonçalo Botelho de Campos -
                Cristo Rei</p>
              <p><strong>Atendimento:</strong> (65) 99267-9271</p>
            </div>
          </li>
          <li>
            <h3 className="text-2xl font-semibold mb-3">Agência Comercial Centro</h3>
            <div className="flex flex-col gap-4">
              <a href="https://maps.app.goo.gl/YVn1wZqQzqBDhHvw8" className="font-light" target="_blank">Av. Castelo Branco, 245</a>
              <p><strong>Atendimento:</strong> (65) 99327-2409</p>
            </div>
          </li>
        </ul>
      </section>
    </footer>
  )
}

export default Footer