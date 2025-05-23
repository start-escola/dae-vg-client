import Image from "next/image"
import Text from "../Text"

const Footer = () => {
  return (
    <footer className="mx-auto  md:border-none text-white-0 bg-primary-500 border-b-8 border-primary-700 dark:bg-black">
      <section className="flex flex-col md:flex-row gap-20 justify-around mx-auto container px-4 py-20">
        <div className="w-full flex flex-col justify-center items-center gap-4 md:w-fit">
          <Image src="/brasao.png" width={100} height={100} alt="logo" />
          <div className="flex flex-col gap-2">
            <Text className="font-light text-lg text-center">Prefeitura Municipal de</Text>
            <Text className="text-white-0 font-bold text-2xl text-center whitespace-nowrap">VÁRZEA GRANDE</Text>
          </div>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* <li>
            <Text as="h3" className="text-2xl font-semibold mb-3">Rede Social</Text>
            <div className="flex flex-col gap-4">
              <Text className="font-light text-base">@daevarzeagrande</Text>
            </div>
          </li> */}
          <li>
            <Text className="text-2xl font-semibold mb-3">Agência Comercial</Text>
            <div className="flex flex-col gap-4">
              <Text as="a" href="https://maps.app.goo.gl/YVn1wZqQzqBDhHvw8" className="font-light text-base" target="_blank">Av. Castelo Branco, 245</Text>
            </div>
          </li>
          <li>
            <Text className="text-2xl font-semibold mb-3">Fale Conosco</Text>
            <div className="flex flex-col gap-4">
              <Text as="a" href="tel:0800 707 4442" className="font-light text-base" target="_blank">0800 707 4442</Text>
              <Text as="a" href="mailto:" className="font-light text-base" target="_blank">atendimento.comercial@daevg.com.br</Text>
            </div>
          </li>
          <li>
            <Text className="text-2xl font-semibold mb-3">Links</Text>
            <div className="flex flex-col gap-4">
              <Text as="a" href="/transparencia/portal-da-transparencia" className="font-light text-base" target="_blank">Portal da Transparência</Text>
              <Text as="a" href="/dae/diretoria" className="font-light text-base" target="_blank">Diretoria</Text>
              <Text as="a" href="https://falabr.cgu.gov.br/web/home" className="font-light text-base" target="_blank">Fala.BR</Text>
            </div>
          </li>
        </ul>
      </section>
    </footer>
  )
}

export default Footer